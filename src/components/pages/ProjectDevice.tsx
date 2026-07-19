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
    <div className="device-mockup device-mockup--composite">
      <Image
        src={project.images.mockup}
        alt={content.imageAlt}
        fill
        priority={priority}
        sizes="(max-width: 780px) 92vw, (max-width: 1060px) 86vw, (max-width: 1440px) 76vw, 68rem"
      />
    </div>
  );
}
