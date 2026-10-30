const IMAGEKIT_HOST = "ik.imagekit.io";

/**
 * Asks ImageKit to resize on the fly (`?tr=w-<width>`) so thumbnails don't download
 * full-size photos. Safe in client and server code; other URLs are returned unchanged.
 */
export function resizedImageUrl(url: string, width: number): string {
  try {
    if (new URL(url).hostname !== IMAGEKIT_HOST) return url;
  } catch {
    return url;
  }
  return `${url}${url.includes("?") ? "&" : "?"}tr=w-${width}`;
}
