import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { PricingPlans } from "@/components/pages/PricingPlans";
import { ServiceLink } from "@/components/pages/ServiceLink";
import { PageIntro } from "@/components/ui/PageIntro";
import { copy, formatIndex, type Locale } from "@/content/site";

export function ServicesPage({ locale }: { locale: Locale }) {
  const content = copy[locale];
  const websitePlans = content.services.find((service) => service.slug === "web-development")?.plans ?? [];
  const intro = locale === "fa"
    ? "برای طراحی و توسعه وب‌سایت و مدیریت محتوای اینستاگرام، پلن‌ها و جزئیات هر خدمت را همین‌جا بررسی کنید."
    : "Review the plans and details for website design, development and Instagram content management directly on this site.";

  return (
    <>
      <PageIntro locale={locale} eyebrow={content.nav.services} title={content.sections.servicesTitle} body={intro} />
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
    </>
  );
}
