import path from "node:path";
import { env } from "@/lib/env";

export function isSwaggerEnabled(): boolean {
  const flag = process.env.ENABLE_SWAGGER;
  if (flag === "true") return true;
  if (flag === "false") return false;
  return env.nodeEnv !== "production";
}

export function getSwaggerUiDistDir(): string {
  return path.join(process.cwd(), "node_modules/swagger-ui-dist");
}
