"use client";

import React from "react";
import type { PublicGalleryItem } from "@/models/gallery-item.model";
import { ImagePreview } from "@/components/admin/ResourceFormDialog";
import { PublishedPill, ResourceManager } from "@/components/admin/ResourceManager";
import type { ColumnConfig, FieldConfig, FormValues } from "@/components/admin/types";
import { str, toInt } from "@/components/admin/format";

type GalleryItem = Omit<PublicGalleryItem, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

const columns: ColumnConfig<GalleryItem>[] = [
  { header: "#", cell: (item) => item.order, className: "w-12 text-hr-gray tabular-nums" },
  { header: "Image", cell: (item) => <ImagePreview src={item.imageUrl} className="h-14 w-20" />, className: "w-24" },
  {
    header: "Title",
    cell: (item) => (
      <div className="max-w-xl space-y-1">
        <p className="font-hr-600">{item.title}</p>
        {item.description && <p className="line-clamp-2 text-hr-gray">{item.description}</p>}
      </div>
    ),
  },
  { header: "Status", cell: (item) => <PublishedPill isPublished={item.isPublished} /> },
];

const fields: FieldConfig[] = [
  { name: "image", label: "Photo", type: "image", required: true, currentUrlKey: "imageUrl" },
  { name: "title", label: "Title", type: "text", required: true, maxLength: 120, fullWidth: true, hint: "Also used as the image's alt text." },
  { name: "description", label: "Description", type: "textarea", maxLength: 500 },
  { name: "order", label: "Display order", type: "number", hint: "Lower numbers show first." },
  { name: "isPublished", label: "Published", type: "switch" },
];

const toFormValues = (item?: GalleryItem): FormValues => ({
  image: null,
  imageUrl: item?.imageUrl ?? "", // preview only; never sent
  title: item?.title ?? "",
  description: item?.description ?? "",
  order: String(item?.order ?? 0),
  isPublished: item?.isPublished ?? true,
});

const toPayload = (values: FormValues) => ({
  // Only a newly chosen file is sent; the API uploads it and stores the URL.
  image: values.image instanceof File ? values.image : undefined,
  title: str(values.title),
  description: str(values.description) || null,
  order: toInt(values.order),
  isPublished: values.isPublished === true,
});

const GalleryPage = () => (
  <ResourceManager<GalleryItem>
    title="Gallery"
    description="Photos shown on the gallery page"
    singular="Photo"
    endpoint="/api/gallery"
    baseParams={{ published: "all" }}
    columns={columns}
    fields={fields}
    toFormValues={toFormValues}
    toPayload={toPayload}
    getItemLabel={(item) => item.title}
    searchPlaceholder="Search photos…"
    emptyMessage="No photos yet."
  />
);

export default GalleryPage;
