import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { copy, localePath, type Locale, type PricingCopy, type PricingPlan } from "@/content/site";
import { callbackLabel, phoneHref } from "@/lib/contact";

export function PricingPlans({
  locale,
  plans,
  labelledBy,
  labels,
}: {
  locale: Locale;
  plans: PricingPlan[];
  labelledBy?: string;
  labels?: PricingCopy;
}) {
  const text = labels ?? copy[locale].pricing;
  const carousel = text.mobileCarousel;
  const hintId = carousel && `${labelledBy ?? "pricing-plans"}-swipe-hint`;

  return (
    <>
      {carousel && (
        <p className="pricing-plans__hint" id={hintId}>
          <span aria-hidden="true">↔</span>
          {carousel.hint}
        </p>
      )}
      <div
        className={carousel ? "pricing-plans pricing-plans--carousel" : "pricing-plans"}
        aria-labelledby={labelledBy}
        aria-describedby={hintId}
      >
        {plans.map((plan) => (
          <article className="pricing-plan" data-featured={plan.featured || undefined} data-reveal key={plan.name}>
            <header>
              {plan.featured && <small className="plan-recommendation">{text.featured}</small>}
              <h3>{plan.name}</h3>
              <p>{plan.audience}</p>
            </header>
            <div className="pricing-plan__price">
              <small>{text.from}</small>
              <strong>{plan.price}</strong>
              <span>{plan.unit}</span>
            </div>
            <p className="pricing-plan__description">{plan.description}</p>
            {plan.paymentNote && <a href={phoneHref} className="pricing-plan__payment-note">{plan.paymentNote}</a>}
            <div className="pricing-plan__scope">
              <div>
                <span>{text.includes}</span>
                <b>{plan.timeline}</b>
              </div>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span aria-hidden="true">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <Link href={localePath(locale, "/contact#callback")} className="button pricing-plan__cta">
              {callbackLabel[locale]}
              <ArrowIcon />
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
