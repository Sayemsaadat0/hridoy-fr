import { expect, test as setup } from "@playwright/test";

const STORAGE_STATE = "e2e/.auth/admin.json";

// Logs in once and shares the session with every test (login is rate limited to 5 tries / 15 min).
setup("sign in as admin", async ({ page }) => {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error("Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in .env to run the E2E tests");
  }

  await page.goto("/admin/login");
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/password/i).fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page).toHaveURL(/\/admin$/);
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();

  await page.context().storageState({ path: STORAGE_STATE });
});
