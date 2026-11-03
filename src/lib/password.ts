import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

let dummyHashPromise: Promise<string> | null = null;

function getDummyPasswordHash(): Promise<string> {
  if (!dummyHashPromise) {
    dummyHashPromise = hashPassword("timing-safe-dummy-value");
  }
  return dummyHashPromise;
}

void getDummyPasswordHash();

/** Always runs a bcrypt compare so missing users don't return faster than real ones. */
export async function verifyPasswordOrDummy(
  plain: string,
  hash: string | null | undefined
): Promise<boolean> {
  return verifyPassword(plain, hash ?? (await getDummyPasswordHash()));
}
