import Link from "next/link";
import { PageIntro } from "@/components/ui/PageIntro";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { copy, formatIndex, localePath, type Locale } from "@/content/site";
import { phoneDisplay, phoneHref } from "@/lib/contact";

export function ContactPage({ locale }: { locale: Locale }) {
  const content = copy[locale];

  return (
    <>
      <PageIntro
        locale={locale}
        eyebrow={content.contact.eyebrow}
        title={content.contact.title}
        body={content.contact.intro}
      />
      <section className="contact-section contact-section--call container-shell" id="call">
        <div className="call-panel" data-reveal>
          <div className="call-panel__top">
            <span>{content.contact.phoneOnlyLabel}</span>
            <span>FMS / DIRECT</span>
          </div>
          <p>{content.contact.callPrompt}</p>
          <a href={phoneHref} className="button button--light call-panel__button">
            {content.nav.start}
            <ArrowIcon />
          </a>
          <a href={phoneHref} className="call-panel__phone" dir="ltr">
            {phoneDisplay}
          </a>
          <small>
            {content.contact.callDisclaimer}
          </small>
        </div>
        <aside data-reveal>
          <p className="eyebrow">{content.contact.beforeCallLabel}</p>
          <h2>{content.contact.directTitle}</h2>
          <p>{content.contact.directBody}</p>
          <div className="contact-note">
            <span>NOTE / {formatIndex(1, locale)}</span>
            <p>{content.contact.estimateNote}</p>
          </div>
        </aside>
      </section>
      <section className="contact-related container-shell" aria-labelledby="contact-related-title">
        <div>
          <p className="eyebrow">{content.nav.services}</p>
          <h2 id="contact-related-title">{content.sections.servicesTitle}</h2>
          <p>{content.sections.servicesPageIntro}</p>
        </div>
        <nav className="contact-related__links" aria-label={content.nav.services}>
          <Link href={localePath(locale, "/services")}>
            {content.nav.services}
            <ArrowIcon />
          </Link>
          <Link href={localePath(locale, "/work")}>
            {content.nav.work}
            <ArrowIcon />
          </Link>
          <Link href={localePath(locale, "/faq")}>
            {content.nav.faq}
            <ArrowIcon />
          </Link>
        </nav>
      </section>
    </>
  );
}
