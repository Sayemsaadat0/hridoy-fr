import { getRequestToken, type SessionPayload } from "@/lib/auth";
import { verifyCurrentSession } from "@/lib/session";
import { fail } from "@/lib/api-response";
import type { NextResponse } from "next/server";

type AuthSuccess = { session: SessionPayload; error?: never };
type AuthFailure = { session: null; error: NextResponse };

/**
 * Use this at the top of any protected API route:
 *
 *   const auth = await requireAuth(request);
 *   if (!auth.session) return auth.error;
 */
export async function requireAuth(request: Request): Promise<AuthSuccess | AuthFailure> {
  const token = getRequestToken(request);
  if (!token) {
    return { session: null, error: fail("Not authenticated", 401) };
  }

  const session = await verifyCurrentSession(token);
  if (!session) {
    return { session: null, error: fail("Not authenticated", 401) };
  }

  return { session };
}

/** Same as requireAuth, then rejects anyone whose role is not admin. */
export async function requireAdmin(request: Request): Promise<AuthSuccess | AuthFailure> {
  const auth = await requireAuth(request);
  if (!auth.session) return auth;

  if (auth.session.role !== "admin") {
    return { session: null, error: fail("Forbidden", 403) };
  }

  return auth;
}
