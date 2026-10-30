import { Schema, model, models, type Document, type Model } from "mongoose";

export interface GalleryItemDocument extends Document {
  imageUrl: string;
  /** ImageKit file id, used to delete the file when replaced. Internal; not returned by the API. */
  imageFileId: string | null;
  title: string;
  description: string | null;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const galleryItemSchema = new Schema<GalleryItemDocument>(
  {
    imageUrl: { type: String, required: true, trim: true, maxlength: 500 },
    imageFileId: { type: String, default: null },
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, trim: true, maxlength: 500, default: null },
    order: { type: Number, required: true, default: 0 },
    isPublished: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

galleryItemSchema.index({ isPublished: 1, order: 1, createdAt: -1 });

export const GalleryItem: Model<GalleryItemDocument> =
  models.GalleryItem ?? model<GalleryItemDocument>("GalleryItem", galleryItemSchema);

export function toPublicGalleryItem(item: GalleryItemDocument) {
  return {
    id: String(item._id),
    imageUrl: item.imageUrl,
    title: item.title,
    description: item.description ?? null,
    order: item.order,
    isPublished: item.isPublished,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

export type PublicGalleryItem = ReturnType<typeof toPublicGalleryItem>;
