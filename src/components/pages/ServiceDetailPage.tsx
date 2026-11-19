import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { JsonLd } from "@/components/layout/JsonLd";
import { PricingPlans } from "@/components/pages/PricingPlans";
import { InstagramRates } from "@/components/pages/InstagramRates";
import { relatedBlogPosts } from "@/content/blog";
import { copy, formatIndex, localePath, type Locale, type Service } from "@/content/site";
import { callbackLabel } from "@/lib/contact";
import { ServiceSpecialtyLinks } from "./ServiceSpecialtyLinks";
import { siteUrl } from "@/lib/metadata";
import { FmsServiceArt } from "@/components/landing/FmsArtwork";
import s from "./ServicePortfolio.module.css";

export function ServiceDetailPage({ locale, service }: { locale: Locale; service: Service }) {
  const content = copy[locale];
  const pricingCopy = service.pricing ?? content.pricing;
  const serviceUrl = new URL(localePath(locale, `/services/${service.slug}`), siteUrl).toString();
  const monthlyOffers = service.plans?.flatMap(({ name, monthlyToman }) => {
    if (monthlyToman === undefined) return [];
    return [{
      "@type": "Offer",
      name,
      url: serviceUrl + "#service-pricing-title",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceCurrency: "IRR",
        price: monthlyToman * 10,
        referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
      },
    }];
  });
  const relatedGuides = locale === "fa"
    ? relatedBlogPosts(`/services/${service.slug}`)
    : [];

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
          offers: monthlyOffers?.length ? monthlyOffers : undefined,
        }}
      />
      <article className={`service-detail container-shell ${s.service}`}>
        <Link href={localePath(locale, "/services")} className="back-link" data-hero-reveal>
          <ArrowIcon direction="left" />
          {content.common.allServices}
        </Link>
        <header className="service-detail__hero">
          <div className="service-detail__hero-copy">
            <p className="eyebrow" data-hero-reveal>{service.label}</p>
            <h1 data-hero-reveal>{service.title}</h1>
            <p className={s.heroSummary} data-hero-reveal>{service.summary}</p>
            {service.plans && (
              <a href="#service-pricing-title" className="button" data-hero-reveal>
                {locale === "fa" ? "مقایسهٔ پلن‌ها" : "Compare plans"}<ArrowIcon direction="down" />
              </a>
            )}
          </div>
          <div className={s.serviceArt} data-fms-reveal="media">
            <div className={s.proof} aria-hidden="true"><FmsServiceArt index={service.slug === "web-development" ? 1 : 4} locale={locale} /></div>
            <figure className="service-detail__hero-media">
              <Image
                src={service.heroImage.src}
                alt={service.heroImage.alt}
                fill
                sizes="(max-width: 879px) 28vw, 15vw"
              />
            </figure>
          </div>
        </header>
        <section className={s.scopeNav} aria-label={locale === "fa" ? "خدمات این بخش" : "Services in this category"}>
          <h2>{locale === "fa" ? "کدام خدمت را می‌خواهید؟" : "Which service do you need?"}</h2>
          <ServiceSpecialtyLinks service={service} locale={locale} />
        </section>
        <div className="service-detail__body">
          <section data-reveal>
            <p className="eyebrow">{content.serviceDetail.problem}</p>
            <h2>{service.problem}</h2>
          </section>
          <section data-reveal>
            <p className="eyebrow">{content.serviceDetail.deliverables}</p>
            <ul>
              {service.deliverables.map((item) => (
                <li key={item}><span aria-hidden="true">✓</span>{item}</li>
              ))}
            </ul>
          </section>
        </div>
        <section className="service-detail__content" data-reveal>
          <div>
            <p className="eyebrow">{content.serviceDetail.approach}</p>
            <h2>{service.overview}</h2>
          </div>
          <ol>
            {service.workflow.map((step, index) => (
              <li key={step.title}>
                <span>{formatIndex(index + 1, locale)}</span>
                <div><h3>{step.title}</h3><p>{step.body}</p></div>
              </li>
            ))}
          </ol>
        </section>
        <section className="service-detail__fit" data-reveal>
          <p className="eyebrow">{content.serviceDetail.idealFor}</p>
          <ul>{service.idealFor.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
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
        {service.slug === "instagram-management" && <InstagramRates locale={locale} />}
        {relatedGuides.length > 0 && (
          <section className="service-detail__fit blog-post__related" aria-labelledby="service-related-guides-title" data-reveal>
            <p className="eyebrow">دانش‌نامه</p>
            <h2 id="service-related-guides-title">راهنماهای مرتبط</h2>
            <nav aria-labelledby="service-related-guides-title">
              {relatedGuides.map((post) => (
                <Link key={post.slug} href={localePath("fa", `/blog/${post.slug}`)}>
                  {post.title} <ArrowIcon />
                </Link>
              ))}
            </nav>
          </section>
        )}
        <aside className="service-detail__cta" aria-labelledby="service-cta-title" data-reveal>
          <h2 id="service-cta-title">
            {content.serviceDetail.ctaTitle}
          </h2>
          <Link href={localePath(locale, "/contact#callback")} className="button button--light">
            {callbackLabel[locale]}
          </Link>
        </aside>
      </article>
    </>
  );
}
