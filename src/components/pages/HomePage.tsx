import { JsonLd } from "@/components/layout/JsonLd";
import { FaqSection } from "@/components/pages/FaqSection";
import { ProjectGallery } from "@/components/pages/ProjectGallery";
import { ServiceLink } from "@/components/pages/ServiceLink";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { copy, formatIndex, type Locale } from "@/content/site";
import { phoneHref } from "@/lib/contact";
import { organizationJsonLd } from "@/lib/metadata";

export function HomePage({ locale }: { locale: Locale }) {
  const content = copy[locale];

  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <section className="hero hero--type-only container-shell">
        <div className="hero__copy">
          <p className="eyebrow" data-hero-reveal>{content.hero.eyebrow}</p>
          <h1 data-hero-reveal>
            <span>{content.hero.title}</span>
            <strong>{content.hero.accent}</strong>
          </h1>
          <p className="hero__body" data-hero-reveal>{content.hero.body}</p>
          <div className="hero__actions" data-hero-reveal>
            <a href={phoneHref} className="button">
              {content.hero.primary}
              <ArrowIcon />
            </a>
            <a href="#services" className="button button--ghost">
              {content.hero.secondary}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section-block container-shell" id="services">
        <SectionHeading
          eyebrow={content.sections.servicesEyebrow}
          title={content.sections.servicesTitle}
          body={content.sections.servicesBody}
        />
        <div className="services-grid">
          {content.services.map((service, index) => (
            <ServiceLink
              key={service.slug}
              locale={locale}
              service={service}
              className="service-card"
            >
              <div className="service-card__top">
                <span>{service.label}</span>
                <b>{formatIndex(index + 1, locale)}</b>
              </div>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <span className="card-link">
                {content.common.explore}
                <ArrowIcon />
              </span>
            </ServiceLink>
          ))}
        </div>
      </section>

      <section className="work-section section-block" id="work">
        <div className="container-shell">
          <SectionHeading
            eyebrow={content.sections.workEyebrow}
            title={content.sections.workTitle}
            body={content.sections.workBody}
          />
          <ProjectGallery locale={locale} showAllLink />
        </div>
      </section>

      <section className="section-block container-shell process-section" id="process">
        <SectionHeading
          eyebrow={content.sections.processEyebrow}
          title={content.sections.processTitle}
          body={content.sections.processBody}
        />
        <div className="process-roadmap">
          <div className="process-roadmap__legend" aria-hidden="true">
            <span>FMS / ROUTE</span>
            <span>{formatIndex(1, locale)} — {formatIndex(content.process.length, locale)}</span>
          </div>
          <ol className="process-list" data-process-route>
            {content.process.map((step, index) => (
              <li key={step.title} data-process-step>
                <div className="process-list__marker" aria-hidden="true">
                  <span>{formatIndex(index + 1, locale)}</span>
                  <i />
                </div>
                <article>
                  <p className="process-list__output">{step.output}</p>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="why-section">
        <div className="container-shell">
          <header className="why-section__intro" data-reveal>
            <p className="eyebrow eyebrow--light">{content.sections.whyEyebrow}</p>
            <h2>{content.sections.whyTitle}</h2>
            <p>{content.sections.whyBody}</p>
          </header>
          <div className="why-section__stage">
            <div className="why-orbit" aria-hidden="true" data-reveal>
              <span className="why-orbit__ring why-orbit__ring--one" />
              <span className="why-orbit__ring why-orbit__ring--two" />
              <span className="why-orbit__axis why-orbit__axis--x" />
              <span className="why-orbit__axis why-orbit__axis--y" />
              <strong>FMS</strong>
              {content.reasons.map((reason, index) => (
                <b className={`why-orbit__tag why-orbit__tag--${index + 1}`} key={reason.tag}>
                  {reason.tag}
                </b>
              ))}
            </div>
            <div className="reason-grid">
              {content.reasons.map((reason, index) => (
                <article key={reason.title} data-reveal>
                  <div>
                    <span>{formatIndex(index + 1, locale)}</span>
                    <small>{reason.tag}</small>
                  </div>
                  <h3>{reason.title}</h3>
                  <p>{reason.body}</p>
                </article>
              ))}
            </div>
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

      <FaqSection locale={locale} limit={4} />

      <section className="final-cta">
        <div className="container-shell" data-reveal>
          <p className="eyebrow eyebrow--light">FUTURE / STARTS / NOW</p>
          <h2>{content.sections.finalTitle}</h2>
          <div>
            <p>{content.sections.finalBody}</p>
            <a href={phoneHref} className="button button--light">
              {content.common.projectPrompt}
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
