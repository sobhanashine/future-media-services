import { describe, expect, it } from "vitest";
import { copy, findService, localePath, serviceSlugs, switchLocalePath } from "./site";

describe("bilingual content model", () => {
  it("keeps service routes aligned across locales", () => {
    expect(copy.fa.services.map((service) => service.slug)).toEqual(serviceSlugs);
    expect(copy.en.services.map((service) => service.slug)).toEqual(serviceSlugs);
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
  });

  it("generates stable locale paths", () => {
    for (const path of ["", "/services", "/services/web-development", "/work", "/work/ofoq", "/about", "/faq", "/contact", "/privacy"]) {
      expect(localePath("fa", path)).toBe(path || "/");
      expect(localePath("en", path)).toBe(path ? `/en${path}` : "/en");
    }
    expect(localePath("fa")).toBe("/");
    expect(localePath("en")).toBe("/en");
  });

  it("switches between equivalent Persian and English routes", () => {
    for (const path of ["/", "/services", "/services/web-development", "/work/ofoq", "/about", "/faq", "/contact", "/privacy"]) {
      expect(switchLocalePath("fa", path)).toBe(path === "/" ? "/en" : `/en${path}`);
    }

    for (const path of ["/en", "/en/services", "/en/services/web-development", "/en/work/ofoq", "/en/about", "/en/faq", "/en/contact", "/en/privacy"]) {
      expect(switchLocalePath("en", path)).toBe(path.replace(/^\/en/, "") || "/");
    }
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
