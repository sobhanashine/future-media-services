import Link from "next/link";
import { JsonLd } from "@/components/layout/JsonLd";
import { PricingPlans } from "@/components/pages/PricingPlans";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { copy, formatIndex, localePath, type Locale, type Service } from "@/content/site";
import { phoneHref } from "@/lib/contact";

export function ServiceDetailPage({ locale, service }: { locale: Locale; service: Service }) {
  const content = copy[locale];
  const pricingCopy = service.pricing ?? content.pricing;
  const serviceUrl = `https://futuremservices.com${localePath(locale, `/services/${service.slug}`)}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.summary,
          url: serviceUrl,
          provider: { "@type": "Organization", name: "Future Media Services" },
        }}
      />
      <article className="service-detail container-shell">
        <Link href={localePath(locale, "/services")} className="back-link" data-hero-reveal>
          <span aria-hidden="true">←</span>
          {content.common.allServices}
        </Link>
        <header>
          <p className="eyebrow" data-hero-reveal>{service.label}</p>
          <h1 data-hero-reveal>{service.title}</h1>
          <p data-hero-reveal>{service.summary}</p>
        </header>
        <div className="service-detail__body">
          <section data-reveal>
            <p className="eyebrow">{locale === "fa" ? "مسئله" : "The problem"}</p>
            <h2>{service.problem}</h2>
          </section>
          <section data-reveal>
            <p className="eyebrow">{locale === "fa" ? "خروجی‌های قابل تعریف" : "Possible deliverables"}</p>
            <ul>
              {service.deliverables.map((item, index) => (
                <li key={item}><span>{formatIndex(index + 1, locale)}</span>{item}</li>
              ))}
            </ul>
          </section>
        </div>
        {service.plans && (
          <section className="service-detail__pricing" aria-labelledby="service-pricing-title">
            <header className="pricing-section__intro" data-reveal>
              <p className="eyebrow">{pricingCopy.eyebrow}</p>
              <h2 id="service-pricing-title">{pricingCopy.title}</h2>
              <p>{pricingCopy.body}</p>
            </header>
            <PricingPlans locale={locale} plans={service.plans} labelledBy="service-pricing-title" labels={pricingCopy} />
            {service.sharedPlanFeatures && service.sharedPlanTitle && (
              <div className="shared-plan-features" data-reveal>
                <h3>{service.sharedPlanTitle}</h3>
                <ul>
                  {service.sharedPlanFeatures.map((feature) => (
                    <li key={feature}>
                      <span aria-hidden="true">+</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="pricing-disclaimer" data-reveal>{pricingCopy.disclaimer}</p>
          </section>
        )}
        <aside className="service-detail__cta" data-reveal>
          <div>
            <span>FMS / {service.slug.toUpperCase()}</span>
            <h2>{locale === "fa" ? "برای انتخاب پلن مناسب تماس بگیرید." : "Call to choose the right plan."}</h2>
          </div>
          <a href={phoneHref} className="button button--light">
            {content.nav.start}
            <ArrowIcon />
          </a>
        </aside>
      </article>
    </>
  );
}
