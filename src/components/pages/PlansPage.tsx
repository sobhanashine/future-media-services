import { PlanFinder } from "@/components/landing/PlanFinder";
import { PageIntro } from "@/components/ui/PageIntro";
import { landingCopy } from "@/content/landing";
import type { Locale } from "@/content/site";
import s from "./ServicePortfolio.module.css";

export function PlansPage({ locale }: { locale: Locale }) {
  const fa = locale === "fa";
  return <div className={s.directory}>
    <PageIntro locale={locale} eyebrow={fa ? "تعرفه‌های FMS" : "FMS pricing"}
      title={fa ? "تعرفهٔ طراحی سایت و مدیریت اینستاگرام" : "Website and Instagram pricing"}
      body={landingCopy[locale].pricingBody}/>
    <section id="pricing" aria-label={landingCopy[locale].comparePlans} className={`container-shell ${s.offers}`}>
      <PlanFinder locale={locale}/>
    </section>
  </div>;
}
