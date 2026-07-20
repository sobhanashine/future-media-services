import Link from "next/link";
import { JsonLd } from "@/components/layout/JsonLd";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { copy, formatIndex, localePath, type Locale, type Service } from "@/content/site";

export function ServiceDetailPage({ locale, service }: { locale: Locale; service: Service }) {
  const content = copy[locale];
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
        <aside className="service-detail__cta" data-reveal>
          <div>
            <span>FMS / {service.slug.toUpperCase()}</span>
            <h2>{locale === "fa" ? "این مسیر برای پروژه شما مناسب است؟" : "Is this the right path for your project?"}</h2>
          </div>
          <Link href={localePath(locale, "/contact")} className="button button--light">
            {content.nav.start}
            <ArrowIcon />
          </Link>
        </aside>
      </article>
    </>
  );
}
