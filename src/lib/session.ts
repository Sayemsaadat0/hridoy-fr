import { connectDB } from "@/lib/db";
import { User } from "@/models/user.model";
import { type SessionPayload, verifySessionToken } from "@/lib/auth";

/**
 * Node-runtime only (uses mongoose) — do not import from middleware.ts.
 * Verifies JWT signature/expiry AND that it hasn't been revoked by a later
 * logout (tokenVersion bump).
 */
export async function verifyCurrentSession(token: string): Promise<SessionPayload | null> {
  const session = await verifySessionToken(token);
  if (!session) return null;

  await connectDB();
  const user = await User.findById(session.sub).select("tokenVersion role email name");
  if (!user || user.tokenVersion !== session.tokenVersion) return null;

  return {
    ...session,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}

export async function revokeUserSessions(userId: string): Promise<void> {
  await connectDB();
  await User.findByIdAndUpdate(userId, { $inc: { tokenVersion: 1 } });
}
