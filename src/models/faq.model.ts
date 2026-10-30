import { Schema, model, models, type Document, type Model } from "mongoose";

export interface FaqDocument extends Document {
  question: string;
  answer: string;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const faqSchema = new Schema<FaqDocument>(
  {
    question: { type: String, required: true, trim: true, maxlength: 300 },
    answer: { type: String, required: true, trim: true, maxlength: 3000 },
    order: { type: Number, required: true, default: 0 },
    isPublished: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

faqSchema.index({ isPublished: 1, order: 1, createdAt: -1 });

export const Faq: Model<FaqDocument> = models.Faq ?? model<FaqDocument>("Faq", faqSchema);

export function toPublicFaq(faq: FaqDocument) {
  return {
    id: String(faq._id),
    question: faq.question,
    answer: faq.answer,
    order: faq.order,
    isPublished: faq.isPublished,
    createdAt: faq.createdAt,
    updatedAt: faq.updatedAt,
  };
}

export type PublicFaq = ReturnType<typeof toPublicFaq>;
