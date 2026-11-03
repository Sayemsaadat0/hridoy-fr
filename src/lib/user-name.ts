import { randomBytes } from "node:crypto";

/** `{random}{local-part}` e.g. john@mail.com → a1b2c3john */
export function generateUserName(email: string): string {
  const localPart = email.split("@")[0]?.replace(/[^a-zA-Z0-9._-]/g, "") || "user";
  const random = randomBytes(3).toString("hex");
  return `${random}${localPart}`;
}
