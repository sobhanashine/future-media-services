import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { featuredProjects, portfolioProjects, projectCopy, type Project } from "@/content/projects";
import { formatIndex, localePath, type Locale } from "@/content/site";

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
  const text = labels[locale];

  if (!project.images) return null;

  return (
    <article className="project-card" data-reveal>
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        className="project-card__media"
        aria-label={`${text.visit}: ${content.title}`}
        data-project-media
      >
        <span className="project-card__stage">
          <Image
            src={project.images.mockup}
            alt={content.imageAlt}
            fill
            loading={index === 0 ? "eager" : "lazy"}
            sizes="(max-width: 780px) 94vw, (max-width: 1200px) 46vw, 76rem"
          />
        </span>

        <span className="project-card__footer">
          <span className="project-card__index" aria-hidden="true">
            {formatIndex(index + 1, locale)}
          </span>
          <span className="project-card__identity">
            <strong>{content.title}</strong>
            <small>{project.domain}</small>
          </span>
          <span className="project-card__visit" aria-hidden="true">
            {text.visit}
            <ArrowIcon />
          </span>
        </span>
      </a>
    </article>
  );
}

export function ProjectGallery({ locale, showAllLink = false }: { locale: Locale; showAllLink?: boolean }) {
  const text = labels[locale];
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
