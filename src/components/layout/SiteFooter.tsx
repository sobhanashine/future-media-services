import Link from "next/link";
import { copy, localePath, type Locale } from "@/content/site";
import { phoneHref } from "@/lib/contact";

export function SiteFooter({ locale }: { locale: Locale }) {
  const content = copy[locale];

  return (
    <footer className="site-footer">
      <div className="site-footer__top container-shell">
        <Link href={localePath(locale)} className="footer-brand">
          <span className="brand-mark__signal" aria-hidden="true" />
          FMS
        </Link>
        <p>{content.common.footerLine}</p>
        <a href={phoneHref} className="text-link">
          {content.nav.start}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="site-footer__bottom container-shell">
        <span>© {new Date().getFullYear()} Future Media Services. {content.common.rights}</span>
        <div>
          <Link href={localePath(locale, "/privacy")}>{locale === "fa" ? "حریم خصوصی" : "Privacy"}</Link>
          <a href="https://www.instagram.com/future.m.services/" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
