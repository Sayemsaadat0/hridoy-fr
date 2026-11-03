import { authCookieOptions } from "@/lib/auth";
import { assertSameOrigin } from "@/lib/csrf";
import { requireAuth } from "@/lib/require-auth";
import { revokeUserSessions } from "@/lib/session";
import { okMessage } from "@/lib/api-response";

export async function POST(request: Request) {
  const originError = assertSameOrigin(request);
  if (originError) return originError;

  const auth = await requireAuth(request);
  if (!auth.session) return auth.error;

  await revokeUserSessions(auth.session.sub);

  const response = okMessage("Logged out successfully");
  response.cookies.set(authCookieOptions.name, "", { ...authCookieOptions, maxAge: 0 });
  return response;
}
