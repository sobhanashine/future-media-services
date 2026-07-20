import { PageIntro } from "@/components/ui/PageIntro";
import { copy, formatIndex, type Locale } from "@/content/site";

export function PrivacyPage({ locale }: { locale: Locale }) {
  const content = copy[locale];

  return (
    <>
      <PageIntro
        locale={locale}
        eyebrow={content.privacy.eyebrow}
        title={content.privacy.title}
        body={content.privacy.intro}
      />
      <section className="privacy-list container-shell">
        {content.privacy.items.map((item, index) => (
          <article key={item.title} data-reveal>
            <span>{formatIndex(index + 1, locale)}</span>
            <div><h2>{item.title}</h2><p>{item.body}</p></div>
          </article>
        ))}
      </section>
    </>
  );
}
