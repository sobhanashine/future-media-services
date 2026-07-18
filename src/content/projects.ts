import type { Locale } from "./site";

type LocalizedProjectCopy = {
  title: string;
  descriptor: string;
  summary: string;
  role: string;
  imageAlt: string;
  challenge: string;
  approach: string;
  highlights: string[];
  sourceNote: string;
};

export type ProjectImages = {
  desktop: string;
  tablet: string;
  mobile: string;
};

export type Project = {
  slug: string;
  url: string;
  domain: string;
  available: boolean;
  featured: boolean;
  images?: ProjectImages;
  technologies: string[];
  copy: Record<Locale, LocalizedProjectCopy>;
};

export const projects: Project[] = [
  {
    slug: "ofoq",
    url: "https://ofoq-web.vercel.app",
    domain: "ofoq-web.vercel.app",
    available: true,
    featured: true,
    images: {
      desktop: "/projects/ofoq-desktop.webp",
      tablet: "/projects/ofoq-tablet.webp",
      mobile: "/projects/ofoq-mobile.webp",
    },
    technologies: ["Next.js", "TypeScript", "WPGraphQL", "WordPress", "next-intl"],
    copy: {
      fa: {
        title: "افق",
        descriptor: "پلتفرم محتوای Headless و چندزبانه",
        summary: "فرانت‌اند Next.js روی بک‌اند وردپرس با پشتیبانی فارسی، انگلیسی و عربی، رندر کامل RTL و زیرساخت SEO مبتنی بر Metadata API و JSON-LD.",
        role: "معماری Headless و توسعه فرانت‌اند",
        imageAlt: "نمای واکنش‌گرای صفحه اصلی وب‌سایت چندزبانه افق",
        challenge: "تیم محتوا باید ویرایش آشنای وردپرس را حفظ می‌کرد، در حالی که تجربه نهایی به رندر سریع، کنترل دقیق HTML، چندزبانگی واقعی و SEO فنی مستقل نیاز داشت.",
        approach: "وردپرس به‌عنوان منبع محتوا باقی ماند و Next.js مسئول تجربه کاربر، رندر و مسیرهای چندزبانه شد. داده‌ها با WPGraphQL دریافت و انتشار محتوا با بازاعتبارسنجی هدفمند به نسخه زنده متصل شد.",
        highlights: [
          "معماری Headless با SSG/ISR و بازاعتبارسنجی بر اساس Webhook",
          "مسیرهای فارسی، انگلیسی و عربی با پشتیبانی کامل RTL",
          "نگاشت داده‌های Yoast به Metadata API و JSON-LD",
          "ساختار فرانت‌اند مستقل برای کنترل سرعت، HTML و تجربه کاربر",
        ],
        sourceNote: "نقش و جزئیات فنی این صفحه از پورتفولیوی معرفی‌شده در mrashineh.ir استخراج شده‌اند.",
      },
      en: {
        title: "OFOQ",
        descriptor: "A multilingual headless content platform",
        summary: "A Next.js frontend on a WordPress backend, supporting Persian, English and Arabic with full RTL rendering and an SEO foundation built on the Metadata API and JSON-LD.",
        role: "Headless architecture & frontend development",
        imageAlt: "Responsive views of the OFOQ multilingual website homepage",
        challenge: "The editorial team needed to keep WordPress as a familiar publishing tool while the public experience required fast rendering, precise HTML control, true multilingual routes and an independent technical SEO layer.",
        approach: "WordPress remained the content source while Next.js took ownership of rendering, user experience and localized routing. WPGraphQL supplies the content and targeted revalidation connects editorial publishing to the live frontend.",
        highlights: [
          "Headless architecture with SSG/ISR and webhook-driven revalidation",
          "Persian, English and Arabic routes with complete RTL support",
          "Yoast data mapped into the Metadata API and JSON-LD",
          "An independent frontend for control over speed, HTML and experience",
        ],
        sourceNote: "The role and technical details on this page are sourced from the portfolio published at mrashineh.ir.",
      },
    },
  },
  {
    slug: "aura-disposable",
    url: "https://auradisposable.com",
    domain: "auradisposable.com",
    available: true,
    featured: true,
    images: {
      desktop: "/projects/aura-disposable-desktop.webp",
      tablet: "/projects/aura-disposable-tablet.webp",
      mobile: "/projects/aura-disposable-mobile.webp",
    },
    technologies: ["Next.js", "Supabase", "TypeScript"],
    copy: {
      fa: {
        title: "Aura Disposable",
        descriptor: "فروشگاه آنلاین لوکس با سامانه اصالت‌سنجی",
        summary: "یک فروشگاه دیجیتال و درگاه عمده‌فروشی با فرانت‌اند Next.js، زیرساخت Supabase و سامانه اختصاصی تأیید اصالت محصول با کد یکتا.",
        role: "راهبری توسعه وب",
        imageAlt: "نمای واکنش‌گرای فروشگاه Aura Disposable",
        challenge: "تجربه فروش باید هم حس یک برند پریمیوم را منتقل می‌کرد و هم کاتالوگ، عملیات عمده‌فروشی و مسئله مهم اعتماد به اصالت محصول را در یک سیستم واحد پوشش می‌داد.",
        approach: "فرانت‌اند با Next.js ساخته شد و Supabase مدیریت داده، ذخیره‌سازی و عملیات بک‌اند را بر عهده گرفت. یک جریان اختصاصی، کد یکتای هر محصول را مستقیماً در سایت بررسی می‌کند.",
        highlights: [
          "فروشگاه واکنش‌گرا برای نمایش و مدیریت کاتالوگ",
          "پنل مدیریت مبتنی بر Supabase برای داده و عملیات",
          "سامانه اصالت‌سنجی اختصاصی با کدهای یکتا",
          "تفکیک روشن محصولات Indica، Sativa و Hybrid در تجربه خرید",
        ],
        sourceNote: "نقش و جزئیات فنی این صفحه از پورتفولیوی معرفی‌شده در mrashineh.ir استخراج شده‌اند.",
      },
      en: {
        title: "Aura Disposable",
        descriptor: "Luxury commerce with product verification",
        summary: "A digital storefront and wholesale portal with a Next.js frontend, Supabase infrastructure and a custom authenticity system based on unique product codes.",
        role: "Web development lead",
        imageAlt: "Responsive views of the Aura Disposable storefront",
        challenge: "The commerce experience needed to express a premium brand while bringing the catalogue, wholesale operations and the critical question of product authenticity into one coherent system.",
        approach: "The frontend was built with Next.js while Supabase handles data, storage and backend operations. A purpose-built verification flow checks each unique product code directly on the website.",
        highlights: [
          "Responsive storefront for catalogue discovery and management",
          "A Supabase-based admin foundation for data and operations",
          "Custom product authentication using unique verification codes",
          "Clear Indica, Sativa and Hybrid paths throughout the shopping experience",
        ],
        sourceNote: "The role and technical details on this page are sourced from the portfolio published at mrashineh.ir.",
      },
    },
  },
  {
    slug: "digimoragheb",
    url: "https://digimoragheb.com",
    domain: "digimoragheb.com",
    available: true,
    featured: true,
    images: {
      desktop: "/projects/digimoragheb-desktop.webp",
      tablet: "/projects/digimoragheb-tablet.webp",
      mobile: "/projects/digimoragheb-mobile.webp",
    },
    technologies: ["Vue.js", "Node.js", "Express", "PostgreSQL", "WebSockets"],
    copy: {
      fa: {
        title: "دیجی‌مراقب",
        descriptor: "پلتفرم سلامت برای اتصال بیمار و پزشک",
        summary: "پلتفرم مشاوره و نوبت‌دهی آنلاین با چت بلادرنگ، APIهای ثبت‌نام و رزرو نوبت و معماری داده برای کاربران و قرارهای پزشکی.",
        role: "توسعه فول‌استک و قابلیت‌های بلادرنگ",
        imageAlt: "نمای واکنش‌گرای پلتفرم سلامت دیجی‌مراقب",
        challenge: "بیمار باید بتواند از کشف پزشک تا رزرو و گفتگو را در یک مسیر ساده طی کند، در حالی که داده‌های حساب، نوبت و ارتباط بلادرنگ به زیرساخت هماهنگ نیاز داشتند.",
        approach: "رابط کاربری با Vue.js و سرویس‌های بک‌اند با Node.js و Express توسعه یافتند. WebSocket ارتباط زنده را فراهم کرد و ساختار PostgreSQL کاربران و نوبت‌ها را به هم متصل نگه داشت.",
        highlights: [
          "چت بلادرنگ میان بیمار و پزشک با WebSocket",
          "APIهای ثبت‌نام، مدیریت پروفایل و رزرو نوبت",
          "طراحی ساختار داده برای کاربران و قرارهای پزشکی",
          "مسیرهای جست‌وجو، بسته خدمات و همراه بیمار در تجربه عمومی",
        ],
        sourceNote: "نقش و جزئیات فنی این صفحه از پورتفولیوی معرفی‌شده در mrashineh.ir استخراج شده‌اند.",
      },
      en: {
        title: "DigiMoragheb",
        descriptor: "A health platform connecting patients and doctors",
        summary: "An online consultation and booking platform with real-time chat, APIs for registration and appointments, and data architecture for users and medical bookings.",
        role: "Full-stack & real-time development",
        imageAlt: "Responsive views of the DigiMoragheb healthcare platform",
        challenge: "Patients needed a simple route from discovering a doctor to booking and conversation, while account, appointment and real-time communication data required a coordinated technical foundation.",
        approach: "The interface was developed in Vue.js with Node.js and Express services behind it. WebSockets support live communication and PostgreSQL keeps user and appointment structures connected.",
        highlights: [
          "Real-time patient-to-doctor chat using WebSockets",
          "APIs for registration, profile management and appointments",
          "Data modelling for users and medical bookings",
          "Public discovery paths for search, care packages and patient support",
        ],
        sourceNote: "The role and technical details on this page are sourced from the portfolio published at mrashineh.ir.",
      },
    },
  },
  {
    slug: "kashiland",
    url: "https://kashiland.com",
    domain: "kashiland.com",
    available: true,
    featured: false,
    images: {
      desktop: "/projects/kashiland-desktop.webp",
      tablet: "/projects/kashiland-tablet.webp",
      mobile: "/projects/kashiland-mobile.webp",
    },
    technologies: ["Commerce", "Product catalogue", "Editorial content"],
    copy: {
      fa: {
        title: "کاشی‌لند",
        descriptor: "فروشگاه تخصصی محصولات ساختمانی",
        summary: "یک تجربه تجارت الکترونیک برای کشف و خرید کاشی، سرامیک، پرسلان، شیرآلات و تجهیزات ساختمانی با کاتالوگ، برندها، مجله و مسیرهای مشاوره.",
        role: "فهرست‌شده به‌عنوان پروژه تکمیلی؛ نقش دقیق منتشر نشده",
        imageAlt: "نمای واکنش‌گرای فروشگاه تخصصی کاشی‌لند",
        challenge: "خرید محصولات ساختمانی به دسته‌بندی عمیق، مقایسه تنوع برند و مشخصات، محتوای راهنما و نشانه‌های اعتماد نیاز دارد؛ همه در بازاری که تصمیم خرید معمولاً مشورتی است.",
        approach: "تجربه عمومی سایت کاتالوگ محصولات، صفحات برند، مقاله‌های راهنما، دسترسی به مشاوره و اطلاعات شوروم را در کنار فرایند خرید آنلاین قرار می‌دهد.",
        highlights: [
          "معماری دسته‌بندی برای کاشی، پرسلان، شیرآلات و تجهیزات حمام",
          "کاتالوگ برندها و محصولات پرفروش برای کشف سریع‌تر",
          "مجله و محتوای آموزشی برای تصمیم‌های فنی خرید",
          "نشانه‌های اعتماد، مشاوره و اتصال تجربه آنلاین به شوروم",
        ],
        sourceNote: "این پروژه در mrashineh.ir زیر عنوان «همچنین ساخته‌شده» آمده است و نقش فنی دقیق آنجا منتشر نشده. وب‌سایت فعلی، طراحی و توسعه را به آژانس پله نسبت می‌دهد؛ بنابراین این صفحه ادعای نقش انحصاری ندارد.",
      },
      en: {
        title: "Kashiland",
        descriptor: "Specialist building-products commerce",
        summary: "An ecommerce experience for discovering and buying tiles, porcelain, fixtures and building products through catalogues, brands, editorial guidance and consultation paths.",
        role: "Listed as an additional build; exact contribution not published",
        imageAlt: "Responsive views of the Kashiland specialist store",
        challenge: "Buying building products requires deep categorisation, comparison across brands and specifications, practical guidance and trust signals in a market where decisions are often consultative.",
        approach: "The public experience brings product catalogues, brand pages, editorial guides, consultation access and showroom information together with the online purchase journey.",
        highlights: [
          "Category architecture for tiles, porcelain, fixtures and bathroom equipment",
          "Brand and best-selling product catalogues for faster discovery",
          "Editorial guidance for more informed technical purchases",
          "Trust, consultation and showroom signals connected to online commerce",
        ],
        sourceNote: "mrashineh.ir lists this under ‘also built’ without a detailed technical role. The current public site credits Pelle Agency for design and development, so this page does not claim an exclusive contribution.",
      },
    },
  },
  {
    slug: "mehrshad-store",
    url: "https://mehrshadstore.ir",
    domain: "mehrshadstore.ir",
    available: false,
    featured: false,
    technologies: ["Archive record"],
    copy: {
      fa: {
        title: "فروشگاه مهرشاد",
        descriptor: "پروژه فروشگاهی ثبت‌شده در آرشیو",
        summary: "این دامنه در پورتفولیوی منبع به‌عنوان یک پروژه فروشگاهی فهرست شده، اما هنگام بررسی و ثبت دارایی‌های این نسخه در دسترس نبود.",
        role: "رکورد آرشیوی؛ نقش و فناوری منتشر نشده",
        imageAlt: "رکورد آرشیوی فروشگاه مهرشاد",
        challenge: "نبود نسخه زنده یا دارایی قابل بررسی نباید به توضیح یا تصویر ساختگی منجر شود، اما سابقه پروژه نیز نباید بدون توضیح از پورتفولیو حذف شود.",
        approach: "پروژه با وضعیت شفاف آرشیوی نگهداری شده است. دامنه و عنوان منبع نمایش داده می‌شوند و تا زمان بازگشت سایت یا دریافت مستندات، ادعای فنی بیشتری منتشر نمی‌شود.",
        highlights: [
          "حفظ عنوان و دامنه مطابق پورتفولیوی منبع",
          "نمایش صریح وضعیت خارج از دسترس",
          "عدم استفاده از تصویر، فناوری یا نتیجه حدسی",
          "آماده برای تکمیل پس از دریافت مستندات تأییدشده",
        ],
        sourceNote: "سایت در زمان بررسی پاسخ قابل استفاده‌ای نداد؛ این صفحه عمداً فقط اطلاعات قابل تأیید را نمایش می‌دهد.",
      },
      en: {
        title: "Mehrshad Store",
        descriptor: "A commerce project preserved in the archive",
        summary: "The source portfolio lists this domain as a store project, but the website was unavailable when the assets for this version were verified.",
        role: "Archive record; role and technology not published",
        imageAlt: "Archive record for Mehrshad Store",
        challenge: "An unavailable live product should not lead to invented imagery or technical claims, but the project record should not disappear from the portfolio without explanation.",
        approach: "The project is retained with a transparent archive status. Its source title and domain remain visible, while further claims wait for a restored website or approved documentation.",
        highlights: [
          "Title and domain preserved from the source portfolio",
          "Unavailable status communicated clearly",
          "No guessed imagery, technology or outcome",
          "Ready to expand when verified documentation is supplied",
        ],
        sourceNote: "The website did not return a usable response during verification, so this page intentionally presents only confirmable information.",
      },
    },
  },
  {
    slug: "paytakhte-ketab",
    url: "https://www.paytakhteketab.com",
    domain: "paytakhteketab.com",
    available: true,
    featured: false,
    images: {
      desktop: "/projects/paytakhte-ketab-desktop.webp",
      tablet: "/projects/paytakhte-ketab-tablet.webp",
      mobile: "/projects/paytakhte-ketab-mobile.webp",
    },
    technologies: ["Commerce", "Search & filtering", "Order tracking"],
    copy: {
      fa: {
        title: "پایتخت کتاب",
        descriptor: "فروشگاه آنلاین کتاب و منابع آموزشی",
        summary: "یک بانک کتاب گسترده برای کتاب‌های درسی، کمک‌درسی، کنکور، دانشگاهی و عمومی با جست‌وجو، انتخاب پایه، تخفیف، خرید بدون ثبت‌نام و پیگیری سفارش.",
        role: "فهرست‌شده به‌عنوان پروژه تکمیلی؛ نقش دقیق منتشر نشده",
        imageAlt: "نمای واکنش‌گرای فروشگاه آنلاین پایتخت کتاب",
        challenge: "کاتالوگ بزرگ کتاب باید برای دانش‌آموز، والد و خریدار عمومی قابل جست‌وجو باشد و تفاوت پایه، درس، ناشر، ویرایش و موجودی را بدون پیچیده‌کردن خرید مدیریت کند.",
        approach: "تجربه عمومی سایت جست‌وجوی کتاب، انتخاب پایه و دسته، فیلتر فروشگاه، پیشنهادهای منتخب، خرید مهمان و پیگیری سفارش را در یک مسیر فروش یکپارچه می‌کند.",
        highlights: [
          "جست‌وجو و فیلتر میان کتاب‌های درسی، کنکور، دانشگاهی و عمومی",
          "ورود از مسیر پایه تحصیلی، درس، ناشر و محصولات منتخب",
          "امکان خرید بدون حساب کاربری و پیگیری سفارش",
          "محتوای راهنما، تحلیل کتاب و اطلاع‌رسانی ارسال",
        ],
        sourceNote: "این پروژه در mrashineh.ir زیر عنوان «همچنین ساخته‌شده» فهرست شده است. نقش فنی و فناوری دقیق در منبع منتشر نشده و توضیحات تجربه از وب‌سایت عمومی تهیه شده‌اند.",
      },
      en: {
        title: "Paytakhte Ketab",
        descriptor: "Online books and educational resources",
        summary: "A broad book store for school, exam-preparation, university and general titles with search, grade selection, discounts, guest checkout and order tracking.",
        role: "Listed as an additional build; exact contribution not published",
        imageAlt: "Responsive views of the Paytakhte Ketab online bookstore",
        challenge: "A large book catalogue needs to stay searchable for students, parents and general readers while handling grade, subject, publisher, edition and availability without making purchase feel complex.",
        approach: "The public experience combines book search, grade and category selection, catalogue filters, featured recommendations, guest checkout and order tracking into one commerce journey.",
        highlights: [
          "Search and filters across school, exam, university and general books",
          "Entry paths through grade, subject, publisher and featured products",
          "Guest checkout and order tracking",
          "Guidance, book analysis and delivery information",
        ],
        sourceNote: "mrashineh.ir lists this under ‘also built’. The exact technical role and stack are not published there; the experience description is based on the current public website.",
      },
    },
  },
  {
    slug: "noornegar",
    url: "https://noornegar.com",
    domain: "noornegar.com",
    available: true,
    featured: false,
    images: {
      desktop: "/projects/noornegar-desktop.webp",
      tablet: "/projects/noornegar-tablet.webp",
      mobile: "/projects/noornegar-mobile.webp",
    },
    technologies: ["Commerce", "Large catalogue", "Editorial content"],
    copy: {
      fa: {
        title: "نورنگار",
        descriptor: "فروشگاه تخصصی تجهیزات عکاسی و فیلم‌برداری",
        summary: "تجربه تجارت الکترونیک برای دوربین، لنز، نورپردازی، صدا و تجهیزات تولید محتوا با دسته‌بندی عمیق، جست‌وجو، سبد خرید و محتوای تخصصی.",
        role: "فهرست‌شده به‌عنوان پروژه تکمیلی؛ نقش دقیق منتشر نشده",
        imageAlt: "نمای واکنش‌گرای فروشگاه تخصصی نورنگار",
        challenge: "یک کاتالوگ بسیار گسترده و تخصصی باید هم برای حرفه‌ای‌ها دقیق باشد و هم برای خریدار تازه‌کار مسیر قابل فهمی میان مدل، برند، کاربرد و لوازم جانبی ایجاد کند.",
        approach: "ساختار عمومی سایت محصولات را بر اساس نوع تجهیزات، کاربرد و برند تفکیک می‌کند و جست‌وجو، سبد خرید، محصولات استوک و محتوای آموزشی را کنار هم قرار می‌دهد.",
        highlights: [
          "دسته‌بندی عمیق دوربین، لنز، نور، صدا و لوازم جانبی",
          "مسیرهای برند و کاربرد برای تجهیزات حرفه‌ای و مصرفی",
          "جست‌وجو، سبد خرید و نمایش وضعیت و تنوع محصول",
          "اتصال فروشگاه به محتوای آموزشی و راهنمای تخصصی",
        ],
        sourceNote: "این پروژه در mrashineh.ir زیر عنوان «همچنین ساخته‌شده» فهرست شده است. نقش فنی و فناوری دقیق در منبع منتشر نشده و توضیحات تجربه از وب‌سایت عمومی تهیه شده‌اند.",
      },
      en: {
        title: "Noornegar",
        descriptor: "Specialist photo and video equipment commerce",
        summary: "An ecommerce experience for cameras, lenses, lighting, audio and content-production equipment with deep categories, search, cart and specialist editorial content.",
        role: "Listed as an additional build; exact contribution not published",
        imageAlt: "Responsive views of the Noornegar specialist store",
        challenge: "A very large specialist catalogue must remain precise for professionals while giving newer buyers a clear route through models, brands, use cases and compatible accessories.",
        approach: "The public structure separates products by equipment type, use and brand, bringing search, cart, used inventory and educational content into the same experience.",
        highlights: [
          "Deep categories across cameras, lenses, lighting, audio and accessories",
          "Brand and use-case paths for professional and consumer equipment",
          "Search, cart and clear product availability and variation",
          "Commerce connected to educational and specialist guidance",
        ],
        sourceNote: "mrashineh.ir lists this under ‘also built’. The exact technical role and stack are not published there; the experience description is based on the current public website.",
      },
    },
  },
  {
    slug: "jaheshino",
    url: "https://jaheshino.ir",
    domain: "jaheshino.ir",
    available: true,
    featured: false,
    images: {
      desktop: "/projects/jaheshino-desktop.webp",
      tablet: "/projects/jaheshino-tablet.webp",
      mobile: "/projects/jaheshino-mobile.webp",
    },
    technologies: ["Course commerce", "Student panel", "Educational content"],
    copy: {
      fa: {
        title: "جهشینو",
        descriptor: "پلتفرم آموزش و فروش دوره‌های فیزیک",
        summary: "دپارتمان تخصصی فیزیک با دوره‌های منتخب، فروش آنلاین، پنل کاربر و اطلاعاتی مانند دسترسی آفلاین، آزمون آنلاین و پرداخت اقساطی.",
        role: "فهرست‌شده به‌عنوان پروژه تکمیلی؛ نقش دقیق منتشر نشده",
        imageAlt: "نمای واکنش‌گرای پلتفرم آموزشی جهشینو",
        challenge: "دانش‌آموز باید بتواند میان دوره‌های فیزیک با مدل دسترسی، برنامه زمانی و شرایط پرداخت متفاوت مقایسه کند و پس از خرید، مسیر مشخصی به محتوای آموزشی داشته باشد.",
        approach: "تجربه عمومی سایت دوره‌ها را بر اساس نیاز آموزشی معرفی می‌کند و جزئیات دسترسی، آزمون، پرداخت و ورود به پنل را در کنار فروش و محتوای بلاگ قرار می‌دهد.",
        highlights: [
          "معرفی دوره‌های منتخب بر اساس نیاز آموزشی",
          "نمایش دسترسی آفلاین، آزمون آنلاین و پرداخت اقساطی",
          "فروش دوره و ورود مستقیم به پنل کاربر",
          "ترکیب محتوای آموزشی، بلاگ و مسیر تجاری",
        ],
        sourceNote: "این پروژه در mrashineh.ir زیر عنوان «همچنین ساخته‌شده» فهرست شده است. نقش فنی و فناوری دقیق در منبع منتشر نشده و توضیحات تجربه از وب‌سایت عمومی تهیه شده‌اند.",
      },
      en: {
        title: "Jaheshino",
        descriptor: "Physics education and course commerce",
        summary: "A specialist physics department with selected courses, online purchase, a user panel and clear information on offline access, online tests and instalment payments.",
        role: "Listed as an additional build; exact contribution not published",
        imageAlt: "Responsive views of the Jaheshino education platform",
        challenge: "Students need to compare physics courses with different access models, schedules and payment terms, then move into a clear learning path after purchase.",
        approach: "The public experience introduces courses by learning need and places access, testing, payment and user-panel information alongside commerce and editorial content.",
        highlights: [
          "Featured courses organised around learning needs",
          "Offline access, online testing and instalment information",
          "Course purchase connected directly to the user panel",
          "Educational content and editorial guidance around the commercial path",
        ],
        sourceNote: "mrashineh.ir lists this under ‘also built’. The exact technical role and stack are not published there; the experience description is based on the current public website.",
      },
    },
  },
  {
    slug: "sakkou-cowork",
    url: "https://sakkou-cowork.ir",
    domain: "sakkou-cowork.ir",
    available: true,
    featured: false,
    images: {
      desktop: "/projects/sakkou-cowork-desktop.webp",
      tablet: "/projects/sakkou-cowork-tablet.webp",
      mobile: "/projects/sakkou-cowork-mobile.webp",
    },
    technologies: ["Membership", "Reservations", "Responsive web"],
    copy: {
      fa: {
        title: "فضای کار اشتراکی سکّو",
        descriptor: "معرفی، عضویت و رزرو فضای کار",
        summary: "یک تجربه دیجیتال برای معرفی فضای کار اشتراکی رشت، درخواست عضویت و مدیریت رزرو اتاق جلسه، Personal Zone و فضاهای کاری.",
        role: "فهرست‌شده به‌عنوان پروژه تکمیلی؛ نقش دقیق منتشر نشده",
        imageAlt: "نمای واکنش‌گرای وب‌سایت فضای کار اشتراکی سکّو",
        challenge: "یک فضای کار اشتراکی باید هویت جامعه خود را منتقل کند و هم‌زمان مسیر عملی عضویت، شناخت امکانات و رزرو فضا را برای تیم‌ها و افراد ساده نگه دارد.",
        approach: "سایت با معرفی روشن مخاطبان و امکانات شروع می‌شود و درخواست عضویت، رزرو اتاق جلسه، Personal Zone و مدیریت رزروها را به جریان‌های مشخص تبدیل می‌کند.",
        highlights: [
          "جایگاه روشن برای تیم‌های فنی، توسعه‌دهندگان و طراحان",
          "درخواست عضویت و پذیرش در مجموعه",
          "رزرو اتاق جلسه، Personal Zone و فضاهای کاری",
          "تجربه واکنش‌گرا با تمرکز بر اقدام و عضویت",
        ],
        sourceNote: "این پروژه در mrashineh.ir زیر عنوان «همچنین ساخته‌شده» فهرست شده است. نقش فنی و فناوری دقیق در منبع منتشر نشده و توضیحات تجربه از وب‌سایت عمومی تهیه شده‌اند.",
      },
      en: {
        title: "Sakkou Coworking",
        descriptor: "Coworking discovery, membership and reservations",
        summary: "A digital experience for introducing a Rasht coworking space, requesting membership and managing reservations for meeting rooms, personal zones and work areas.",
        role: "Listed as an additional build; exact contribution not published",
        imageAlt: "Responsive views of the Sakkou Coworking website",
        challenge: "A coworking space needs to express the character of its community while keeping membership, facilities and space reservation practical for both teams and individuals.",
        approach: "The website begins with a clear audience and facilities proposition, then turns membership, meeting-room booking, personal zones and reservation management into distinct flows.",
        highlights: [
          "Clear positioning for technical teams, developers and designers",
          "Membership request and community application flow",
          "Meeting-room, personal-zone and workspace reservations",
          "Responsive experience centred on action and membership",
        ],
        sourceNote: "mrashineh.ir lists this under ‘also built’. The exact technical role and stack are not published there; the experience description is based on the current public website.",
      },
    },
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const additionalProjects = projects.filter((project) => !project.featured);
export const portfolioProjects = projects.filter((project) => project.available && project.images);
export const projectSlugs = projects.map((project) => project.slug);

export function projectCopy(project: Project, locale: Locale) {
  return project.copy[locale];
}

export function findProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
