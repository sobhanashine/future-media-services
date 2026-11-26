import { interfaceCopy } from "@/content/interface";
import { ProjectGallery } from "@/components/pages/ProjectGallery";
import Image from "next/image";
import { PageIntro } from "@/components/ui/PageIntro";
import { findProject } from "@/content/projects";
import { copy, type Locale } from "@/content/site";
import engineering from "@/components/landing/art/ofoq-engineering.webp";
import simone from "@/components/landing/art/simone-still-life.webp";
import ermetes from "@/components/landing/art/ermetes-trento.webp";
import s from "./ServicePortfolio.module.css";

const covers = [
  { slug: "ofoq", image: engineering },
  { slug: "simone-food", image: simone },
  { slug: "ermetes", image: ermetes },
];

export function WorkPage({ locale }: { locale: Locale }) {
  const content = copy[locale];

  return (
    <div className={s.portfolio}>
      <div className={`container-shell ${s.archiveHero}`}>
        <PageIntro locale={locale} eyebrow={content.nav.work} title={content.work.title} body={content.work.intro} />
        <nav className={s.covers} aria-label={interfaceCopy[locale].selected} data-fms-reveal="media">
          {covers.map(({ slug, image }) => {
            const project = findProject(slug);
            if (!project) return null;
            return <a href={`#case-${slug}`} key={slug}>
              <Image src={image} alt="" fill sizes="(min-width: 900px) 15vw, 32vw" />
              <span>{project.copy[locale].title}</span>
            </a>;
          })}
        </nav>
      </div>
      <section className={`inner-section container-shell work-page-gallery ${s.archiveGrid}`} aria-label={content.nav.work}>
        <ProjectGallery locale={locale} />
      </section>
    </div>
  );
}
