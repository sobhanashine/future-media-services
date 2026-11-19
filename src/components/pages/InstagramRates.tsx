import { instagramRateCopy, instagramRates } from "@/content/instagram-rates";
import { formatNumber, type Locale } from "@/content/site";
import { InstagramEstimate } from "./InstagramEstimate";
import s from "./InstagramRates.module.css";

export function InstagramRates({ locale }: { locale: Locale }) {
  const t = instagramRateCopy[locale];
  const rates = instagramRates;
  const number = (amount: number) => formatNumber(amount, locale, { useGrouping: true });
  const range = ([min, max]: readonly [number, number]) => `${number(min)} ${t.through} ${number(max)} ${t.currency}`;
  return (
    <div className={s.rates}>
      <section id="instagram-individual-rates" aria-labelledby="instagram-individual-title">
        <h2 id="instagram-individual-title">{t.heading}</h2><p>{t.intro}</p>
        <div className={s.items}>
          <article><h3>{t.outreach}</h3><strong>{number(rates.outreachQuarter)} {t.currency} {t.quarter}</strong><p>{t.outreachBody}</p></article>
          <article><h3>{t.reel}</h3><strong>{t.from} {number(rates.reelFrom)} {t.currency}</strong><p>{t.reelBody}</p></article>
          <article><h3>{t.story}</h3><dl><div><dt>{t.photo}</dt><dd>{range(rates.photoStory)}</dd></div><div><dt>{t.motion}</dt><dd>{range(rates.motionStory)}</dd></div></dl><p>{t.storyBody}</p></article>
        </div>
      </section>
      <InstagramEstimate locale={locale} />
    </div>
  );
}
