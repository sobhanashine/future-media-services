import Link from "next/link";
import { FutureCoreLoader } from "@/components/canvas/FutureCoreLoader";
import { JsonLd } from "@/components/layout/JsonLd";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { copy, localePath, type Locale } from "@/content/site";
import { organizationJsonLd } from "@/lib/metadata";

export function HomePage({ locale }: { locale: Locale }) {
  const content = copy[locale];

  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <section className="hero container-shell">
        <div className="hero__copy">
          <p className="eyebrow" data-hero-reveal>{content.hero.eyebrow}</p>
          <h1 data-hero-reveal>
            <span>{content.hero.title}</span>
            <strong>{content.hero.accent}</strong>
          </h1>
          <p className="hero__body" data-hero-reveal>{content.hero.body}</p>
          <div className="hero__actions" data-hero-reveal>
            <Link href={localePath(locale, "/contact")} className="button">
              {content.hero.primary}
              <ArrowIcon />
            </Link>
            <a href="#process" className="button button--ghost">
              {content.hero.secondary}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div className="hero__visual" data-hero-reveal>
          <FutureCoreLoader label={content.hero.canvasLabel} />
        </div>
        <div className="hero__index" aria-hidden="true">
          <span>FMS / 26</span>
          <span>SCROLL ↓</span>
        </div>
      </section>

      <div className="capability-strip" aria-label={locale === "fa" ? "توانمندی‌ها" : "Capabilities"}>
        <div className="container-shell">
          {content.capabilityStrip.map((item, index) => (
            <span key={item}>
              <b>0{index + 1}</b>
              {item}
            </span>
          ))}
        </div>
      </div>

      <section className="section-block container-shell" id="services">
        <SectionHeading
          eyebrow={content.sections.servicesEyebrow}
          title={content.sections.servicesTitle}
          body={content.sections.servicesBody}
        />
        <div className="services-grid">
          {content.services.map((service, index) => (
            <Link
              key={service.slug}
              href={localePath(locale, `/services/${service.slug}`)}
              className="service-card"
              data-reveal
            >
              <div className="service-card__top">
                <span>{service.label}</span>
                <b>0{index + 1}</b>
              </div>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <span className="card-link">
                {content.common.explore}
                <ArrowIcon />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="work-section section-block" id="work">
        <div className="container-shell">
          <SectionHeading eyebrow={content.sections.workEyebrow} title={content.sections.workTitle} />
          <div className="work-empty" data-reveal>
            <div className="work-empty__visual" aria-hidden="true">
              <span>FMS</span>
              <i />
              <b>CASE / PENDING</b>
            </div>
            <div className="work-empty__copy">
              <span className="status-pill">{content.work.emptyLabel}</span>
              <h3>{content.work.emptyTitle}</h3>
              <p>{content.work.emptyBody}</p>
              <Link href={localePath(locale, "/work")} className="text-link">
                {content.common.viewWork}
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block container-shell process-section" id="process">
        <SectionHeading eyebrow={content.sections.processEyebrow} title={content.sections.processTitle} />
        <ol className="process-list">
          {content.process.map((step, index) => (
            <li key={step.title} data-reveal>
              <span>0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="why-section">
        <div className="container-shell why-section__grid">
          <div className="why-section__title" data-reveal>
            <p className="eyebrow eyebrow--light">{content.sections.whyEyebrow}</p>
            <h2>{content.sections.whyTitle}</h2>
            <div className="why-monogram" aria-hidden="true">F</div>
          </div>
          <div className="reason-list">
            {content.reasons.map((reason, index) => (
              <article key={reason.title} data-reveal>
                <span>0{index + 1}</span>
                <div>
                  <h3>{reason.title}</h3>
                  <p>{reason.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block container-shell social-section">
        <SectionHeading eyebrow={content.sections.socialEyebrow} title={content.sections.socialTitle} />
        <div className="social-grid">
          {content.social.map((item, index) => (
            <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="social-card" data-reveal>
              <div className={`social-card__visual social-card__visual--${index + 1}`} aria-hidden="true">
                <span>{item.tag}</span>
                <b>FMS</b>
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <span className="card-link">Instagram <ArrowIcon /></span>
            </a>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <div className="container-shell" data-reveal>
          <p className="eyebrow eyebrow--light">FUTURE / STARTS / NOW</p>
          <h2>{content.sections.finalTitle}</h2>
          <div>
            <p>{content.sections.finalBody}</p>
            <Link href={localePath(locale, "/contact")} className="button button--light">
              {content.common.projectPrompt}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
