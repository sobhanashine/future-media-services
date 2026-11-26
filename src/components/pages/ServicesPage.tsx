import { interfaceCopy } from "@/content/interface";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { FmsServiceArt } from "@/components/landing/FmsArtwork";
import { persianSeoMetadata } from "@/content/seo";
import { ServiceSpecialtyLinks } from "./ServiceSpecialtyLinks";
import { ServiceLink } from "@/components/pages/ServiceLink";
import { PageIntro } from "@/components/ui/PageIntro";
import { copy, type Locale } from "@/content/site";
import s from "./ServicePortfolio.module.css";

export function ServicesPage({ locale }: { locale: Locale }) {
  const content = copy[locale];
  const intro = content.sections.servicesPageIntro;

  return (
    <div className={s.directory}>
      <PageIntro
        locale={locale}
        eyebrow={content.nav.services}
        title={locale === "fa" ? persianSeoMetadata.services.heading : content.sections.servicesTitle}
        body={intro}
      />
      <section className={`inner-section container-shell ${s.offers}`}>
        <div className={`service-list ${s.offerGrid}`}>
          {content.services.map((service, index) => (
            <article key={service.slug} className={s.offer}>
              <ServiceLink locale={locale} service={service} className={s.offerMain}>
                <div className={s.cover} aria-hidden="true"><FmsServiceArt index={index === 0 ? 0 : 4} locale={locale} /></div>
                <div className={s.offerCopy}>
                  <small>{service.label}</small>
                  <h2>{service.title}</h2>
                  <p>{service.summary}</p>
                </div>
                <div className={s.offerFoot}>
                  <span>{interfaceCopy[locale].processPricing}</span><ArrowIcon />
                </div>
              </ServiceLink>
              <ServiceSpecialtyLinks service={service} locale={locale} />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
