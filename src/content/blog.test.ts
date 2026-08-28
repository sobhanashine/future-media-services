import { describe, expect, it } from "vitest";
import { persianBlogPosts } from "./blog";

describe("Persian blog search snippets", () => {
  it("keeps article titles and descriptions concise for search results", () => {
    for (const post of persianBlogPosts) {
      expect(`${post.title} | FMS`.length).toBeLessThanOrEqual(60);
      expect(post.excerpt.length).toBeGreaterThanOrEqual(100);
      expect(post.excerpt.length).toBeLessThanOrEqual(160);
    }
  });
});
