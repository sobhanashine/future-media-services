"use client";

import { useState } from "react";
import { instagramRateCopy, instagramRates, monthlyInstagramEstimate } from "@/content/instagram-rates";
import { localePath, numberLocales, type Locale } from "@/content/locales";
import Link from "next/link";
import s from "./InstagramRates.module.css";

type Quantity = "stories" | "posts" | "banners";

export function InstagramEstimate({ locale }: { locale: Locale }) {
  const t = instagramRateCopy[locale];
  const [quantities, setQuantities] = useState({ stories: "", posts: "", banners: "" });
  const [motion, setMotion] = useState(false);
  const [extras, setExtras] = useState<number[]>([]);
  const money = (amount: number) => amount.toLocaleString(numberLocales[locale]) + " " + t.currency;
  const counts = { stories: Number(quantities.stories), posts: Number(quantities.posts), banners: Number(quantities.banners) };
  const total = monthlyInstagramEstimate({ ...counts, motion, extras });
  const valid = Object.values(counts).every(count => Number.isSafeInteger(count) && count >= 0) && Number.isSafeInteger(total);
  const perUnit = { stories: motion ? instagramRates.units.motion : instagramRates.units.story, posts: instagramRates.units.post, banners: instagramRates.units.banner };
  const fields: Quantity[] = ["stories", "posts", "banners"];
  return (
    <section id="instagram-estimator" className={s.estimator} aria-labelledby="instagram-estimator-title">
      <h2 id="instagram-estimator-title">{t.estimate}</h2>
      <p>{t.estimateIntro}</p>
      <label className={s.format} htmlFor="estimate-format">
        {t.format}
        <select id="estimate-format" value={motion ? "motion" : "standard"} onChange={event => setMotion(event.target.value === "motion")}>
          <option value="standard">{t.still} · {money(instagramRates.units.story)}</option>
          <option value="motion">{t.animated} · {money(instagramRates.units.motion)}</option>
        </select>
      </label>
      <fieldset className={s.controls}>
        <legend>{t.quantity}</legend>
        {fields.map(field => (
          <label key={field} htmlFor={`estimate-${field}`}>
            {t[field]}
            <input id={`estimate-${field}`} type="number" inputMode="numeric" min="0" step="1" placeholder="0" value={quantities[field]}
              onChange={event => {
                const value = event.target.value;
                setQuantities(previous => ({ ...previous, [field]: value }));
              }} />
            <small>{money(perUnit[field])} {t.perItem}</small>
          </label>
        ))}
      </fieldset>
      <fieldset className={s.extras}>
        <legend>{t.extras}</legend>
        {instagramRates.extras.map((extra, index) => (
          <label key={extra.en}>
            <input type="checkbox" id={`estimate-extra-${index}`} checked={extras.includes(index)} onChange={event => {
              const checked = event.target.checked;
              setExtras(previous => checked ? [...previous, index] : previous.filter(item => item !== index));
            }} />
            <span>{extra[locale]}</span><small>{money(extra.price)}</small>
          </label>
        ))}
      </fieldset>
      <div className={s.total}>
        <div><span>{t.total}</span><output aria-live="polite" aria-atomic="true">{valid ? money(total) : t.invalid}</output></div>
        <Link className="button" href={localePath(locale, "/contact#message")}>{t.call}</Link>
      </div>
      <noscript><style>{`#instagram-estimator output { display: none; }`}</style><p>{t.noScript}</p></noscript>
    </section>
  );
}
