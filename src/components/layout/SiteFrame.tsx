import type { Locale } from "@/content/site";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { MotionEnhancements } from "@/components/motion/MotionEnhancements";

export function SiteFrame({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        {locale === "fa" ? "رفتن به محتوای اصلی" : "Skip to main content"}
      </a>
      <SiteHeader locale={locale} />
      <main id="main-content">{children}</main>
      <SiteFooter locale={locale} />
      <MotionEnhancements />
    </>
  );
}
