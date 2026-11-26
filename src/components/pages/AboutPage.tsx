import { interfaceCopy } from "@/content/interface";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { copy, localePath, type Locale } from "@/content/site";
import { contactLabel } from "@/lib/contact";
import symbol from "@/components/landing/art/studio-symbol.webp";
import webPhoto from "@/components/landing/art/studio-reel.webp";
import campaign from "@/components/landing/art/simone-chess.webp";
import s from "./StudioEditorial.module.css";

export function AboutPage({ locale }: { locale: Locale }) {
  const { about, nav } = copy[locale];
  return (
    <div className={s.page}>
      <header className={`container-shell ${s.aboutHeader}`}>
        <div className={s.lead} data-hero-reveal>
          <p className={s.label}>{about.eyebrow}</p>
          <h1>{about.title}</h1>
          <p className={s.dek}>{about.intro}</p>
          <Link className="button" href={localePath(locale, "/contact#message")}>{contactLabel[locale]}<ArrowIcon /></Link>
        </div>
        <figure className={s.studioPrint} data-hero-reveal>
          <div className={s.studioBoard} aria-hidden="true">
            <div className={s.identitySheet} dir="ltr"><Image src={symbol} alt="" sizes="120px" /><b>Future Media<br/>Services.</b></div>
            <div className={s.webSheet}><Image src={webPhoto} alt="" fill sizes="(min-width: 850px) 23vw, 46vw" /></div>
            <div className={s.campaignSheet}><Image src={campaign} alt="" fill sizes="(min-width: 850px) 14vw, 30vw" /></div>
          </div>
          <figcaption>
            <span>{interfaceCopy[locale].desk}</span>
            <Link href={localePath(locale, "/work")}>{nav.work}<ArrowIcon /></Link>
          </figcaption>
        </figure>
      </header>
      <section className={`container-shell ${s.statement}`} data-reveal>
        <blockquote>{about.statement}</blockquote>
      </section>
      <section className={`container-shell ${s.callGuide}`} id="process" data-reveal>
        <div><p className={s.label}>{copy[locale].sections.processEyebrow}</p><h2>{copy[locale].sections.processTitle}</h2></div>
        <div><ol className={s.processList}>{copy[locale].process.map(step => <li key={step.title}><h3>{step.title}</h3><p>{step.body}</p></li>)}</ol></div>
      </section>
      <section className={`container-shell ${s.values}`}>
        {about.values.map(value => (
          <article key={value.title} data-reveal><h2>{value.title}</h2><p>{value.body}</p></article>
        ))}
      </section>
    </div>
  );
}
