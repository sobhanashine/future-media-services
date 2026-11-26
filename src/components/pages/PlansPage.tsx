import { interfaceCopy } from "@/content/interface";
import { PlanFinder } from "@/components/landing/PlanFinder";
import { PageIntro } from "@/components/ui/PageIntro";
import { landingCopy } from "@/content/landing";
import type { Locale } from "@/content/site";
import s from "./ServicePortfolio.module.css";

export function PlansPage({ locale }: { locale: Locale }) {
  return <div className={s.directory}>
    <PageIntro locale={locale} eyebrow={interfaceCopy[locale].pricingLabel}
      title={interfaceCopy[locale].pricingTitle}
      body={landingCopy[locale].pricingBody}/>
    <section id="pricing" aria-label={landingCopy[locale].comparePlans} className={`container-shell ${s.offers}`}>
      <PlanFinder locale={locale}/>
    </section>
  </div>;
}
