import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { copy, formatIndex, localePath, type Locale } from "@/content/site";

export function FaqSection({ locale, limit }: { locale: Locale; limit?: number }) {
  const content = copy[locale];
  const items = limit ? content.faq.items.slice(0, limit) : content.faq.items;

  return (
    <section className="faq-section container-shell" aria-labelledby="faq-title">
      <header className="faq-section__intro" data-reveal>
        <div>
          <p className="eyebrow">{content.faq.eyebrow}</p>
          <h2 id="faq-title">{content.faq.title}</h2>
        </div>
        <p>{content.faq.intro}</p>
      </header>
      <div className="faq-list">
        {items.map((item, index) => (
          <details key={item.question} data-reveal>
            <summary>
              <span>{formatIndex(index + 1, locale)}</span>
              <strong>{item.question}</strong>
              <i aria-hidden="true">+</i>
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
      {limit && content.faq.items.length > limit && (
        <Link className="button button--ghost faq-section__link" href={localePath(locale, "/faq")}>
          {content.faq.moreLabel}
          <ArrowIcon />
        </Link>
      )}
    </section>
  );
}
