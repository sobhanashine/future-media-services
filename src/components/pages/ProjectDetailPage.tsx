import Link from "next/link";
import { ProjectDevice } from "@/components/pages/ProjectDevice";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { projects, type Project } from "@/content/projects";
import { formatIndex, localePath, type Locale } from "@/content/site";

const labels = {
  fa: {
    back: "بازگشت به نمونه‌کارها",
    live: "مشاهده وب‌سایت زنده",
    unavailable: "نسخه زنده فعلاً در دسترس نیست",
    overview: "معرفی پروژه",
    challenge: "مسئله",
    approach: "رویکرد",
    highlights: "نکات کلیدی تجربه",
    role: "نقش پروژه",
    status: "وضعیت",
    statusLive: "فعال",
    statusArchive: "آرشیوی / خارج از دسترس",
    focus: "فناوری / تمرکز",
    domain: "دامنه",
    responsive: "سه نمای واقعی از همان وب‌سایت: لپ‌تاپ، تبلت و موبایل.",
    evidence: "رکورد Future Media Services",
    next: "پروژه بعدی",
  },
  en: {
    back: "Back to all work",
    live: "Visit live website",
    unavailable: "The live website is currently unavailable",
    overview: "Project overview",
    challenge: "The challenge",
    approach: "The approach",
    highlights: "Experience highlights",
    role: "Project role",
    status: "Status",
    statusLive: "Live",
    statusArchive: "Archived / unavailable",
    focus: "Technology / focus",
    domain: "Domain",
    responsive: "Three real views of the same website: laptop, tablet and mobile.",
    evidence: "Future Media Services record",
    next: "Next project",
  },
} satisfies Record<Locale, Record<string, string>>;

export function ProjectDetailPage({ project, locale }: { project: Project; locale: Locale }) {
  const content = project.copy[locale];
  const text = labels[locale];
  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const nextContent = nextProject.copy[locale];

  return (
    <article className="project-detail">
      <header className="project-detail__hero container-shell">
        <Link href={localePath(locale, "/work")} className="back-link" data-hero-reveal>
          <span aria-hidden="true">←</span>
          {text.back}
        </Link>
        <div className="project-detail__index" aria-hidden="true" data-hero-reveal>
          <span>CASE / {formatIndex(projectIndex + 1, locale)}</span>
          <span>{project.domain}</span>
        </div>
        <p className="eyebrow" data-hero-reveal>{content.descriptor}</p>
        <h1 data-hero-reveal>{content.title}</h1>
        <div className="project-detail__lead" data-hero-reveal>
          <p>{content.summary}</p>
          {project.available ? (
            <a className="button" href={project.url} target="_blank" rel="noreferrer">
              {text.live}
              <ArrowIcon />
            </a>
          ) : (
            <span className="status-pill">{text.unavailable}</span>
          )}
        </div>
      </header>

      <section
        className={`project-detail__device-stage${project.images ? " project-detail__device-stage--composite" : ""}`}
        aria-label={text.responsive}
      >
        <div className="container-shell">
          <ProjectDevice project={project} locale={locale} priority />
          <p>{text.responsive}</p>
        </div>
      </section>

      <section className="project-detail__body container-shell">
        <aside data-reveal>
          <dl>
            <div>
              <dt>{text.role}</dt>
              <dd>{content.role}</dd>
            </div>
            <div>
              <dt>{text.status}</dt>
              <dd>{project.available ? text.statusLive : text.statusArchive}</dd>
            </div>
            <div>
              <dt>{text.focus}</dt>
              <dd>{project.technologies.join(" · ")}</dd>
            </div>
            <div>
              <dt>{text.domain}</dt>
              <dd>{project.domain}</dd>
            </div>
          </dl>
        </aside>

        <div className="project-detail__story">
          <section data-reveal>
            <p className="eyebrow">{formatIndex(1, locale)} / {text.overview}</p>
            <h2>{content.summary}</h2>
          </section>
          <section data-reveal>
            <p className="eyebrow">{formatIndex(2, locale)} / {text.challenge}</p>
            <h2>{text.challenge}</h2>
            <p>{content.challenge}</p>
          </section>
          <section data-reveal>
            <p className="eyebrow">{formatIndex(3, locale)} / {text.approach}</p>
            <h2>{text.approach}</h2>
            <p>{content.approach}</p>
          </section>
          <section data-reveal>
            <p className="eyebrow">{formatIndex(4, locale)} / {text.highlights}</p>
            <h2>{text.highlights}</h2>
            <ul>
              {content.highlights.map((highlight, index) => (
                <li key={highlight}>
                  <span>{formatIndex(index + 1, locale)}</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </section>
          <aside className="project-detail__source" data-reveal>
            <span>{text.evidence}</span>
            <p>{content.sourceNote}</p>
          </aside>
        </div>
      </section>

      <Link href={localePath(locale, `/work/${nextProject.slug}`)} className="project-next">
        <span>{text.next}</span>
        <strong>{nextContent.title}</strong>
        <ArrowIcon />
      </Link>
    </article>
  );
}
