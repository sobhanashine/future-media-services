import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";

describe("SEO sitemap", () => {
  it("contains only canonical HTML pages", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.every((url) => url.startsWith("https://futuremservices.ir/"))).toBe(true);
    expect(urls.some((url) => /\.(?:md|txt)$/.test(url))).toBe(false);
  });

  it("uses real content dates instead of regenerating dates for static pages", () => {
    const entries = sitemap();
    const datedEntries = entries.filter((entry) => entry.lastModified);

    expect(datedEntries.length).toBeGreaterThanOrEqual(2);
    expect(datedEntries.every((entry) => entry.url.includes("/blog"))).toBe(true);
  });
});
