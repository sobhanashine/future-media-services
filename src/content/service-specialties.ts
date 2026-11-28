type SpecialtyCopy = {
  title: string;
  summary: string;
  preparation: string;
  orderComparison?: string;
  preparationLinks?: readonly { href: string; label: string }[];
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
  it: SpecialtyCopy;
};

export const serviceSpecialties: readonly Specialty[] = [
  {
    parent: "web-development", slug: "corporate-website", art: 0, websitePlan: 1, project: { slug: "ofoq", name: "OFOQ" },
    fa: {
      title: "طراحی سایت شرکتی",
      summary: "مشتری بتواند شرکتتان را بشناسد، خدمت موردنیازش را پیدا کند و نمونه‌ای از کارتان را ببیند. صفحه‌های معرفی، خدمات و نمونه‌کار را حول همین مسیر طراحی می‌کنیم.",
      preparation: "فهرست خدمات، چند پروژهٔ قابل‌نمایش و زبان‌هایی که مشتریانتان استفاده می‌کنند، نقطهٔ شروع طراحی‌اند.",
      preparationLinks: [
        { href: "/blog/multilingual-corporate-website-guide", label: "راهنمای طراحی سایت شرکتی چندزبانه" },
        { href: "/blog/corporate-website-contact-form-guide", label: "راهنمای فرم تماس سایت شرکتی" },
      ],
    },
    en: { title: "Corporate website design", summary: "Give prospective clients a way to understand your company, find the right service and see your work. We design your company profile, service pages and case studies around that journey.", preparation: "Bring your service list, a few projects you can show and the languages your customers use." },
    it: { title: "Siti web aziendali", summary: "Aiuta chi visita il sito a conoscere l’azienda, trovare il servizio giusto e vedere un progetto simile al suo. Organizziamo presentazione, servizi e casi studio intorno a queste domande.", preparation: "Prepara l’elenco dei servizi, qualche progetto da mostrare e le lingue dei tuoi clienti." },
  },
  {
    parent: "web-development", slug: "online-store", art: 1, websitePlan: 2, project: { slug: "simone-food", name: "Simone Food" },
    fa: { title: "طراحی فروشگاه آنلاین", summary: "از انتخاب محصول تا پرداخت، مسیر خرید را برای کاتالوگ شما طراحی می‌کنیم. بعد از تحویل می‌توانید محصول، موجودی و سفارش‌ها را از پنل فروشگاه مدیریت کنید.", preparation: "چند محصول نمونه، روش‌های ارسال و شیوهٔ پرداخت را مشخص کنید تا مسیر خرید را بر همان اساس بچینیم." },
    en: { title: "Online store design", summary: "From choosing a product to checking out, the shopping experience follows your catalogue. After handover, your team manages products, inventory and orders from the store dashboard.", preparation: "Bring sample products, shipping options and the payment methods you want to accept." },
    it: { title: "Negozi online", summary: "Progettiamo il percorso dalla scelta del prodotto al pagamento sulla base del tuo catalogo. Dopo la consegna, potrai gestire prodotti, disponibilità e ordini dal pannello del negozio.", preparation: "Porta alcuni prodotti di esempio, le modalità di spedizione e i metodi di pagamento che vuoi accettare." },
  },
  {
    parent: "web-development", slug: "personal-website", art: 2, websitePlan: 0,
    fa: { title: "طراحی سایت شخصی", summary: "یک نشانی مستقل برای تخصص، رزومه و نمونه‌کارهای شما. سایت را طوری می‌چینیم که مخاطب سریع بفهمد چه کاری انجام می‌دهید و چطور می‌تواند برای همکاری با شما تماس بگیرد.", preparation: "یک معرفی کوتاه، نمونه‌کارهای منتخب و راه تماسی که برای همکاری ترجیح می‌دهید را آماده کنید." },
    en: { title: "Personal website design", summary: "A home for your expertise, experience and selected work. Visitors can see what you do and how to get in touch about working together.", preparation: "Start with a short biography, a selection of your work and your preferred contact details." },
    it: { title: "Siti personali", summary: "Uno spazio per presentare competenze, esperienze e lavori. Chi visita il sito può capire in pochi passi cosa fai e come contattarti per una collaborazione.", preparation: "Prepara una breve biografia, una selezione di lavori e i recapiti che vuoi pubblicare." },
  },
  {
    parent: "instagram-management", slug: "posts-and-stories", art: 4,
    fa: {
      title: "طراحی پست و استوری",
      summary: "برای معرفی محصول، اطلاع‌رسانی یا کمپین، پست و استوری هماهنگ با رنگ‌ها و لحن برندتان می‌سازیم. استوری را می‌توانید به‌صورت تصویر ثابت یا موشن سفارش دهید.",
      preparation: "موضوع انتشار، متن و عکس‌های آماده را مشخص کنید. تعداد طرح‌ها و ثابت یا متحرک بودن هر استوری مبنای برآورد است.",
      orderComparison: "برای یک کمپین یا مناسبت، با سفارش تکی طرح‌های آمادهٔ انتشار را تحویل می‌گیرید. اگر انتشار منظم می‌خواهید، پلن ماهانه شامل تقویم محتوا، انتشار طبق برنامه و گزارش ماهانه است.",
      preparationLinks: [
        { href: "/services/instagram-management#service-pricing-title", label: "مقایسهٔ پلن‌های ماهانهٔ مدیریت اینستاگرام" },
      ],
      deliverables: ["طراحی پست متناسب با محتوای صفحه", "استوری تصویری یا موشن", "خروجی آمادهٔ انتشار در اینستاگرام"],
    },
    en: {
      title: "Instagram posts and stories",
      summary: "Product launches, announcements and campaigns need a consistent visual language. Commission branded feed posts, still stories or motion stories in the formats your page uses.",
      preparation: "Share the topic, available copy and imagery. The estimate follows the number of designs and the mix of still and motion stories.",
      orderComparison: "For a campaign or special occasion, a one-off order gives you ready-to-publish designs. If you need regular publishing, a monthly plan includes a content calendar, scheduled publishing and a monthly report.",
      preparationLinks: [
        { href: "/services/instagram-management#service-pricing-title", label: "Compare monthly Instagram management plans" },
      ],
      deliverables: ["Feed graphics for your content", "Still or animated stories", "Files prepared for Instagram publishing"],
    },
    it: { title: "Post e storie per Instagram", summary: "Creiamo post e storie coordinati con il tuo marchio per lanci di prodotto, annunci e campagne. Puoi scegliere tra grafiche statiche e storie animate.", preparation: "Condividi l’argomento, i testi e le foto disponibili. Il preventivo dipende dal numero di grafiche e dai formati.", deliverables: ["Grafiche per il feed coerenti con il profilo", "Storie statiche o animate", "File pronti per la pubblicazione su Instagram"] },
  },
  {
    parent: "instagram-management", slug: "reels-production", art: 5,
    fa: { title: "ساخت و تدوین ریلز", summary: "موضوع ویدیو را به یک ریلز عمودی تبدیل می‌کنیم؛ از انتخاب قاب و تدوین تا کاور انتشار. برای فیلم‌برداری یا تدوین اختصاصی، محدودهٔ کار را پیش از شروع با هم مشخص می‌کنیم.", preparation: "بگویید ویدیو برای معرفی چه چیزی است، چه تصاویری دارید و مدت تقریبی آن چقدر است.", deliverables: ["تدوین ویدیو در قالب ریلز", "کاور و پشت‌کاور ویدیو", "نسخهٔ عمودی آمادهٔ انتشار"] },
    en: { title: "Reels production and editing", summary: "Turn an idea or existing footage into a vertical reel with an edit and cover ready to publish. Filming or a bespoke edit is scoped before production.", preparation: "Tell us what the reel introduces, which footage is available and the intended running time.", deliverables: ["An edit formatted for Reels", "Front and back covers", "A publish-ready vertical video"] },
    it: { title: "Produzione e montaggio di reel", summary: "Trasformiamo un’idea o del materiale già girato in un reel verticale con montaggio e copertina. Concordiamo riprese e lavorazioni su misura prima di iniziare.", preparation: "Descrivi cosa vuoi presentare, quali riprese hai già e la durata indicativa del video.", deliverables: ["Montaggio nel formato reel", "Copertina e grafica finale", "Video verticale pronto da pubblicare"] },
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
