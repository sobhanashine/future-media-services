import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { PersianSeoGuide } from "@/components/pages/PersianSeoGuide";
import { persianSeoMetadata } from "@/content/seo";
import { PricingPlans } from "@/components/pages/PricingPlans";
import { ServiceLink } from "@/components/pages/ServiceLink";
import { PageIntro } from "@/components/ui/PageIntro";
import { copy, formatIndex, type Locale } from "@/content/site";

export function ServicesPage({ locale }: { locale: Locale }) {
  const content = copy[locale];
  const websitePlans = content.services.find((service) => service.slug === "web-development")?.plans ?? [];
  const intro = content.sections.servicesPageIntro;

  return (
    <>
      <PageIntro
        locale={locale}
        eyebrow={content.nav.services}
        title={locale === "fa" ? persianSeoMetadata.services.heading : content.sections.servicesTitle}
        body={intro}
      />
      <section className="inner-section container-shell">
        <div className="service-list">
          {content.services.map((service, index) => (
            <ServiceLink key={service.slug} locale={locale} service={service}>
              <span>{formatIndex(index + 1, locale)}</span>
              <div>
                <small>{service.label}</small>
                <h2>{service.title}</h2>
                <p>{service.summary}</p>
              </div>
              <ArrowIcon />
            </ServiceLink>
          ))}
        </div>
      </section>
      <section className="pricing-section inner-pricing container-shell" id="pricing" aria-labelledby="services-pricing-title">
        <header className="pricing-section__intro" data-reveal>
          <p className="eyebrow">{content.pricing.eyebrow}</p>
          <h2 id="services-pricing-title">{content.pricing.title}</h2>
          <p>{content.pricing.body}</p>
        </header>
        <PricingPlans locale={locale} plans={websitePlans} labelledBy="services-pricing-title" />
        <p className="pricing-disclaimer" data-reveal>{content.pricing.disclaimer}</p>
      </section>
      {locale === "fa" ? <PersianSeoGuide /> : null}
    </>
  );
}
