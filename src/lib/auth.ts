import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { env } from "@/lib/env";

export const AUTH_COOKIE_NAME = "admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 8; // 8 hours

export interface SessionPayload extends JWTPayload {
  sub: string;
  email: string;
  name: string;
}

function getSecretKey() {
  return new TextEncoder().encode(env.jwtSecret);
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

export const authCookieOptions = {
  name: AUTH_COOKIE_NAME,
  maxAge: SESSION_DURATION_SECONDS,
  httpOnly: true,
  secure: env.nodeEnv === "production",
  sameSite: "lax" as const,
  path: "/",
};
