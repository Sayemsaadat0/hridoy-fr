import { requireAuth } from "@/lib/require-auth";
import { ok } from "@/lib/api-response";

export async function GET(request: Request) {
  const auth = await requireAuth(request);
  if (!auth.session) return auth.error;

  return ok({
    id: auth.session.sub,
    email: auth.session.email,
    name: auth.session.name,
    role: auth.session.role,
  });
}
