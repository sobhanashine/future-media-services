import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { copy, localePath, type Locale } from "@/content/site";
import { callbackLabel, phoneDisplay, phoneHref } from "@/lib/contact";
import s from "./StudioEditorial.module.css";
import { CallbackForm } from "./CallbackForm";

export function ContactPage({ locale }: { locale: Locale }) {
  const { contact, nav, sections } = copy[locale];
  return (
    <div className={s.page}>
      <div className={`container-shell ${s.contactHero}`}>
        <header className={s.lead} data-hero-reveal>
          <p className={s.label}>{contact.eyebrow}</p>
          <h1>{contact.title}</h1><p className={s.dek}>{contact.intro}</p>
          <div id="call" className={s.directLine}>
            <span>{contact.directLabel}</span><a href={phoneHref} dir="ltr">{phoneDisplay}</a>
          </div>
        </header>
        <section id="callback" className={s.callbackPanel} data-hero-reveal aria-labelledby="callback-title">
          <h2 id="callback-title">{callbackLabel[locale]}</h2>
          <CallbackForm locale={locale} showRedirectStatus />
        </section>
      </div>
      <section className={`container-shell ${s.callGuide}`} data-reveal>
        <div><p className={s.label}>{contact.beforeCallLabel}</p><h2>{contact.directTitle}</h2></div>
        <div><p>{contact.directBody}</p><p>{contact.estimateNote}</p></div>
      </section>
      <section className={`container-shell ${s.related}`} aria-labelledby="contact-related-title" data-reveal>
        <div><p className={s.label}>{nav.services}</p><h2 id="contact-related-title">{sections.servicesTitle}</h2><p>{sections.servicesPageIntro}</p></div>
        <nav aria-label={nav.services}>{[[nav.services, "/services"], [nav.work, "/work"], [nav.faq, "/faq"]].map(([label,path]) => (
          <Link key={path} href={localePath(locale, path)}>{label}<ArrowIcon /></Link>
        ))}</nav>
      </section>
    </div>
  );
}
