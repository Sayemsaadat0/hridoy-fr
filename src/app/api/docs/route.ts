import { NextResponse } from "next/server";
import { openApiSpec } from "@/lib/openapi/spec";
import { isSwaggerEnabled } from "@/lib/swagger";
import { fail } from "@/lib/api-response";

export const runtime = "nodejs";

export function GET() {
  if (!isSwaggerEnabled()) {
    return fail("Not found", 404);
  }

  return NextResponse.json(openApiSpec);
}
