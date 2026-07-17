import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { PageIntro } from "@/components/ui/PageIntro";
import { copy, localePath, type Locale } from "@/content/site";

export function WorkPage({ locale }: { locale: Locale }) {
  const content = copy[locale];
  const intro = locale === "fa"
    ? "هر case study باید مسئله، نقش FMS، تصمیم‌های طراحی و نتیجه‌ای قابل استناد را نشان دهد. این بخش تا دریافت دارایی‌های تأییدشده صادقانه خالی می‌ماند."
    : "Every case study should show the problem, FMS’s role, the design decisions and an evidence-backed outcome. This space stays honestly empty until those assets are approved.";

  return (
    <>
      <PageIntro locale={locale} eyebrow={content.nav.work} title={content.work.emptyTitle} body={intro} />
      <section className="inner-section container-shell">
        <div className="work-hold" data-reveal>
          <div aria-hidden="true">
            <span>01</span><span>02</span><span>03</span>
          </div>
          <p className="status-pill">{content.work.emptyLabel}</p>
          <h2>{content.work.emptyBody}</h2>
          <Link href={localePath(locale, "/contact")} className="button">
            {content.common.projectPrompt}
            <ArrowIcon />
          </Link>
        </div>
      </section>
    </>
  );
}
