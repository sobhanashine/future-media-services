import { describe, expect, it } from "vitest";
import { persianBlogPosts } from "./blog";
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

  it("keeps Persian blog posts complete and source-backed", () => {
    expect(persianBlogPosts.length).toBeGreaterThanOrEqual(2);
    expect(new Set(persianBlogPosts.map((post) => post.slug)).size).toBe(persianBlogPosts.length);
    for (const post of persianBlogPosts) {
      expect(post.title).toMatch(/[آ-ی]/);
      expect(post.excerpt.length).toBeGreaterThan(100);
      expect(post.sections.length).toBeGreaterThanOrEqual(4);
      expect(post.faq.length).toBeGreaterThanOrEqual(3);
      expect(post.sources.length).toBeGreaterThanOrEqual(2);
      expect(post.sources.every((source) => source.href.startsWith("https://"))).toBe(true);
    }
  });
});
