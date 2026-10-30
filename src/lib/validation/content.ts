import { z } from "zod";
import { PROGRAM_LEVELS } from "@/models/program.model";
import { CONTACT_STATUSES } from "@/models/contact-message.model";
import { nonEmptyPartial, orderedContentFields } from "./common";

/** Empty strings from optional form inputs are stored as null. */
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .nullable()
    .transform((value) => (value ? value : null));

// ── Programs ────────────────────────────────────────────────────────────────
const programFields = {
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().min(1).max(1000),
  level: z.enum(PROGRAM_LEVELS),
  duration: z.string().trim().min(1).max(60),
  enrollmentCount: optionalText(20),
  ...orderedContentFields,
};

export const createProgramSchema = z.object({
  ...programFields,
  level: programFields.level.default("Beginner"),
  enrollmentCount: programFields.enrollmentCount.default(null),
  order: programFields.order.default(0),
  isPublished: programFields.isPublished.default(true),
});
export const updateProgramSchema = nonEmptyPartial(programFields);

// ── FAQs ────────────────────────────────────────────────────────────────────
const faqFields = {
  question: z.string().trim().min(1).max(300),
  answer: z.string().trim().min(1).max(3000),
  ...orderedContentFields,
};

export const createFaqSchema = z.object({
  ...faqFields,
  order: faqFields.order.default(0),
  isPublished: faqFields.isPublished.default(true),
});
export const updateFaqSchema = nonEmptyPartial(faqFields);

// ── Gallery ─────────────────────────────────────────────────────────────────
const galleryItemFields = {
  title: z.string().trim().min(1).max(120),
  description: optionalText(500),
  ...orderedContentFields,
};

export const createGalleryItemSchema = z.object({
  ...galleryItemFields,
  description: galleryItemFields.description.default(null),
  order: galleryItemFields.order.default(0),
  isPublished: galleryItemFields.isPublished.default(true),
});
export const updateGalleryItemSchema = nonEmptyPartial(galleryItemFields);

// ── Contact messages ────────────────────────────────────────────────────────
const BANGLA_DIGITS = "০১২৩৪৫৬৭৮৯";

/** Accepts Bangla or ASCII digits, spaces and dashes; stores `01XXXXXXXXX`. */
const bdPhoneSchema = z
  .string()
  .trim()
  .transform((value) =>
    value
      .replace(/[০-৯]/g, (digit) => String(BANGLA_DIGITS.indexOf(digit)))
      .replace(/[\s-]/g, "")
      .replace(/^\+?88(?=01)/, "")
  )
  .refine((value) => /^01[3-9]\d{8}$/.test(value), {
    message: "Must be a Bangladeshi mobile number like 01XXXXXXXXX",
  });

export const createContactMessageSchema = z.object({
  firstName: z.string().trim().min(1).max(60),
  lastName: z.string().trim().min(1).max(60),
  email: z
    .string()
    .trim()
    .email()
    .max(254)
    .transform((value) => value.toLowerCase()),
  phone: bdPhoneSchema,
  subject: z.string().trim().min(1).max(200),
  details: z.string().trim().min(1).max(5000),
});

export const updateContactMessageSchema = z.object({
  status: z.enum(CONTACT_STATUSES),
});

export const listContactMessagesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  q: z.string().trim().min(1).max(100).optional(),
  status: z.enum(CONTACT_STATUSES).optional(),
});
