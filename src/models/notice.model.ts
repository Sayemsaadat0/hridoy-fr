import { Schema, model, models, type Document } from "mongoose";

export const NOTICE_PRIORITIES = ["HIGH", "MEDIUM", "LOW"] as const;
export type NoticePriority = (typeof NOTICE_PRIORITIES)[number];

/** Derived from `date`; never stored. */
export const NOTICE_STATUSES = ["Active", "Upcoming", "Expired"] as const;
export type NoticeStatus = (typeof NOTICE_STATUSES)[number];

export interface NoticeDocument extends Document {
  title: string;
  description: string;
  category: string;
  priority: NoticePriority;
  date: Date;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const noticeSchema = new Schema<NoticeDocument>(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true, trim: true, maxlength: 5000 },
    category: { type: String, required: true, trim: true, maxlength: 60 },
    priority: { type: String, enum: NOTICE_PRIORITIES, required: true, default: "MEDIUM" },
    date: { type: Date, required: true },
    isPublished: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

// Public list: published only, newest notice date first.
noticeSchema.index({ isPublished: 1, date: -1, createdAt: -1 });
noticeSchema.index({ category: 1 });

export const Notice = models.Notice ?? model<NoticeDocument>("Notice", noticeSchema);

// Notice dates are calendar days in Bangladesh time (UTC+6), stored as UTC midnight.
const DHAKA_OFFSET_MS = 6 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

/** Today's calendar day (Asia/Dhaka) as a UTC-midnight Date, comparable with `Notice.date`. */
export function getDhakaToday(now: Date = new Date()): Date {
  const shifted = now.getTime() + DHAKA_OFFSET_MS;
  return new Date(Math.floor(shifted / DAY_MS) * DAY_MS);
}

export function getNoticeStatus(date: Date, now: Date = new Date()): NoticeStatus {
  const today = getDhakaToday(now).getTime();
  const day = Math.floor(date.getTime() / DAY_MS) * DAY_MS;
  if (day < today) return "Expired";
  if (day === today) return "Active";
  return "Upcoming";
}

export function toPublicNotice(notice: NoticeDocument) {
  return {
    id: String(notice._id),
    title: notice.title,
    description: notice.description,
    category: notice.category,
    priority: notice.priority,
    date: notice.date,
    status: getNoticeStatus(notice.date),
    isPublished: notice.isPublished,
    createdAt: notice.createdAt,
    updatedAt: notice.updatedAt,
  };
}
