import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  const aiCrawlers = [
    "GPTBot",
    "ChatGPT-User",
    "PerplexityBot",
    "ClaudeBot",
    "anthropic-ai",
    "Google-Extended",
    "Bingbot",
  ];

  return {
    rules: [
      ...["*", ...aiCrawlers].map((userAgent) => ({ userAgent, allow: "/", disallow: ["/api/", "/__opennext_prerender/"] })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
