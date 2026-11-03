import { isValidObjectId } from "mongoose";
import { connectDB } from "@/lib/db";
import { assertSameOrigin } from "@/lib/csrf";
import { requireAdmin } from "@/lib/require-auth";
import { fail, ok, okMessage } from "@/lib/api-response";
import { formatZodError } from "@/lib/validation/common";
import { updateContactMessageSchema } from "@/lib/validation/content";
import { ContactMessage, toPublicContactMessage } from "@/models/contact-message.model";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: RouteContext) {
  const auth = await requireAdmin(request);
  if (!auth.session) return auth.error;

  const { id } = await params;
  if (!isValidObjectId(id)) return fail("Message not found", 404);

  await connectDB();
  const message = await ContactMessage.findById(id);
  if (!message) return fail("Message not found", 404);

  return ok(toPublicContactMessage(message));
}

/** Only `status` is editable; the submitted content is kept as received. */
export async function PATCH(request: Request, { params }: RouteContext) {
  const originError = assertSameOrigin(request);
  if (originError) return originError;

  const auth = await requireAdmin(request);
  if (!auth.session) return auth.error;

  const { id } = await params;
  if (!isValidObjectId(id)) return fail("Message not found", 404);

  const body = await request.json().catch(() => null);
  const parsed = updateContactMessageSchema.safeParse(body);
  if (!parsed.success) return fail(formatZodError(parsed.error), 400);

  await connectDB();
  const message = await ContactMessage.findByIdAndUpdate(id, parsed.data, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!message) return fail("Message not found", 404);

  return ok(toPublicContactMessage(message));
}

export async function DELETE(request: Request, { params }: RouteContext) {
  const originError = assertSameOrigin(request);
  if (originError) return originError;

  const auth = await requireAdmin(request);
  if (!auth.session) return auth.error;

  const { id } = await params;
  if (!isValidObjectId(id)) return fail("Message not found", 404);

  await connectDB();
  const deleted = await ContactMessage.findByIdAndDelete(id);
  if (!deleted) return fail("Message not found", 404);

  return okMessage("Message deleted");
}
