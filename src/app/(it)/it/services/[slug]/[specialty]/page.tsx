import { notFound } from "next/navigation";
import { ServiceSpecialtyPage } from "@/components/pages/ServiceSpecialtyPage";
import { findSpecialty, serviceSpecialties, specialtyPath } from "@/content/service-specialties";
import { createMetadata } from "@/lib/metadata";

type Params = { slug: string; specialty: string };
type Props = { params: Promise<Params> };

export function generateStaticParams() {
  return serviceSpecialties.map(item => ({ slug: item.parent, specialty: item.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug, specialty } = await params;
  const entry = findSpecialty(slug, specialty);
  if (!entry) return {};
  return createMetadata("it", entry.it.title + " | FMS", entry.it.summary, specialtyPath(entry));
}

export default async function Page({ params }: Props) {
  const { slug, specialty } = await params;
  const entry = findSpecialty(slug, specialty);
  if (!entry) notFound();
  return <ServiceSpecialtyPage locale="it" specialty={entry} />;
}
