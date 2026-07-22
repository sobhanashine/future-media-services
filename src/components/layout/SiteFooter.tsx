import Link from "next/link";
import { BrandIdentity } from "@/components/layout/BrandIdentity";
import { copy, localePath, type Locale } from "@/content/site";
import { phoneHref } from "@/lib/contact";

export function SiteFooter({ locale }: { locale: Locale }) {
  const content = copy[locale];

  return (
    <footer className="site-footer">
      <div className="site-footer__top container-shell">
        <div className="site-footer__lead">
          <Link
            href={localePath(locale)}
            className="footer-brand"
            aria-label={locale === "fa" ? "خانه FMS" : "FMS home"}
          >
            <BrandIdentity />
          </Link>
          <p>{content.common.footerLine}</p>
          <a href={phoneHref} className="button button--compact site-footer__call">
            {content.nav.start}
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <nav className="site-footer__nav" aria-label={locale === "fa" ? "پیمایش پایین صفحه" : "Footer navigation"}>
          <section>
            <h2>{content.nav.services}</h2>
            <Link href={localePath(locale, "/services")}>{content.common.allServices}</Link>
            {content.services.map((service) => (
              <Link key={service.slug} href={localePath(locale, `/services/${service.slug}`)}>
                {service.title}
              </Link>
            ))}
          </section>
          <section>
            <h2>FMS</h2>
            <Link href={localePath(locale, "/work")}>{content.nav.work}</Link>
            <Link href={localePath(locale, "/about")}>{content.nav.about}</Link>
            <Link href={localePath(locale, "/faq")}>{content.nav.faq}</Link>
            <Link href={localePath(locale, "/contact")}>{content.nav.contact}</Link>
          </section>
        </nav>
      </div>
      <div className="site-footer__bottom container-shell">
        <span>© {new Date().getFullYear()} Future Media Services. {content.common.rights}</span>
        <div>
          <Link href={localePath(locale, "/privacy")}>{locale === "fa" ? "حریم خصوصی" : "Privacy"}</Link>
          <Link href={localePath(locale, "/faq")}>{content.nav.faq}</Link>
          <a href="https://www.instagram.com/future.m.services/" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
