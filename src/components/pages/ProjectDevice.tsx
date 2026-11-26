import { interfaceCopy } from "@/content/interface";
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
          <span>{interfaceCopy[locale].archive}</span>
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
        preload={priority}
        sizes="(max-width: 879px) 90vw, (max-width: 1420px) 48vw, 42rem"
      />
    </div>
  );
}
