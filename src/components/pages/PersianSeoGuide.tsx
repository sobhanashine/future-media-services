import { persianSeoGuide } from "@/content/seo";

export function PersianSeoGuide() {
  return (
    <section className="persian-seo-guide container-shell" aria-labelledby="persian-seo-guide-title">
      <header>
        <p className="eyebrow">{persianSeoGuide.eyebrow}</p>
        <h2 id="persian-seo-guide-title">{persianSeoGuide.title}</h2>
        <p>{persianSeoGuide.intro}</p>
      </header>
      <div className="persian-seo-guide__grid">
        {persianSeoGuide.items.map((item) => (
          <article key={item.title} data-reveal>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
