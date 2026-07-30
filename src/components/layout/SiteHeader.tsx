"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandIdentity } from "@/components/layout/BrandIdentity";
import { copy, formatIndex, localePath, switchLocalePath, type Locale } from "@/content/site";
import { phoneHref } from "@/lib/contact";

export function SiteHeader({ locale }: { locale: Locale }) {
  const content = copy[locale];
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;

    firstLinkRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.dataset.menuOpen = "true";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      delete document.body.dataset.menuOpen;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const links: ReadonlyArray<readonly [string, string]> = [
    [content.nav.services, "/services"],
    [content.nav.work, "/work"],
    ...(locale === "fa" ? [[content.nav.blog, "/blog"] as const] : []),
    [content.nav.about, "/about"],
    [content.nav.faq, "/faq"],
    [content.nav.contact, "/contact"],
  ] as const;

  return (
    <header className="site-header">
      <div className="site-header__inner container-shell">
        <Link
          href={localePath(locale)}
          className="brand-mark"
          aria-label={content.common.homeAria}
        >
          <BrandIdentity descriptor />
        </Link>

        <nav className="desktop-nav" aria-label={content.common.mainNavAria}>
          {links.map(([label, href]) => {
            const linkHref = localePath(locale, href);
            const isCurrent = pathname === linkHref || pathname.startsWith(`${linkHref}/`);

            return (
              <Link key={href} href={linkHref} aria-current={isCurrent ? "page" : undefined}>
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          <a
            href={switchLocalePath(locale, pathname)}
            className="language-switch"
            hrefLang={locale === "fa" ? "en" : "fa"}
            aria-label={locale === "fa" ? content.common.switchToEnglishAria : content.common.switchToPersianAria}
          >
            {content.languageSwitch}
          </a>
          <a href={phoneHref} className="button button--compact header-cta">
            {content.nav.start}
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? content.nav.close : content.nav.menu}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" data-open={open} aria-hidden={!open}>
        <nav aria-label={content.common.mobileNavAria}>
          {links.map(([label, href], index) => {
            const linkHref = localePath(locale, href);
            const isCurrent = pathname === linkHref || pathname.startsWith(`${linkHref}/`);

            return (
              <Link
                key={href}
                ref={index === 0 ? firstLinkRef : undefined}
                href={linkHref}
                aria-current={isCurrent ? "page" : undefined}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
              >
                <span>{formatIndex(index + 1, locale)}</span>
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
