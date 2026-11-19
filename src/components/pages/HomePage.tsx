import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { JsonLd } from "@/components/layout/JsonLd";
import { LandingMotion } from "@/components/landing/LandingMotion";
import { BrandReel, Horizon, Icon, Orbit } from "@/components/landing/StudioVisuals";
import { FmsServiceArt } from "@/components/landing/FmsArtwork";
import { WorkEdition } from "@/components/landing/WorkEdition";
import { CallbackForm } from "./CallbackForm";
import { findPersianBlogPost } from "@/content/blog";
import { landingCopy } from "@/content/landing";
import { copy, formatNumber, localePath, type Locale } from "@/content/site";
import { callbackLabel, phoneDisplay, phoneHref } from "@/lib/contact";
import s from "@/components/landing/Landing.module.css";
import lightRays from "@/components/landing/art/light-rays.webp";

const journalGuides = [
  { slug: "corporate-website-handover-checklist", icon: "web", englishTitle: "What to check when your company website is handed over" },
  { slug: "custom-ecommerce-website-or-ready-made-template", icon: "store", englishTitle: "A custom online store or a ready-made theme?" },
  { slug: "instagram-management-outsourcing-access-handover-checklist", icon: "layers", englishTitle: "Outsourcing Instagram management: access and handover" },
] as const;

function Tag({ children }: { children: ReactNode }) {
  return <span className={s.tag}><i aria-hidden="true" data-fms-halo="dot" />{children}</span>;
}

function Intro({ words, id, body, children }: { words: readonly [string, string, string]; id?: string; body?: string; children?: ReactNode }) {
  return <header className={s.sectionIntro}>
    <Tag>{words[0]}</Tag>
    <h2 id={id}>{words[1]}{" "}<span>{words[2]}</span></h2>
    {body && <p>{body}</p>}
    {children}
  </header>;
}

export function HomePage({ locale }: { locale: Locale }) {
  const t = landingCopy[locale];
  const content = copy[locale];
  const prices = localePath(locale, "/pricing");
  const faq = content.faq.items.slice(0, 3);
  return <div className={s.landing} id="top" style={{ "--studio-rays": `url("${lightRays.src}")` } as CSSProperties}>
    <LandingMotion key={locale} />
    <JsonLd data={{
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: faq.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
    }} />
    <section className={s.hero} aria-labelledby="home-title">
      <Horizon />
      <div className={s.heroInner}>
        <div className={s.studioTag}><b dir="ltr" data-fms-halo="badge">FMS</b>{t.studio}</div>
        <h1 id="home-title"><span>{content.hero.title}</span>{" "}<strong>{content.hero.accent}</strong></h1>
        <p>{content.hero.body}</p>
        <div className={s.heroActions}>
          <a className={s.whiteButton} href="#contact">{callbackLabel[locale]}</a>
          <Link className={s.glassButton} href={prices}>{t.comparePlans}</Link>
        </div>
        <BrandReel locale={locale} />
      </div>
    </section>
    <section id="about" className={s.about} aria-labelledby="about-statement">
      <Tag>{t.aboutTag}</Tag>
      <h2 id="about-statement">{t.about}</h2>
      <Link className={s.redButton} href={localePath(locale, "/about")}>{t.aboutLink}</Link>
    </section>

    <section id="services" className={s.beamPanel} aria-labelledby="services-title">
      <Intro words={t.services} id="services-title" body={t.servicesBody}><Link href={localePath(locale, "/services")} className={s.redButton}>{t.servicesLink}</Link></Intro>
      <div className={s.servicePreviews}>
        {content.services.map((service, index) => (
          <Link key={service.slug} href={localePath(locale, "/services/" + service.slug)} className={s.serviceCard}>
            <div className={s.cardTop}><span className={s.iconDisc}><Icon name={index === 0 ? "web" : "layers"} /></span><Icon name="share" /></div>
            <h3>{service.title}</h3><p>{service.summary}</p>
            <div className={s.servicePhoto}><FmsServiceArt index={index === 0 ? 0 : 4} locale={locale} /></div>
          </Link>
        ))}
      </div>
    </section>

    <section id="work" className={s.portfolio} aria-labelledby="work-title">
      <Intro words={t.work} id="work-title" body={t.workBody}><Link className={s.redButton} href={localePath(locale,"/work")}>{t.allWork}</Link></Intro>
      <WorkEdition locale={locale} />
    </section>

    <section id="pricing" className={s.pricing} aria-labelledby="pricing-title">
      <Intro words={t.pricing} id="pricing-title" body={t.pricingBody}>
        <Link className={s.redButton} href={prices}>{t.comparePlans}</Link>
      </Intro>
      <div className={s.ratePreview} data-fms-reveal="panel">
        {content.services.map(service => {
          const plan = service.plans?.[0];
          if (!plan) return null;
          return <Link key={service.slug} href={localePath(locale, "/services/" + service.slug + "#service-pricing-title")}>
            <span>{service.title}</span>
            <strong>{(service.pricing ?? content.pricing).from} <bdi>{plan.price}</bdi> {plan.unit}</strong>
            <Icon name="share" />
          </Link>;
        })}
      </div>
    </section>

    <section id="process" className={s.orbitSection} aria-labelledby="approach-title">
      <Orbit />
      <Intro words={t.features} id="approach-title" body={t.featuresBody}><Link className={s.redButton} href={localePath(locale, "/about#process")}>{locale === "fa" ? "روش کار تیم" : "How our team works"}</Link></Intro>
    </section>
    <section className={s.journal} aria-labelledby="journal-title">
      <Intro words={t.journal} id="journal-title"><Link className={s.redButton} href="/blog" hrefLang="fa">{t.journalLink}</Link></Intro>
      <div className={s.threeGrid}>{journalGuides.map(({ slug, icon, englishTitle }) => {
        const post = findPersianBlogPost(slug);
        if (!post) return null;
        return <Link key={slug} href={"/blog/"+slug} hrefLang="fa" className={s.story}>
          <div className={s.cardTop}><span className={s.smallIcon}><Icon name={icon}/></span><small>{formatNumber(post.readingTime, locale)} {t.readingTime}</small></div>
          <h3>{locale === "fa" ? post.title : englishTitle}</h3>
          <span>{t.read}<Icon name="share" /></span>
        </Link>;
      })}</div>
    </section>

    <section id="faq" className={s.faq} aria-labelledby="faq-title">
      <Intro words={t.faq} id="faq-title" body={t.faqBody}><Link href={localePath(locale,"/faq")} className={s.textButton}>{t.faqAll}<Icon name="share" /></Link></Intro>
      <div className={s.faqList}>{faq.map(item => <details key={item.question}><summary>{item.question}<i aria-hidden="true"/></summary><p>{item.answer}</p></details>)}</div>
    </section>
    <section id="contact" className={s.contact} aria-labelledby="contact-title" data-fms-halo="wash">
      <Intro words={t.contact} id="contact-title" body={t.contactBody} />
      <div className={s.homeCallback}>
        <CallbackForm locale={locale} />
        <Link href={localePath(locale, "/contact")} className={s.contactPageLink}>{content.nav.contact}<Icon name="share" /></Link>
        <a className={s.directPhone} href={phoneHref}><bdi dir="ltr">{phoneDisplay}</bdi></a>
      </div>
    </section>
  </div>;
}
