import type { QueryFilter } from "mongoose";
import { connectDB } from "@/lib/db";
import { assertSameOrigin } from "@/lib/csrf";
import { requireAdmin } from "@/lib/require-auth";
import { fail, ok } from "@/lib/api-response";
import { createNoticeSchema, listNoticesQuerySchema } from "@/lib/validation/notice";
import {
  getDhakaToday,
  Notice,
  toPublicNotice,
  type NoticeDocument,
} from "@/models/notice.model";

const DAY_MS = 24 * 60 * 60 * 1000;

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(request: Request) {
  const params = Object.fromEntries(new URL(request.url).searchParams);
  const parsed = listNoticesQuerySchema.safeParse(params);
  if (!parsed.success) {
    return fail("Invalid query parameters", 400);
  }

  const { page, limit, q, category, priority, status, published } = parsed.data;

  const filter: QueryFilter<NoticeDocument> = {};

  // Drafts are only visible to admins; everyone else always gets published notices.
  const isAdmin = (await requireAdmin(request)).session !== null;
  if (!isAdmin || published === "true") filter.isPublished = true;
  else if (published === "false") filter.isPublished = false;

  if (category) filter.category = category;
  if (priority) filter.priority = priority;
  if (q) {
    const pattern = new RegExp(escapeRegex(q), "i");
    filter.$or = [{ title: pattern }, { description: pattern }];
  }
  if (status) {
    const today = getDhakaToday();
    if (status === "Expired") filter.date = { $lt: today };
    else if (status === "Active") filter.date = { $gte: today, $lt: new Date(today.getTime() + DAY_MS) };
    else filter.date = { $gte: new Date(today.getTime() + DAY_MS) };
  }

  await connectDB();

  const [items, total] = await Promise.all([
    Notice.find(filter)
      .sort({ date: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Notice.countDocuments(filter),
  ]);

  return ok({
    items: items.map(toPublicNotice),
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}

export async function POST(request: Request) {
  const originError = assertSameOrigin(request);
  if (originError) return originError;

  const auth = await requireAdmin(request);
  if (!auth.session) return auth.error;

  const body = await request.json().catch(() => null);
  const parsed = createNoticeSchema.safeParse(body);
  if (!parsed.success) {
    return fail(parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "), 400);
  }

  await connectDB();
  const notice = await Notice.create(parsed.data);

  return ok(toPublicNotice(notice), 201);
}
