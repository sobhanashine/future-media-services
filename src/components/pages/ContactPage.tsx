import { ContactForm } from "@/components/pages/ContactForm";
import { PageIntro } from "@/components/ui/PageIntro";
import { copy, formatIndex, type Locale } from "@/content/site";

export function ContactPage({ locale }: { locale: Locale }) {
  const content = copy[locale];

  return (
    <>
      <PageIntro
        locale={locale}
        eyebrow={content.contact.eyebrow}
        title={content.contact.title}
        body={content.contact.intro}
      />
      <section className="contact-section container-shell">
        <ContactForm locale={locale} />
        <aside data-reveal>
          <p className="eyebrow">{locale === "fa" ? "تماس مستقیم" : "Direct contact"}</p>
          <h2>{content.contact.directTitle}</h2>
          <p>{content.contact.directBody}</p>
          <a href="https://www.instagram.com/future.m.services/" target="_blank" rel="noreferrer" className="text-link">
            @future.m.services <span aria-hidden="true">↗</span>
          </a>
          <div className="contact-note">
            <span>NOTE / {formatIndex(1, locale)}</span>
            <p>{locale === "fa" ? "ایمیل، تلفن و آدرس تا زمان تأیید مالک در سایت نمایش داده نمی‌شوند." : "Email, phone and address remain unpublished until the owner verifies them."}</p>
          </div>
        </aside>
      </section>
    </>
  );
}
