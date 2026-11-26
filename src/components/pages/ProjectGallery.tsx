import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { featuredProjects, portfolioProjects, projectCopy, type Project } from "@/content/projects";
import { localePath, type Locale } from "@/content/site";

const labels = {
  fa: {
    visit: "بازدید از وب‌سایت",
    details: "مشاهده جزئیات پروژه",
    all: "مشاهده همه نمونه‌کارها",
  },
  en: {
    visit: "Visit website",
    details: "View project details",
    all: "View all projects",
  },
  it: { visit: "Visita il sito", details: "Scheda progetto", all: "Tutti i progetti" },
} satisfies Record<Locale, Record<string, string>>;

function ProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  const content = projectCopy(project, locale);
  const text = labels[locale];

  if (!project.images) return null;
  const detailsHref = localePath(locale, "/work/" + project.slug);
  const actionLabel = project.available ? text.visit : text.details;

  return (
    <article className="project-card" data-reveal id={`case-${project.slug}`}>
      <a
        href={project.available ? project.url : detailsHref}
        target={project.available ? "_blank" : undefined}
        rel={project.available ? "noreferrer" : undefined}
        className="project-card__media"
        aria-label={`${actionLabel}: ${content.title}`}
        data-project-media
      >
        <span className="project-card__stage">
          <Image
            src={project.images.mockup}
            alt={content.imageAlt}
            fill
            sizes="(max-width: 700px) 90vw, (min-width: 1320px) 37rem, 46vw"
          />
        </span>

        <span className="project-card__footer">
          <span className="project-card__identity">
            <strong>{content.title}</strong>
            <small><bdi dir="ltr">{project.domain}</bdi></small>
          </span>
          <span className="project-card__visit" aria-hidden="true">
            {actionLabel}
            <ArrowIcon />
          </span>
        </span>
      </a>
      <Link href={detailsHref} className="project-card__details">
        {text.details}
        <ArrowIcon />
      </Link>
    </article>
  );
}

export function ProjectGallery({ locale, showAllLink = false }: { locale: Locale; showAllLink?: boolean }) {
  const text = labels[locale];
  const displayedProjects = showAllLink ? featuredProjects : portfolioProjects;

  return (
    <>
      <div className={`project-gallery${showAllLink ? " project-gallery--featured" : ""}`}>
        {displayedProjects.map((project) => (
          <ProjectCard project={project} locale={locale} key={project.slug} />
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
