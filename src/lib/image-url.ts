const IMAGEKIT_HOST = "ik.imagekit.io";

export function isImageKitUrl(url: string): boolean {
  try {
    return new URL(url).hostname === IMAGEKIT_HOST;
  } catch {
    return false;
  }
}

/**
 * Asks ImageKit to resize on the fly (`?tr=w-<width>,q-<quality>`) so thumbnails don't
 * download full-size photos. ImageKit also serves WebP/AVIF automatically when the browser
 * supports it. Safe in client and server code; other URLs are returned unchanged.
 */
export function resizedImageUrl(url: string, width: number, quality?: number): string {
  if (!isImageKitUrl(url)) return url;
  const transform = quality ? `w-${width},q-${quality}` : `w-${width}`;
  return `${url}${url.includes("?") ? "&" : "?"}tr=${transform}`;
}
