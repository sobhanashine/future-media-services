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
  for (const path of ["/", "/en", "/contact", "/en/services", "/en/work", "/en/work/ofoq"]) {
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

test("the Future Core satellites orbit automatically", async ({ page }) => {
  await page.goto("/en");
  const canvas = page.locator(".future-core canvas");
  await expect(canvas).toBeVisible();
  const firstFrame = await canvas.screenshot();
  await page.waitForTimeout(900);
  const secondFrame = await canvas.screenshot();
  expect(firstFrame.equals(secondFrame)).toBe(false);
});

test("portfolio projects are responsive, bilingual and linked to complete case studies", async ({ page }) => {
  await page.goto("/en/work");
  await expect(page.getByRole("heading", { name: "OFOQ" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Aura Disposable" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "DigiMoragheb" })).toBeVisible();
  await expect(page.locator(".project-card__media")).toHaveCount(3);
  await expect(page.locator(".project-card__media").first()).toHaveAttribute("href", "/en/work/ofoq");
  await expect(page.locator(".project-card img").first()).toHaveJSProperty("complete", true);
  await page.locator(".project-card__media").first().click();
  await expect(page).toHaveURL(/\/en\/work\/ofoq$/);
  await expect(page.getByRole("heading", { level: 1, name: "OFOQ" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "The challenge" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Visit live website" })).toHaveAttribute("href", "https://ofoq-web.vercel.app");

  await page.goto("/work");
  await expect(page.getByRole("heading", { name: "افق" })).toBeVisible();
  await expect(page.getByText("فضای کار اشتراکی سکّو", { exact: true })).toBeVisible();
  await expect(page.getByText("فعلاً در دسترس نیست", { exact: true })).toBeVisible();
});

test("portfolio imagery switches between laptop, tablet and mobile captures", async ({ page }) => {
  const cases = [
    { width: 1440, file: "ofoq-desktop.webp", orientation: "landscape" },
    { width: 900, file: "ofoq-tablet.webp", orientation: "portrait" },
    { width: 390, file: "ofoq-mobile.webp", orientation: "portrait" },
  ] as const;

  for (const item of cases) {
    await page.setViewportSize({ width: item.width, height: 1000 });
    await page.goto("/en/work");
    const image = page.locator(".project-card .device-mockup__screen img").first();
    await expect(image).toHaveJSProperty("complete", true);
    const currentSrc = await image.evaluate((element: HTMLImageElement) => element.currentSrc);
    expect(decodeURIComponent(currentSrc)).toContain(item.file);
    const screen = await page.locator(".project-card .device-mockup__screen").first().boundingBox();
    expect(screen).not.toBeNull();
    if (item.orientation === "landscape") {
      expect(screen!.width).toBeGreaterThan(screen!.height);
    } else {
      expect(screen!.height).toBeGreaterThan(screen!.width);
    }
  }
});

test("every portfolio entry has a Persian and English detail page", async ({ request }) => {
  const slugs = [
    "ofoq",
    "aura-disposable",
    "digimoragheb",
    "kashiland",
    "mehrshad-store",
    "paytakhte-ketab",
    "noornegar",
    "jaheshino",
    "sakkou-cowork",
  ];

  for (const slug of slugs) {
    expect((await request.get(`/work/${slug}`)).ok()).toBe(true);
    expect((await request.get(`/en/work/${slug}`)).ok()).toBe(true);
  }
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
    for (const path of ["/", "/en/work/ofoq"]) {
      await page.goto(path);
      const dimensions = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
    }
  });
}
