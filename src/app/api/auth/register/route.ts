import { z } from "zod";
import { connectDB } from "@/lib/db";
import { toPublicUser, User } from "@/models/user.model";
import { hashPassword } from "@/lib/password";
import { generateUserName } from "@/lib/user-name";
import { authCookieOptions, createSessionToken } from "@/lib/auth";
import { assertSameOrigin } from "@/lib/csrf";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { fail, ok } from "@/lib/api-response";

const registerSchema = z.object({
  email: z
    .string()
    .trim()
    .email()
    .transform((value) => value.toLowerCase()),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const REGISTER_RATE_LIMIT = { limit: 5, windowSeconds: 15 * 60 };

function isDuplicateKeyError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: number }).code === 11000
  );
}

export async function POST(request: Request) {
  const originError = assertSameOrigin(request);
  if (originError) return originError;

  const body = await request.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return fail("Invalid email or password", 400);
  }

  const { email, password } = parsed.data;

  const rateLimitKey = `register:${getClientIp(request)}`;
  const rateLimit = checkRateLimit(rateLimitKey, REGISTER_RATE_LIMIT);
  if (!rateLimit.allowed) {
    return fail("Too many registration attempts. Try again later.", 429, {
      "Retry-After": String(rateLimit.retryAfterSeconds),
    });
  }

  await connectDB();

  const existing = await User.findOne({ email }).select("_id");
  if (existing) {
    return fail("Email already in use", 409);
  }

  try {
    const user = await User.create({
      email,
      passwordHash: await hashPassword(password),
      name: generateUserName(email),
      role: "user",
    });

    const token = await createSessionToken({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      tokenVersion: user.tokenVersion,
    });

    const response = ok({ ...toPublicUser(user), token }, 201);
    response.cookies.set(authCookieOptions.name, token, authCookieOptions);
    return response;
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      return fail("Email already in use", 409);
    }
    throw error;
  }
}
