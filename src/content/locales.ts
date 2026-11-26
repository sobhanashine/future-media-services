import { hasGuideEdition } from "./guide-slugs";

export const locales = ["fa", "en", "it"] as const;
export type Locale = (typeof locales)[number];
export type InternationalLocale = Exclude<Locale, "fa">;

export const languageNames = { fa: "فارسی", en: "English", it: "Italiano" } as const;
export const numberLocales = { fa: "fa-IR", en: "en-GB", it: "it-IT" } as const;

export function localePath(locale: Locale, path = "") {
  const suffix = !path || path === "/" ? "" : path.startsWith("/") ? path : "/" + path;
  return (locale === "fa" ? "" : "/" + locale) + suffix || "/";
}

export function switchLocalePath(target: Locale, pathname: string) {
  const path = pathname.replace(/^\/(?:en|it)(?=\/|$)/, "");
  if (target !== "fa" && path.startsWith("/blog/") && !hasGuideEdition(path.slice(6))) {
    return localePath(target, "/blog");
  }
  return localePath(target, path);
}
