"use client";

import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ApiError, apiRequest } from "@/lib/api-client";
import { ROUTES } from "@/lib/config";
import { cn } from "@/lib/utils";
import {
  AdminActionButton,
  AdminEmptyState,
  AdminPageHeader,
} from "@/components/layouts/AdminPageHeader";
import { ResourceFormDialog } from "./ResourceFormDialog";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";
import { useAdminList } from "./useAdminList";
import type { ColumnConfig, FieldConfig, FilterConfig, FormValues } from "./types";
import { adminInputClass, adminSelectClass } from "./styles";

export interface ResourceManagerProps<T extends { id: string }> {
  title: string;
  description: string;
  /** Singular noun for buttons and messages, e.g. "FAQ". */
  singular: string;
  endpoint: string;
  columns: ColumnConfig<T>[];
  fields: FieldConfig[];
  /** Form state for a new record (no item) or an existing one. */
  toFormValues: (item?: T) => FormValues;
  toPayload: (values: FormValues) => Record<string, unknown>;
  /** Short label for a record in confirmations, e.g. its title. */
  getItemLabel: (item: T) => string;
  /** Fixed query params sent with every list request, e.g. `{ published: "all" }`. */
  baseParams?: Record<string, string>;
  filters?: FilterConfig[];
  searchPlaceholder?: string;
  emptyMessage: string;
  /** Contacts are created by the public form, not by admins. */
  canCreate?: boolean;
  /** Label for the row action that opens the form. */
  editLabel?: string;
  pageSize?: number;
}

const SEARCH_DEBOUNCE_MS = 300;

/** JSON, or multipart when the payload carries a new image file (the API uploads it to ImageKit). */
function toRequestBody(payload: Record<string, unknown>): string | FormData {
  if (!Object.values(payload).some((value) => value instanceof File)) {
    return JSON.stringify(payload);
  }
  const form = new FormData();
  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined) continue;
    if (value instanceof File) form.set(key, value, value.name);
    else form.set(key, value === null ? "" : String(value));
  }
  return form;
}

export function ResourceManager<T extends { id: string }>({
  title,
  description,
  singular,
  endpoint,
  columns,
  fields,
  toFormValues,
  toPayload,
  getItemLabel,
  baseParams,
  filters = [],
  searchPlaceholder = "Search…",
  emptyMessage,
  canCreate = true,
  editLabel = "Edit",
  pageSize = 20,
}: ResourceManagerProps<T>) {
  const router = useRouter();
  const pathname = usePathname();

  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  const [formState, setFormState] = useState<{ item: T | null; initialValues: FormValues } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null);

  const handleError = useCallback(
    (error: unknown) => {
      if (error instanceof ApiError && error.status === 401) {
        toast.error("Your session has expired. Please sign in again.");
        router.replace(`${ROUTES.ADMIN_LOGIN}?from=${encodeURIComponent(pathname)}`);
        return;
      }
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    },
    [router, pathname]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, reload } = useAdminList<T>(
    endpoint,
    { ...baseParams, ...filterValues, q: search, page, limit: pageSize },
    handleError
  );

  const items = data?.items ?? [];
  const totalPages = data?.pagination.totalPages ?? 1;
  const isFiltered = Boolean(search) || Object.values(filterValues).some(Boolean);

  const openCreate = () => setFormState({ item: null, initialValues: toFormValues() });
  const openEdit = (item: T) => setFormState({ item, initialValues: toFormValues(item) });

  const handleSubmit = async (values: FormValues) => {
    const editing = formState?.item;
    try {
      await apiRequest(editing ? `${endpoint}/${editing.id}` : endpoint, {
        method: editing ? "PATCH" : "POST",
        body: toRequestBody(toPayload(values)),
      });
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) handleError(error);
      throw error; // keeps the dialog open with the message
    }
    toast.success(editing ? `${singular} updated` : `${singular} created`);
    reload();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await apiRequest(`${endpoint}/${deleteTarget.id}`, { method: "DELETE" });
      toast.success(`${singular} deleted`);
      // Step back if this removed the last row on the page.
      if (items.length === 1 && page > 1) setPage(page - 1);
      else reload();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div>
      <AdminPageHeader
        title={title}
        description={description}
        action={
          canCreate && (
            <AdminActionButton onClick={openCreate}>
              <Plus className="h-4 w-4" />
              Add {singular}
            </AdminActionButton>
          )
        }
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-hr-gray" />
          <Input
            type="search"
            aria-label={`Search ${title.toLowerCase()}`}
            placeholder={searchPlaceholder}
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            className={cn(adminInputClass, "pl-9")}
          />
        </div>
        {filters.map((filter) => (
          <select
            key={filter.name}
            aria-label={filter.label}
            value={filterValues[filter.name] ?? ""}
            onChange={(event) => {
              setFilterValues((prev) => ({ ...prev, [filter.name]: event.target.value }));
              setPage(1);
            }}
            className={cn(adminSelectClass, "sm:w-44")}
          >
            <option value="">{filter.label}: All</option>
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ))}
      </div>

      {!isLoading && items.length === 0 ? (
        <AdminEmptyState>{isFiltered ? "Nothing matches your search." : emptyMessage}</AdminEmptyState>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-hr-white/10 bg-hr-white/5">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm" aria-busy={isLoading}>
              <thead>
                <tr className="border-b border-hr-white/10 text-xs uppercase tracking-wide text-hr-gray">
                  {columns.map((column) => (
                    <th key={column.header} scope="col" className={cn("px-4 py-3 font-hr-600", column.className)}>
                      {column.header}
                    </th>
                  ))}
                  <th scope="col" className="px-4 py-3 text-right font-hr-600">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading && items.length === 0
                  ? Array.from({ length: 4 }, (_, index) => (
                      <tr key={index} className="border-b border-hr-white/5">
                        <td colSpan={columns.length + 1} className="px-4 py-4">
                          <div className="h-4 w-2/3 animate-pulse rounded bg-hr-white/10" />
                        </td>
                      </tr>
                    ))
                  : items.map((item) => (
                      <tr
                        key={item.id}
                        className={cn(
                          "border-b border-hr-white/5 text-hr-white transition-colors last:border-0 hover:bg-hr-white/5",
                          isLoading && "opacity-60"
                        )}
                      >
                        {columns.map((column) => (
                          <td key={column.header} className={cn("px-4 py-3 align-top", column.className)}>
                            {column.cell(item)}
                          </td>
                        ))}
                        <td className="px-4 py-3 align-top">
                          <div className="flex justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => openEdit(item)}
                              aria-label={`${editLabel} ${getItemLabel(item)}`}
                              title={editLabel}
                              className="rounded-md p-2 text-hr-gray transition-colors hover:bg-hr-white/10 hover:text-hr-green-toxic"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteTarget(item)}
                              aria-label={`Delete ${getItemLabel(item)}`}
                              title="Delete"
                              className="rounded-md p-2 text-hr-gray transition-colors hover:bg-red-500/10 hover:text-red-400"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-hr-white/10 px-4 py-3 text-sm text-hr-gray">
              <span>
                Page {page} of {totalPages} · {data?.pagination.total} total
              </span>
              <div className="flex gap-1">
                <button
                  type="button"
                  aria-label="Previous page"
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  className="rounded-md p-2 transition-colors hover:bg-hr-white/10 disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next page"
                  disabled={page >= totalPages}
                  onClick={() => setPage(page + 1)}
                  className="rounded-md p-2 transition-colors hover:bg-hr-white/10 disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <ResourceFormDialog
        open={formState !== null}
        onOpenChange={(open) => !open && setFormState(null)}
        title={formState?.item ? `${editLabel} ${singular}` : `Add ${singular}`}
        submitLabel={formState?.item ? "Save changes" : `Create ${singular}`}
        fields={fields}
        initialValues={formState?.initialValues ?? {}}
        onSubmit={handleSubmit}
      />

      <ConfirmDeleteDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title={`Delete this ${singular.toLowerCase()}?`}
        description={
          deleteTarget ? `“${getItemLabel(deleteTarget)}” will be removed permanently.` : ""
        }
        onConfirm={handleDelete}
      />
    </div>
  );
}

/** Pill used in table cells for published/draft and other short states. */
export function StatusPill({
  tone,
  children,
}: {
  tone: "green" | "gray" | "red" | "amber" | "blue";
  children: React.ReactNode;
}) {
  const tones = {
    green: "bg-hr-green-toxic/15 text-hr-green-toxic",
    gray: "bg-hr-white/10 text-hr-gray",
    red: "bg-red-500/15 text-red-300",
    amber: "bg-amber-500/15 text-amber-300",
    blue: "bg-sky-500/15 text-sky-300",
  };
  return (
    <span className={cn("inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-hr-600", tones[tone])}>
      {children}
    </span>
  );
}

export function PublishedPill({ isPublished }: { isPublished: boolean }) {
  return isPublished ? <StatusPill tone="green">Published</StatusPill> : <StatusPill tone="gray">Draft</StatusPill>;
}
