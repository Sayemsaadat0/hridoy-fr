import { z } from "zod";
import { NOTICE_PRIORITIES, NOTICE_STATUSES } from "@/models/notice.model";

const noticeFields = {
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().min(1).max(5000),
  category: z.string().trim().min(1).max(60),
  priority: z.enum(NOTICE_PRIORITIES),
  date: z.coerce.date(),
  isPublished: z.boolean(),
};

export const createNoticeSchema = z.object({
  ...noticeFields,
  priority: noticeFields.priority.default("MEDIUM"),
  isPublished: noticeFields.isPublished.default(true),
});

export const updateNoticeSchema = z
  .object(noticeFields)
  .partial()
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required",
  });

export const listNoticesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  q: z.string().trim().min(1).max(100).optional(),
  category: z.string().trim().min(1).max(60).optional(),
  priority: z.enum(NOTICE_PRIORITIES).optional(),
  status: z.enum(NOTICE_STATUSES).optional(),
  /** Admin only. `all` includes drafts, `false` returns drafts only. Ignored for the public. */
  published: z.enum(["true", "false", "all"]).default("true"),
});
