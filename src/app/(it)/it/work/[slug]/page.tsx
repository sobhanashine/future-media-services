import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailPage } from "@/components/pages/ProjectDetailPage";
import { findProject, projectSlugs } from "@/content/projects";
import { createMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return {};
  const content = project.copy.it;
  return createMetadata("it", `${content.title} | Progetti FMS`, content.summary, `/work/${slug}`);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();
  return <ProjectDetailPage project={project} locale="it" />;
}
