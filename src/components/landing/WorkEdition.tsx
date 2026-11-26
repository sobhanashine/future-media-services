import Image from "next/image";
import Link from "next/link";
import { landingCopy } from "@/content/landing";
import { findProject, projectTechnologies } from "@/content/projects";
import { localePath, type Locale } from "@/content/site";
import { Icon } from "./StudioVisuals";
import ofoqPhoto from "./art/ofoq-ductwork.webp";
import simonePhoto from "./art/simone-still-life.webp";
import ermetesPhoto from "./art/ermetes-trento.webp";
import s from "./Landing.module.css";

const photos = { ofoq: ofoqPhoto, "simone-food": simonePhoto, ermetes: ermetesPhoto };
const defaultOrder = ["ofoq", "simone-food", "ermetes"] as const;
const italianOrder = ["ermetes", "ofoq", "simone-food"] as const;

export function WorkEdition({ locale }: { locale: Locale }) {
  const t = landingCopy[locale];
  const order = locale === "it" ? italianOrder : defaultOrder;
  return <div className={s.cases}>
    {order.map(slug => {
      const art = photos[slug];
      const project = findProject(slug);
      if (!project?.images) return null;
      const { title } = project.copy[locale];
      const url = localePath(locale, "/work/" + slug);
      return <article className={s.case} data-project={slug} key={slug}>
        <div className={s.caseText}>
          <span className={s.caseCategory}>{t.workNames[slug]}</span>
          <h3><Link href={url}>{title}</Link></h3>
          <ul>{projectTechnologies(project, locale).slice(0,3).map(item => <li key={item}><span aria-hidden="true">✓</span><bdi>{item}</bdi></li>)}</ul>
          <div className={s.caseLinks}>
            <Link href={url} aria-label={t.detail + " — " + title}>{t.detail}</Link>
            <a href={project.url} target="_blank" rel="noreferrer" aria-label={t.visit + " — " + title}>{t.visit}<Icon name="share" /></a>
          </div>
        </div>
        <Link href={url} tabIndex={-1} aria-hidden="true" className={s.caseArt}><Image src={art} alt="" fill sizes="(min-width: 900px) 28vw, (min-width: 600px) 44vw, 50vw" /></Link>
        <Link href={url} tabIndex={-1} aria-hidden="true" className={s.caseScreen}><span className={s.screenAddress} dir="ltr">{project.domain}</span><Image src={project.images.desktop} alt="" width={1440} height={900} sizes="(min-width: 900px) 30vw, 52vw" /></Link>
      </article>;
    })}
  </div>;
}
