import "dotenv/config";
import mongoose from "mongoose";
import { User } from "../src/models/user.model";
import { hashPassword } from "../src/lib/password";
import { generateUserName } from "../src/lib/user-name";
import { env } from "../src/lib/env";

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD before running this script"
    );
  }

  const name = process.env.SEED_ADMIN_NAME ?? generateUserName(email);

  await mongoose.connect(env.mongoUri);

  const passwordHash = await hashPassword(password);
  const admin = await User.findOneAndUpdate(
    { email },
    { email, passwordHash, name, role: "admin" },
    { upsert: true, returnDocument: "after" }
  );

  console.log(`Admin user ready: ${admin.email} (${admin.role})`);
  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
