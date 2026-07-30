import { copy, type Locale } from "@/content/site";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { MotionEnhancements } from "@/components/motion/MotionEnhancements";
import { JsonLd } from "@/components/layout/JsonLd";
import { siteJsonLd } from "@/lib/metadata";

export function SiteFrame({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  return (
    <>
      <JsonLd data={siteJsonLd(locale)} />
      <a className="skip-link" href="#main-content">
        {copy[locale].common.skipToContent}
      </a>
      <SiteHeader locale={locale} />
      <main id="main-content">{children}</main>
      <SiteFooter locale={locale} />
      <MotionEnhancements />
    </>
  );
}
