import { JsonLd } from "@/components/layout/JsonLd";
import { FaqSection } from "@/components/pages/FaqSection";
import { PageIntro } from "@/components/ui/PageIntro";
import { copy, type Locale } from "@/content/site";
import { phoneHref } from "@/lib/contact";

export function FaqPage({ locale }: { locale: Locale }) {
  const content = copy[locale];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: content.faq.items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <PageIntro locale={locale} eyebrow={content.faq.eyebrow} title={content.faq.allLabel} body={content.faq.intro} />
      <FaqSection locale={locale} />
      <section className="faq-contact container-shell" data-reveal>
        <div>
          <p>{locale === "fa" ? "پاسخ موردنظر را پیدا نکردید؟" : "Did not find the answer you need?"}</p>
          <h2>{locale === "fa" ? "برای بررسی دقیق شرایط پروژه، تماس بگیرید." : "Call to discuss the project details precisely."}</h2>
        </div>
        <a href={phoneHref} className="button button--light">{content.nav.start}</a>
      </section>
    </>
  );
}
