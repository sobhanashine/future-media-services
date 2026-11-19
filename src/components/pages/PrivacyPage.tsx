import { PageIntro } from "@/components/ui/PageIntro";
import { copy, formatIndex, type Locale } from "@/content/site";
import s from "./StudioEditorial.module.css";

export function PrivacyPage({ locale }: { locale: Locale }) {
  const { privacy } = copy[locale];
  return (
    <div className={s.page}>
      <PageIntro locale={locale} eyebrow={privacy.eyebrow} title={privacy.title} body={privacy.intro} />
      <div className={`container-shell ${s.policy}`}>
        <nav className={s.policyIndex} aria-label={privacy.eyebrow}>
          {privacy.items.map((item, index) => <a key={item.title} href={`#policy-${index + 1}`}>{item.title}</a>)}
        </nav>
        <section className={s.policyBody}>
          {privacy.items.map((item, index) => (
            <article key={item.title} id={`policy-${index+1}`} data-reveal>
              <span aria-hidden="true">{formatIndex(index+1, locale)}</span>
              <div><h2>{item.title}</h2><p>{item.body}</p></div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
