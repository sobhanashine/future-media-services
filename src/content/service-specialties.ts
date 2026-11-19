type SpecialtyCopy = {
  title: string;
  summary: string;
  preparation: string;
  deliverables?: readonly string[];
};

type Specialty = {
  parent: "web-development" | "instagram-management";
  slug: string;
  art: number;
  websitePlan?: number;
  project?: { slug: string; name: string };
  fa: SpecialtyCopy;
  en: SpecialtyCopy;
};

export const serviceSpecialties: readonly Specialty[] = [
  {
    parent: "web-development", slug: "corporate-website", art: 0, websitePlan: 1, project: { slug: "ofoq", name: "OFOQ" },
    fa: { title: "طراحی سایت شرکتی", summary: "مشتری بتواند شرکتتان را بشناسد، خدمت موردنیازش را پیدا کند و نمونه‌ای از کارتان را ببیند. صفحه‌های معرفی، خدمات و نمونه‌کار را حول همین مسیر طراحی می‌کنیم.", preparation: "فهرست خدمات، چند پروژهٔ قابل‌نمایش و زبان‌هایی که مشتریانتان استفاده می‌کنند، نقطهٔ شروع طراحی‌اند." },
    en: { title: "Corporate website design", summary: "Give prospective clients a way to understand your company, find the right service and see your work. We design your company profile, service pages and case studies around that journey.", preparation: "Bring your service list, a few projects you can show and the languages your customers use." },
  },
  {
    parent: "web-development", slug: "online-store", art: 1, websitePlan: 2, project: { slug: "simone-food", name: "Simone Food" },
    fa: { title: "طراحی فروشگاه آنلاین", summary: "از انتخاب محصول تا پرداخت، مسیر خرید را برای کاتالوگ شما طراحی می‌کنیم. بعد از تحویل می‌توانید محصول، موجودی و سفارش‌ها را از پنل فروشگاه مدیریت کنید.", preparation: "چند محصول نمونه، روش‌های ارسال و شیوهٔ پرداخت را مشخص کنید تا مسیر خرید را بر همان اساس بچینیم." },
    en: { title: "Online store design", summary: "From choosing a product to checking out, the shopping experience follows your catalogue. After handover, your team manages products, inventory and orders from the store dashboard.", preparation: "Bring sample products, shipping options and the payment methods you want to accept." },
  },
  {
    parent: "web-development", slug: "personal-website", art: 2, websitePlan: 0,
    fa: { title: "طراحی سایت شخصی", summary: "یک نشانی مستقل برای تخصص، رزومه و نمونه‌کارهای شما. سایت را طوری می‌چینیم که مخاطب سریع بفهمد چه کاری انجام می‌دهید و چطور می‌تواند برای همکاری با شما تماس بگیرد.", preparation: "یک معرفی کوتاه، نمونه‌کارهای منتخب و راه تماسی که برای همکاری ترجیح می‌دهید را آماده کنید." },
    en: { title: "Personal website design", summary: "A home for your expertise, experience and selected work. Visitors can see what you do and how to get in touch about working together.", preparation: "Start with a short biography, a selection of your work and your preferred contact details." },
  },
  {
    parent: "instagram-management", slug: "posts-and-stories", art: 4,
    fa: { title: "طراحی پست و استوری", summary: "برای معرفی محصول، اطلاع‌رسانی یا کمپین، پست و استوری هماهنگ با رنگ‌ها و لحن برندتان می‌سازیم. استوری را می‌توانید به‌صورت تصویر ثابت یا موشن سفارش دهید.", preparation: "موضوع انتشار، متن و عکس‌های آماده را مشخص کنید. تعداد طرح‌ها و ثابت یا متحرک بودن هر استوری مبنای برآورد است.", deliverables: ["طراحی پست متناسب با محتوای صفحه", "استوری تصویری یا موشن", "خروجی آمادهٔ انتشار در اینستاگرام"] },
    en: { title: "Instagram posts and stories", summary: "Product launches, announcements and campaigns need a consistent visual language. Commission branded feed posts, still stories or motion stories in the formats your page uses.", preparation: "Share the topic, available copy and imagery. The estimate follows the number of designs and the mix of still and motion stories.", deliverables: ["Feed graphics for your content", "Still or animated stories", "Files prepared for Instagram publishing"] },
  },
  {
    parent: "instagram-management", slug: "reels-production", art: 5,
    fa: { title: "ساخت و تدوین ریلز", summary: "موضوع ویدیو را به یک ریلز عمودی تبدیل می‌کنیم؛ از انتخاب قاب و تدوین تا کاور انتشار. برای فیلم‌برداری یا تدوین اختصاصی، محدودهٔ کار را پیش از شروع با هم مشخص می‌کنیم.", preparation: "بگویید ویدیو برای معرفی چه چیزی است، چه تصاویری دارید و مدت تقریبی آن چقدر است.", deliverables: ["تدوین ویدیو در قالب ریلز", "کاور و پشت‌کاور ویدیو", "نسخهٔ عمودی آمادهٔ انتشار"] },
    en: { title: "Reels production and editing", summary: "Turn an idea or existing footage into a vertical reel with an edit and cover ready to publish. Filming or a bespoke edit is scoped before production.", preparation: "Tell us what the reel introduces, which footage is available and the intended running time.", deliverables: ["An edit formatted for Reels", "Front and back covers", "A publish-ready vertical video"] },
  },
];

export function findSpecialty(parent: string, slug: string) {
  return serviceSpecialties.find(item => item.parent === parent && item.slug === slug);
}

export function specialtiesFor(parent: string) {
  return serviceSpecialties.filter(item => item.parent === parent);
}

export function specialtyPath(item: Specialty) {
  return `/services/${item.parent}/${item.slug}`;
}

export type { Specialty };
