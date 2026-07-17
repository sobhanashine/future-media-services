import { PageIntro } from "@/components/ui/PageIntro";
import { copy, type Locale } from "@/content/site";

export function AboutPage({ locale }: { locale: Locale }) {
  const content = copy[locale];

  return (
    <>
      <PageIntro
        locale={locale}
        eyebrow={content.about.eyebrow}
        title={content.about.title}
        body={content.about.intro}
      />
      <section className="about-statement container-shell" data-reveal>
        <span aria-hidden="true">F / M / S</span>
        <blockquote>{content.about.statement}</blockquote>
      </section>
      <section className="values-section container-shell">
        {content.about.values.map((value, index) => (
          <article key={value.title} data-reveal>
            <span>0{index + 1}</span>
            <h2>{value.title}</h2>
            <p>{value.body}</p>
          </article>
        ))}
      </section>
      <section className="team-placeholder container-shell" data-reveal>
        <p className="eyebrow">{locale === "fa" ? "تیم" : "The team"}</p>
        <h2>{locale === "fa" ? "نام و تصویر اعضا پس از تأیید منتشر می‌شود." : "Names and portraits will be published after approval."}</h2>
        <span className="status-pill">{content.common.pending}</span>
      </section>
    </>
  );
}
