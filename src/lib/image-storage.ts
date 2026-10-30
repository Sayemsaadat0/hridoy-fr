import { env } from "@/lib/env";

/**
 * Image storage on ImageKit (server-side only).
 * Docs: https://imagekit.io/docs/api-reference/upload-file/upload-file
 */
const UPLOAD_URL = "https://upload.imagekit.io/api/v1/files/upload";
const FILES_API_URL = "https://api.imagekit.io/v1/files";
const REQUEST_TIMEOUT_MS = 30_000;
/** All uploads from this app live under one folder so they're easy to find in the dashboard. */
const ROOT_FOLDER = "/hridoy-fr";

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

/** Allowed image types, detected from the file's first bytes rather than the client-sent MIME type. */
const SIGNATURES: { mime: string; extension: string; matches: (bytes: Uint8Array) => boolean }[] = [
  { mime: "image/jpeg", extension: "jpg", matches: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  {
    mime: "image/png",
    extension: "png",
    matches: (b) => [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((v, i) => b[i] === v),
  },
  { mime: "image/gif", extension: "gif", matches: (b) => String.fromCharCode(...b.slice(0, 4)) === "GIF8" },
  {
    mime: "image/webp",
    extension: "webp",
    matches: (b) =>
      String.fromCharCode(...b.slice(0, 4)) === "RIFF" && String.fromCharCode(...b.slice(8, 12)) === "WEBP",
  },
];

export function detectImageType(bytes: Uint8Array) {
  return SIGNATURES.find((signature) => signature.matches(bytes)) ?? null;
}

/** `status` is the HTTP status our API should answer with. */
export class ImageUploadError extends Error {
  constructor(
    message: string,
    readonly status: 400 | 413 | 415 | 502 | 504
  ) {
    super(message);
    this.name = "ImageUploadError";
  }
}

export interface StoredImage {
  url: string;
  /** Needed to delete the file later. */
  fileId: string;
}

function authHeader(): string {
  // ImageKit uses HTTP Basic auth: private key as the username, empty password.
  return `Basic ${Buffer.from(`${env.imagekitPrivateKey}:`).toString("base64")}`;
}

/** Safe, short file name: ASCII slug of the original name plus the detected extension. */
function toFileName(originalName: string, extension: string): string {
  const base = originalName
    .replace(/\.[^.]+$/, "")
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `${base || "image"}.${extension}`;
}

/**
 * Validates an image file and uploads it to ImageKit under `/hridoy-fr/<folder>`.
 * ImageKit appends a unique suffix, so names never collide.
 */
export async function uploadImage(
  file: Blob,
  originalName: string,
  folder: string,
  /** Admin uploads use the 5 MB default; one-off scripts may allow more (ImageKit free plan: 25 MB). */
  maxBytes = MAX_IMAGE_BYTES
): Promise<StoredImage> {
  if (file.size === 0) throw new ImageUploadError("image: The file is empty", 400);
  if (file.size > maxBytes) {
    throw new ImageUploadError(`image: Must be ${Math.round(maxBytes / 1024 / 1024)} MB or smaller`, 413);
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const type = detectImageType(bytes);
  if (!type) {
    throw new ImageUploadError("image: Only JPEG, PNG, WebP or GIF images are allowed", 415);
  }

  const form = new FormData();
  form.set("file", new Blob([bytes], { type: type.mime }), "upload");
  form.set("fileName", toFileName(originalName, type.extension));
  form.set("folder", `${ROOT_FOLDER}/${folder}`);
  form.set("useUniqueFileName", "true");

  let response: Response;
  try {
    response = await fetch(UPLOAD_URL, {
      method: "POST",
      headers: { Authorization: authHeader() },
      body: form,
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "TimeoutError";
    console.error("[image-storage] upload request failed", timedOut ? "timeout" : error);
    throw timedOut
      ? new ImageUploadError("Image upload timed out. Try again.", 504)
      : new ImageUploadError("Could not reach the image service.", 502);
  }

  const body = (await response.json().catch(() => null)) as { url?: string; fileId?: string; message?: string } | null;
  if (!response.ok || !body?.url || !body.fileId) {
    console.error("[image-storage] upload rejected", response.status, body?.message ?? "non-JSON response");
    throw new ImageUploadError(
      response.status >= 500
        ? "The image service is unavailable right now. Try again in a few minutes."
        : "The image service rejected the upload.",
      502
    );
  }

  return { url: body.url, fileId: body.fileId };
}

/**
 * Deletes a stored image. Best effort: a failure is logged, never thrown, because the
 * record change it follows has already succeeded. A 404 means it's already gone.
 */
export async function deleteImage(fileId: string | null | undefined): Promise<void> {
  if (!fileId) return;
  try {
    const response = await fetch(`${FILES_API_URL}/${encodeURIComponent(fileId)}`, {
      method: "DELETE",
      headers: { Authorization: authHeader() },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!response.ok && response.status !== 404) {
      console.error("[image-storage] delete failed", fileId, response.status);
    }
  } catch (error) {
    console.error("[image-storage] delete request failed", fileId, error);
  }
}

