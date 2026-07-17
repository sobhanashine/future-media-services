import Link from "next/link";
import { ProjectDevice } from "@/components/pages/ProjectDevice";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { additionalProjects, featuredProjects, projectCopy } from "@/content/projects";
import { localePath, type Locale } from "@/content/site";

const labels = {
  fa: {
    visit: "مشاهده پروژه",
    role: "نقش",
    stack: "فناوری",
    all: "مشاهده همه نمونه‌کارها",
    source: "اطلاعات پروژه از پورتفولیوی mrashineh.ir و تصاویر از نسخه زنده وب‌سایت‌ها تهیه شده‌اند.",
    archiveEyebrow: "پروژه‌های بیشتر",
    archiveTitle: "چند تجربه‌ی دیجیتال دیگر در این مسیر.",
    unavailable: "فعلاً در دسترس نیست",
  },
  en: {
    visit: "View case study",
    role: "Role",
    stack: "Stack",
    all: "View the full portfolio",
    source: "Project details come from the mrashineh.ir portfolio; imagery was captured from the live websites.",
    archiveEyebrow: "More builds",
    archiveTitle: "More digital experiences from the same body of work.",
    unavailable: "Currently unavailable",
  },
} satisfies Record<Locale, Record<string, string>>;

export function ProjectGallery({ locale, showAllLink = false }: { locale: Locale; showAllLink?: boolean }) {
  const text = labels[locale];

  return (
    <>
      <div className="project-gallery">
        {featuredProjects.map((project, index) => {
          const content = projectCopy(project, locale);

          return (
            <article className={`project-card project-card--${index + 1}`} key={project.slug} data-reveal>
              <Link
                href={localePath(locale, `/work/${project.slug}`)}
                className="project-card__media"
                aria-label={`${text.visit}: ${content.title}`}
                data-project-media
              >
                <ProjectDevice project={project} locale={locale} />
                <span className="project-card__number">P / 0{index + 1}</span>
                <span className="project-card__visit">
                  {text.visit}
                  <ArrowIcon />
                </span>
              </Link>
              <div className="project-card__details">
                <div className="project-card__heading">
                  <p>{content.descriptor}</p>
                  <h3>{content.title}</h3>
                </div>
                <p className="project-card__summary">{content.summary}</p>
                <dl className="project-card__facts">
                  <div>
                    <dt>{text.role}</dt>
                    <dd>{content.role}</dd>
                  </div>
                  <div>
                    <dt>{text.stack}</dt>
                    <dd>{project.technologies.join(" · ")}</dd>
                  </div>
                </dl>
              </div>
            </article>
          );
        })}
      </div>
      <div className="portfolio-source" data-reveal>
        <p>{text.source}</p>
        {showAllLink ? (
          <Link href={localePath(locale, "/work")} className="text-link">
            {text.all}
            <ArrowIcon />
          </Link>
        ) : null}
      </div>
    </>
  );
}

export function ProjectArchive({ locale }: { locale: Locale }) {
  const text = labels[locale];

  return (
    <section className="project-archive" aria-labelledby="project-archive-title">
      <header data-reveal>
        <p className="eyebrow">{text.archiveEyebrow}</p>
        <h2 id="project-archive-title">{text.archiveTitle}</h2>
      </header>
      <ol>
        {additionalProjects.map((project, index) => (
          <li key={project.url} data-reveal>
            <Link
              href={localePath(locale, `/work/${project.slug}`)}
              className={project.available ? undefined : "project-archive__unavailable"}
            >
              <span>0{index + 4}</span>
              <strong>{project.copy[locale].title}</strong>
              <small>{project.domain}</small>
              {project.available ? (
                <ArrowIcon />
              ) : (
                <em>{text.unavailable}</em>
              )}
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
