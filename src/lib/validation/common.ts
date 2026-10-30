import { z } from "zod";

/** `"title: Too small; date: Invalid date"` — the error format all write routes return. */
export function formatZodError(error: z.ZodError): string {
  return error.issues.map((i) => `${i.path.join(".") || "body"}: ${i.message}`).join("; ");
}

export function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Fields shared by admin-managed content that is shown on the public site in a manual order. */
export const orderedContentFields = {
  order: z.coerce.number().int().min(0).max(10_000),
  isPublished: z.boolean(),
};

export const listContentQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  q: z.string().trim().min(1).max(100).optional(),
  /** Admin only. `all` includes drafts, `false` returns drafts only. Ignored for the public. */
  published: z.enum(["true", "false", "all"]).default("true"),
});

export type ListContentQuery = z.infer<typeof listContentQuerySchema>;

/** Update schemas are partial but must change at least one field. */
export function nonEmptyPartial<T extends z.ZodRawShape>(shape: T) {
  return z
    .object(shape)
    .partial()
    .refine((value) => Object.keys(value).length > 0, {
      message: "At least one field is required",
    });
}
