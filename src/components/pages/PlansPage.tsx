import Link from "next/link";
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
    {locale === "fa" && (
      <section className="container-shell service-detail__content" aria-labelledby="website-budget">
        <h2 id="website-budget">برای طراحی وب‌سایت ارزان از کجا شروع کنیم؟</h2>
        <div>
          <p>برای شروع با بودجهٔ محدود، صفحه‌ها و امکانات ضروری را مشخص کنید. برای یک سایت معرفی، معرفی خدمات، نمونه‌کارها و راه تماس نقطهٔ شروع خوبی‌اند. اگر فروش آنلاین، رزرو یا زبان دوم فعلاً ضروری نیست، آن را برای مرحلهٔ بعد بگذارید.</p>
          <p>در مقایسهٔ پیشنهادها، هزینهٔ دامنه، هاست، امکانات اضافه و شرایط تمدید پشتیبانی را هم بررسی کنید.</p>
          <Link className="text-link" href="/services/web-development/personal-website">جزئیات پلن طراحی سایت شخصی</Link>
        </div>
      </section>
    )}
  </div>;
}
