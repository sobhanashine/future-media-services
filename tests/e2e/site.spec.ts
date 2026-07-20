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

test("visible counters use the active locale numeral system", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".capability-strip b").first()).toHaveText("۰۱");
  await expect(page.locator(".process-roadmap__legend span").last()).toHaveText("۰۱ — ۰۵");

  await page.goto("/en");
  await expect(page.locator(".capability-strip b").first()).toHaveText("01");
  await expect(page.locator(".process-roadmap__legend span").last()).toHaveText("01 — 05");
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

test("reduced motion keeps the hero copy and skips WebGL", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
});

test("the hero wing sculpture responds to drag", async ({ page }) => {
  await page.goto("/en");
  const canvas = page.locator(".future-core canvas");
  await expect(canvas).toBeVisible();
  const firstFrame = await canvas.screenshot();
  const bounds = await canvas.boundingBox();
  if (!bounds) throw new Error("Hero canvas has no bounding box");

  await page.mouse.move(bounds.x + bounds.width * 0.68, bounds.y + bounds.height * 0.52);
  await page.mouse.down();
  await page.mouse.move(bounds.x + bounds.width * 0.82, bounds.y + bounds.height * 0.44, { steps: 8 });
  await page.mouse.up();
  await page.waitForTimeout(700);
  const secondFrame = await canvas.screenshot();
  expect(firstFrame.equals(secondFrame)).toBe(false);
});

test("portfolio cards are bilingual image previews linked directly to live websites", async ({ page }) => {
  await page.goto("/en/work");
  await expect(page.getByRole("link", { name: "Visit website: OFOQ" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Visit website: Aura Disposable" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Visit website: DigiMoragheb" })).toBeVisible();
  await expect(page.locator(".project-card__media")).toHaveCount(7);
  await expect(page.locator(".project-card__media").first()).toHaveAttribute("href", "https://ofoq-web.vercel.app");
  await expect(page.locator(".project-card__media").first()).toHaveAttribute("target", "_blank");
  await expect(page.locator(".project-card img").first()).toHaveJSProperty("complete", true);
  await expect(page.locator(".project-card__summary, .project-card__facts, .project-archive")).toHaveCount(0);

  await page.goto("/work");
  await expect(page.getByRole("link", { name: "بازدید از وب‌سایت: افق" })).toBeVisible();
  await expect(page.getByRole("link", { name: "بازدید از وب‌سایت: نورنگار" })).toBeVisible();
  await expect(page.getByText(/سکّو|سکو/)).toHaveCount(0);
});

test("portfolio imagery and cards remain responsive", async ({ page }) => {
  const widths = [1440, 900, 390] as const;

  for (const width of widths) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/en/work");
    const mockupImage = page.locator(".project-card__stage img").first();
    await expect(mockupImage).toHaveJSProperty("complete", true);
    const mockupSrc = await mockupImage.evaluate((element: HTMLImageElement) => element.currentSrc);
    expect(decodeURIComponent(mockupSrc)).toContain("ofoq-mockup.webp");
    const card = await page.locator(".project-card__media").first().boundingBox();
    expect(card).not.toBeNull();
    expect(card!.width).toBeGreaterThan(card!.height);
    expect(card!.width).toBeLessThanOrEqual(width);
  }
});

test("compact portfolio controls keep the arrow centered in its circle", async ({ page }) => {
  for (const width of [390, 900]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/en/work");
    const control = page.locator(".project-card__visit").first();
    const metrics = await control.evaluate((element) => {
      const button = element.getBoundingClientRect();
      const icon = element.querySelector("span")?.getBoundingClientRect();

      return {
        width: button.width,
        height: button.height,
        borderRadius: getComputedStyle(element).borderRadius,
        iconOffsetX: icon ? (icon.left + icon.width / 2) - (button.left + button.width / 2) : null,
        iconOffsetY: icon ? (icon.top + icon.height / 2) - (button.top + button.height / 2) : null,
      };
    });

    expect(metrics.width).toBe(44);
    expect(metrics.height).toBe(44);
    expect(metrics.borderRadius).toBe("50%");
    expect(metrics.iconOffsetX).toBe(0);
    expect(metrics.iconOffsetY).toBe(0);
  }
});

test("the FMS route draws as its steps enter view", async ({ page }) => {
  await page.goto("/en");
  const route = page.locator("[data-process-route]");
  await route.scrollIntoViewIfNeeded();
  await expect(route).toHaveClass(/is-route-animated/);
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
  ];

  for (const slug of slugs) {
    expect((await request.get(`/work/${slug}`)).ok()).toBe(true);
    expect((await request.get(`/en/work/${slug}`)).ok()).toBe(true);
  }

  expect((await request.get("/work/sakkou-cowork")).status()).toBe(404);
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
