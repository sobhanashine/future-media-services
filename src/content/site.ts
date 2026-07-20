export type Locale = "fa" | "en";

export function formatNumber(value: number, locale: Locale, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", {
    useGrouping: false,
    ...options,
  }).format(value);
}

export function formatIndex(value: number, locale: Locale) {
  return formatNumber(value, locale, { minimumIntegerDigits: 2 });
}

export type PricingPlan = {
  name: string;
  audience: string;
  price: string;
  unit: string;
  timeline: string;
  description: string;
  features: string[];
  featured?: boolean;
};

export type PricingCopy = {
  eyebrow: string;
  title: string;
  body: string;
  from: string;
  includes: string;
  featured: string;
  disclaimer: string;
};

export type Service = {
  slug: string;
  title: string;
  label: string;
  summary: string;
  heroImage: {
    src: string;
    alt: string;
  };
  problem: string;
  deliverables: string[];
  plans?: PricingPlan[];
  pricing?: PricingCopy;
  sharedPlanTitle?: string;
  sharedPlanFeatures?: string[];
};

type Copy = {
  localeName: string;
  languageSwitch: string;
  nav: {
    services: string;
    work: string;
    about: string;
    contact: string;
    start: string;
    menu: string;
    close: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    body: string;
    primary: string;
    secondary: string;
    canvasLabel: string;
  };
  capabilityStrip: string[];
  sections: {
    servicesEyebrow: string;
    servicesTitle: string;
    servicesBody: string;
    workEyebrow: string;
    workTitle: string;
    workBody: string;
    processEyebrow: string;
    processTitle: string;
    processBody: string;
    whyEyebrow: string;
    whyTitle: string;
    whyBody: string;
    socialEyebrow: string;
    socialTitle: string;
    finalTitle: string;
    finalBody: string;
  };
  services: Service[];
  pricing: PricingCopy;
  process: { title: string; body: string; output: string }[];
  reasons: { title: string; body: string; tag: string }[];
  work: {
    title: string;
    intro: string;
  };
  social: { title: string; body: string; href: string; tag: string }[];
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    statement: string;
    values: { title: string; body: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    directTitle: string;
    directBody: string;
  };
  privacy: {
    eyebrow: string;
    title: string;
    intro: string;
    items: { title: string; body: string }[];
  };
  common: {
    explore: string;
    allServices: string;
    viewWork: string;
    pending: string;
    projectPrompt: string;
    back: string;
    notFound: string;
    notFoundBody: string;
    home: string;
    footerLine: string;
    rights: string;
  };
};

const sharedServiceSlugs = [
  "web-development",
  "instagram-management",
] as const;

const faInstagramSharedFeatures = [
  "افزایش آمار و بازدید در Insights",
  "تنظیم بیو متناسب با پیج",
  "طراحی گرافیکی هایلایت‌ها",
  "طراحی استوری موشن",
  "گزارش ماهانه",
  "طراحی کاور و بک ریلز",
  "سناریونویسی اختصاصی و ترندمحور",
  "پشتیبانی از ساعت ۹ تا ۱۶",
  "طراحی بنر تخفیف یا مسابقه در ماه",
  "قرارداد رسمی",
  "بازیابی اکانت در صورت فراموشی",
  "ساخت حساب بیزینسی در صورت نیاز",
  "طراحی لوگوفونت",
  "صداگذاری واقعی برای برخی ریلزها بدون AI",
  "محتوایابی و ادیت از منابع معتبر در صورت نیاز",
];

const enInstagramSharedFeatures = [
  "Insights and view growth",
  "Profile-specific bio setup",
  "Graphic highlight design",
  "Motion story design",
  "Monthly report",
  "Reel cover and back-cover design",
  "Original and trend-led scripting",
  "Support from 09:00 to 16:00",
  "One monthly promotion or competition banner",
  "Formal contract",
  "Account recovery when credentials are forgotten",
  "Business account setup when needed",
  "Logotype design",
  "Human voice-over on selected reels without AI",
  "Content research and editing from reputable sources when needed",
];

export const copy: Record<Locale, Copy> = {
  fa: {
    localeName: "فارسی",
    languageSwitch: "EN",
    nav: {
      services: "خدمات",
      work: "نمونه‌کارها",
      about: "درباره ما",
      contact: "تماس",
      start: "تماس تلفنی",
      menu: "بازکردن منو",
      close: "بستن منو",
    },
    hero: {
      eyebrow: "طراحی · Next.js · WordPress Headless",
      title: "آینده‌ی برند شما،",
      accent: "از همین‌جا ساخته می‌شود.",
      body: "وب‌سایت اختصاصی شما را طراحی و با Next.js و WordPress Headless می‌سازیم؛ از سایت شخصی تا شرکتی و فروشگاه آنلاین.",
      primary: "تماس بگیرید",
      secondary: "دیدن مسیر کار",
      canvasLabel: "مجسمه‌ی سه‌بعدی بال‌ها؛ نمادی از حرکت، بلندپروازی و حرکت رو به آینده.",
    },
    capabilityStrip: [
      "طراحی اختصاصی وب",
      "Next.js مدرن",
      "WordPress Headless",
      "مدیریت محتوای اینستاگرام",
    ],
    sections: {
      servicesEyebrow: "آنچه می‌سازیم",
      servicesTitle: "دو خدمت مشخص، با مسیر و خروجی روشن.",
      servicesBody: "برای طراحی و توسعه وب‌سایت و مدیریت محتوای اینستاگرام، پلن مشخص و مسیر اجرای روشن دارید.",
      workEyebrow: "کارهای منتخب",
      workTitle: "کارهایی که فقط دیده نمی‌شوند؛ واقعاً کار می‌کنند.",
      workBody: "پیش‌نمایش تصویری وب‌سایت‌های واقعی؛ برای بازدید از نسخه زنده روی هر کارت بزنید.",
      processEyebrow: "روش همکاری",
      processTitle: "یک مسیر روشن، از مسئله تا رشد.",
      processBody: "هر ایستگاه یک تصمیم مشخص و یک خروجی قابل بررسی دارد؛ بنابراین هیچ مرحله‌ای در ابهام جلو نمی‌رود.",
      whyEyebrow: "چرا FMS؟",
      whyTitle: "چهار زاویه، یک تیم، یک نتیجه منسجم.",
      whyBody: "استراتژی، طراحی، ساخت و رشد جدا از هم تصمیم نمی‌گیرند. هر چهار لنز از ابتدا روی یک مسئله متمرکزند.",
      socialEyebrow: "از استودیو",
      socialTitle: "نگاهی کوتاه به فرایند و محتوای FMS.",
      finalTitle: "پروژه‌ی بعدی شما می‌تواند از امروز شروع شود.",
      finalBody: "برای انتخاب پلن و برآورد دقیق پروژه، مستقیم تماس بگیرید. فرم یا پیام واسطی در کار نیست.",
    },
    services: [
      {
        slug: sharedServiceSlugs[0],
        label: "طراحی + توسعه",
        title: "طراحی و توسعه وب‌سایت",
        summary: "طراحی UI/UX اختصاصی و توسعه سریع با Next.js و WordPress Headless؛ برای سایت شخصی، شرکتی و فروشگاهی.",
        heroImage: {
          src: "/images/services/web-development-hero.webp",
          alt: "ساختاری ماژولار از لایه‌های شیشه‌ای و فلزی برای نمایش معماری یک وب‌سایت Headless",
        },
        problem: "قالب‌های آماده معمولاً برند را شبیه دیگران نشان می‌دهند و با رشد محتوا یا فروش، خیلی زود به محدودیت می‌رسند.",
        deliverables: ["طراحی UI/UX اختصاصی", "توسعه Next.js", "WordPress Headless", "SEO فنی و کنترل کیفیت"],
        plans: [
          {
            name: "شخصی",
            audience: "برای متخصصان، فریلنسرها و برندهای شخصی",
            price: "۴۵",
            unit: "میلیون تومان",
            timeline: "۲ تا ۴ هفته",
            description: "یک حضور حرفه‌ای و مستقل برای معرفی شما، خدمات و نمونه‌کارها.",
            features: [
              "طراحی اختصاصی تا ۵ صفحه",
              "Next.js سریع و واکنش‌گرا",
              "WordPress Headless برای مدیریت محتوا",
              "بلاگ یا آرشیو نمونه‌کار",
              "SEO فنی پایه و اتصال ابزارهای گوگل",
              "آموزش پنل و ۳۰ روز پشتیبانی",
            ],
          },
          {
            name: "شرکتی",
            audience: "برای شرکت‌ها و کسب‌وکارهای خدماتی",
            price: "۸۵",
            unit: "میلیون تومان",
            timeline: "۴ تا ۷ هفته",
            description: "وب‌سایتی چندبخشی برای معرفی خدمات، اعتبار برند و تبدیل بازدیدکننده به تماس.",
            features: [
              "طراحی UI/UX اختصاصی تا ۱۰ صفحه",
              "Next.js + WordPress Headless",
              "ساختار دو زبانه فارسی و انگلیسی",
              "خدمات، نمونه‌کار، بلاگ و اعضای تیم",
              "موشن هدفمند، SEO فنی و آنالیتیکس",
              "آموزش پنل و ۶۰ روز پشتیبانی",
            ],
            featured: true,
          },
          {
            name: "فروشگاهی",
            audience: "برای برندهای محصول‌محور و فروش آنلاین",
            price: "۱۶۵",
            unit: "میلیون تومان",
            timeline: "۸ تا ۱۲ هفته",
            description: "فروشگاه Headless اختصاصی با تجربه خرید سریع و مدیریت کامل محصولات در وردپرس.",
            features: [
              "طراحی اختصاصی مسیر خرید و صفحات محصول",
              "Next.js + WooCommerce Headless",
              "سبد خرید، تسویه‌حساب و درگاه پرداخت",
              "دسته‌بندی، جست‌وجو و فیلتر محصولات",
              "حساب کاربری، سفارش‌ها و پیام‌های سیستمی",
              "آموزش پنل و ۹۰ روز پشتیبانی",
            ],
          },
        ],
      },
      {
        slug: sharedServiceSlugs[1],
        label: "محتوا + مدیریت",
        title: "مدیریت محتوای اینستاگرام",
        summary: "برنامه‌ریزی، طراحی پست و استوری، ساخت ریلز و مدیریت منظم صفحه در سه پلن ماهانه.",
        heroImage: {
          src: "/images/services/instagram-management-hero.webp",
          alt: "میز برنامه‌ریزی محتوا با دوربین، قاب‌های پست و استوری و مسیر انتشار منظم",
        },
        problem: "تولید پراکنده و بدون تقویم، زبان بصری و گزارش منظم، زمان می‌گیرد اما الزاماً به رشد پایدار صفحه تبدیل نمی‌شود.",
        deliverables: ["تقویم محتوایی", "پست، استوری و ریلز", "هویت بصری صفحه", "گزارش ماهانه"],
        pricing: {
          eyebrow: "پلن‌های مدیریت اینستاگرام",
          title: "سه سطح برای مدیریت منظم محتوا.",
          body: "تفاوت پلن‌ها در تعداد پست و استوری ماهانه است؛ خدمات پایه مدیریت، طراحی، گزارش‌دهی و پشتیبانی در هر سه سطح ارائه می‌شوند.",
          from: "هزینه ماهانه",
          includes: "حجم محتوای ماهانه",
          featured: "پیشنهادی",
          disclaimer: "مبالغ ماهانه‌اند. نوع ریلز، جزئیات تولید و اطلاعات لازم برای اجرا پیش از عقد قرارداد در تماس اولیه مشخص می‌شوند.",
        },
        sharedPlanTitle: "خدمات مشترک در هر سه پلن",
        sharedPlanFeatures: faInstagramSharedFeatures,
        plans: [
          {
            name: "اقتصادی",
            audience: "مناسب کسب‌وکارهای کوچک",
            price: "۸.۵",
            unit: "میلیون تومان",
            timeline: "ماهانه",
            description: "حجم پایه برای حفظ انتشار منظم و ساخت یک زبان بصری یکپارچه.",
            features: [
              "۸ پست در ماه؛ ریلز به انتخاب شما",
              "۳۰ تا ۵۲ استوری در ماه، متناسب با نیاز پیج",
            ],
          },
          {
            name: "نقره‌ای",
            audience: "مناسب کسب‌وکارهای متوسط",
            price: "۱۱.۷",
            unit: "میلیون تومان",
            timeline: "ماهانه",
            description: "انتشار پرتعدادتر برای کسب‌وکارهایی که به حضور محتوایی فعال‌تری نیاز دارند.",
            features: [
              "۱۲ پست در ماه؛ ریلز به انتخاب شما",
              "۶۰ تا ۸۰ استوری در ماه، متناسب با نیاز پیج",
            ],
          },
          {
            name: "طلایی",
            audience: "مناسب کسب‌وکارهای بزرگ",
            price: "۱۶.۴",
            unit: "میلیون تومان",
            timeline: "ماهانه",
            description: "بیشترین حجم انتشار، همراه با توزیع محتوا در کانال‌های تکمیلی برند.",
            features: [
              "۱۶ پست در ماه؛ ریلز به انتخاب شما",
              "۱۲۰ استوری در ماه",
              "ثبت مکان کسب‌وکار در گوگل‌مپ، بلد و نشان",
              "انتشار محتوا در کانال آپارات یا یوتیوب",
            ],
            featured: true,
          },
        ],
      },
    ],
    pricing: {
      eyebrow: "پلن‌های طراحی سایت",
      title: "یک زیرساخت؛ سه مقیاس برای شروع.",
      body: "هر سه پلن با طراحی اختصاصی، Next.js و مدیریت محتوا از طریق WordPress Headless ساخته می‌شوند. تفاوت در گستره، قابلیت‌ها و زمان اجراست.",
      from: "شروع از",
      includes: "شامل",
      featured: "پیشنهاد FMS",
      disclaimer: "قیمت‌ها شروع پروژه را نشان می‌دهند. هزینه دامنه، هاست، سرویس‌های پولی و امکانات خارج از محدوده پس از تماس جداگانه برآورد می‌شود.",
    },
    process: [
      { title: "کشف", body: "کسب‌وکار، مخاطب، مسئله و معیار موفقیت را دقیق می‌کنیم.", output: "خلاصه مسئله" },
      { title: "جهت‌گیری", body: "معماری محتوا، اولویت‌ها و زبان بصری پروژه شکل می‌گیرد.", output: "نقشه تجربه" },
      { title: "ساخت", body: "طراحی، توسعه و موشن در چرخه‌های کوتاه و قابل مشاهده جلو می‌روند.", output: "نسخه قابل بررسی" },
      { title: "اعتبارسنجی", body: "موبایل، دسترسی‌پذیری، سرعت، محتوا و SEO بررسی می‌شوند.", output: "گزارش کیفیت" },
      { title: "تحویل و رشد", body: "انتشار، آموزش و مسیر بهبود بعدی مستند و قابل پیگیری می‌شود.", output: "انتشار و برنامه رشد" },
    ],
    reasons: [
      { title: "یک مسیر یکپارچه", body: "استراتژی، ظاهر و اجرا از یک مسئله مشترک شروع می‌شوند؛ نه از سه brief جدا.", tag: "استراتژی" },
      { title: "راهکار متناسب", body: "ساختار پروژه با نیاز واقعی تعریف می‌شود، نه با یک قالب آماده یا مد زودگذر.", tag: "طراحی" },
      { title: "کیفیت قابل سنجش", body: "ظاهر، سرعت، دسترسی و عملکرد فنی در یک چرخه کنترل کیفیت بررسی می‌شوند.", tag: "ساخت" },
      { title: "ارتباط روشن", body: "تصمیم‌ها، وضعیت و قدم بعدی در طول مسیر شفاف و قابل پیگیری باقی می‌مانند.", tag: "رشد" },
    ],
    work: {
      title: "نمونه‌کارهای منتخب از وب‌سایت‌های واقعی.",
      intro: "هر کارت یک پیش‌نمایش واقعی از وب‌سایت است و شما را مستقیماً به نسخه زنده آن می‌برد.",
    },
    social: [
      {
        tag: "معرفی",
        title: "چرا فیوچر مدیا سرویس؟",
        body: "یک ریل عمومی درباره شروع گفتگو و توضیح پروژه.",
        href: "https://www.instagram.com/reel/DGiL0aHzUuq/",
      },
      {
        tag: "پشت صحنه",
        title: "فیلم‌برداری و تدوین ریلز",
        body: "نمونه عمومی مرتبط با تولید و تدوین محتوای ویدیویی.",
        href: "https://www.instagram.com/reel/DCzrCJexQwi/",
      },
      {
        tag: "Instagram",
        title: "@future.m.services",
        body: "برای دیدن تازه‌ترین محتوای منتشرشده، صفحه رسمی را دنبال کنید.",
        href: "https://www.instagram.com/future.m.services/",
      },
    ],
    about: {
      eyebrow: "درباره FMS",
      title: "برای کسب‌وکارهایی که می‌خواهند یک قدم جلوتر دیده شوند.",
      intro: "Future Media Services یک مسیر مشترک میان فکر استراتژیک، طراحی، فناوری و محتوای دیجیتال تعریف می‌کند.",
      statement: "هدف، ساختن سطحی زیبا نیست؛ ساختن تجربه‌ای است که پیام برند را واضح کند، درست کار کند و برای قدم بعدی آماده بماند.",
      values: [
        { title: "وضوح قبل از سرعت", body: "پیش از تولید، مسئله و اولویت‌ها را روشن می‌کنیم." },
        { title: "جزئیات با دلیل", body: "هر انتخاب بصری یا فنی باید نقشی واقعی داشته باشد." },
        { title: "صداقت در ارائه", body: "داده، نتیجه یا نمونه‌کاری که تأیید نشده باشد منتشر نمی‌شود." },
      ],
    },
    contact: {
      eyebrow: "تماس مستقیم",
      title: "برای شروع پروژه، مستقیم تماس بگیرید.",
      intro: "فرم شروع پروژه حذف شده است. برای بررسی نیاز، انتخاب پلن و برآورد دقیق فقط با شماره زیر تماس بگیرید.",
      directTitle: "یک گفت‌وگوی کوتاه، قبل از هر تصمیم.",
      directBody: "در تماس اولیه درباره نوع سایت، محتوای موجود، زمان‌بندی و امکانات ضروری صحبت می‌کنیم.",
    },
    privacy: {
      eyebrow: "حریم خصوصی",
      title: "این وب‌سایت فرم پروژه یا داده تماس ذخیره نمی‌کند.",
      intro: "شروع همکاری فقط از طریق تماس تلفنی انجام می‌شود و هیچ فرم درخواست پروژه‌ای در سایت وجود ندارد.",
      items: [
        { title: "فرم پروژه وجود ندارد", body: "نام، شماره، بودجه یا توضیحات پروژه از طریق این وب‌سایت دریافت و ذخیره نمی‌شود." },
        { title: "لینک تماس چه می‌کند؟", body: "انتخاب شماره تلفن فقط شماره‌گیر دستگاه شما را باز می‌کند؛ خود سایت اطلاعات تماس را ثبت نمی‌کند." },
        { title: "لینک‌های بیرونی", body: "لینک اینستاگرام یک سرویس مستقل است و استفاده از آن تابع سیاست حریم خصوصی همان سرویس است." },
      ],
    },
    common: {
      explore: "مشاهده جزئیات",
      allServices: "همه خدمات",
      viewWork: "نمونه‌کارها",
      pending: "در انتظار محتوای تأییدشده",
      projectPrompt: "تماس بگیرید",
      back: "بازگشت",
      notFound: "این صفحه پیدا نشد.",
      notFoundBody: "ممکن است آدرس تغییر کرده باشد یا محتوا هنوز منتشر نشده باشد.",
      home: "بازگشت به خانه",
      footerLine: "طراحی و توسعه وب با Next.js و WordPress Headless.",
      rights: "تمام حقوق محفوظ است.",
    },
  },
  en: {
    localeName: "English",
    languageSwitch: "فا",
    nav: {
      services: "Services",
      work: "Work",
      about: "About",
      contact: "Contact",
      start: "Call to discuss",
      menu: "Open menu",
      close: "Close menu",
    },
    hero: {
      eyebrow: "Design · Next.js · Headless WordPress",
      title: "Your brand’s future",
      accent: "starts taking shape here.",
      body: "We design and build custom websites with Next.js and headless WordPress—from personal portfolios to corporate sites and online stores.",
      primary: "Call now",
      secondary: "See how we work",
      canvasLabel: "A three-dimensional wing sculpture, representing motion, ambition, and forward momentum.",
    },
    capabilityStrip: ["Custom web design", "Modern Next.js", "Headless WordPress", "Instagram content management"],
    sections: {
      servicesEyebrow: "What we build",
      servicesTitle: "Two focused services, each with a clear route.",
      servicesBody: "Website design, development and Instagram content management each have a clear plan and delivery path.",
      workEyebrow: "Selected work",
      workTitle: "Work that does more than look the part.",
      workBody: "Visual previews of real websites. Select any card to visit the live experience.",
      processEyebrow: "How we work",
      processTitle: "A clear route from problem to growth.",
      processBody: "Every stop produces a concrete decision and a reviewable output, so the project never disappears into a black box.",
      whyEyebrow: "Why FMS?",
      whyTitle: "Four lenses. One team. One coherent result.",
      whyBody: "Strategy, design, delivery and growth do not make isolated decisions. All four lenses stay focused on the same problem from day one.",
      socialEyebrow: "From the studio",
      socialTitle: "A short look at the thinking and content behind FMS.",
      finalTitle: "Your next project can start today.",
      finalBody: "Call directly to choose a plan and receive an exact project estimate. There is no form or message intermediary.",
    },
    services: [
      {
        slug: sharedServiceSlugs[0],
        label: "Design + build",
        title: "Website design & development",
        summary: "Custom UI/UX and fast development with Next.js and headless WordPress, for personal, corporate and commerce websites.",
        heroImage: {
          src: "/images/services/web-development-hero.webp",
          alt: "A modular glass-and-metal structure representing a headless website architecture",
        },
        problem: "Ready-made templates often make brands look interchangeable and become restrictive as content or commerce needs grow.",
        deliverables: ["Custom UI/UX design", "Next.js development", "Headless WordPress", "Technical SEO & quality assurance"],
        plans: [
          {
            name: "Personal",
            audience: "For experts, freelancers and personal brands",
            price: "45M",
            unit: "toman",
            timeline: "2–4 weeks",
            description: "A polished, independent home for your profile, services and selected work.",
            features: [
              "Custom design for up to 5 pages",
              "Fast, responsive Next.js frontend",
              "Headless WordPress content management",
              "Blog or portfolio archive",
              "Core technical SEO and Google tools",
              "CMS training and 30 days of support",
            ],
          },
          {
            name: "Corporate",
            audience: "For companies and service businesses",
            price: "85M",
            unit: "toman",
            timeline: "4–7 weeks",
            description: "A multi-section website built to explain services, strengthen credibility and turn visits into calls.",
            features: [
              "Custom UI/UX for up to 10 pages",
              "Next.js + headless WordPress",
              "Persian and English structure",
              "Services, work, blog and team content",
              "Purposeful motion, technical SEO and analytics",
              "CMS training and 60 days of support",
            ],
            featured: true,
          },
          {
            name: "Commerce",
            audience: "For product brands and online retail",
            price: "165M",
            unit: "toman",
            timeline: "8–12 weeks",
            description: "A custom headless shop with a fast buying experience and complete product control in WordPress.",
            features: [
              "Custom purchase journey and product pages",
              "Next.js + headless WooCommerce",
              "Cart, checkout and payment gateway",
              "Product categories, search and filters",
              "Customer account, orders and system messages",
              "CMS training and 90 days of support",
            ],
          },
        ],
      },
      {
        slug: sharedServiceSlugs[1],
        label: "Content + management",
        title: "Instagram content management",
        summary: "Planning, post and story design, reel production and consistent page management across three monthly plans.",
        heroImage: {
          src: "/images/services/instagram-management-hero.webp",
          alt: "A content planning desk with a camera, post and story frames, and an organized publishing route",
        },
        problem: "Publishing without a calendar, visual language or regular reporting consumes time without necessarily creating durable growth.",
        deliverables: ["Content calendar", "Posts, stories and reels", "Page visual identity", "Monthly reporting"],
        pricing: {
          eyebrow: "Instagram management plans",
          title: "Three levels for consistent content management.",
          body: "Plans differ by monthly post and story volume. Core management, design, reporting and support services are included at every level.",
          from: "Monthly fee",
          includes: "Monthly content volume",
          featured: "Recommended",
          disclaimer: "Fees are monthly. Reel formats, production details and required inputs are confirmed during the initial call before the contract is signed.",
        },
        sharedPlanTitle: "Included in all three plans",
        sharedPlanFeatures: enInstagramSharedFeatures,
        plans: [
          {
            name: "Economic",
            audience: "For small businesses",
            price: "8.5M",
            unit: "toman",
            timeline: "monthly",
            description: "A foundational volume for consistent publishing and a coherent visual language.",
            features: [
              "8 posts per month; reels can be selected",
              "30–52 stories per month, based on page needs",
            ],
          },
          {
            name: "Silver",
            audience: "For medium-sized businesses",
            price: "11.7M",
            unit: "toman",
            timeline: "monthly",
            description: "A higher publishing cadence for businesses that need a more active content presence.",
            features: [
              "12 posts per month; reels can be selected",
              "60–80 stories per month, based on page needs",
            ],
          },
          {
            name: "Gold",
            audience: "For large businesses",
            price: "16.4M",
            unit: "toman",
            timeline: "monthly",
            description: "The highest publishing volume with distribution across additional brand channels.",
            features: [
              "16 posts per month; reels can be selected",
              "120 stories per month",
              "Business location registration on Google Maps, Balad and Neshan",
              "Content publishing to an Aparat or YouTube channel",
            ],
            featured: true,
          },
        ],
      },
    ],
    pricing: {
      eyebrow: "Website plans",
      title: "One foundation. Three scales to begin.",
      body: "Every plan combines custom design, Next.js and content management through headless WordPress. Scope, capabilities and delivery time change with each tier.",
      from: "Starting from",
      includes: "Included",
      featured: "FMS recommendation",
      disclaimer: "Prices indicate the starting project scope. Domain, hosting, paid services and out-of-scope features are estimated separately after a call.",
    },
    process: [
      { title: "Discover", body: "We clarify the business, audience, problem and measure of success.", output: "Problem brief" },
      { title: "Direct", body: "The content architecture, priorities and visual language take shape.", output: "Experience map" },
      { title: "Build", body: "Design, development and motion progress in short, visible cycles.", output: "Reviewable release" },
      { title: "Validate", body: "Mobile, accessibility, performance, content and SEO are tested.", output: "Quality report" },
      { title: "Launch & grow", body: "Release, handover and the next improvement path are documented.", output: "Launch & growth plan" },
    ],
    reasons: [
      { title: "One connected path", body: "Strategy, visual design and delivery begin with the same problem—not three separate briefs.", tag: "Strategy" },
      { title: "A considered solution", body: "The project is shaped around the real need, not a ready-made template or a passing trend.", tag: "Design" },
      { title: "Measurable quality", body: "Appearance, speed, accessibility and technical behaviour share one quality loop.", tag: "Build" },
      { title: "Clear communication", body: "Decisions, status and the next step stay visible and traceable throughout the work.", tag: "Grow" },
    ],
    work: {
      title: "Selected work from live digital products.",
      intro: "Each card is a real website preview and takes you directly to its live experience.",
    },
    social: [
      {
        tag: "Introduction",
        title: "Why Future Media Services?",
        body: "A public reel inviting people to start a conversation and describe their project.",
        href: "https://www.instagram.com/reel/DGiL0aHzUuq/",
      },
      {
        tag: "Behind the scenes",
        title: "Reel production & editing",
        body: "A public example related to filming and editing short-form video content.",
        href: "https://www.instagram.com/reel/DCzrCJexQwi/",
      },
      {
        tag: "Instagram",
        title: "@future.m.services",
        body: "Follow the official profile for the latest published work and studio updates.",
        href: "https://www.instagram.com/future.m.services/",
      },
    ],
    about: {
      eyebrow: "About FMS",
      title: "For businesses that want to be seen one step ahead.",
      intro: "Future Media Services brings strategic thinking, design, technology and digital content into one connected path.",
      statement: "The goal is not a beautiful surface. It is an experience that clarifies the brand, works properly and stays ready for what comes next.",
      values: [
        { title: "Clarity before velocity", body: "We define the problem and priorities before production begins." },
        { title: "Details with a job", body: "Every visual and technical decision should earn its place." },
        { title: "Honest presentation", body: "Unverified results, people and case studies are never presented as facts." },
      ],
    },
    contact: {
      eyebrow: "Direct contact",
      title: "To start a project, call directly.",
      intro: "The project form has been removed. Call the number below to discuss the need, choose a plan and receive an exact estimate.",
      directTitle: "One short conversation before any decision.",
      directBody: "The first call covers the type of site, available content, timing and essential capabilities.",
    },
    privacy: {
      eyebrow: "Privacy",
      title: "This website does not store project forms or contact details.",
      intro: "New projects begin by phone only. There is no project enquiry form on the website.",
      items: [
        { title: "No project form", body: "The website does not collect or store names, phone numbers, budgets or project descriptions." },
        { title: "What does the call link do?", body: "Selecting the phone number only opens your device dialler. The website does not record the call details." },
        { title: "External links", body: "Instagram is an independent service, and its own privacy policy applies when you visit it." },
      ],
    },
    common: {
      explore: "Explore service",
      allServices: "All services",
      viewWork: "View work",
      pending: "Awaiting verified content",
      projectPrompt: "Call now",
      back: "Back",
      notFound: "This page could not be found.",
      notFoundBody: "The address may have changed, or the content may not be published yet.",
      home: "Back home",
      footerLine: "Web design and development with Next.js and headless WordPress.",
      rights: "All rights reserved.",
    },
  },
};

export function localePath(locale: Locale, path = "") {
  const cleanPath = !path || path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return locale === "en" ? `/en${cleanPath}` : cleanPath || "/";
}

export function findService(locale: Locale, slug: string) {
  return copy[locale].services.find((service) => service.slug === slug);
}

export const serviceSlugs = [...sharedServiceSlugs];
