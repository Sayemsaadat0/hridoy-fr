"use client";

import React from "react";
import type { NoticePriority, NoticeStatus } from "@/models/notice.model";
import { PublishedPill, ResourceManager, StatusPill } from "@/components/admin/ResourceManager";
import type { ColumnConfig, FieldConfig, FormValues, SelectOption } from "@/components/admin/types";
import { formatDay, str, toDateInputValue, todayDateInputValue } from "@/components/admin/format";

interface Notice {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: NoticePriority;
  date: string;
  status: NoticeStatus;
  isPublished: boolean;
}

const PRIORITY_OPTIONS = [
  { value: "HIGH", label: "High" },
  { value: "MEDIUM", label: "Medium" },
  { value: "LOW", label: "Low" },
] as const satisfies readonly (SelectOption & { value: NoticePriority })[];

const STATUS_OPTIONS = [
  { value: "Active", label: "Active (today)" },
  { value: "Upcoming", label: "Upcoming" },
  { value: "Expired", label: "Expired" },
] as const satisfies readonly (SelectOption & { value: NoticeStatus })[];

const priorityTone = { HIGH: "red", MEDIUM: "amber", LOW: "blue" } as const;
const statusTone = { Active: "green", Upcoming: "blue", Expired: "gray" } as const;

const columns: ColumnConfig<Notice>[] = [
  { header: "Date", cell: (notice) => formatDay(notice.date), className: "whitespace-nowrap tabular-nums" },
  {
    header: "Notice",
    cell: (notice) => (
      <div className="max-w-xl space-y-1">
        <p className="font-hr-600">{notice.title}</p>
        <p className="line-clamp-2 text-hr-gray">{notice.description}</p>
      </div>
    ),
  },
  { header: "Category", cell: (notice) => notice.category, className: "whitespace-nowrap" },
  {
    header: "Priority",
    cell: (notice) => <StatusPill tone={priorityTone[notice.priority]}>{notice.priority}</StatusPill>,
  },
  {
    header: "Status",
    cell: (notice) => (
      <div className="flex flex-col items-start gap-1">
        <StatusPill tone={statusTone[notice.status]}>{notice.status}</StatusPill>
        <PublishedPill isPublished={notice.isPublished} />
      </div>
    ),
  },
];

const fields: FieldConfig[] = [
  { name: "title", label: "Title", type: "text", required: true, maxLength: 200, fullWidth: true },
  { name: "description", label: "Description", type: "textarea", required: true, maxLength: 5000 },
  { name: "category", label: "Category", type: "text", required: true, maxLength: 60, placeholder: "e.g. পরীক্ষা" },
  { name: "date", label: "Date", type: "date", required: true },
  { name: "priority", label: "Priority", type: "select", required: true, options: PRIORITY_OPTIONS },
  { name: "isPublished", label: "Published", type: "switch" },
];

const toFormValues = (notice?: Notice): FormValues => ({
  title: notice?.title ?? "",
  description: notice?.description ?? "",
  category: notice?.category ?? "",
  date: notice ? toDateInputValue(notice.date) : todayDateInputValue(),
  priority: notice?.priority ?? "MEDIUM",
  isPublished: notice?.isPublished ?? true,
});

const toPayload = (values: FormValues) => ({
  title: str(values.title),
  description: str(values.description),
  category: str(values.category),
  date: str(values.date),
  priority: str(values.priority),
  isPublished: values.isPublished === true,
});

const NoticePage = () => (
  <ResourceManager<Notice>
    title="Notice"
    description="Announcements shown on the notice page"
    singular="Notice"
    endpoint="/api/notices"
    baseParams={{ published: "all" }}
    filters={[
      { name: "priority", label: "Priority", options: PRIORITY_OPTIONS },
      { name: "status", label: "Status", options: STATUS_OPTIONS },
    ]}
    columns={columns}
    fields={fields}
    toFormValues={toFormValues}
    toPayload={toPayload}
    getItemLabel={(notice) => notice.title}
    searchPlaceholder="Search notices…"
    emptyMessage="No notices yet."
  />
);

export default NoticePage;
