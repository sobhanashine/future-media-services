import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { featuredProjects, portfolioProjects, projectCopy, type Project } from "@/content/projects";
import { localePath, type Locale } from "@/content/site";

const labels = {
  fa: {
    visit: "بازدید از وب‌سایت",
    all: "مشاهده همه نمونه‌کارها",
  },
  en: {
    visit: "Visit website",
    all: "View all projects",
  },
} satisfies Record<Locale, Record<string, string>>;

function ProjectCard({ project, locale, index }: { project: Project; locale: Locale; index: number }) {
  const content = projectCopy(project, locale);

  if (!project.images) return null;

  return (
    <article className="project-card" data-reveal>
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        className="project-card__media"
        aria-label={`${textFor(locale).visit}: ${content.title}`}
        data-project-media
      >
        <span className="project-card__browser" aria-hidden="true">
          <i />
          <i />
          <i />
          <small>{project.domain}</small>
        </span>
        <span className="project-card__image">
          <Image
            src={project.images.desktop}
            alt={content.imageAlt}
            fill
            sizes="(max-width: 760px) calc(100vw - 2rem), (max-width: 1200px) 50vw, 44rem"
          />
        </span>
        <span className="project-card__shade" aria-hidden="true" />
        <span className="project-card__index" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="project-card__identity">
          <strong>{content.title}</strong>
          <small>{project.domain}</small>
        </span>
        <span className="project-card__visit" aria-hidden="true">
          {textFor(locale).visit}
          <ArrowIcon />
        </span>
      </a>
    </article>
  );
}

function textFor(locale: Locale) {
  return labels[locale];
}

export function ProjectGallery({ locale, showAllLink = false }: { locale: Locale; showAllLink?: boolean }) {
  const text = textFor(locale);
  const displayedProjects = showAllLink ? featuredProjects : portfolioProjects;

  return (
    <>
      <div className={`project-gallery${showAllLink ? " project-gallery--featured" : ""}`}>
        {displayedProjects.map((project, index) => (
          <ProjectCard project={project} locale={locale} index={index} key={project.slug} />
        ))}
      </div>
      {showAllLink ? (
        <div className="portfolio-footer" data-reveal>
          <Link href={localePath(locale, "/work")} className="text-link">
            {text.all}
            <ArrowIcon />
          </Link>
        </div>
      ) : null}
    </>
  );
}
