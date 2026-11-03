"use client";

import React, { useEffect, useRef, useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { resizedImageUrl } from "@/lib/image-url";
import { AdminActionButton } from "@/components/layouts/AdminPageHeader";
import type { FieldConfig, FormValues } from "./types";
import {
  adminDialogClass,
  adminInputClass,
  adminLabelClass,
  adminSecondaryButtonClass,
  adminSelectClass,
} from "./styles";

interface ResourceFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  submitLabel: string;
  fields: FieldConfig[];
  initialValues: FormValues;
  /** Resolve to close the dialog; reject with a message to keep it open and show the error. */
  onSubmit: (values: FormValues) => Promise<void>;
}

const FULL_WIDTH_TYPES = new Set(["textarea", "image", "readonly", "custom"]);

// Mirrors the server limits in src/lib/image-storage.ts so obvious mistakes fail before uploading.
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export function ResourceFormDialog({
  open,
  onOpenChange,
  title,
  description,
  submitLabel,
  fields,
  initialValues,
  onSubmit,
}: ResourceFormDialogProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset whenever the dialog opens for a different record.
  useEffect(() => {
    if (open) {
      setValues(initialValues);
      setError(null);
    }
  }, [open, initialValues]);

  const setValue = (name: string, value: FormValues[string]) =>
    setValues((prev) => ({ ...prev, [name]: value }));

  const hasNewImage = fields.some((field) => field.type === "image" && values[field.name] instanceof File);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const missingImage = fields.find(
      (field) =>
        field.type === "image" &&
        field.required &&
        !(values[field.name] instanceof File) &&
        !values[field.currentUrlKey]
    );
    if (missingImage) {
      setError(`Choose an image for “${missingImage.label}”.`);
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      await onSubmit(values);
      onOpenChange(false);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !isSubmitting && onOpenChange(next)}>
      <DialogContent className={adminDialogClass}>
        <DialogHeader>
          <DialogTitle className="text-hr-white font-hr-700">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-hr-gray">{description}</DialogDescription>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <div
                key={field.name}
                className={cn(
                  "min-w-0 space-y-2",
                  (field.fullWidth || FULL_WIDTH_TYPES.has(field.type)) && "sm:col-span-2"
                )}
              >
                <FieldControl
                  field={field}
                  values={values}
                  onChange={setValue}
                  onInvalidFile={setError}
                />
                {field.hint && <p className="text-xs text-hr-gray">{field.hint}</p>}
              </div>
            ))}
          </div>

          {error && (
            <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          )}

          <DialogFooter>
            <button
              type="button"
              className={adminSecondaryButtonClass}
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <AdminActionButton type="submit" disabled={isSubmitting} className="justify-center">
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSubmitting && hasNewImage ? "Uploading image…" : submitLabel}
            </AdminActionButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface FieldControlProps {
  field: FieldConfig;
  values: FormValues;
  onChange: (name: string, value: FormValues[string]) => void;
  onInvalidFile: (message: string) => void;
}

function FieldControl({ field, values, onChange, onInvalidFile }: FieldControlProps) {
  const id = `field-${field.name}`;
  const value = values[field.name];
  const label = (
    <label htmlFor={id} className={adminLabelClass}>
      {field.label}
      {field.required && <span className="ml-0.5 text-hr-green-toxic">*</span>}
    </label>
  );
  const text = typeof value === "string" ? value : "";

  switch (field.type) {
    case "switch":
      return (
        <div className="flex h-full items-center gap-3 pt-6">
          <Switch
            id={id}
            checked={value === true}
            onCheckedChange={(checked) => onChange(field.name, checked)}
            className="data-[state=checked]:bg-hr-green-toxic data-[state=unchecked]:bg-hr-white/20"
          />
          <label htmlFor={id} className="text-sm text-hr-white font-hr-500">
            {field.label}
          </label>
        </div>
      );

    case "custom":
      return (
        <div className="space-y-2">
          <span id={`${id}-label`} className={adminLabelClass}>
            {field.label}
            {field.required && <span className="ml-0.5 text-hr-green-toxic">*</span>}
          </span>
          {field.render({
            labelId: `${id}-label`,
            value,
            onChange: (next) => onChange(field.name, next),
          })}
        </div>
      );

    case "readonly":
      return (
        <div className="space-y-1">
          <span className={adminLabelClass}>{field.label}</span>
          <p className="whitespace-pre-wrap break-words rounded-md border border-hr-white/10 bg-hr-white/5 px-3 py-2 text-sm text-hr-white">
            {text || "—"}
          </p>
        </div>
      );

    case "select":
      return (
        <>
          {label}
          <select
            id={id}
            name={field.name}
            required={field.required}
            value={text}
            onChange={(event) => onChange(field.name, event.target.value)}
            className={adminSelectClass}
          >
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </>
      );

    case "textarea":
      return (
        <>
          {label}
          <Textarea
            id={id}
            name={field.name}
            required={field.required}
            maxLength={field.maxLength}
            placeholder={field.placeholder}
            value={text}
            onChange={(event) => onChange(field.name, event.target.value)}
            className={cn(adminInputClass, "min-h-28")}
          />
        </>
      );

    case "image": {
      const currentUrl = values[field.currentUrlKey];
      return (
        <>
          {label}
          <ImageFileInput
            id={id}
            file={value instanceof File ? value : null}
            currentUrl={typeof currentUrl === "string" ? currentUrl : ""}
            onChange={(file) => onChange(field.name, file)}
            onInvalidFile={onInvalidFile}
          />
        </>
      );
    }

    default:
      return (
        <>
          {label}
          <Input
            id={id}
            name={field.name}
            type={field.type}
            required={field.required}
            maxLength={field.maxLength}
            min={field.type === "number" ? 0 : undefined}
            placeholder={field.placeholder}
            value={text}
            onChange={(event) => onChange(field.name, event.target.value)}
            className={adminInputClass}
          />
        </>
      );
  }
}

interface ImageFileInputProps {
  id: string;
  file: File | null;
  currentUrl: string;
  onChange: (file: File | null) => void;
  onInvalidFile: (message: string) => void;
}

/** File picker with a preview of the chosen file, or of the saved image when editing. */
function ImageFileInput({ id, file, currentUrl, onChange, onInvalidFile }: ImageFileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const filePreview = useObjectUrl(file);
  const previewSrc = file ? filePreview : currentUrl || null;

  const handleFile = (picked: File | undefined) => {
    if (inputRef.current) inputRef.current.value = "";
    if (!picked) return;
    if (!ACCEPTED_IMAGE_TYPES.includes(picked.type)) {
      onInvalidFile("Choose a JPEG, PNG, WebP or GIF image.");
      return;
    }
    if (picked.size > MAX_IMAGE_BYTES) {
      onInvalidFile("Image must be 5 MB or smaller.");
      return;
    }
    onChange(picked);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-24 w-36 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-hr-white/10 bg-hr-white/5 text-xs text-hr-gray">
        {previewSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={file ? previewSrc : resizedImageUrl(previewSrc, 400)} alt="" className="h-full w-full object-cover" />
        ) : (
          <span>No image</span>
        )}
      </div>
      <div className="min-w-0 space-y-2">
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          className="sr-only"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={cn(adminSecondaryButtonClass, "flex items-center gap-2")}
        >
          <ImagePlus className="h-4 w-4" />
          {file || currentUrl ? "Replace image" : "Choose image"}
        </button>
        <p className="truncate text-xs text-hr-gray">
          {file ? `${file.name} · ${Math.ceil(file.size / 1024)} KB` : "JPEG, PNG, WebP or GIF · up to 5 MB"}
        </p>
        {file && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-xs text-hr-gray underline-offset-2 hover:text-hr-white hover:underline"
          >
            {currentUrl ? "Keep current image" : "Remove"}
          </button>
        )}
      </div>
    </div>
  );
}

/** A blob: URL for previewing a local file, revoked when the file changes or the component unmounts. */
function useObjectUrl(file: File | null): string | null {
  const [url, setUrl] = useState<{ file: File; href: string } | null>(null);

  useEffect(() => {
    if (!file) return;
    const href = URL.createObjectURL(file);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with an external resource (object URL)
    setUrl({ file, href });
    return () => URL.revokeObjectURL(href);
  }, [file]);

  return url && url.file === file ? url.href : null;
}

/** Small thumbnail for table cells. */
export function ImagePreview({ src, className }: { src: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-md border border-hr-white/10 bg-hr-white/5 text-[10px] text-hr-gray",
        className
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={resizedImageUrl(src, 240)} alt="" loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <span>No image</span>
      )}
    </div>
  );
}
