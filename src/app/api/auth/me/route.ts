import { getRequestToken } from "@/lib/auth";
import { verifyCurrentSession } from "@/lib/session";
import { fail, ok } from "@/lib/api-response";

export async function GET(request: Request) {
  const token = getRequestToken(request);
  if (!token) {
    return fail("Not authenticated", 401);
  }

  const session = await verifyCurrentSession(token);
  if (!session) {
    return fail("Not authenticated", 401);
  }

  return ok({
    id: session.sub,
    email: session.email,
    name: session.name,
  });
}
