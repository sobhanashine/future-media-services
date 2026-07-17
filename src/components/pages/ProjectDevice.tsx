import Image from "next/image";
import type { Project } from "@/content/projects";
import type { Locale } from "@/content/site";

export function ProjectDevice({
  project,
  locale,
  priority = false,
}: {
  project: Project;
  locale: Locale;
  priority?: boolean;
}) {
  const content = project.copy[locale];

  if (!project.images) {
    return (
      <div className="device-mockup device-mockup--archive" role="img" aria-label={content.imageAlt}>
        <div>
          <span>ARCHIVE / OFFLINE</span>
          <strong>{content.title}</strong>
          <small>{project.domain}</small>
        </div>
      </div>
    );
  }

  return (
    <div className="device-mockup">
      <div className="device-mockup__screen">
        <picture>
          <source media="(max-width: 780px)" srcSet={project.images.mobile} />
          <source media="(max-width: 1060px)" srcSet={project.images.tablet} />
          <Image
            src={project.images.desktop}
            alt={content.imageAlt}
            fill
            priority={priority}
            sizes="(max-width: 780px) 78vw, (max-width: 1060px) 68vw, (max-width: 1440px) 64vw, 58rem"
          />
        </picture>
      </div>
      <span className="device-mockup__camera" aria-hidden="true" />
      <span className="device-mockup__base" aria-hidden="true" />
    </div>
  );
}
