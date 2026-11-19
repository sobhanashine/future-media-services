import Link from "next/link";
import { JsonLd } from "@/components/layout/JsonLd";
import { FaqSection } from "@/components/pages/FaqSection";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { copy, localePath, type Locale } from "@/content/site";
import { callbackLabel } from "@/lib/contact";
import s from "./StudioEditorial.module.css";

export function FaqPage({ locale }: { locale: Locale }) {
  const { faq } = copy[locale];
  const contact = localePath(locale, "/contact") + "#callback";
  return (
    <div className={s.page}>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faq.items.map(item => ({
          "@type": "Question", name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }}/>
      <div className={`container-shell ${s.faqLayout}`}>
        <header className={s.lead} data-hero-reveal>
          <p className={s.label}>{faq.eyebrow}</p><h1>{faq.allLabel}</h1>
          <p className={s.dek}>{faq.intro}</p>
          <Link className="button" href={contact}>{callbackLabel[locale]}<ArrowIcon /></Link>
        </header>
        <FaqSection locale={locale}/>
      </div>
      <section className={`container-shell ${s.faqCall}`} data-reveal>
        <div><p className={s.label}>{faq.contactPrompt}</p><h2>{faq.contactTitle}</h2></div>
        <Link className="button" href={contact}>{callbackLabel[locale]}<ArrowIcon /></Link>
      </section>
    </div>
  );
}
