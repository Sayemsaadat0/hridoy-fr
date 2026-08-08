import { z } from "zod";
import { connectDB } from "@/lib/db";
import { Admin } from "@/models/admin.model";
import { verifyPassword } from "@/lib/password";
import { authCookieOptions, createSessionToken } from "@/lib/auth";
import { assertSameOrigin } from "@/lib/csrf";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { fail, ok } from "@/lib/api-response";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const LOGIN_RATE_LIMIT = { limit: 5, windowSeconds: 15 * 60 };

export async function POST(request: Request) {
  const originError = assertSameOrigin(request);
  if (originError) return originError;

  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return fail("Invalid email or password", 400);
  }

  const { email, password } = parsed.data;

  const rateLimitKey = `login:${getClientIp(request)}:${email.toLowerCase()}`;
  const rateLimit = checkRateLimit(rateLimitKey, LOGIN_RATE_LIMIT);
  if (!rateLimit.allowed) {
    return fail("Too many login attempts. Try again later.", 429, {
      "Retry-After": String(rateLimit.retryAfterSeconds),
    });
  }

  await connectDB();
  const admin = await Admin.findOne({ email }).select("+passwordHash");

  if (!admin) {
    return fail("Invalid credentials", 401);
  }

  const isValid = await verifyPassword(password, admin.passwordHash);
  if (!isValid) {
    return fail("Invalid credentials", 401);
  }

  const token = await createSessionToken({
    sub: admin.id,
    email: admin.email,
    name: admin.name,
    tokenVersion: admin.tokenVersion,
  });

  const response = ok({
    id: admin.id,
    email: admin.email,
    name: admin.name,
    token,
  });

  response.cookies.set(authCookieOptions.name, token, authCookieOptions);

  return response;
}
