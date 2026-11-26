import type { Metadata } from "next";
import { localePath, type Locale } from "@/content/locales";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://futuremservices.ir";

export function createMetadata(
  locale: Locale,
  title: string,
  description: string,
  path = "",
): Metadata {
  const canonicalPath = localePath(locale, path);
  const canonical = new URL(canonicalPath, siteUrl).toString();
  const socialImage = new URL(locale === "fa" ? "/images/fms-social.png" : "/images/fms-social-" + locale + ".png", siteUrl).toString();

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical,
      languages: {
        fa: new URL(localePath("fa", path), siteUrl).toString(),
        en: new URL(localePath("en", path), siteUrl).toString(),
        it: new URL(localePath("it", path), siteUrl).toString(),
        "x-default": new URL(localePath("fa", path), siteUrl).toString(),
      },
    },
    openGraph: {
      type: "website",
      locale: { fa: "fa_IR", en: "en_GB", it: "it_IT" }[locale],
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

export function createPersianOnlyMetadata(title: string, description: string, path = ""): Metadata {
  const canonical = new URL(path || "/", siteUrl).toString();
  const socialImage = new URL("/images/fms-social.png", siteUrl).toString();

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical,
      languages: {
        fa: canonical,
        "x-default": canonical,
      },
    },
    openGraph: {
      type: "article",
      locale: "fa_IR",
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
        inLanguage: locale === "fa" ? "fa-IR" : locale,
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };
}
