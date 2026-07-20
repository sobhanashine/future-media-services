import { describe, expect, it } from "vitest";
import { copy, findService, localePath, serviceSlugs } from "./site";

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
    expect(localePath("fa", "/contact")).toBe("/contact");
    expect(localePath("en", "/contact")).toBe("/en/contact");
    expect(localePath("fa")).toBe("/");
    expect(localePath("en")).toBe("/en");
  });
});
