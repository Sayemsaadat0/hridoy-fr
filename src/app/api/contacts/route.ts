import type { QueryFilter } from "mongoose";
import { connectDB } from "@/lib/db";
import { assertSameOrigin } from "@/lib/csrf";
import { requireAdmin } from "@/lib/require-auth";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { fail, ok } from "@/lib/api-response";
import { escapeRegex, formatZodError } from "@/lib/validation/common";
import {
  createContactMessageSchema,
  listContactMessagesQuerySchema,
} from "@/lib/validation/content";
import {
  ContactMessage,
  toPublicContactMessage,
  type ContactMessageDocument,
} from "@/models/contact-message.model";

const CONTACT_RATE_LIMIT = { limit: 5, windowSeconds: 15 * 60 };

/** Admin inbox. */
export async function GET(request: Request) {
  const auth = await requireAdmin(request);
  if (!auth.session) return auth.error;

  const params = Object.fromEntries(new URL(request.url).searchParams);
  const parsed = listContactMessagesQuerySchema.safeParse(params);
  if (!parsed.success) return fail("Invalid query parameters", 400);

  const { page, limit, q, status } = parsed.data;
  const filter: QueryFilter<ContactMessageDocument> = {};

  if (status) filter.status = status;
  if (q) {
    const pattern = new RegExp(escapeRegex(q), "i");
    filter.$or = ["firstName", "lastName", "email", "phone", "subject", "details"].map(
      (field) => ({ [field]: pattern })
    );
  }

  await connectDB();

  const [items, total] = await Promise.all([
    ContactMessage.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    ContactMessage.countDocuments(filter),
  ]);

  return ok({
    items: items.map(toPublicContactMessage),
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}

/** Public contact form submission. */
export async function POST(request: Request) {
  const originError = assertSameOrigin(request);
  if (originError) return originError;

  const rateLimit = checkRateLimit(`contact:${getClientIp(request)}`, CONTACT_RATE_LIMIT);
  if (!rateLimit.allowed) {
    return fail("Too many messages. Try again later.", 429, {
      "Retry-After": String(rateLimit.retryAfterSeconds),
    });
  }

  const body = await request.json().catch(() => null);
  const parsed = createContactMessageSchema.safeParse(body);
  if (!parsed.success) return fail(formatZodError(parsed.error), 400);

  await connectDB();
  const message = await ContactMessage.create(parsed.data);

  // Only echo the id back; the submitter has no reason to read the stored record.
  return ok({ id: String(message._id) }, 201);
}
