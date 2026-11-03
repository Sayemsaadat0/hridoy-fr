import { expect, type APIRequestContext, type Page } from "@playwright/test";

export const E2E_PREFIX = "E2E";

/** Unique, recognizable label so parallel runs and leftovers never collide. */
export function uniqueLabel(name: string): string {
  return `${E2E_PREFIX} ${name} ${Date.now().toString(36)}`;
}

/** Opens the add/edit dialog form, scoped so field labels don't clash with the page's search box. */
export function dialog(page: Page) {
  return page.getByRole("dialog");
}

export function row(page: Page, text: string) {
  return page.getByRole("row").filter({ hasText: text });
}

/** A card in a grid-style admin list (e.g. the gallery). */
export function card(page: Page, text: string) {
  return page.getByRole("main").getByRole("listitem").filter({ hasText: text });
}

export async function expectToast(page: Page, text: string | RegExp, timeout?: number) {
  await expect(page.locator("[data-sonner-toast]").filter({ hasText: text }).first()).toBeVisible({ timeout });
}

/** Removes every record whose text fields start with the E2E prefix, even if a test failed midway. */
export async function cleanupE2eRecords(request: APIRequestContext) {
  const resources = [
    { endpoint: "/api/faqs", params: "published=all" },
    { endpoint: "/api/programs", params: "published=all" },
    { endpoint: "/api/gallery", params: "published=all" },
    { endpoint: "/api/notices", params: "published=all" },
    { endpoint: "/api/routines", params: "published=all" },
    { endpoint: "/api/contacts", params: "" },
  ];

  for (const { endpoint, params } of resources) {
    const response = await request.get(`${endpoint}?q=${E2E_PREFIX}&limit=100&${params}`);
    if (!response.ok()) continue;
    const body = (await response.json()) as { data: { items: { id: string }[] } };
    for (const item of body.data.items) {
      await request.delete(`${endpoint}/${item.id}`);
    }
  }
}
