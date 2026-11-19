import { persianSeoGuide } from "@/content/seo";
import s from "./StudioEditorial.module.css";

export function PersianSeoGuide() {
  return (
    <section className={`container-shell ${s.guide}`} aria-labelledby="persian-seo-guide-title">
      <header data-reveal>
        <p className={s.label}>{persianSeoGuide.eyebrow}</p>
        <h2 id="persian-seo-guide-title">{persianSeoGuide.title}</h2>
        <p>{persianSeoGuide.intro}</p>
      </header>
      <div className={s.guideItems}>{persianSeoGuide.items.map(item => (
        <article key={item.title} data-reveal><h3>{item.title}</h3><p>{item.body}</p></article>
      ))}</div>
    </section>
  );
}
