import Link from "next/link";
import { localePath, type Locale } from "@/content/site";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { contactLabel } from "@/lib/contact";

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
        <Link className="button button--outline" href={localePath(locale, "/contact#message")}>
          {contactLabel[locale]}
          <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}
