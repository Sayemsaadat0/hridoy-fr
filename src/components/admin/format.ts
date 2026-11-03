/** Notice dates are calendar days stored as UTC midnight, so format them in UTC. */
export function formatDay(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Dhaka",
  });
}

export function toDateInputValue(iso: string): string {
  return iso.slice(0, 10);
}

export function todayDateInputValue(): string {
  // Asia/Dhaka calendar day, matching how notice dates are interpreted on the server.
  return new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

/** Converts a form string to an integer, falling back when empty or invalid. */
export function toInt(value: unknown, fallback = 0): number {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export const str = (value: unknown): string => (typeof value === "string" ? value : "");
