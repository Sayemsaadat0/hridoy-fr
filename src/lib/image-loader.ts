import type { ImageLoaderProps } from "next/image";
import { isImageKitUrl, resizedImageUrl } from "./image-url";

const DEFAULT_QUALITY = 75;

/**
 * Global `next/image` loader (see `images.loaderFile` in next.config.ts).
 *
 * ImageKit URLs are resized by ImageKit, so Vercel's Image Optimization (and its quota)
 * is never used. Every other src, such as files in /public or external links, is served as-is;
 * the `w` query param only gives each srcset entry a unique URL and is ignored by the host.
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  if (isImageKitUrl(src)) return resizedImageUrl(src, width, quality ?? DEFAULT_QUALITY);
  return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
}
