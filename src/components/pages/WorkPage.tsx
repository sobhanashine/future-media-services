import { ProjectGallery } from "@/components/pages/ProjectGallery";
import { PageIntro } from "@/components/ui/PageIntro";
import { copy, type Locale } from "@/content/site";

export function WorkPage({ locale }: { locale: Locale }) {
  const content = copy[locale];

  return (
    <>
      <PageIntro locale={locale} eyebrow={content.nav.work} title={content.work.title} body={content.work.intro} />
      <section className="inner-section container-shell work-page-gallery">
        <ProjectGallery locale={locale} />
      </section>
    </>
  );
}
