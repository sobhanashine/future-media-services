import { describe, expect, it } from "vitest";
import { copy, findService, localePath, serviceSlugs } from "./site";
import { locales, switchLocalePath } from "./locales";
import { readFileSync } from "node:fs";
import { instagramRates, monthlyInstagramEstimate } from "./instagram-rates";

describe("localised content model", () => {
  it("keeps service routes aligned across locales", () => {
    expect(copy.fa.services.map((service) => service.slug)).toEqual(serviceSlugs);
    expect(copy.en.services.map((service) => service.slug)).toEqual(serviceSlugs);
  });

  it("keeps Italian services, plans and prices aligned with the published offer", () => {
    expect(copy.it.services.map(service => service.slug)).toEqual(serviceSlugs);
    for (const slug of serviceSlugs) {
      const original = findService("en", slug)!;
      const italian = findService("it", slug)!;
      expect(italian.plans?.map(plan => [plan.monthlyToman, plan.featured, plan.features.length]))
        .toEqual(original.plans?.map(plan => [plan.monthlyToman, plan.featured, plan.features.length]));
      expect(italian.heroImage.src).toBe(original.heroImage.src);
      expect(italian.workflow).toHaveLength(original.workflow.length);
      expect(italian.sharedPlanFeatures?.length).toBe(original.sharedPlanFeatures?.length);
    }
  });
  it("resolves every service in both languages", () => {
    for (const slug of serviceSlugs) {
      expect(findService("fa", slug)?.title).toBeTruthy();
      expect(findService("en", slug)?.title).toBeTruthy();
    }
  });

  it("keeps service hero assets aligned with localized descriptions", () => {
    for (const slug of serviceSlugs) {
      const faService = findService("fa", slug);
      const enService = findService("en", slug);

      expect(faService?.heroImage.src).toBe(enService?.heroImage.src);
      expect(faService?.heroImage.src).toMatch(/^\/images\/services\/.+\.webp$/);
      expect(faService?.heroImage.alt).toBeTruthy();
      expect(enService?.heroImage.alt).toBeTruthy();
    }
  });

  it("keeps three website plans aligned across locales", () => {
    const faPlans = copy.fa.services.find((service) => service.slug === "web-development")?.plans;
    const enPlans = copy.en.services.find((service) => service.slug === "web-development")?.plans;

    expect(faPlans).toHaveLength(3);
    expect(enPlans).toHaveLength(3);
    expect(faPlans?.map((plan) => plan.featured)).toEqual(enPlans?.map((plan) => plan.featured));
  });

  it("keeps three Instagram plans local and aligned across locales", () => {
    const faService = copy.fa.services.find((service) => service.slug === "instagram-management");
    const enService = copy.en.services.find((service) => service.slug === "instagram-management");

    expect(faService?.plans).toHaveLength(3);
    expect(enService?.plans).toHaveLength(3);
    expect(faService?.sharedPlanFeatures).toHaveLength(15);
    expect(enService?.sharedPlanFeatures).toHaveLength(15);
    expect(faService?.plans?.map((plan) => plan.featured)).toEqual(enService?.plans?.map((plan) => plan.featured));
    expect(faService?.plans?.map(plan => plan.name)).toEqual(["برنزی", "نقره‌ای", "طلایی"]);
    expect(enService?.plans?.map(plan => plan.name)).toEqual(["Bronze", "Silver", "Gold"]);
    for (const service of [faService, enService]) {
      expect(service?.plans?.map(plan => plan.monthlyToman)).toEqual([11_900_000, 16_400_000, 23_800_000]);
    }
    for (const locale of ["en", "fa"] as const) {
      const sheet = readFileSync(locale === "fa" ? "public/pricing-fa.md" : "public/pricing.md", "utf8");
      for (const amount of Object.values(instagramRates.packages)) {
        expect(sheet).toContain(amount.toLocaleString(locale === "fa" ? "fa-IR" : "en-US"));
      }
    }
  });

  it("prices the monthly Instagram estimate using quantity rates and each selected extra once", () => {
    const blank = { stories: 0, motion: false, posts: 0, banners: 0, extras: [] };
    expect(monthlyInstagramEstimate(blank)).toBe(0);
    expect(monthlyInstagramEstimate({ ...blank, stories: 2, posts: 3, banners: 1 })).toBe(460_000);
    expect(monthlyInstagramEstimate({ ...blank, stories: 2, motion: true, posts: 3, banners: 1, extras: [0, 0] })).toBe(720_000);
    expect(monthlyInstagramEstimate({ ...blank, extras: instagramRates.extras.map((_, index) => index) })).toBe(2_000_000);
  });

  it("generates stable locale paths", () => {
    for (const path of ["", "/services", "/services/web-development", "/work", "/work/ofoq", "/about", "/faq", "/contact", "/privacy"]) {
      expect(localePath("fa", path)).toBe(path || "/");
      expect(localePath("en", path)).toBe(path ? `/en${path}` : "/en");
    }
    expect(localePath("fa")).toBe("/");
    expect(localePath("en")).toBe("/en");
  });

  it("switches between equivalent pages in all three languages", () => {
    for (const source of locales) {
      for (const target of locales) {
        for (const path of ["", "/work/ermetes", "/services/web-development/corporate-website", "/pricing", "/blog", "/blog/nextjs-or-wordpress-headless"]) {
          expect(switchLocalePath(target, localePath(source, path))).toBe(localePath(target, path));
        }
      }
    }
    expect(switchLocalePath("it", "/blog/persian-only-guide")).toBe("/it/blog");
  });

  it("keeps all localized page sections structurally aligned", () => {
    expect(Object.keys(copy.fa)).toEqual(Object.keys(copy.en));
    expect(copy.fa.process).toHaveLength(copy.en.process.length);
    expect(copy.fa.reasons).toHaveLength(copy.en.reasons.length);
    expect(copy.fa.social.map((item) => item.href)).toEqual(copy.en.social.map((item) => item.href));
    expect(copy.fa.faq.items).toHaveLength(copy.en.faq.items.length);
    expect(copy.fa.about.values).toHaveLength(copy.en.about.values.length);
    expect(copy.fa.privacy.items).toHaveLength(copy.en.privacy.items.length);

    for (const slug of serviceSlugs) {
      const faService = findService("fa", slug)!;
      const enService = findService("en", slug)!;
      expect(faService.deliverables).toHaveLength(enService.deliverables.length);
      expect(faService.workflow).toHaveLength(enService.workflow.length);
      expect(faService.idealFor).toHaveLength(enService.idealFor.length);
      expect(faService.plans).toHaveLength(enService.plans?.length ?? 0);
      expect(faService.plans?.map((plan) => plan.features.length)).toEqual(enService.plans?.map((plan) => plan.features.length));
    }
  });
});
