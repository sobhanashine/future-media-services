import { describe, expect, it } from "vitest";
import { persianBlogPosts, relatedBlogPosts } from "./blog";

describe("Persian blog search snippets", () => {
  it("keeps article titles and descriptions concise for search results", () => {
    for (const post of persianBlogPosts) {
      expect(`${post.title} | FMS`.length).toBeLessThanOrEqual(60);
      expect(post.excerpt.length).toBeGreaterThanOrEqual(100);
      expect(post.excerpt.length).toBeLessThanOrEqual(160);
    }
  });

  it("returns at most three server-renderable guides for a service", () => {
    const webGuides = relatedBlogPosts("/services/web-development");
    const instagramGuides = relatedBlogPosts("/services/instagram-management");

    expect(webGuides).toHaveLength(3);
    expect(webGuides[0]?.slug).toBe("nextjs-canonical-url-guide");
    expect(instagramGuides.map((post) => post.slug)).toContain("instagram-content-calendar-guide");
    for (const post of [...webGuides, ...instagramGuides]) {
      expect(post.relatedServicePath).toMatch(/^\/services\//);
    }
  });
});
