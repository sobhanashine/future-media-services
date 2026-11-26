import Link from "next/link";
import Image from "next/image";
import { ProjectDevice } from "@/components/pages/ProjectDevice";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { projects, projectTechnologies, type Project } from "@/content/projects";
import { formatIndex, localePath, type Locale } from "@/content/site";
import s from "./ServicePortfolio.module.css";

const labels = {
  fa: {
    back: "بازگشت به نمونه‌کارها",
    live: "مشاهده وب‌سایت زنده",
    demo: "مشاهده دموی پروژه",
    website: "مشاهده وب‌سایت",
    unavailable: "نسخه زنده فعلاً در دسترس نیست",
    overview: "معرفی پروژه",
    challenge: "مسئله",
    approach: "رویکرد",
    highlights: "نکات کلیدی تجربه",
    enquiry: "برای پروژه‌ای مشابه پیام بدهید",
    webDevelopment: "خدمات طراحی و توسعه وب",
    role: "نقش پروژه",
    status: "وضعیت",
    statusLive: "فعال",
    statusDemo: "دموی آنلاین",
    statusPreview: "پیش‌نمایش طراحی",
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
    demo: "View project demo",
    website: "Visit website",
    unavailable: "The live website is currently unavailable",
    overview: "Project overview",
    challenge: "The challenge",
    approach: "The approach",
    highlights: "Experience highlights",
    enquiry: "Email us about a similar project",
    webDevelopment: "Web design and development services",
    role: "Project role",
    status: "Status",
    statusLive: "Live",
    statusDemo: "Live demo",
    statusPreview: "Design preview",
    statusArchive: "Archived / unavailable",
    focus: "Technology / focus",
    domain: "Domain",
    responsive: "Three real views of the same website: laptop, tablet and mobile.",
    evidence: "Future Media Services record",
    next: "Next project",
  },
  it: {
    back: "Tutti i progetti", live: "Visita il sito ufficiale", demo: "Apri la demo", website: "Visita il sito",
    unavailable: "Sito pubblico al momento non disponibile", overview: "Il progetto", challenge: "L’esigenza", approach: "Come abbiamo lavorato",
    highlights: "Funzionalità principali", enquiry: "Scrivici per un progetto simile", webDevelopment: "Progettazione e sviluppo web",
    role: "Il nostro ruolo", status: "Stato", statusLive: "Online", statusDemo: "Demo online", statusPreview: "Anteprima del design",
    statusArchive: "Archiviato o non disponibile", focus: "Tecnologie e ambiti", domain: "Dominio",
    responsive: "Lo stesso sito su computer, tablet e telefono.", evidence: "Documentazione del progetto", next: "Progetto successivo",
  },
} satisfies Record<Locale, Record<string, string>>;

export function ProjectDetailPage({ project, locale }: { project: Project; locale: Locale }) {
  const content = project.copy[locale];
  const text = labels[locale];
  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const nextContent = nextProject.copy[locale];
  const actionLabel = project.status === "demo"
    ? text.demo
    : project.status === "preview" ? text.website : text.live;
  const statusKey = project.available ? project.status ?? "live" : "archive";
  const statusLabel = {
    live: text.statusLive,
    demo: text.statusDemo,
    preview: text.statusPreview,
    archive: text.statusArchive,
  }[statusKey];

  return (
    <article className={`project-detail ${s.project}`}>
      <header className="project-detail__hero container-shell">
        <Link href={localePath(locale, "/work")} className="back-link" data-hero-reveal>
          <ArrowIcon direction="left" />
          {text.back}
        </Link>
        <div className={s.caseIntro}>
          <p className={s.descriptor} data-hero-reveal>{content.descriptor}</p>
          <h1 data-hero-reveal>{content.title}</h1>
          <div className="project-detail__lead" data-hero-reveal>
            <p>{content.summary}</p>
            {project.available ? (
              <a className="button" href={project.url} target="_blank" rel="noreferrer">
                {actionLabel}
                <ArrowIcon />
              </a>
            ) : (
              <span className="status-pill">{text.unavailable}</span>
            )}
          </div>
        </div>
        <figure className={s.caseHeroArt} data-fms-reveal="media">
          <ProjectDevice project={project} locale={locale} priority />
          <figcaption><bdi dir="ltr">{project.domain}</bdi><span>{project.images ? text.responsive : statusLabel}</span></figcaption>
        </figure>
      </header>

      <section className="project-detail__body container-shell">
        <aside data-reveal>
          <dl>
            <div>
              <dt>{text.role}</dt>
              <dd>{content.role}</dd>
            </div>
            <div>
              <dt>{text.status}</dt>
              <dd>{statusLabel}</dd>
            </div>
            <div>
              <dt>{text.focus}</dt>
              <dd>{projectTechnologies(project, locale).join(" · ")}</dd>
            </div>
            <div>
              <dt>{text.domain}</dt>
              <dd><bdi dir="ltr">{project.domain}</bdi></dd>
            </div>
          </dl>
        </aside>

        <div className="project-detail__story">
          <section data-reveal>
            <p className="eyebrow">{text.overview}</p>
            <h2>{content.summary}</h2>
          </section>
          <section data-reveal>
            <h2>{text.challenge}</h2>
            <p>{content.challenge}</p>
          </section>
          <section data-reveal>
            <h2>{text.approach}</h2>
            <p>{content.approach}</p>
          </section>
          <section data-reveal>
            <h2>{text.highlights}</h2>
            <ul>
              {content.highlights.map((highlight, index) => (
                <li key={highlight}>
                  <span>{formatIndex(index + 1, locale)}</span>
                  {highlight}
                </li>
              ))}
            </ul>
            {project.slug === "ermetes" && (
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                <Link href={localePath(locale, "/contact#message")} className="button">
                  {text.enquiry}
                  <ArrowIcon />
                </Link>
                <Link href={localePath(locale, "/services/web-development")} className="text-link">
                  {text.webDevelopment}
                  <ArrowIcon />
                </Link>
              </div>
            )}
          </section>
          <aside className="project-detail__source" data-reveal>
            <span>{text.evidence}</span>
            <p>{content.sourceNote}</p>
          </aside>
        </div>
      </section>

      <Link href={localePath(locale, `/work/${nextProject.slug}`)} className={`project-next container-shell ${s.next}`} data-reveal>
        {nextProject.images && <Image className={s.nextImage} src={nextProject.images.desktop} width={240} height={150} sizes="(max-width: 679px) 76px, 150px" alt="" />}
        <div><small>{text.next}</small><strong>{nextContent.title}</strong></div>
        <ArrowIcon />
      </Link>
    </article>
  );
}
