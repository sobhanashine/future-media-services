import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { persianSeoMetadata } from "@/content/seo";
import { ServiceLink } from "@/components/pages/ServiceLink";
import { PageIntro } from "@/components/ui/PageIntro";
import { copy, formatIndex, type Locale } from "@/content/site";

export function ServicesPage({ locale }: { locale: Locale }) {
  const content = copy[locale];
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
    </>
  );
}
