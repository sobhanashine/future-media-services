import { notFound } from "next/navigation";
import { guideMetadata, InternationalGuidePage } from "@/components/pages/InternationalJournal";
import { guideSlugs, hasGuideEdition } from "@/content/guide-slugs";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guideSlugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (!hasGuideEdition(slug)) return {};
  return guideMetadata("en", slug);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!hasGuideEdition(slug)) notFound();
  return <InternationalGuidePage locale="en" slug={slug} />;
}
