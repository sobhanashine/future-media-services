import { copy, type Locale } from "@/content/site";
import { phoneHref } from "@/lib/contact";

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
        <a className="button button--outline" href={phoneHref}>
          {copy[locale].nav.start}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
