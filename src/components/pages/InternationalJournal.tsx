import Link from "next/link";
import { JsonLd } from "@/components/layout/JsonLd";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { findPersianBlogPost } from "@/content/blog";
import { guideEditions } from "@/content/guide-editions";
import { guideSlugs, type GuideSlug } from "@/content/guide-slugs";
import { localePath, type InternationalLocale } from "@/content/locales";
import { callbackLabel } from "@/lib/contact";
import { createMetadata, siteUrl } from "@/lib/metadata";
import { BlogVisual } from "./BlogCard";
import s from "./StudioJournal.module.css";

export const journalText = {
  en: {
    label: "FMS guides", title: "Guides to websites and Instagram",
    intro: "Practical guidance on commissioning a website, running an online shop and working with a content team.",
    featured: "Featured guide", read: "Read guide", all: "Browse the guides", back: "All guides",
    contents: "In this guide", sources: "Sources and further reading", next: "Your project",
    discuss: "Discuss this with our team", related: "Explore the service", further: "Related guides",
    categories: ["Web design and development", "Instagram content"],
  },
  it: {
    label: "Le guide di FMS", title: "Guide ai siti web e a Instagram",
    intro: "Indicazioni pratiche per commissionare un sito, gestire un negozio online e collaborare con chi produce i contenuti.",
    featured: "Guida in evidenza", read: "Leggi la guida", all: "Esplora le guide", back: "Tutte le guide",
    contents: "In questa guida", sources: "Fonti e approfondimenti", next: "Il tuo progetto",
    discuss: "Parlane con il nostro team", related: "Scopri il servizio", further: "Guide correlate",
    categories: ["Progettazione e sviluppo web", "Contenuti Instagram"],
  },
} as const;

const servicePaths = ["/services/web-development", "/services/instagram-management"] as const;
function serviceIndex(slug: GuideSlug) {
  return findPersianBlogPost(slug)?.relatedServicePath === servicePaths[1] ? 1 : 0;
}

export function guideMetadata(locale: InternationalLocale, slug: GuideSlug) {
  const { title, intro } = guideEditions[slug][locale];
  const metadata = createMetadata(locale, title + " | FMS", intro, "/blog/" + slug);
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article" as const } };
}

export function InternationalJournal({ locale }: { locale: InternationalLocale }) {
  const t = journalText[locale];
  const featured = guideSlugs[0];
  const featureCopy = guideEditions[featured][locale];
  const post = findPersianBlogPost(featured);
  const url = (slug: GuideSlug) => localePath(locale, "/blog/" + slug);

  return <div className={s.journal}>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: t.title, description: t.intro,
      url: new URL(localePath(locale, "/blog"), siteUrl).href, inLanguage: locale,
      mainEntity: { "@type": "ItemList", itemListElement: guideSlugs.map((slug, index) => ({
        "@type": "ListItem", position: index + 1, url: new URL(url(slug), siteUrl).href, name: guideEditions[slug][locale].title,
      })) },
    }} />
    <div className={`container-shell ${s.archiveHero}`}>
      <header className={s.masthead} data-hero-reveal>
        <p className={s.label}>{t.label}</p><h1>{t.title}</h1><p>{t.intro}</p>
        <a className={s.textAction} href="#guides">{t.all}<ArrowIcon direction="down" /></a>
      </header>
      <article className={s.feature} data-hero-reveal>
        {post && <BlogVisual post={post} />}
        <div className={s.featureText}><p className={s.label}>{t.featured}</p>
          <h2><Link href={url(featured)}>{featureCopy.title}</Link></h2><p>{featureCopy.intro}</p>
          <Link className={s.cardLink} href={url(featured)}>{t.read}<ArrowIcon /></Link>
        </div>
      </article>
    </div>
    <section id="guides" className={`container-shell ${s.archive}`} aria-label={t.all}>
      {t.categories.map((category, index) => <section key={category} className={s.category}>
        <h2 data-reveal>{category}</h2>
        <div className={s.cardGrid}>{guideSlugs.filter(slug => slug !== featured && serviceIndex(slug) === index).map(slug => {
          const guide = guideEditions[slug][locale];
          return <article key={slug} className={s.card} data-reveal>
            <h3><Link href={url(slug)}>{guide.title}</Link></h3><p>{guide.intro}</p>
            <Link className={s.cardLink} href={url(slug)} aria-label={t.read + " — " + guide.title}>{t.read}<ArrowIcon /></Link>
          </article>;
        })}</div>
      </section>)}
    </section>
  </div>;
}

export function InternationalGuidePage({ locale, slug }: { locale: InternationalLocale; slug: GuideSlug }) {
  const t = journalText[locale];
  const guide = guideEditions[slug];
  const { title, intro, sections } = guide[locale];
  const post = findPersianBlogPost(slug);
  const category = serviceIndex(slug);
  const url = new URL(localePath(locale, "/blog/" + slug), siteUrl).href;
  const related = guideSlugs.filter(other => other !== slug && serviceIndex(other) === category).slice(0, 2);

  return <article className={s.journal}>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "BlogPosting", headline: title, description: intro,
      inLanguage: locale, mainEntityOfPage: url, articleSection: t.categories[category],
      author: { "@id": siteUrl + "/#organization" }, publisher: { "@id": siteUrl + "/#organization" },
    }} />
    <header className={`container-shell ${s.articleHero}`}>
      <div className={s.articleHead} data-hero-reveal>
        <Link className={s.back} href={localePath(locale, "/blog")}><ArrowIcon direction="left" />{t.back}</Link>
        <p className={s.label}>{t.categories[category]}</p><h1>{title}</h1><p className={s.excerpt}>{intro}</p>
        <div className={s.byline}>Future Media Services</div>
      </div>
      {post && <div className={s.articleCover} data-fms-reveal="media"><BlogVisual post={post} /></div>}
    </header>
    <div className={`container-shell ${s.readingLayout}`}>
      <nav className={s.outline} aria-label={t.contents}><details><summary>{t.contents}<i aria-hidden="true" /></summary>
        <ol>{sections.map((section, i) => <li key={section.heading}><a href={"#section-" + (i + 1)}>{section.heading}</a></li>)}</ol>
        <a href="#sources">{t.sources}</a>
      </details></nav>
      <div className={s.prose}>
        {sections.map((section, i) => <section id={"section-" + (i + 1)} key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}
        <section className={s.sources} aria-labelledby="sources"><h2 id="sources">{t.sources}</h2>
          <ul>{guide.sources.map(source => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source[locale]}<ArrowIcon /></a></li>)}</ul>
        </section>
      </div>
      <aside className={s.readNext}>
        <div className={s.nextCard} data-reveal><p className={s.label}>{t.next}</p><h2>{t.discuss}</h2>
          <Link className="button" href={localePath(locale, "/contact#callback")}>{callbackLabel[locale]}<ArrowIcon /></Link>
        </div>
        <div className={s.moreReads}>
          <Link className={s.cardLink} href={localePath(locale, servicePaths[category])}>{t.related}<ArrowIcon /></Link>
          <h2>{t.further}</h2>{related.map(other => <Link key={other} href={localePath(locale, "/blog/" + other)}>{guideEditions[other][locale].title}<ArrowIcon /></Link>)}
        </div>
      </aside>
    </div>
  </article>;
}
