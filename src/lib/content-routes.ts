import { isValidObjectId, type Document, type Model, type QueryFilter, type UpdateQuery } from "mongoose";
import type { z } from "zod";
import { connectDB } from "@/lib/db";
import { assertSameOrigin } from "@/lib/csrf";
import { requireAdmin } from "@/lib/require-auth";
import { fail, ok, okMessage } from "@/lib/api-response";
import { escapeRegex, formatZodError, listContentQuerySchema } from "@/lib/validation/common";
import { deleteImage, ImageUploadError, MAX_IMAGE_BYTES, uploadImage } from "@/lib/image-storage";

interface OrderedContentDocument extends Document {
  order: number;
  isPublished: boolean;
}

interface ContentRoutesConfig<TDoc extends OrderedContentDocument, TPublic> {
  /** Singular, user-facing name used in messages, e.g. "Program". */
  label: string;
  model: Model<TDoc>;
  toPublic: (doc: TDoc) => TPublic;
  createSchema: z.ZodType<Record<string, unknown>>;
  updateSchema: z.ZodType<Record<string, unknown>>;
  /** Fields matched case-insensitively by `?q=`. */
  searchFields: string[];
  /**
   * When set, create/update take multipart/form-data with an `image` file (required on
   * create). The server uploads it to ImageKit and stores the URL and file id itself;
   * neither is ever accepted from the client.
   */
  image?: ImageConfig;
}

interface ImageConfig {
  /** Field holding the public image URL, e.g. "thumbnail". */
  urlField: string;
  /** Field holding the ImageKit file id, used to delete the file later. */
  fileIdField: string;
  /** ImageKit sub-folder, e.g. "programs". */
  folder: string;
}

type RouteContext = { params: Promise<{ id: string }> };

interface ParsedBody {
  fields: Record<string, unknown> | null;
  image: File | null;
}

// Multipart overhead on top of the image itself.
const MAX_MULTIPART_BYTES = MAX_IMAGE_BYTES + 64 * 1024;

/** Reads JSON, or multipart fields + the `image` file. Multipart values are strings, so booleans are restored. */
async function readBody(request: Request): Promise<ParsedBody> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.startsWith("multipart/form-data")) {
    return { fields: await request.json().catch(() => null), image: null };
  }

  const form = await request.formData().catch(() => null);
  if (!form) return { fields: null, image: null };

  const fields: Record<string, unknown> = {};
  let image: File | null = null;
  for (const [key, value] of form.entries()) {
    if (typeof value !== "string") {
      if (key === "image" && value.size > 0) image = value;
      continue;
    }
    fields[key] = key === "isPublished" ? value === "true" : value;
  }
  return { fields, image };
}

/**
 * Route handlers for admin-managed content that the public site lists in a manual
 * `order`, with drafts hidden from non-admins. Used by programs, FAQs and gallery.
 *
 *   const routes = createContentRoutes({ ... });
 *   export const { GET, POST } = routes.collection;   // app/api/<x>/route.ts
 *   export const { GET, PATCH, DELETE } = routes.item; // app/api/<x>/[id]/route.ts
 */
export function createContentRoutes<TDoc extends OrderedContentDocument, TPublic>(
  config: ContentRoutesConfig<TDoc, TPublic>
) {
  const { label, model, toPublic, createSchema, updateSchema, searchFields, image: imageConfig } = config;
  const notFound = () => fail(`${label} not found`, 404);

  /** Uploads after the text fields validated, so a bad form never costs an upload. */
  async function uploadFor(file: File) {
    const stored = await uploadImage(file, file.name, imageConfig!.folder);
    return {
      fileId: stored.fileId,
      fields: { [imageConfig!.urlField]: stored.url, [imageConfig!.fileIdField]: stored.fileId },
    };
  }

  /**
   * Deletes a stored file once the record no longer references it. Awaited rather than
   * deferred with after(): deferred work was silently dropped in testing, and serverless
   * hosts may freeze the function once the response is sent. Never throws.
   */
  async function deleteStoredImage(fileId: unknown) {
    if (typeof fileId === "string" && fileId) await deleteImage(fileId);
  }

  async function list(request: Request) {
    const params = Object.fromEntries(new URL(request.url).searchParams);
    const parsed = listContentQuerySchema.safeParse(params);
    if (!parsed.success) return fail("Invalid query parameters", 400);

    const { page, limit, q, published } = parsed.data;
    const filter: QueryFilter<OrderedContentDocument> = {};

    // Drafts are only visible to admins; everyone else always gets published items.
    const isAdmin = (await requireAdmin(request)).session !== null;
    if (!isAdmin || published === "true") filter.isPublished = true;
    else if (published === "false") filter.isPublished = false;

    if (q) {
      const pattern = new RegExp(escapeRegex(q), "i");
      filter.$or = searchFields.map((field) => ({ [field]: pattern }));
    }

    await connectDB();

    const [items, total] = await Promise.all([
      model
        .find(filter as QueryFilter<TDoc>)
        .sort({ order: 1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      model.countDocuments(filter as QueryFilter<TDoc>),
    ]);

    return ok({
      items: items.map(toPublic),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  }

  async function create(request: Request) {
    const originError = assertSameOrigin(request);
    if (originError) return originError;

    const auth = await requireAdmin(request);
    if (!auth.session) return auth.error;

    if (Number(request.headers.get("content-length") ?? 0) > MAX_MULTIPART_BYTES) {
      return fail("image: Must be 5 MB or smaller", 413);
    }

    const { fields, image } = await readBody(request);
    const parsed = createSchema.safeParse(fields);
    if (!parsed.success) return fail(formatZodError(parsed.error), 400);
    if (imageConfig && !image) return fail("image: An image file is required", 400);

    let upload: Awaited<ReturnType<typeof uploadFor>> | null = null;
    try {
      if (image && imageConfig) upload = await uploadFor(image);
      await connectDB();
      const doc = await new model({ ...parsed.data, ...upload?.fields }).save();
      return ok(toPublic(doc), 201);
    } catch (error) {
      // Don't leave an orphaned file behind if saving the record failed.
      await deleteStoredImage(upload?.fileId);
      if (error instanceof ImageUploadError) return fail(error.message, error.status);
      throw error;
    }
  }

  async function getOne(request: Request, { params }: RouteContext) {
    const { id } = await params;
    if (!isValidObjectId(id)) return notFound();

    await connectDB();
    const doc = await model.findById(id);
    if (!doc) return notFound();

    // Respond 404 for drafts so their existence isn't leaked.
    if (!doc.isPublished && (await requireAdmin(request)).session === null) {
      return notFound();
    }

    return ok(toPublic(doc));
  }

  async function update(request: Request, { params }: RouteContext) {
    const originError = assertSameOrigin(request);
    if (originError) return originError;

    const auth = await requireAdmin(request);
    if (!auth.session) return auth.error;

    const { id } = await params;
    if (!isValidObjectId(id)) return notFound();

    if (Number(request.headers.get("content-length") ?? 0) > MAX_MULTIPART_BYTES) {
      return fail("image: Must be 5 MB or smaller", 413);
    }

    const { fields, image } = await readBody(request);

    // A new image on its own is a valid update; otherwise at least one field must change.
    const imageOnly = Boolean(imageConfig && image) && fields !== null && Object.keys(fields).length === 0;
    const parsed = imageOnly ? { success: true as const, data: {} } : updateSchema.safeParse(fields);
    if (!parsed.success) return fail(formatZodError(parsed.error), 400);

    await connectDB();
    // Load first so a missing record doesn't cost an upload, and to know which old file to delete.
    const existing = await model.findById(id);
    if (!existing) return notFound();

    let upload: Awaited<ReturnType<typeof uploadFor>> | null = null;
    try {
      if (image && imageConfig) upload = await uploadFor(image);
      const doc = await model.findByIdAndUpdate(
        id,
        { ...parsed.data, ...upload?.fields } as UpdateQuery<TDoc>,
        { returnDocument: "after", runValidators: true }
      );
      if (!doc) {
        await deleteStoredImage(upload?.fileId);
        return notFound();
      }
      // The new image is saved; the replaced one is no longer referenced.
      if (upload && imageConfig) await deleteStoredImage(existing.get(imageConfig.fileIdField));
      return ok(toPublic(doc));
    } catch (error) {
      await deleteStoredImage(upload?.fileId);
      if (error instanceof ImageUploadError) return fail(error.message, error.status);
      throw error;
    }
  }

  async function remove(request: Request, { params }: RouteContext) {
    const originError = assertSameOrigin(request);
    if (originError) return originError;

    const auth = await requireAdmin(request);
    if (!auth.session) return auth.error;

    const { id } = await params;
    if (!isValidObjectId(id)) return notFound();

    await connectDB();
    const deleted = await model.findByIdAndDelete(id);
    if (!deleted) return notFound();

    if (imageConfig) await deleteStoredImage(deleted.get(imageConfig.fileIdField));
    return okMessage(`${label} deleted`);
  }

  return {
    collection: { GET: list, POST: create },
    item: { GET: getOne, PATCH: update, DELETE: remove },
  };
}
