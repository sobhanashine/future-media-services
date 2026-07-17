export type Locale = "fa" | "en";

export type Service = {
  slug: string;
  title: string;
  label: string;
  summary: string;
  problem: string;
  deliverables: string[];
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
    processEyebrow: string;
    processTitle: string;
    whyEyebrow: string;
    whyTitle: string;
    socialEyebrow: string;
    socialTitle: string;
    finalTitle: string;
    finalBody: string;
  };
  services: Service[];
  process: { title: string; body: string }[];
  reasons: { title: string; body: string }[];
  work: {
    emptyTitle: string;
    emptyBody: string;
    emptyLabel: string;
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
  "digital-strategy",
  "ui-ux-design",
  "web-development",
  "commerce-cms",
  "seo-growth",
  "visual-content",
] as const;

export const copy: Record<Locale, Copy> = {
  fa: {
    localeName: "فارسی",
    languageSwitch: "EN",
    nav: {
      services: "خدمات",
      work: "نمونه‌کارها",
      about: "درباره ما",
      contact: "تماس",
      start: "شروع پروژه",
      menu: "بازکردن منو",
      close: "بستن منو",
    },
    hero: {
      eyebrow: "استراتژی · طراحی · تکنولوژی",
      title: "آینده‌ی برند شما،",
      accent: "از همین‌جا ساخته می‌شود.",
      body: "استراتژی، طراحی، توسعه وب و محتوای دیجیتال را در یک مسیر روشن کنار هم می‌آوریم تا برند شما متفاوت دیده شود و آماده‌ی رشد باشد.",
      primary: "شروع یک پروژه",
      secondary: "دیدن مسیر کار",
      canvasLabel: "تصویر سه‌بعدی انتزاعی از هسته آینده؛ نمادی از پیوند استراتژی، طراحی و تکنولوژی.",
    },
    capabilityStrip: [
      "تجربه دیجیتال",
      "توسعه وب مدرن",
      "SEO و رشد",
      "محتوای بصری",
    ],
    sections: {
      servicesEyebrow: "آنچه می‌سازیم",
      servicesTitle: "یک سیستم کامل، نه مجموعه‌ای از خدمات پراکنده.",
      servicesBody: "هر مسیر از مسئله‌ی واقعی کسب‌وکار شروع می‌شود و به خروجی مشخص، قابل استفاده و قابل رشد می‌رسد.",
      workEyebrow: "کارهای منتخب",
      workTitle: "کیفیت را با مدرک نشان می‌دهیم، نه با عدد ساختگی.",
      processEyebrow: "روش همکاری",
      processTitle: "از ابهام تا یک تجربه‌ی دیجیتال روشن.",
      whyEyebrow: "چرا FMS؟",
      whyTitle: "فکر خلاق و اجرای فنی، پشت یک میز.",
      socialEyebrow: "از استودیو",
      socialTitle: "نگاهی کوتاه به فرایند و محتوای FMS.",
      finalTitle: "پروژه‌ی بعدی شما می‌تواند از امروز شروع شود.",
      finalBody: "مسئله، هدف و زمان‌بندی‌تان را بگویید؛ قدم بعدی را شفاف با هم مشخص می‌کنیم.",
    },
    services: [
      {
        slug: sharedServiceSlugs[0],
        label: "مسیر",
        title: "استراتژی دیجیتال و هویت برند",
        summary: "تعریف جایگاه، پیام و نقشه‌ی حرکت پیش از شروع طراحی و تولید.",
        problem: "وقتی پیام، مخاطب یا اولویت‌ها روشن نیستند، حتی اجرای خوب هم به نتیجه‌ی منسجم نمی‌رسد.",
        deliverables: ["جلسه کشف", "معماری پیام", "جهت‌گیری بصری", "نقشه راه اجرایی"],
      },
      {
        slug: sharedServiceSlugs[1],
        label: "تجربه",
        title: "طراحی UI/UX",
        summary: "تجربه‌های ساده، متمایز و دسترس‌پذیر برای وب و محصولات دیجیتال.",
        problem: "رابط‌های شلوغ و مسیرهای مبهم، اعتماد و تبدیل را پیش از شکل‌گرفتن از بین می‌برند.",
        deliverables: ["تحقیق و جریان کاربر", "وایرفریم", "طراحی رابط", "پروتوتایپ و سیستم طراحی"],
      },
      {
        slug: sharedServiceSlugs[2],
        label: "ساخت",
        title: "طراحی و توسعه وب‌سایت",
        summary: "وب‌سایت‌های سریع، واکنش‌گرا و آماده‌ی توسعه با فناوری مدرن.",
        problem: "سایت قدیمی یا کند، فاصله‌ای مستقیم میان کیفیت واقعی برند و چیزی که مخاطب می‌بیند می‌سازد.",
        deliverables: ["معماری فنی", "توسعه واکنش‌گرا", "موشن هدفمند", "SEO و کنترل کیفیت"],
      },
      {
        slug: sharedServiceSlugs[3],
        label: "تجارت",
        title: "فروشگاه و راهکارهای CMS",
        summary: "زیرساخت محتوایی و فروشگاهی که تیم شما بتواند واقعاً مدیریت کند.",
        problem: "ابزار نامتناسب، ویرایش محتوا و توسعه فروش را پرهزینه و وابسته می‌کند.",
        deliverables: ["انتخاب پلتفرم", "معماری کاتالوگ", "تجربه خرید", "آموزش مدیریت محتوا"],
      },
      {
        slug: sharedServiceSlugs[4],
        label: "رشد",
        title: "SEO، بهینه‌سازی و رشد",
        summary: "بهبود ساختار، سرعت و محتوای سایت برای دیده‌شدن پایدارتر.",
        problem: "بدون پایه فنی و محتوای درست، هزینه جذب بالا می‌رود و فرصت جست‌وجوی ارگانیک از دست می‌رود.",
        deliverables: ["ممیزی فنی", "تحقیق ساختار محتوا", "بهینه‌سازی صفحات", "چارچوب سنجش"],
      },
      {
        slug: sharedServiceSlugs[5],
        label: "روایت",
        title: "ویدیو و محتوای شبکه‌های اجتماعی",
        summary: "محتوای بصری منسجم که پیام برند را واضح و قابل دنبال‌کردن می‌کند.",
        problem: "انتشار پراکنده و بدون زبان بصری، حتی با تولید مداوم هم تصویر واحدی از برند نمی‌سازد.",
        deliverables: ["ایده و سناریو", "فیلم‌برداری", "تدوین", "قالب محتوای تکرارشونده"],
      },
    ],
    process: [
      { title: "کشف", body: "کسب‌وکار، مخاطب، مسئله و معیار موفقیت را دقیق می‌کنیم." },
      { title: "جهت‌گیری", body: "معماری محتوا، اولویت‌ها و زبان بصری پروژه شکل می‌گیرد." },
      { title: "ساخت", body: "طراحی، توسعه و موشن در چرخه‌های کوتاه و قابل مشاهده جلو می‌روند." },
      { title: "اعتبارسنجی", body: "موبایل، دسترسی‌پذیری، سرعت، محتوا و SEO بررسی می‌شوند." },
      { title: "تحویل و رشد", body: "انتشار، آموزش و مسیر بهبود بعدی مستند و قابل پیگیری می‌شود." },
    ],
    reasons: [
      { title: "یک مسیر یکپارچه", body: "استراتژی، ظاهر و اجرا از یک مسئله مشترک شروع می‌شوند." },
      { title: "راهکار متناسب", body: "ساختار پروژه با نیاز واقعی تعریف می‌شود، نه با یک قالب آماده." },
      { title: "کیفیت قابل سنجش", body: "ظاهر، سرعت، دسترسی و نتیجه در کنار هم بررسی می‌شوند." },
      { title: "ارتباط روشن", body: "تصمیم‌ها، وضعیت و قدم بعدی در طول مسیر شفاف باقی می‌مانند." },
    ],
    work: {
      emptyTitle: "نمونه‌کارهای تأییدشده در حال آماده‌سازی‌اند.",
      emptyBody: "تا زمان دریافت تصاویر، نقش دقیق FMS و نتایج قابل استناد، پروژه‌ای به‌عنوان case study منتشر نمی‌کنیم.",
      emptyLabel: "بدون پروژه یا عدد ساختگی",
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
      eyebrow: "شروع پروژه",
      title: "از مسئله‌ای که می‌خواهید حل کنید شروع کنیم.",
      intro: "چند خط درباره کسب‌وکار، هدف و زمان‌بندی بنویسید. این فرم در نسخه فعلی فقط پس از اتصال مقصد تأییدشده پیام ارسال می‌کند.",
      directTitle: "ترجیح می‌دهید مستقیم گفتگو کنیم؟",
      directBody: "فعلاً تنها کانال عمومی تأییدشده، صفحه رسمی اینستاگرام FMS است.",
    },
    privacy: {
      eyebrow: "حریم خصوصی",
      title: "اطلاعات پروژه باید با همان دقت خود پروژه نگهداری شود.",
      intro: "این متن سیاست موقت نسخه پیش‌نمایش است و پیش از انتشار نهایی باید با فرایند واقعی نگهداری داده تطبیق داده شود.",
      items: [
        { title: "چه داده‌ای دریافت می‌شود؟", body: "فقط اطلاعاتی که خودتان در فرم پروژه وارد می‌کنید؛ شامل نام، راه ارتباطی و توضیح پروژه." },
        { title: "برای چه استفاده می‌شود؟", body: "برای بررسی درخواست، پاسخ‌گویی و هماهنگی درباره همان پروژه." },
        { title: "چه چیزی ثبت نمی‌شود؟", body: "مقادیر حساس فرم در لاگ برنامه نوشته نمی‌شوند و سایت از embed سنگین شبکه‌های اجتماعی استفاده نمی‌کند." },
      ],
    },
    common: {
      explore: "مشاهده جزئیات",
      allServices: "همه خدمات",
      viewWork: "نمونه‌کارها",
      pending: "در انتظار محتوای تأییدشده",
      projectPrompt: "پروژه‌ام را توضیح می‌دهم",
      back: "بازگشت",
      notFound: "این صفحه پیدا نشد.",
      notFoundBody: "ممکن است آدرس تغییر کرده باشد یا محتوا هنوز منتشر نشده باشد.",
      home: "بازگشت به خانه",
      footerLine: "استراتژی، طراحی و تکنولوژی برای آینده‌ی برندها.",
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
      start: "Start a project",
      menu: "Open menu",
      close: "Close menu",
    },
    hero: {
      eyebrow: "Strategy · Design · Technology",
      title: "Your brand’s future",
      accent: "starts taking shape here.",
      body: "We bring strategy, design, web development and digital content into one clear process—helping your brand stand apart and stay ready to grow.",
      primary: "Start a project",
      secondary: "See how we work",
      canvasLabel: "An abstract three-dimensional future core, representing the connection between strategy, design and technology.",
    },
    capabilityStrip: ["Digital experiences", "Modern web", "SEO & growth", "Visual content"],
    sections: {
      servicesEyebrow: "What we build",
      servicesTitle: "One connected system, not a list of disconnected services.",
      servicesBody: "Every engagement starts with a real business problem and moves toward a tangible, usable and scalable outcome.",
      workEyebrow: "Selected work",
      workTitle: "We show quality with evidence—not invented numbers.",
      processEyebrow: "How we work",
      processTitle: "From ambiguity to a clear digital experience.",
      whyEyebrow: "Why FMS?",
      whyTitle: "Creative thinking and technical delivery at one table.",
      socialEyebrow: "From the studio",
      socialTitle: "A short look at the thinking and content behind FMS.",
      finalTitle: "Your next project can start today.",
      finalBody: "Tell us the problem, the goal and your timing. We’ll make the next step clear together.",
    },
    services: [
      {
        slug: sharedServiceSlugs[0],
        label: "Direction",
        title: "Digital strategy & brand direction",
        summary: "Define positioning, messaging and the path forward before production begins.",
        problem: "When the message, audience or priorities are unclear, even strong execution struggles to produce a coherent result.",
        deliverables: ["Discovery", "Messaging architecture", "Visual direction", "Delivery roadmap"],
      },
      {
        slug: sharedServiceSlugs[1],
        label: "Experience",
        title: "UI/UX design",
        summary: "Clear, distinctive and accessible experiences for the web and digital products.",
        problem: "Cluttered interfaces and unclear journeys erode trust and conversion before either has time to form.",
        deliverables: ["Research & user flows", "Wireframes", "Interface design", "Prototype & design system"],
      },
      {
        slug: sharedServiceSlugs[2],
        label: "Build",
        title: "Website design & development",
        summary: "Fast, responsive websites built on a modern, maintainable foundation.",
        problem: "A slow or dated site creates a direct gap between the quality of your brand and what your audience experiences.",
        deliverables: ["Technical architecture", "Responsive development", "Purposeful motion", "SEO & quality assurance"],
      },
      {
        slug: sharedServiceSlugs[3],
        label: "Commerce",
        title: "Commerce & CMS solutions",
        summary: "Content and commerce foundations your team can actually operate.",
        problem: "The wrong platform makes content updates and commercial growth expensive and dependent.",
        deliverables: ["Platform selection", "Catalogue architecture", "Purchase experience", "Content training"],
      },
      {
        slug: sharedServiceSlugs[4],
        label: "Growth",
        title: "SEO, optimisation & growth",
        summary: "Improve structure, speed and content for more durable discoverability.",
        problem: "Without sound technical and content foundations, acquisition costs rise and organic search opportunities disappear.",
        deliverables: ["Technical audit", "Content structure research", "Page optimisation", "Measurement framework"],
      },
      {
        slug: sharedServiceSlugs[5],
        label: "Story",
        title: "Video & social content",
        summary: "A coherent visual language that makes your brand easier to recognise and follow.",
        problem: "Publishing without a consistent visual language rarely builds a unified picture of the brand.",
        deliverables: ["Concept & script", "Production", "Editing", "Repeatable content formats"],
      },
    ],
    process: [
      { title: "Discover", body: "We clarify the business, audience, problem and measure of success." },
      { title: "Direct", body: "The content architecture, priorities and visual language take shape." },
      { title: "Build", body: "Design, development and motion progress in short, visible cycles." },
      { title: "Validate", body: "Mobile, accessibility, performance, content and SEO are tested." },
      { title: "Launch & grow", body: "Release, handover and the next improvement path are documented." },
    ],
    reasons: [
      { title: "One connected path", body: "Strategy, visual design and delivery begin with the same problem." },
      { title: "A considered solution", body: "The project is shaped around the real need, not a ready-made template." },
      { title: "Measurable quality", body: "Appearance, speed, accessibility and outcomes are considered together." },
      { title: "Clear communication", body: "Decisions, status and the next step stay visible throughout the work." },
    ],
    work: {
      emptyTitle: "Verified case studies are being prepared.",
      emptyBody: "Until imagery, FMS’s precise role and evidence-backed results are approved, we won’t publish a project as a case study.",
      emptyLabel: "No invented clients or metrics",
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
      eyebrow: "Start a project",
      title: "Let’s begin with the problem you want to solve.",
      intro: "Share a few lines about your business, goal and timing. This preview only sends messages after a verified destination is configured.",
      directTitle: "Prefer a direct conversation?",
      directBody: "For now, the FMS Instagram profile is the only verified public contact channel.",
    },
    privacy: {
      eyebrow: "Privacy",
      title: "Project information deserves the same care as the project itself.",
      intro: "This is a temporary preview policy and must be aligned with the final data-handling process before launch.",
      items: [
        { title: "What is collected?", body: "Only the information you enter in the project form, including your name, contact route and project description." },
        { title: "How is it used?", body: "To review the enquiry, reply and coordinate around that specific project." },
        { title: "What is not logged?", body: "Sensitive form values are not written to application logs, and the site does not load heavy social embeds." },
      ],
    },
    common: {
      explore: "Explore service",
      allServices: "All services",
      viewWork: "View work",
      pending: "Awaiting verified content",
      projectPrompt: "Tell us about your project",
      back: "Back",
      notFound: "This page could not be found.",
      notFoundBody: "The address may have changed, or the content may not be published yet.",
      home: "Back home",
      footerLine: "Strategy, design and technology for what comes next.",
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
