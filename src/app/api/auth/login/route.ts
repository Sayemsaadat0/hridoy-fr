import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { Admin } from "@/models/admin.model";
import { verifyPassword } from "@/lib/password";
import { authCookieOptions, createSessionToken } from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
  }

  const { email, password } = parsed.data;

  await connectDB();
  const admin = await Admin.findOne({ email }).select("+passwordHash");

  if (!admin) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const isValid = await verifyPassword(password, admin.passwordHash);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await createSessionToken({
    sub: admin.id,
    email: admin.email,
    name: admin.name,
  });

  const response = NextResponse.json({
    id: admin.id,
    email: admin.email,
    name: admin.name,
  });

  response.cookies.set(authCookieOptions.name, token, authCookieOptions);

  return response;
}
