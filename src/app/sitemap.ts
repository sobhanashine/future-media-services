import type { MetadataRoute } from "next";
import { projectSlugs } from "@/content/projects";
import { localePath, serviceSlugs, type Locale } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://futuremservices.com";
  const locales: Locale[] = ["fa", "en"];
  const staticPaths = ["", "/services", "/work", "/about", "/contact", "/privacy"];

  return locales.flatMap((locale) => [
    ...staticPaths.map((path) => ({
      url: new URL(localePath(locale, path), base).toString(),
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...serviceSlugs.map((slug) => ({
      url: new URL(localePath(locale, `/services/${slug}`), base).toString(),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projectSlugs.map((slug) => ({
      url: new URL(localePath(locale, `/work/${slug}`), base).toString(),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ]);
}
