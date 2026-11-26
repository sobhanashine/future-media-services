import type { MetadataRoute } from "next";
import { persianBlogPosts } from "@/content/blog";
import { guideSlugs } from "@/content/guide-slugs";
import { projectSlugs } from "@/content/projects";
import { localePath, serviceSlugs } from "@/content/site";
import { serviceSpecialties, specialtyPath } from "@/content/service-specialties";
import { locales } from "@/content/locales";
import { siteUrl } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/services", "/pricing", "/work", "/about", "/faq", "/contact", "/privacy"];

  const entries = [
    ...locales.flatMap((locale) => [
      ...staticPaths.map((path) => ({
        url: new URL(localePath(locale, path), siteUrl).toString(),
        changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
        priority: path === "" ? 1 : 0.7,
      })),
      ...serviceSlugs.map((slug) => ({
        url: new URL(localePath(locale, `/services/${slug}`), siteUrl).toString(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
      ...serviceSpecialties.map(item => ({
        url: new URL(localePath(locale, specialtyPath(item)), siteUrl).toString(),
        changeFrequency: "monthly" as const,
        priority: 0.75,
      })),
      ...projectSlugs.map((slug) => ({
        url: new URL(localePath(locale, `/work/${slug}`), siteUrl).toString(),
        changeFrequency: "monthly" as const,
        priority: 0.75,
      })),
    ]),
  ];

  return [
    ...entries,
    ...(["en", "it"] as const).flatMap(locale =>
      ["", ...guideSlugs.map(slug => "/" + slug)].map(path => ({
        url: new URL(localePath(locale, "/blog" + path), siteUrl).toString(),
        changeFrequency: "monthly" as const,
        priority: path ? 0.75 : 0.85,
      })),
    ),
    {
      url: new URL("/blog", siteUrl).toString(),
      lastModified: persianBlogPosts[0]?.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    ...persianBlogPosts.map((post) => ({
      url: new URL(`/blog/${post.slug}`, siteUrl).toString(),
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
