import Link from "next/link";
import { copy, localePath, type Locale } from "@/content/site";

export function PageIntro({
  locale,
  eyebrow,
  title,
  body,
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <section className="page-intro container-shell">
      <p className="eyebrow" data-hero-reveal>{eyebrow}</p>
      <h1 data-hero-reveal>{title}</h1>
      <div className="page-intro__footer" data-hero-reveal>
        <p>{body}</p>
        <Link className="button button--outline" href={localePath(locale, "/contact")}>
          {copy[locale].nav.start}
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
