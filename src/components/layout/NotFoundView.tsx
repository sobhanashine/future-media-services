import Link from "next/link";
import { copy, formatNumber, localePath, type Locale } from "@/content/site";
import s from "./SiteState.module.css";

export function NotFoundView({ locale, bilingual = false }: { locale: Locale; bilingual?: boolean }) {
  const text = copy[locale].common;
  return <section className={s.state}>
    <span className={s.code} dir="ltr">{formatNumber(404, locale)}</span>
    <h1>{text.notFound}</h1>
    <p>{text.notFoundBody}</p>
    <div className={s.actions}>
      <Link href={localePath(locale)}>{text.home}</Link>
      {bilingual && <Link href="/en" lang="en" dir="ltr">English home</Link>}
    </div>
  </section>;
}
