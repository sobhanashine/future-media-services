import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { copy, formatIndex, type Locale, type PricingCopy, type PricingPlan } from "@/content/site";
import { phoneHref } from "@/lib/contact";

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

  return (
    <div className="pricing-plans" aria-labelledby={labelledBy}>
      {plans.map((plan, index) => (
        <article className="pricing-plan" data-featured={plan.featured || undefined} data-reveal key={plan.name}>
          <header>
            <div>
              <span>{formatIndex(index + 1, locale)}</span>
              {plan.featured && <small>{text.featured}</small>}
            </div>
            <p>{plan.audience}</p>
            <h3>{plan.name}</h3>
          </header>
          <div className="pricing-plan__price">
            <small>{text.from}</small>
            <strong>{plan.price}</strong>
            <span>{plan.unit}</span>
          </div>
          <p className="pricing-plan__description">{plan.description}</p>
          <div className="pricing-plan__scope">
            <div>
              <span>{text.includes}</span>
              <b>{plan.timeline}</b>
            </div>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <span aria-hidden="true">+</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <a href={phoneHref} className="button pricing-plan__cta">
            {copy[locale].nav.start}
            <ArrowIcon />
          </a>
        </article>
      ))}
    </div>
  );
}
