import "dotenv/config";
import mongoose from "mongoose";
import { Admin } from "../src/models/admin.model";
import { hashPassword } from "../src/lib/password";
import { env } from "../src/lib/env";

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  const name = process.env.SEED_ADMIN_NAME ?? "Admin";

  if (!email || !password) {
    throw new Error(
      "Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD before running this script"
    );
  }

  await mongoose.connect(env.mongoUri);

  const passwordHash = await hashPassword(password);
  const admin = await Admin.findOneAndUpdate(
    { email },
    { email, passwordHash, name },
    { upsert: true, new: true }
  );

  console.log(`Admin user ready: ${admin.email}`);
  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
