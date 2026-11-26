import { interfaceCopy } from "@/content/interface";
import Link from "next/link";
import { JsonLd } from "@/components/layout/JsonLd";
import { FmsServiceArt } from "@/components/landing/FmsArtwork";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { instagramRateCopy, instagramRates } from "@/content/instagram-rates";
import { specialtyPath, type Specialty } from "@/content/service-specialties";
import { copy, findService, formatNumber, localePath, type Locale } from "@/content/site";
import { callbackLabel } from "@/lib/contact";
import { siteUrl } from "@/lib/metadata";
import s from "./ServicePortfolio.module.css";

export function ServiceSpecialtyPage({ locale, specialty }: { locale: Locale; specialty: Specialty }) {
  const t = specialty[locale];
  const parent = findService(locale, specialty.parent)!;
  const parentPath = localePath(locale, "/services/" + parent.slug);
  const plan = specialty.websitePlan === undefined ? undefined : parent.plans?.[specialty.websitePlan];
  const ig = instagramRateCopy[locale];
  const money = (value: number) => formatNumber(value, locale, { useGrouping: true }) + " " + ig.currency;
  const range = ([low, high]: readonly number[]) => `${formatNumber(low, locale, { useGrouping: true })} ${ig.through} ${money(high)}`;
  const prices = plan
    ? [[interfaceCopy[locale].fromDesign, plan.price + " " + plan.unit], [interfaceCopy[locale].delivery, plan.timeline]]
    : specialty.slug === "reels-production"
      ? [[interfaceCopy[locale].fromReel, money(instagramRates.reelFrom)], [interfaceCopy[locale].duration, interfaceCopy[locale].length]]
      : [[ig.photo, range(instagramRates.photoStory)], [ig.motion, range(instagramRates.motionStory)], [interfaceCopy[locale].fromPost, money(instagramRates.reelFrom)]];
  const url = new URL(localePath(locale, specialtyPath(specialty)), siteUrl).toString();
  return (
    <article className={`service-detail container-shell ${s.service}`}>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: t.title, description: t.summary, url, provider: { "@id": siteUrl + "/#organization" } }} />
      <nav aria-label={interfaceCopy[locale].breadcrumb} className={s.breadcrumb} data-hero-reveal>
        <Link href={localePath(locale, "/services")}>{copy[locale].nav.services}</Link><span aria-hidden="true">/</span><Link href={parentPath}>{parent.title}</Link>
      </nav>
      <header className="service-detail__hero">
        <div className="service-detail__hero-copy">
          <p className="eyebrow" data-hero-reveal>{parent.label}</p>
          <h1 data-hero-reveal>{t.title}</h1>
          <p className={s.heroSummary} data-hero-reveal>{t.summary}</p>
          <Link className="button" href={localePath(locale, "/contact#callback")} data-hero-reveal>{callbackLabel[locale]}<ArrowIcon /></Link>
        </div>
        <div className={s.specialtyArt} aria-hidden="true" data-fms-reveal="media"><FmsServiceArt index={specialty.art} locale={locale}/></div>
      </header>
      <dl className={s.rateStrip} data-reveal>{prices.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      <div className="service-detail__body">
        <section data-reveal><h2>{interfaceCopy[locale].receive}</h2>
          <ul>{(plan?.features ?? t.deliverables)?.map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
        </section>
        <section data-reveal><h2>{interfaceCopy[locale].before}</h2>
          <p>{t.preparation}</p>
          {plan?.paymentNote && <p>{plan.paymentNote}</p>}
          <div className={s.relatedLinks}>
            <Link href={parentPath + (plan ? "#service-pricing-title" : "#instagram-individual-rates")}>{interfaceCopy[locale].fullRates}<ArrowIcon /></Link>
            {specialty.project && <Link href={localePath(locale, "/work/" + specialty.project.slug)}>{interfaceCopy[locale].viewProject} · {specialty.project.name}<ArrowIcon /></Link>}
          </div>
        </section>
      </div>
    </article>
  );
}
