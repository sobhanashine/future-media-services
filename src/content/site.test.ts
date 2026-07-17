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

  it("generates stable locale paths", () => {
    expect(localePath("fa", "/contact")).toBe("/contact");
    expect(localePath("en", "/contact")).toBe("/en/contact");
    expect(localePath("fa")).toBe("/");
    expect(localePath("en")).toBe("/en");
  });
});
