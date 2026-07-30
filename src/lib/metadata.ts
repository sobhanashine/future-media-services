import type { Metadata } from "next";
import type { Locale } from "@/content/site";
import { localePath } from "@/content/site";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://futuremservices.ir";

export function createMetadata(
  locale: Locale,
  title: string,
  description: string,
  path = "",
): Metadata {
  const canonicalPath = localePath(locale, path);
  const canonical = new URL(canonicalPath, siteUrl).toString();
  const socialImage = new URL(localePath(locale, "/opengraph-image"), siteUrl).toString();

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical,
      languages: {
        fa: new URL(localePath("fa", path), siteUrl).toString(),
        en: new URL(localePath("en", path), siteUrl).toString(),
        "x-default": new URL(localePath("fa", path), siteUrl).toString(),
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "fa" ? "fa_IR" : "en_GB",
      title,
      description,
      url: canonical,
      siteName: "Future Media Services",
      images: [{ url: socialImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Future Media Services",
  url: siteUrl,
  description: "Future Media Services designs and develops custom websites and manages Instagram content for brands and businesses.",
  sameAs: ["https://www.instagram.com/future.m.services/"],
};

export function siteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd,
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "Future Media Services",
        url: siteUrl,
        inLanguage: locale === "fa" ? "fa-IR" : "en",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };
}
