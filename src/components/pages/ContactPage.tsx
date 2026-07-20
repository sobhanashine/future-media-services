import { PageIntro } from "@/components/ui/PageIntro";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { copy, formatIndex, type Locale } from "@/content/site";
import { phoneHref } from "@/lib/contact";

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
      <section className="contact-section contact-section--call container-shell" id="call">
        <div className="call-panel" data-reveal>
          <div className="call-panel__top">
            <span>{locale === "fa" ? "فقط تماس تلفنی" : "Phone calls only"}</span>
            <span>FMS / DIRECT</span>
          </div>
          <p>{locale === "fa" ? "برای مشاوره و شروع پروژه تماس بگیرید" : "Call to discuss and start a project"}</p>
          <a href={phoneHref} className="button button--light call-panel__button">
            {content.nav.start}
            <ArrowIcon />
          </a>
          <small>
            {locale === "fa"
              ? "انتخاب شماره، تماس را در تلفن شما باز می‌کند. پیامک و فرم آنلاین برای شروع پروژه فعال نیست."
              : "Selecting the number opens a call on your device. SMS and online project forms are not used."}
          </small>
        </div>
        <aside data-reveal>
          <p className="eyebrow">{locale === "fa" ? "پیش از تماس" : "Before the call"}</p>
          <h2>{content.contact.directTitle}</h2>
          <p>{content.contact.directBody}</p>
          <div className="contact-note">
            <span>NOTE / {formatIndex(1, locale)}</span>
            <p>
              {locale === "fa"
                ? "اگر نوع سایت، تعداد زبان‌ها، محتوای آماده و زمان تقریبی مدنظرتان را بدانید، برآورد اولیه دقیق‌تر خواهد بود."
                : "An initial estimate is more precise if you know the site type, languages, available content and preferred timing."}
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
