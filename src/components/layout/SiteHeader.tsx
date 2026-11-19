"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandIdentity } from "@/components/layout/BrandIdentity";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { copy, localePath, switchLocalePath, type Locale } from "@/content/site";
import { callbackLabel } from "@/lib/contact";
import s from "./Navigation.module.css";

export function SiteHeader({ locale }: { locale: Locale }) {
  const { common, nav, languageSwitch } = copy[locale];
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const fa = locale === "fa";
  const home = localePath(locale);
  const contact = localePath(locale, "/contact");
  const alternate = switchLocalePath(locale, pathname);
  const pages = [
    { label: nav.services, href: localePath(locale, "/services") },
    { label: nav.work, href: localePath(locale, "/work") },
    { label: fa ? nav.blog : "Blog (FA)", href: "/blog", language: "fa" },
    { label: fa ? "تعرفه‌ها" : "Pricing", href: localePath(locale, "/pricing") },
    { label: nav.about, href: localePath(locale, "/about") },
    { label: nav.contact, href: contact },
  ];
  const mobilePages = [{ label: fa ? "خانه" : "Home", href: home, language: undefined }, ...pages];
  const isCurrent = (href: string) => pathname === href || (href !== home && pathname.startsWith(href + "/"));
  const close = () => dialog.current?.close();

  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia("(min-width: 810px)");
    const handleResize = () => { if (desktop.matches) close(); };
    document.body.dataset.menuOpen = "true";
    desktop.addEventListener("change", handleResize);
    window.addEventListener("popstate", close);
    window.addEventListener("pagehide", close);
    return () => {
      delete document.body.dataset.menuOpen;
      desktop.removeEventListener("change", handleResize);
      window.removeEventListener("popstate", close);
      window.removeEventListener("pagehide", close);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-header__inner container-shell">
        <Link href={home} className="brand-mark" aria-label={common.homeAria}><BrandIdentity descriptor /></Link>
        <nav className="desktop-nav" aria-label={common.mainNavAria}>
          {pages.map(({ label, href, language }) => (
            <Link key={href} href={href} hrefLang={language} aria-current={isCurrent(href) ? "page" : undefined}>{label}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <a href={alternate} className="language-switch" hrefLang={fa ? "en" : "fa"}
            aria-label={fa ? common.switchToEnglishAria : common.switchToPersianAria}>{languageSwitch}</a>
          <Link href={contact + "#callback"} className="button button--compact header-cta">{callbackLabel[locale]}</Link>
          <button type="button" className="menu-toggle" aria-label={nav.menu} aria-haspopup="dialog"
            aria-expanded={open} aria-controls="mobile-menu"
            onClick={() => { dialog.current?.showModal(); setOpen(true); }}>
            <span /><span />
          </button>
        </div>
      </div>

      <dialog ref={dialog} id="mobile-menu" className={s.menu} aria-label={common.mobileNavAria} onClose={() => setOpen(false)}>
        <div className={s.sheet}>
          <div className={s.bar}>
            <Link href={home} onClick={close} className={s.wordmark} aria-label={common.homeAria} dir="ltr">Future Media Services<span>.</span></Link>
            <button type="button" className={s.close} aria-label={nav.close} onClick={close}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19" /></svg>
            </button>
          </div>
          <nav className={s.links} aria-label={common.mobileNavAria}>
            {mobilePages.map(({ label, href, language }) => (
              <Link key={href} href={href} hrefLang={language} aria-current={isCurrent(href) ? "page" : undefined} onClick={close}>
                {label}<ArrowIcon />
              </Link>
            ))}
          </nav>
          <div className={s.utilities}>
            <Link href={localePath(locale, "/faq")} onClick={close}>{nav.faq}</Link>
            <a href={alternate} hrefLang={fa ? "en" : "fa"} onClick={close}>{fa ? "English" : "فارسی"}</a>
          </div>
          <Link href={contact + "#callback"} className={s.callback} onClick={close}>{callbackLabel[locale]}<ArrowIcon /></Link>
        </div>
      </dialog>
      <noscript><nav className={s.staticLinks} aria-label={common.mobileNavAria}>
        {pages.map(({ href, label, language }) => <a key={href} href={href} hrefLang={language}>{label}</a>)}
      </nav></noscript>
    </header>
  );
}
