import { NextResponse } from "next/server";
import { authCookieOptions } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(authCookieOptions.name, "", { ...authCookieOptions, maxAge: 0 });
  return response;
}
