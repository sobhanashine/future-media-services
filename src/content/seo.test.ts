import { describe, expect, it } from "vitest";
import { persianSeoGuide, persianSeoMetadata } from "./seo";

describe("Persian SEO content", () => {
  it("has distinct metadata for every public Persian page", () => {
    const pages = Object.values(persianSeoMetadata);
    expect(new Set(pages.map((page) => page.title)).size).toBe(pages.length);
    for (const page of pages) {
      expect(page.title.length).toBeGreaterThanOrEqual(30);
      expect(page.title.length).toBeLessThanOrEqual(70);
      expect(page.description.length).toBeGreaterThanOrEqual(70);
      expect(page.description.length).toBeLessThanOrEqual(160);
    }
  });

  it("keeps the Persian service guide answer-ready and evidence-safe", () => {
    expect(persianSeoGuide.items).toHaveLength(4);
    for (const item of persianSeoGuide.items) {
      expect(item.title).toMatch(/[؟?]/);
      expect(item.body.length).toBeGreaterThan(80);
    }
  });
});
