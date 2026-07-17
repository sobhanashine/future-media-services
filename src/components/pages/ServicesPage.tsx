import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { PageIntro } from "@/components/ui/PageIntro";
import { copy, localePath, type Locale } from "@/content/site";

export function ServicesPage({ locale }: { locale: Locale }) {
  const content = copy[locale];
  const intro = locale === "fa"
    ? "از تصمیم‌های اولیه تا محصولی که در دست مخاطب قرار می‌گیرد، هر خدمت جای مشخصی در یک مسیر متصل دارد."
    : "From the earliest decision to the experience in your audience’s hands, each service has a clear role in one connected path.";

  return (
    <>
      <PageIntro locale={locale} eyebrow={content.nav.services} title={content.sections.servicesTitle} body={intro} />
      <section className="inner-section container-shell">
        <div className="service-list">
          {content.services.map((service, index) => (
            <Link key={service.slug} href={localePath(locale, `/services/${service.slug}`)} data-reveal>
              <span>0{index + 1}</span>
              <div>
                <small>{service.label}</small>
                <h2>{service.title}</h2>
                <p>{service.summary}</p>
              </div>
              <ArrowIcon />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
