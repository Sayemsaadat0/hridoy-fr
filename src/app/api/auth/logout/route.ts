import { authCookieOptions, getRequestToken, verifySessionToken } from "@/lib/auth";
import { assertSameOrigin } from "@/lib/csrf";
import { revokeAdminSessions } from "@/lib/session";
import { fail, okMessage } from "@/lib/api-response";

export async function POST(request: Request) {
  const originError = assertSameOrigin(request);
  if (originError) return originError;

  const token = getRequestToken(request);
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    return fail("Not authenticated", 401);
  }

  // Bump tokenVersion so this exact token is rejected everywhere from now on,
  // not just cleared from this browser's cookie jar.
  await revokeAdminSessions(session.sub);

  const response = okMessage("Logged out successfully");
  response.cookies.set(authCookieOptions.name, "", { ...authCookieOptions, maxAge: 0 });
  return response;
}
