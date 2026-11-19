import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("Persian and English home experiences are reachable", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "fa");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("وب‌سایت و محتوا");
  await expect(page.getByRole("link", { name: "بازدید از سایت — سیمون فود" }))
    .toHaveAttribute("href", "https://simonefood.ir");
  const brandImages = page.locator(".brand-symbol img");
  await expect(brandImages).toHaveCount(2);
  await expect(brandImages.first()).toHaveJSProperty("complete", true);
  expect(decodeURIComponent(await brandImages.first().getAttribute("src") ?? "")).toMatch(/brand-mark(?:\.[^/]+)?\.webp/);

  await page.getByRole("link", { name: "Switch to English" }).click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("design & content");
});

test("mobile navigation fills the viewport, traps focus and opens standalone pages", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "بازکردن منو" });
  const menu = page.getByRole("navigation", { name: "پیمایش موبایل" });
  await toggle.click();
  const sheet = page.getByRole("dialog", { name: "پیمایش موبایل" });
  await expect(sheet).toBeVisible();
  await expect.poll(() => sheet.evaluate(el => ({ width: el.clientWidth, height: el.clientHeight }))).toEqual({ width: 390, height: 844 });
  for (let i = 0; i < 4; i++) {
    await page.keyboard.press("Tab");
    expect(await sheet.evaluate(el => el.contains(document.activeElement))).toBe(true);
  }
  const expectedLinks = { "خدمات": "/services", "بلاگ": "/blog", "درباره ما": "/about", "تماس": "/contact", "تعرفه‌ها": "/pricing" };
  for (const [name, href] of Object.entries(expectedLinks)) await expect(menu.getByRole("link", { name, exact: true })).toHaveAttribute("href", href);
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await menu.getByRole("link", { name: "نمونه‌کارها" }).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(sheet).toBeHidden();
  await expect(page.getByRole("heading", {level: 1})).toBeVisible();
});

test("the landing ends with direct contact and site navigation", async ({ page }) => {
  await page.goto("/");
  const footer = page.locator(".site-footer");

  await expect(page.locator('#contact a[href^="tel:"]')).toHaveAttribute("href", "tel:+989116004866");
  await expect(footer.getByRole("link", { name: /اینستاگرام Future Media Services/ })).toHaveAttribute("href", "https://www.instagram.com/future.m.services/");
  await expect(footer.getByRole("link", { name: "همه خدمات" })).toHaveAttribute("href", "/services");
  await expect(footer.getByRole("link", { name: "نمونه‌کارها" })).toHaveAttribute("href", "/work");
});

test("tablet navigation leaves space between the wordmark, menu and contact", async ({ page }) => {
  for (const path of ["/", "/en"]) {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    for (const width of [810, 900, 1024]) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate(() => document.fonts.ready);
      const gap = await page.locator(".site-header__inner").evaluate(header => {
        const bounds = Array.from(header.querySelectorAll(".brand-mark, .desktop-nav a, .header-actions a"))
          .map(link => link.getBoundingClientRect())
          .sort((a,b) => a.left - b.left);
        return Math.min(...bounds.slice(1).map((rect,i) => rect.left - bounds[i].right));
      });
      expect(gap).toBeGreaterThan(4);
    }
  }
});

test("each featured project has a working detail link, a live destination and loaded artwork", async ({ page }) => {
  await page.goto("/");
  const ofoq = page.locator('[data-project="ofoq"]');
  await ofoq.scrollIntoViewIfNeeded();
  await expect(ofoq.getByRole("link", { name: "بازدید از سایت — افق" })).toHaveAttribute("href", "https://ofoqbuild.com");
  await expect(ofoq.getByRole("link", { name: "جزئیات پروژه — افق" })).toHaveAttribute("href", "/work/ofoq");
  const capture = ofoq.locator("img").last();
  await expect.poll(() => capture.evaluate((im: HTMLImageElement) => im.naturalWidth)).toBeGreaterThan(0);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en", { waitUntil: "domcontentloaded" });
  const simone = page.locator('[data-project="simone-food"]');
  await expect(simone.getByRole("link", { name: "Visit site — Simone Food" })).toHaveAttribute("href", "https://simonefood.ir");
  await simone.getByRole("link", { name: "Project details — Simone Food" }).click();
  await expect(page).toHaveURL(/\/en\/work\/simone-food$/);
});

test("website service exposes three plans and links to callback requests", async ({ page }) => {
  await page.goto("/en/services");
  await page.locator(".service-list").getByRole("link", { name: /Website design & development/ }).click();
  await expect(page).toHaveURL(/\/en\/services\/web-development/);
  const websiteHero = page.locator(".service-detail__hero-media img");
  await expect(websiteHero).toBeVisible();
  await expect(websiteHero).toHaveJSProperty("complete", true);
  expect(decodeURIComponent(await websiteHero.getAttribute("src") ?? "")).toContain("web-development-hero.webp");
  await expect(page.locator(".pricing-plan")).toHaveCount(3);
  await expect(page.getByRole("heading", { name: "Personal" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Corporate" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Commerce", exact: true })).toBeVisible();
  await expect(page.locator(".pricing-plan__cta").first()).toHaveAttribute("href", "/en/contact#callback");
});

test("Instagram management stays local and exposes all three monthly plans", async ({ page }) => {
  await page.goto("/services");
  const instagramService = page.locator(".service-list").getByRole("link", { name: /مدیریت محتوای اینستاگرام/ });
  await expect(instagramService).toHaveAttribute("href", "/services/instagram-management");
  await instagramService.click();
  await expect(page).toHaveURL(/\/services\/instagram-management$/);
  const instagramHero = page.locator(".service-detail__hero-media img");
  await expect(instagramHero).toBeVisible();
  await expect(instagramHero).toHaveJSProperty("complete", true);
  expect(decodeURIComponent(await instagramHero.getAttribute("src") ?? "")).toContain("instagram-management-hero.webp");
  await expect(page.locator(".pricing-plan")).toHaveCount(3);
  await expect(page.getByRole("heading", { name: "برنزی", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "نقره‌ای", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "طلایی", exact: true })).toBeVisible();
  await expect(page.getByText("۱۱٫۹", { exact: true })).toBeVisible();
  await expect(page.getByText("۱۶٫۴", { exact: true })).toBeVisible();
  await expect(page.getByText("۲۳٫۸", { exact: true })).toBeVisible();
  await expect(page.getByText("خدمات مشترک در هر سه پلن")).toBeVisible();
  await expect(page.locator('a[href*="faratar.agency"]')).toHaveCount(0);
});

test("mobile pricing plans use a readable horizontal snap rail", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const path of ["/services/web-development", "/en/services/instagram-management"]) {
    await page.goto(path);
    await expect(page.locator(".pricing-plans__hint")).toBeVisible();
    const rail = page.locator(".pricing-plans");
    const metrics = await rail.evaluate((element) => {
      const firstCard = element.querySelector(".pricing-plan")?.getBoundingClientRect();
      const styles = getComputedStyle(element);
      return {
        clientWidth: element.clientWidth,
        scrollWidth: element.scrollWidth,
        firstCardWidth: firstCard?.width ?? 0,
        overflowX: styles.overflowX,
        scrollSnapType: styles.scrollSnapType,
      };
    });

    expect(metrics.scrollWidth).toBeGreaterThan(metrics.clientWidth);
    expect(metrics.firstCardWidth).toBeLessThan(metrics.clientWidth);
    expect(metrics.firstCardWidth).toBeGreaterThan(metrics.clientWidth * 0.8);
    expect(metrics.overflowX).toBe("auto");
    expect(metrics.scrollSnapType).toContain("mandatory");

    await rail.evaluate((element) => {
      const amount = element.clientWidth;
      element.scrollLeft = getComputedStyle(element).direction === "rtl" ? -amount : amount;
    });
    await page.waitForTimeout(100);
    expect(Math.abs(await rail.evaluate((element) => element.scrollLeft))).toBeGreaterThan(0);
  }
});

test("both mobile service choices lead to details and pricing", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const services = page.getByRole("region", { name: /طراحی وب و تولید محتوا/ });
  await expect(services.getByRole("link", { name: /طراحی و توسعه وب‌سایت/ })).toHaveAttribute("href", "/services/web-development");
  await services.getByRole("link", { name: /مدیریت محتوای اینستاگرام/ }).click();
  await expect(page).toHaveURL(/\/services\/instagram-management$/);
  await expect(page.locator(".pricing-plan")).toHaveCount(3);
});

test("key pages have no serious accessibility violations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of ["/", "/en", "/contact", "/en/services", "/services/instagram-management", "/pricing", "/en/services/instagram-management/posts-and-stories", "/en/work", "/en/work/ofoq"]) {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter((item) => ["critical", "serious"].includes(item.impact ?? ""))).toEqual([]);
  }
});

test("the landing offer, portfolio and contact are available without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  try {
    const page = await context.newPage();
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1 })).toContainText("وب‌سایت و محتوا");
    const hero = page.getByRole("region", { name: /طراحی وب‌سایت و محتوا/ });
    await expect(hero.getByRole("link", { name: "درخواست تماس" })).toHaveAttribute("href", "#contact");
    await expect(page.getByRole("link", { name: "جزئیات پروژه — سیمون فود" })).toHaveAttribute("href", "/work/simone-food");
    await hero.getByRole("link", { name: "مقایسه پلن‌ها" }).click();
    await expect(page).toHaveURL(/\/pricing$/);
    await expect(page.getByRole("heading", {level: 1})).toBeInViewport();
    const instagram = page.locator('label:has(input[name="finder-service"][value="instagram-management"])');
    await instagram.click();
    await expect(page.locator("#finder-instagram-management article:visible")).toContainText("ماهانه");
    await page.getByRole("navigation", { name: "پیمایش پایین صفحه" }).getByRole("link", { name: "سوالات متداول" }).click();
    await expect(page).toHaveURL(/\/faq$/);
    const answer = page.locator("details").first();
    await expect(answer.locator("p")).toBeVisible();
    await answer.locator("summary").click();
    await expect(answer.locator("p")).toBeHidden();
    await answer.locator("summary").click();
    await expect(answer.locator("p")).toBeVisible();
  } finally {
    await context.close();
  }
});

for (const locale of ["fa", "en"] as const) {
  test(`all six plans show their own deliverables and destinations in ${locale}`, async ({ page }) => {
    const prefix = locale === "en" ? "/en" : "";
    await page.goto(`${prefix}/pricing`);
    const pricing = page.locator("#pricing");
    const prices = locale === "fa" ? [["۴۵", "۸۵", "۱۶۵"], ["۱۱٫۹", "۱۶٫۴", "۲۳٫۸"]] : [["45M", "85M", "165M"], ["11.9M", "16.4M", "23.8M"]];
    for (const [index, service] of ["web-development", "instagram-management"].entries()) {
      await pricing.locator(`label:has(input[name="finder-service"][value="${service}"])`).click();
      const panel = pricing.locator(`#finder-${service}`);
      const choices = panel.locator("label");
      await expect(choices).toHaveCount(3);
      for (let tier = 0; tier < 3; tier++) {
        const choice = choices.nth(tier);
        await expect(choice).toContainText(prices[index][tier]);
        await choice.click();
        const article = panel.getByRole("article");
        await expect(article).toHaveCount(1);
        await expect(choice).toContainText(await article.getByRole("heading").innerText());
        expect(await article.getByRole("listitem").count()).toBeGreaterThan(0);
        await expect(article.getByRole("link", { name: locale === "fa" ? "درخواست تماس" : "Request a callback" })).toHaveAttribute("href", `${prefix}/contact#callback`);
        await expect(article.locator('a[href*="/services/"]')).toHaveAttribute("href", `${prefix}/services/${service}#service-pricing-title`);
      }
    }
  });
}

test("reduced motion keeps landing imagery static and the work accessible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: "Visit site — Simone Food" })).toBeVisible();
  expect(await page.locator("#top").evaluate(root => root.getAnimations({ subtree: true }).length)).toBe(0);
});

test("wheel scrolling eases through intermediate positions and each landing section has an entrance", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/en");
  const root = page.locator("#top");
  await expect(root.locator("[data-fms-reveal]").first()).toBeAttached();
  const headingsWithoutMotion = await root.locator("section[aria-labelledby]").evaluateAll(sections =>
    sections.filter(section => !section.querySelector("h1, [data-fms-reveal]")).map(section => section.getAttribute("aria-labelledby")),
  );
  expect(headingsWithoutMotion).toEqual([]);

  await page.mouse.move(160, 320);
  const positions = page.evaluate(() => new Promise<number[]>(resolve => {
    const samples: number[] = [];
    const record = () => samples.push(window.scrollY);
    window.addEventListener("scroll", record, { passive: true });
    window.setTimeout(() => {
      window.removeEventListener("scroll", record);
      resolve(samples);
    }, 1100);
  }));
  await page.mouse.wheel(0, 450);
  const samples = await positions;
  expect(samples.filter(y => y > 0 && y < 450).length).toBeGreaterThan(2);
  expect(samples.at(-1)).toBe(450);
  await page.keyboard.press("PageDown");
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(450);

  const nav = page.locator(".desktop-nav");
  await page.locator("#pricing-title").scrollIntoViewIfNeeded();
  await expect(page.locator("#pricing-title")).toHaveAttribute("data-fms-entered", "");
  await nav.getByRole("link", { name: "Pricing", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/pricing$/);
  await expect(nav.getByRole("link", { name: "Pricing" })).toHaveAttribute("aria-current", "page");
});

test("the first mobile screen presents the offer and both primary actions", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const hero = page.getByRole("region", { name: /طراحی وب‌سایت و محتوا/ });
  await expect(hero.getByRole("heading", { level: 1 })).toBeInViewport();
  await expect(hero.getByRole("link", { name: "درخواست تماس" })).toBeInViewport();
  const compare = hero.getByRole("link", { name: "مقایسه پلن‌ها" });
  await expect(compare).toBeInViewport();
  await compare.click();
  await expect(page).toHaveURL(/\/pricing$/);
});

test("portfolio cards are bilingual image previews linked directly to project websites", async ({ page }) => {
  await page.goto("/en/work");
  await expect(page.getByRole("link", { name: "Visit website: OFOQ" })).toBeVisible();
  await expect(page.getByRole("link", { name: "View project details" }).first()).toHaveAttribute("href", "/en/work/ofoq");
  await expect(page.getByRole("link", { name: "Visit website: Aura Disposable" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Visit website: DigiMoragheb" })).toBeVisible();
  const simone = page.getByRole("link", { name: "Visit website: Simone Food" });
  await expect(simone).toHaveAttribute("href", "https://simonefood.ir");
  await expect(page.locator(".project-card").filter({ has: simone }).getByRole("link", { name: "View project details" }))
    .toHaveAttribute("href", "/en/work/simone-food");
  await expect(page.locator(".project-card__media")).toHaveCount(11);
  await expect(page.locator(".project-card__media").first()).toHaveAttribute("href", "https://ofoqbuild.com");
  await expect(page.locator(".project-card__media").first()).toHaveAttribute("target", "_blank");
  await expect(page.locator(".project-card img").first()).toHaveJSProperty("complete", true);
  await expect(page.locator(".project-card__summary, .project-card__facts, .project-archive")).toHaveCount(0);

  await page.goto("/work");
  await expect(page.getByRole("link", { name: "بازدید از وب‌سایت: افق" })).toBeVisible();
  await expect(page.getByRole("link", { name: "بازدید از وب‌سایت: نورنگار" })).toBeVisible();
  await expect(page.getByRole("link", { name: "بازدید از وب‌سایت: سیمون فود" })).toHaveAttribute("href", "https://simonefood.ir");
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

    const simonePreview = page.getByRole("link", { name: "Visit website: Simone Food" }).locator("img");
    await simonePreview.scrollIntoViewIfNeeded();
    await expect.poll(() => simonePreview.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
    const simoneSrc = await simonePreview.evaluate((image: HTMLImageElement) => image.currentSrc);
    expect(decodeURIComponent(simoneSrc)).toContain("simone-food-mockup.webp");
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

test("landing questions can be opened from the keyboard", async ({ page }) => {
  await page.goto("/en");
  const first = page.locator("#faq details").first();
  await first.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(first.locator("p")).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(first.locator("p")).toBeHidden();
});

test("every portfolio entry has a Persian and English detail page", async ({ request }) => {
  const slugs = [
    "ofoq",
    "aura-disposable",
    "digimoragheb",
    "ermetes",
    "nafis-teb",
    "karats-diamond",
    "simone-food",
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

test("callback form validates input, preserves it on failure, and acknowledges confirmed delivery", async ({ page }) => {
  await page.goto("/en/contact");
  const input = page.getByRole("textbox", { name: "Your phone number" });
  const submit = page.getByRole("button", { name: "Request a callback" });
  const status = page.locator("#callback-status");
  await expect(page.locator('#call a')).toHaveAttribute("href", "tel:+989116004866");
  await input.fill("۱۲۳");
  await submit.click();
  await expect(input).toHaveAttribute("aria-invalid", "true");
  await expect(input).toBeFocused();
  await input.fill("+۱ ۲۰۲ ۵۵۵ ۰۱۴۶");
  let attempts = 0;
  await page.route("**/api/callback", route => {
    const data = new URLSearchParams(route.request().postData() ?? "");
    expect(data.get("phone")).toBe("+۱ ۲۰۲ ۵۵۵ ۰۱۴۶");
    attempts++;
    return route.fulfill({ status: attempts === 1 ? 503 : 200, json: { status: attempts === 1 ? "unavailable" : "sent" } });
  });
  await submit.click();
  await expect(status).toContainText("Try again");
  await expect(input).toHaveValue("+۱ ۲۰۲ ۵۵۵ ۰۱۴۶");
  await submit.click();
  await expect(status).toContainText("Your request reached FMS");
  await expect(input).toHaveValue("");
});

test("service directory exposes each individual offering in both languages", async ({ page }) => {
  const paths = ["web-development/corporate-website", "web-development/online-store", "web-development/personal-website", "instagram-management/posts-and-stories", "instagram-management/reels-production"];
  for (const prefix of ["", "/en"]) {
    await page.goto(prefix + "/services");
    for (const path of paths) {
      const href = prefix + "/services/" + path;
      await expect(page.locator(`.service-list a[href="${href}"]`)).toBeVisible();
      await page.locator(`.service-list a[href="${href}"]`).click();
      await expect(page.getByRole("main").getByRole("heading", {level: 1})).toBeVisible();
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://futuremservices.ir" + href);
      await page.goBack();
    }
  }
});

test("technical SEO endpoints and metadata are present", async ({ page, request }) => {
  await page.goto("/en/services/web-development");
  await expect(page).toHaveTitle(/Website design & development/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/en\/services\/web-development$/);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/en/services/web-development");
  const sitemapPaths = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), ([, url]) => new URL(url).pathname);
  expect(sitemapPaths).toContain("/work/simone-food");
  expect(sitemapPaths).toContain("/en/work/simone-food");
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Sitemap:");
});

for (const width of [320, 390, 768, 1440, 2560]) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/en", "/en/work/ofoq", "/services/instagram-management"]) {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await page.evaluate(() => document.fonts.ready);
      const dimensions = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
    }
  });
}

test("the Earth pulses in the hero and project cases open from the portfolio", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/en");
    const hero = page.locator('section[aria-labelledby="home-title"]');
    const halo = hero.locator('[data-fms-halo="earth"]');
    await expect(halo).toBeInViewport();
    await expect(halo).not.toHaveCSS("animation-name", "none");
    await expect(hero.locator('a[href*="/work/"]')).toHaveCount(0);
    await expect(hero.getByRole("link", { name: "Compare plans" })).toBeInViewport();
    await page.locator("#work").scrollIntoViewIfNeeded();
    await expect(halo).toHaveCSS("animation-name", "none");
  }
  await page.locator('#work a[href="/en/work/ofoq"]').first().click();
  await expect(page).toHaveURL(/\/en\/work\/ofoq$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveAttribute("data-fms-reveal", "title");
});

test("monthly Instagram estimate combines motion stories, posts, banners and extras", async ({ page }) => {
  await page.goto("/services/instagram-management#instagram-estimator");
  const total = page.locator("#instagram-estimator output");
  await expect(total).toContainText("۰ تومان");
  await page.locator("#estimate-format").selectOption("motion");
  await page.locator("#estimate-stories").fill("2");
  await page.locator("#estimate-posts").fill("3");
  await page.locator("#estimate-banners").fill("1");
  await page.locator("#estimate-extra-0").check();
  await expect(total).toContainText("۷۲۰٬۰۰۰ تومان");
});

test("the Persian journal contents and sources can be reached without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL, viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    await page.goto("/blog/instagram-visual-identity-content-system-guide");
    const contents = page.getByRole("navigation", { name: "فهرست این نوشته" });
    await contents.locator("summary").click();
    const sources = contents.locator('a[href="#blog-sources-title"]');
    await sources.click();
    await expect(page.locator("#blog-sources-title")).toBeInViewport();
    await expect(page.getByRole("main").locator('a[href^="https://"]').first()).toBeAttached();
  } finally {
    await context.close();
  }
});
