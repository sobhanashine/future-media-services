import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/pages/ServiceDetailPage";
import { findService, serviceSlugs } from "@/content/site";
import { createMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = findService("fa", slug);
  if (!service) return {};
  return createMetadata("fa", `${service.title} | Future Media Services`, service.summary, `/services/${slug}`);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const service = findService("fa", slug);
  if (!service) notFound();
  return <ServiceDetailPage locale="fa" service={service} />;
}
