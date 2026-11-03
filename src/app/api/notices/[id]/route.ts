import { isValidObjectId } from "mongoose";
import { connectDB } from "@/lib/db";
import { assertSameOrigin } from "@/lib/csrf";
import { requireAdmin } from "@/lib/require-auth";
import { fail, ok, okMessage } from "@/lib/api-response";
import { updateNoticeSchema } from "@/lib/validation/notice";
import { Notice, toPublicNotice } from "@/models/notice.model";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: RouteContext) {
  const { id } = await params;
  if (!isValidObjectId(id)) return fail("Notice not found", 404);

  await connectDB();
  const notice = await Notice.findById(id);
  if (!notice) return fail("Notice not found", 404);

  // Drafts are only visible to admins; respond 404 so their existence isn't leaked.
  if (!notice.isPublished && (await requireAdmin(request)).session === null) {
    return fail("Notice not found", 404);
  }

  return ok(toPublicNotice(notice));
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const originError = assertSameOrigin(request);
  if (originError) return originError;

  const auth = await requireAdmin(request);
  if (!auth.session) return auth.error;

  const { id } = await params;
  if (!isValidObjectId(id)) return fail("Notice not found", 404);

  const body = await request.json().catch(() => null);
  const parsed = updateNoticeSchema.safeParse(body);
  if (!parsed.success) {
    return fail(parsed.error.issues.map((i) => `${i.path.join(".") || "body"}: ${i.message}`).join("; "), 400);
  }

  await connectDB();
  const notice = await Notice.findByIdAndUpdate(id, parsed.data, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!notice) return fail("Notice not found", 404);

  return ok(toPublicNotice(notice));
}

export async function DELETE(request: Request, { params }: RouteContext) {
  const originError = assertSameOrigin(request);
  if (originError) return originError;

  const auth = await requireAdmin(request);
  if (!auth.session) return auth.error;

  const { id } = await params;
  if (!isValidObjectId(id)) return fail("Notice not found", 404);

  await connectDB();
  const deleted = await Notice.findByIdAndDelete(id);
  if (!deleted) return fail("Notice not found", 404);

  return okMessage("Notice deleted");
}
