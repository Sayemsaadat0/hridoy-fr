"use client";

import React from "react";
import type { PublicGalleryItem } from "@/models/gallery-item.model";
import { PublishedPill, ResourceManager } from "@/components/admin/ResourceManager";
import type { FieldConfig, FormValues } from "@/components/admin/types";
import { resizedImageUrl } from "@/lib/image-url";
import { str } from "@/components/admin/format";

type GalleryItem = Omit<PublicGalleryItem, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

/** Photo card for the admin gallery grid; edit/delete buttons are added by ResourceManager. */
const renderCard = (item: GalleryItem) => (
  <figure>
    <div className="aspect-4/3 overflow-hidden bg-hr-white/5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={resizedImageUrl(item.imageUrl, 480)}
        alt={item.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
    </div>
    <figcaption className="flex items-center justify-between gap-2 px-3 py-2.5">
      <p className="truncate text-sm font-hr-600" title={item.title}>
        {item.title}
      </p>
      <PublishedPill isPublished={item.isPublished} />
    </figcaption>
  </figure>
);

const fields: FieldConfig[] = [
  { name: "image", label: "Photo", type: "image", required: true, currentUrlKey: "imageUrl" },
  { name: "title", label: "Title", type: "text", required: true, maxLength: 120, fullWidth: true, hint: "Also used as the image's alt text." },
  { name: "description", label: "Description", type: "textarea", maxLength: 500 },
  { name: "isPublished", label: "Published", type: "switch" },
];

const toFormValues = (item?: GalleryItem): FormValues => ({
  image: null,
  imageUrl: item?.imageUrl ?? "", // preview only; never sent
  title: item?.title ?? "",
  description: item?.description ?? "",
  isPublished: item?.isPublished ?? true,
});

const toPayload = (values: FormValues) => ({
  // Only a newly chosen file is sent; the API uploads it and stores the URL.
  image: values.image instanceof File ? values.image : undefined,
  title: str(values.title),
  description: str(values.description) || null,
  isPublished: values.isPublished === true,
});

const GalleryPage = () => (
  <ResourceManager<GalleryItem>
    title="Gallery"
    description="Photos shown on the gallery page"
    singular="Photo"
    endpoint="/api/gallery"
    baseParams={{ published: "all" }}
    renderCard={renderCard}
    fields={fields}
    toFormValues={toFormValues}
    toPayload={toPayload}
    getItemLabel={(item) => item.title}
    searchPlaceholder="Search photos…"
    emptyMessage="No photos yet."
  />
);

export default GalleryPage;
