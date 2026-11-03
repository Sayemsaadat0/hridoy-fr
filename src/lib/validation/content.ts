import { z } from "zod";
import { PROGRAM_LEVELS } from "@/models/program.model";
import { CONTACT_STATUSES } from "@/models/contact-message.model";
import { icons } from "lucide-react";
import { DEFAULT_ROUTINE_ICON, ROUTINE_LIMITS, ROUTINE_VARIANTS } from "@/models/routine.constants";
import { nonEmptyPartial, publishableContentFields } from "./common";

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
  ...publishableContentFields,
};

export const createProgramSchema = z.object({
  ...programFields,
  level: programFields.level.default("Beginner"),
  enrollmentCount: programFields.enrollmentCount.default(null),
  isPublished: programFields.isPublished.default(true),
});
export const updateProgramSchema = nonEmptyPartial(programFields);

// ── FAQs ────────────────────────────────────────────────────────────────────
const faqFields = {
  question: z.string().trim().min(1).max(300),
  answer: z.string().trim().min(1).max(3000),
  ...publishableContentFields,
};

export const createFaqSchema = z.object({
  ...faqFields,
  isPublished: faqFields.isPublished.default(true),
});
export const updateFaqSchema = nonEmptyPartial(faqFields);

// ── Gallery ─────────────────────────────────────────────────────────────────
const galleryItemFields = {
  title: z.string().trim().min(1).max(120),
  description: optionalText(500),
  ...publishableContentFields,
};

export const createGalleryItemSchema = z.object({
  ...galleryItemFields,
  description: galleryItemFields.description.default(null),
  isPublished: galleryItemFields.isPublished.default(true),
});
export const updateGalleryItemSchema = nonEmptyPartial(galleryItemFields);

// ── Routines ────────────────────────────────────────────────────────────────
const routineTimeSlotSchema = z.object({
  time: z.string().trim().min(1).max(ROUTINE_LIMITS.time),
  variant: z.enum(ROUTINE_VARIANTS).default("blue"),
});

const routineScheduleGroupSchema = z.object({
  days: z.string().trim().min(1).max(ROUTINE_LIMITS.days),
  timeSlots: z.array(routineTimeSlotSchema).min(1).max(ROUTINE_LIMITS.maxSlotsPerGroup),
});

const routineFields = {
  classTitle: z.string().trim().min(1).max(ROUTINE_LIMITS.classTitle),
  icon: z
    .string()
    .trim()
    .max(ROUTINE_LIMITS.icon)
    .refine((name) => Object.hasOwn(icons, name), { message: "Must be a Lucide icon name like BookOpen" }),
  /** Replaced as a whole on update. */
  scheduleGroups: z.array(routineScheduleGroupSchema).min(1).max(ROUTINE_LIMITS.maxGroups),
  ...publishableContentFields,
};

export const createRoutineSchema = z.object({
  ...routineFields,
  icon: routineFields.icon.default(DEFAULT_ROUTINE_ICON),
  isPublished: routineFields.isPublished.default(true),
});
export const updateRoutineSchema = nonEmptyPartial(routineFields);

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
