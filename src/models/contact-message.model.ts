import { Schema, model, models, type Document, type Model } from "mongoose";

export const CONTACT_STATUSES = ["NEW", "READ", "ARCHIVED"] as const;
export type ContactStatus = (typeof CONTACT_STATUSES)[number];

export interface ContactMessageDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  details: string;
  status: ContactStatus;
  createdAt: Date;
  updatedAt: Date;
}

const contactMessageSchema = new Schema<ContactMessageDocument>(
  {
    firstName: { type: String, required: true, trim: true, maxlength: 60 },
    lastName: { type: String, required: true, trim: true, maxlength: 60 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    subject: { type: String, required: true, trim: true, maxlength: 200 },
    details: { type: String, required: true, trim: true, maxlength: 5000 },
    status: { type: String, enum: CONTACT_STATUSES, required: true, default: "NEW" },
  },
  { timestamps: true }
);

// Admin inbox: filter by status, newest first.
contactMessageSchema.index({ status: 1, createdAt: -1 });
contactMessageSchema.index({ createdAt: -1 });

export const ContactMessage: Model<ContactMessageDocument> =
  models.ContactMessage ??
  model<ContactMessageDocument>("ContactMessage", contactMessageSchema);

export function toPublicContactMessage(message: ContactMessageDocument) {
  return {
    id: String(message._id),
    firstName: message.firstName,
    lastName: message.lastName,
    email: message.email,
    phone: message.phone,
    subject: message.subject,
    details: message.details,
    status: message.status,
    createdAt: message.createdAt,
    updatedAt: message.updatedAt,
  };
}

export type PublicContactMessage = ReturnType<typeof toPublicContactMessage>;
