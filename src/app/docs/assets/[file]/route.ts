import path from "node:path";
import { readFile } from "node:fs/promises";
import { fail } from "@/lib/api-response";
import { getSwaggerUiDistDir, isSwaggerEnabled } from "@/lib/swagger";

export const runtime = "nodejs";

const ASSETS: Record<string, string> = {
  "swagger-ui.css": "text/css; charset=utf-8",
  "swagger-ui-bundle.js": "application/javascript; charset=utf-8",
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ file: string }> }
) {
  if (!isSwaggerEnabled()) {
    return fail("Not found", 404);
  }

  const { file } = await context.params;
  const contentType = ASSETS[file];
  if (!contentType) {
    return fail("Not found", 404);
  }

  const filePath = path.join(getSwaggerUiDistDir(), file);
  const body = await readFile(filePath);

  return new Response(body, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
