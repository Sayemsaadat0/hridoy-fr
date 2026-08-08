import { connectDB } from "@/lib/db";
import { Admin } from "@/models/admin.model";
import { type SessionPayload, verifySessionToken } from "@/lib/auth";

/**
 * Node-runtime only (uses mongoose) — do not import from middleware.ts.
 * Verifies JWT signature/expiry AND that it hasn't been revoked by a later
 * logout (tokenVersion bump). This is what actually makes logout effective
 * for tokens held outside the cookie (e.g. an Authorization header).
 */
export async function verifyCurrentSession(token: string): Promise<SessionPayload | null> {
  const session = await verifySessionToken(token);
  if (!session) return null;

  await connectDB();
  const admin = await Admin.findById(session.sub).select("tokenVersion");
  if (!admin || admin.tokenVersion !== session.tokenVersion) return null;

  return session;
}

export async function revokeAdminSessions(adminId: string): Promise<void> {
  await connectDB();
  await Admin.findByIdAndUpdate(adminId, { $inc: { tokenVersion: 1 } });
}
