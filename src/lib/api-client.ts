/**
 * Browser-side fetch wrapper for our `{ status, data | message }` API envelope.
 * Throws `ApiError` with the server's message so callers can show it directly.
 */
export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface Paginated<T> {
  items: T[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

type ApiEnvelope<T> =
  | { status: "success"; data: T }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    credentials: "same-origin",
    headers: {
      // FormData bodies set their own multipart boundary header.
      ...(typeof init?.body === "string" ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });

  const body = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!response.ok || !body || body.status === "error") {
    const message = body && "message" in body ? body.message : `Request failed (${response.status})`;
    throw new ApiError(message, response.status);
  }

  return ("data" in body ? body.data : undefined) as T;
}

export function toQueryString(params: Record<string, string | number | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") search.set(key, String(value));
  }
  const query = search.toString();
  return query ? `?${query}` : "";
}
