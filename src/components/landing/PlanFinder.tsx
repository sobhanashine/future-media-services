import { Fragment } from "react";
import Link from "next/link";
import { instagramRateCopy } from "@/content/instagram-rates";
import { landingCopy } from "@/content/landing";
import { copy, localePath, type Locale } from "@/content/site";
import { contactLabel } from "@/lib/contact";
import { Icon } from "./StudioVisuals";
import s from "./PlanFinder.module.css";

export function PlanFinder({ locale }: { locale: Locale }) {
  const { services, pricing } = copy[locale];
  const t = landingCopy[locale].finder;

  return (
    <div className={s.finder} data-fms-reveal="panel">
      <fieldset className={s.serviceSwitch}>
        <legend className={s.visuallyHidden}>{t.service}</legend>
        {services.map((service, index) => (
          <label key={service.slug}>
            <input type="radio" name="finder-service" value={service.slug} defaultChecked={index === 0} aria-controls={`finder-${service.slug}`} />
            <Icon name={index === 0 ? "web" : "layers"} />
            {t.labels[index]}
          </label>
        ))}
      </fieldset>

      {services.map((service) => {
        const rates = service.pricing ?? pricing;
        return (
          <div key={service.slug} id={`finder-${service.slug}`} className={s.servicePanel} data-service={service.slug}>
            <fieldset className={s.planGrid}>
              <legend className={s.visuallyHidden}>{t.plan} · {service.title}</legend>
              {service.plans?.map((plan, index) => {
                const detailId = `finder-${service.slug}-${index}`;
                return (
                  <Fragment key={plan.name}>
                    <label className={s.planChoice}>
                      <input type="radio" name={`finder-plan-${service.slug}`} value={index} defaultChecked={index === 0} aria-controls={detailId} />
                      <span className={s.choiceName}>{plan.name}<i aria-hidden="true" /></span>
                      <span className={s.choicePrice}>{rates.from} <bdi>{plan.price}</bdi> {plan.unit}</span>
                    </label>
                    <article className={s.planDetails} id={detailId} aria-labelledby={`${detailId}-title`}>
                      <div className={s.detailHeading}>
                        <div>
                          <h3 id={`${detailId}-title`}>{plan.name}</h3>
                          <p>{plan.audience}{plan.featured && <span className={s.recommended}> · {rates.featured}</span>}</p>
                        </div>
                        <span className={s.timeline}>{plan.timeline}</span>
                      </div>
                      <ul className={s.features}>{plan.features.map((feature) => (
                        <li key={feature}><Icon name="check" />{feature}</li>
                      ))}</ul>
                      {plan.paymentNote && <p className={s.payment}>{plan.paymentNote}</p>}
                      <div className={s.actions}>
                        <Link className={s.call} href={localePath(locale, "/contact#message")}>{contactLabel[locale]}</Link>
                        <Link href={localePath(locale, `/services/${service.slug}#service-pricing-title`)}>{t.fullPricing}<Icon name="share" /></Link>
                      </div>
                    </article>
                  </Fragment>
                );
              })}
            </fieldset>
            {service.sharedPlanFeatures?.length && <details className={s.shared}>
              <summary>{service.sharedPlanTitle}<i aria-hidden="true" /></summary>
              <ul className={s.features}>{service.sharedPlanFeatures.map((feature) => <li key={feature}><Icon name="check" />{feature}</li>)}</ul>
            </details>}
            <p className={s.disclaimer}>{rates.disclaimer}</p>
            {service.slug === "instagram-management" && <div className={s.actions}>
              <Link href={localePath(locale, "/services/instagram-management#instagram-individual-rates")}>{instagramRateCopy[locale].more}<Icon name="share" /></Link>
            </div>}
          </div>
        );
      })}
    </div>
  );
}
