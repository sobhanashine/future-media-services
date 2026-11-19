import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { copy, localePath, type Locale } from "@/content/site";
import s from "./StudioEditorial.module.css";

export function FaqSection({ locale, limit }: { locale: Locale; limit?: number }) {
  const { faq } = copy[locale];
  const items = limit ? faq.items.slice(0, limit) : faq.items;
  return (
    <section className={s.questions} aria-labelledby="faq-title">
      <h2 id="faq-title" data-reveal>{faq.title}</h2>
      {items.map((item, index) => (
        <details key={item.question} open={index === 0} data-reveal>
          <summary>{item.question}<i aria-hidden="true"/></summary><p>{item.answer}</p>
        </details>
      ))}
      {limit && faq.items.length > limit && <Link className="button" href={localePath(locale, "/faq")}>{faq.moreLabel}<ArrowIcon /></Link>}
    </section>
  );
}
