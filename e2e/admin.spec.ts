import { expect, test, type Page } from "@playwright/test";
import path from "node:path";
import { cleanupE2eRecords, dialog, expectToast, row, uniqueLabel } from "./helpers";

const TEST_IMAGE = path.join(__dirname, "fixtures", "pixel.png");
const IMAGEKIT_URL = /^https:\/\/ik\.imagekit\.io\//;
// Saves that upload to ImageKit wait on a third-party API.
const UPLOAD_TIMEOUT = 45_000;

test.afterAll(async ({ browser }) => {
  const context = await browser.newContext({ storageState: "e2e/.auth/admin.json" });
  await cleanupE2eRecords(context.request);
  await context.close();
});

async function deleteRow(page: Page, label: string) {
  await page.getByRole("button", { name: `Delete ${label}` }).click();
  await page.getByRole("alertdialog").getByRole("button", { name: "Delete" }).click();
  await expect(row(page, label)).toHaveCount(0);
}

function isoDayFromNow(days: number): string {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

test.describe("dashboard", () => {
  test("shows live counts and links to each section", async ({ page }) => {
    await page.goto("/admin");

    for (const label of ["Programs", "FAQs", "Notices", "Gallery photos", "Contact messages"]) {
      const card = page.getByRole("main").getByRole("link").filter({ hasText: label });
      await expect(card).toBeVisible();
      await expect(card).toContainText(/\d+/);
    }

    await page.getByRole("main").getByRole("link").filter({ hasText: "FAQs" }).click();
    await expect(page).toHaveURL(/\/admin\/faqs$/);
  });
});

test.describe("FAQs", () => {
  test("create, publish to home page, unpublish, delete", async ({ page }) => {
    const question = uniqueLabel("FAQ question");

    await page.goto("/admin/faqs");
    await page.getByRole("button", { name: "Add FAQ" }).click();
    await dialog(page).getByLabel("Question").fill(question);
    await dialog(page).getByLabel("Answer").fill("Created by the Playwright suite.");
    await dialog(page).getByLabel("Display order").fill("99");
    await dialog(page).getByRole("button", { name: "Create FAQ" }).click();

    await expectToast(page, "FAQ created");
    await expect(row(page, question)).toContainText("Published");

    await page.goto("/");
    await expect(page.getByText(question)).toBeVisible();

    // Unpublishing hides it from the public site but keeps it in the admin list.
    await page.goto("/admin/faqs");
    await page.getByRole("button", { name: `Edit ${question}` }).click();
    await dialog(page).getByRole("switch", { name: "Published" }).click();
    await dialog(page).getByRole("button", { name: "Save changes" }).click();
    await expectToast(page, "FAQ updated");
    await expect(row(page, question)).toContainText("Draft");

    await page.goto("/");
    await expect(page.getByText(question)).toHaveCount(0);

    await page.goto("/admin/faqs");
    await deleteRow(page, question);
    await expectToast(page, "FAQ deleted");
  });

  test("search filters the table", async ({ page }) => {
    await page.goto("/admin/faqs");
    await page.getByRole("searchbox", { name: "Search faqs" }).fill("no-such-faq-zzz");
    await expect(page.getByText("Nothing matches your search.")).toBeVisible();
  });
});

test.describe("Programs", () => {
  test("requires an image file, then creates, edits and deletes", async ({ page }) => {
    const title = uniqueLabel("Program");

    await page.goto("/admin/programs");
    await page.getByRole("button", { name: "Add Program" }).click();
    const form = dialog(page);
    await form.getByLabel("Title").fill(title);
    await form.getByLabel("Description").fill("Playwright program");
    await form.getByLabel("Level").selectOption("Advanced");
    await form.getByLabel("Duration").fill("৪ সপ্তাহ");
    await form.getByLabel("Enrolled students").fill("১২০");

    // No file chosen: blocked in the form before anything is sent.
    await form.getByRole("button", { name: "Create Program" }).click();
    await expect(form.getByRole("alert")).toContainText("Choose an image");

    await form.getByLabel("Thumbnail").setInputFiles(TEST_IMAGE);
    await expect(form.getByText("pixel.png")).toBeVisible();
    await form.getByRole("button", { name: "Create Program" }).click();
    await expectToast(page, "Program created", UPLOAD_TIMEOUT);
    await expect(row(page, title)).toContainText("Advanced");
    await expect(row(page, title)).toContainText("১২০");
    const firstUrl = await row(page, title).locator("img").getAttribute("src");
    expect(firstUrl).toMatch(IMAGEKIT_URL);

    await page.goto("/courses");
    await expect(page.getByText(title)).toBeVisible();

    // Editing text only keeps the existing image (sent as JSON, no upload).
    await page.goto("/admin/programs");
    await page.getByRole("button", { name: `Edit ${title}` }).click();
    await expect(dialog(page).getByRole("button", { name: "Replace image" })).toBeVisible();
    await dialog(page).getByLabel("Duration").fill("৬ সপ্তাহ");
    await dialog(page).getByRole("button", { name: "Save changes" }).click();
    await expectToast(page, "Program updated");
    await expect(row(page, title)).toContainText("৬ সপ্তাহ");
    await expect(row(page, title).locator("img")).toHaveAttribute("src", firstUrl!);

    // Replacing the file uploads a new image.
    await page.getByRole("button", { name: `Edit ${title}` }).click();
    await dialog(page).getByLabel("Thumbnail").setInputFiles(TEST_IMAGE);
    await dialog(page).getByRole("button", { name: "Save changes" }).click();
    await expectToast(page, "Program updated", UPLOAD_TIMEOUT);
    await expect(row(page, title).locator("img")).not.toHaveAttribute("src", firstUrl!);
    await expect(row(page, title).locator("img")).toHaveAttribute("src", IMAGEKIT_URL);

    await deleteRow(page, title);
  });
});

test.describe("Gallery", () => {
  test("uploads a photo that appears on the gallery page", async ({ page }) => {
    const title = uniqueLabel("Photo");

    await page.goto("/admin/gallery");
    await page.getByRole("button", { name: "Add Photo" }).click();
    await dialog(page).getByLabel("Photo").setInputFiles(TEST_IMAGE);
    await dialog(page).getByLabel("Title").fill(title);
    await dialog(page).getByLabel("Display order").fill("0"); // order 0 sorts first, so it shows on page 1 of the table
    await dialog(page).getByRole("button", { name: "Create Photo" }).click();
    await expectToast(page, "Photo created", UPLOAD_TIMEOUT);
    await expect(row(page, title).locator("img")).toHaveAttribute("src", IMAGEKIT_URL);

    await page.goto("/gallery");
    await expect(page.getByAltText(title).first()).toBeVisible();

    await page.goto("/admin/gallery");
    await deleteRow(page, title);
  });

  test("rejects non-image files and image URLs before contacting ImageKit", async ({ request }) => {
    const fake = await request.post("/api/gallery", {
      multipart: {
        title: "E2E fake",
        image: { name: "fake.png", mimeType: "image/png", buffer: Buffer.from("not an image") },
      },
    });
    expect(fake.status()).toBe(415);

    // Image URLs are never accepted from the client; a file is required.
    const urlOnly = await request.post("/api/gallery", {
      data: { title: "E2E url", imageUrl: "https://example.com/x.jpg" },
    });
    expect(urlOnly.status()).toBe(400);
    expect((await urlOnly.json()).message).toContain("image: An image file is required");
  });
});

test.describe("Notice", () => {
  test("creates an upcoming notice, filters by status, deletes it", async ({ page }) => {
    const title = uniqueLabel("Notice");

    await page.goto("/admin/notice");
    await page.getByRole("button", { name: "Add Notice" }).click();
    const form = dialog(page);
    await form.getByLabel("Title").fill(title);
    await form.getByLabel("Description").fill("Playwright notice");
    await form.getByLabel("Category").fill("পরীক্ষা");
    await form.getByLabel("Date").fill(isoDayFromNow(30));
    await form.getByLabel("Priority").selectOption("HIGH");
    await form.getByRole("button", { name: "Create Notice" }).click();
    await expectToast(page, "Notice created");
    await expect(row(page, title)).toContainText("Upcoming");

    await page.getByRole("combobox", { name: "Status" }).selectOption("Expired");
    await expect(row(page, title)).toHaveCount(0);
    await page.getByRole("combobox", { name: "Status" }).selectOption("Upcoming");
    await expect(row(page, title)).toBeVisible();

    await page.goto("/notice");
    await expect(page.getByText(title)).toBeVisible();

    await page.goto("/admin/notice");
    await deleteRow(page, title);
  });
});

test.describe("Contacts", () => {
  test("public form submission lands in the admin inbox", async ({ page }) => {
    const subject = uniqueLabel("Contact");

    await page.goto("/contact");
    await page.locator("#firstName").fill("E2E");
    await page.locator("#lastName").fill("Tester");
    await page.locator("#email").fill("E2E.Tester@Example.com");
    await page.locator("#phone").fill("০১৭১২-৩৪৫৬৭৮"); // Bangla digits + dash are normalized
    await page.locator("#subject").fill(subject);
    await page.locator("#details").fill("Sent by the Playwright suite.");
    await page.getByRole("button", { name: "পাঠান" }).click();
    await expectToast(page, "বার্তা সফলভাবে পাঠানো হয়েছে");

    await page.goto("/admin/contacts");
    await expect(page.getByRole("button", { name: /Add/ })).toHaveCount(0);
    const message = row(page, subject);
    await expect(message).toContainText("New");
    await expect(message).toContainText("01712345678");
    await expect(message).toContainText("e2e.tester@example.com");

    await page.getByRole("button", { name: `Open ${subject}` }).click();
    await expect(dialog(page)).toContainText("Sent by the Playwright suite.");
    await expect(dialog(page).getByLabel("Status")).toHaveValue("READ");
    await dialog(page).getByRole("button", { name: "Save changes" }).click();
    await expectToast(page, "Message updated");
    await expect(message).toContainText("Read");

    await deleteRow(page, subject);
  });
});

test.describe("access control", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("signed-out visitors are sent to login and blocked from writes", async ({ page, request }) => {
    await page.goto("/admin/faqs");
    await expect(page).toHaveURL(/\/admin\/login\?from=%2Fadmin%2Ffaqs/);

    const create = await request.post("/api/faqs", { data: { question: "x", answer: "y" } });
    expect(create.status()).toBe(401);

    const inbox = await request.get("/api/contacts");
    expect(inbox.status()).toBe(401);

    // Drafts are filtered out for the public even when asked for.
    const list = await request.get("/api/faqs?published=all");
    expect(list.ok()).toBe(true);
    const body = (await list.json()) as { data: { items: { isPublished: boolean }[] } };
    expect(body.data.items.every((item) => item.isPublished)).toBe(true);
  });
});
