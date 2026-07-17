import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("Persian and English home experiences are reachable", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "fa");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("آینده");

  await page.getByRole("link", { name: "Switch to English" }).click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("future");
});

test("primary service to contact flow works", async ({ page }) => {
  await page.goto("/en/services");
  await page.getByRole("link", { name: /Website design & development/ }).click();
  await expect(page).toHaveURL(/\/en\/services\/web-development/);
  await page.getByRole("link", { name: "Start a project" }).last().click();
  await expect(page).toHaveURL(/\/en\/contact/);
  await expect(page.getByLabel("Full name")).toBeVisible();
});

test("key pages have no serious accessibility violations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of ["/", "/en", "/contact", "/en/services"]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter((item) => ["critical", "serious"].includes(item.impact ?? ""))).toEqual([]);
  }
});

test("the content survives without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3107/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("آینده");
  await expect(page.getByRole("link", { name: "شروع یک پروژه" })).toBeVisible();
  await context.close();
});

test("reduced motion keeps the static Future Core and skips WebGL", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  await expect(page.locator(".future-core__poster")).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
});

test("the contact form is honest when delivery is unconfigured", async ({ page }) => {
  await page.goto("/en/contact");
  await page.getByLabel("Full name").fill("Preview Visitor");
  await page.getByLabel("Email, phone or contact handle").fill("visitor@example.com");
  await page.getByRole("combobox", { name: /^Service/ }).selectOption("web-development");
  await page.getByLabel("Tell us about the project, problem and goal").fill("We need a clear bilingual website for a growing service business.");
  await page.getByLabel(/I agree/).check();
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByText(/delivery channel is not active yet/i)).toBeVisible();
});

test("technical SEO endpoints and metadata are present", async ({ page, request }) => {
  await page.goto("/en/services/web-development");
  await expect(page).toHaveTitle(/Website design & development/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/en\/services\/web-development$/);
  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).toContain("/en/services/web-development");
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Sitemap:");
});

for (const width of [320, 390, 768, 1440, 2560]) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
  });
}
