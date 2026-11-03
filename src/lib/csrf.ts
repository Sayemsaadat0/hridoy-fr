import { NextResponse } from "next/server";
import { fail } from "@/lib/api-response";

/**
 * Cookie-based sessions are vulnerable to CSRF on state-changing requests.
 * SameSite=Lax on the session cookie already blocks cross-site fetch/XHR/form
 * POSTs in modern browsers, but this adds an explicit same-origin check as a
 * second layer (defense in depth, and coverage for older browsers).
 */
export function assertSameOrigin(request: Request): NextResponse | null {
  const origin = request.headers.get("origin");

  if (!origin) {
    return null;
  }

  const requestUrl = new URL(request.url);
  const originUrl = new URL(origin);

  if (originUrl.origin !== requestUrl.origin) {
    return fail("Cross-origin request denied", 403);
  }

  return null;
}
