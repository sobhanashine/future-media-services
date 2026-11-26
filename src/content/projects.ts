import type { Locale } from "./site";

type LocalizedProjectCopy = {
  title: string;
  seo?: {
    title: string;
    description: string;
  };
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
  mockup: string;
};

export type Project = {
  slug: string;
  url: string;
  domain: string;
  available: boolean;
  featured: boolean;
  status?: "demo" | "preview";
  images?: ProjectImages;
  technologies: string[];
  copy: Record<Locale, LocalizedProjectCopy>;
};

export const projects: Project[] = [
  {
    slug: "ofoq",
    url: "https://ofoqbuild.com",
    domain: "ofoqbuild.com",
    available: true,
    featured: true,
    images: {
      desktop: "/projects/ofoq-desktop.webp",
      tablet: "/projects/ofoq-tablet.webp",
      mobile: "/projects/ofoq-mobile.webp",
      mockup: "/projects/mockups/ofoq-mockup.webp",
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
        sourceNote: "این پروژه در رکورد پروژه‌های Future Media Services ثبت و نگهداری می‌شود.",
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
        sourceNote: "This project is documented and maintained in Future Media Services project records.",
      },
      it: {
        title: "OFOQ",
        descriptor: "Una piattaforma editoriale in tre lingue",
        summary: "Un sito di ingegneria in persiano, inglese e arabo. La redazione pubblica da WordPress e Next.js presenta i contenuti con il verso di lettura corretto per ogni lingua.",
        role: "Architettura headless e sviluppo dell’interfaccia",
        imageAlt: "La home di OFOQ su computer, tablet e telefono",
        challenge: "La redazione voleva continuare a usare WordPress, con più controllo sulla velocità, sull’HTML e sulla struttura multilingue del sito pubblico.",
        approach: "Abbiamo collegato WordPress a Next.js tramite WPGraphQL. Quando la redazione pubblica una modifica, un webhook aggiorna le pagine interessate.",
        highlights: [
          "Generazione statica e aggiornamento mirato delle pagine",
          "Percorsi in persiano, inglese e arabo con supporto RTL",
          "Metadati Yoast integrati nella Metadata API e nei dati JSON-LD",
          "Interfaccia indipendente per gestire prestazioni e HTML",
        ],
        sourceNote: "Il progetto è documentato negli archivi di Future Media Services.",
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
      mockup: "/projects/mockups/aura-disposable-mockup.webp",
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
        sourceNote: "این پروژه در رکورد پروژه‌های Future Media Services ثبت و نگهداری می‌شود.",
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
        sourceNote: "This project is documented and maintained in Future Media Services project records.",
      },
      it: {
        title: "Aura Disposable",
        descriptor: "Negozio online e verifica di autenticità",
        summary: "Una vetrina digitale con portale per i rivenditori e verifica dei prodotti tramite un codice univoco.",
        role: "Responsabilità dello sviluppo web",
        imageAlt: "Il negozio Aura Disposable su tre dimensioni di schermo",
        challenge: "Il marchio aveva bisogno di presentare il catalogo al pubblico, gestire i rivenditori e permettere al cliente di verificare un prodotto.",
        approach: "L’interfaccia usa Next.js. Supabase gestisce dati e archiviazione. Il cliente può inserire il codice del prodotto direttamente sul sito.",
        highlights: [
          "Vetrina responsive per consultare il catalogo",
          "Pannello amministrativo basato su Supabase",
          "Verifica di autenticità tramite codice univoco",
          "Navigazione per linee di prodotto Indica, Sativa e Hybrid",
        ],
        sourceNote: "Il progetto è documentato negli archivi di Future Media Services.",
      },
    },
  },
  {
    slug: "digimoragheb",
    url: "https://digimoragheb.com",
    domain: "digimoragheb.com",
    available: false,
    featured: true,
    images: {
      desktop: "/projects/digimoragheb-desktop.webp",
      tablet: "/projects/digimoragheb-tablet.webp",
      mobile: "/projects/digimoragheb-mobile.webp",
      mockup: "/projects/mockups/digimoragheb-mockup.webp",
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
        sourceNote: "این پروژه در رکورد پروژه‌های Future Media Services ثبت و نگهداری می‌شود.",
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
        sourceNote: "This project is documented and maintained in Future Media Services project records.",
      },
      it: {
        title: "DigiMoragheb",
        descriptor: "Prenotazione di visite e consulti online",
        summary: "Piattaforma sanitaria con prenotazione di appuntamenti, gestione dei profili e chat in tempo reale tra paziente e medico.",
        role: "Sviluppo full stack e comunicazioni in tempo reale",
        imageAlt: "La piattaforma DigiMoragheb su desktop, tablet e mobile",
        challenge: "Il paziente doveva poter trovare un medico, fissare una visita e avviare una conversazione nello stesso percorso.",
        approach: "L’interfaccia in Vue.js comunica con servizi Node.js ed Express. La chat usa WebSocket e PostgreSQL conserva i dati di utenti e appuntamenti.",
        highlights: [
          "Chat in tempo reale tra paziente e medico",
          "API per registrazione, profili e appuntamenti",
          "Modello dati per utenti e prenotazioni",
          "Percorsi per ricerca, pacchetti di assistenza e supporto",
        ],
        sourceNote: "Il progetto è documentato negli archivi di Future Media Services.",
      },
    },
  },
  {
    slug: "ermetes",
    url: "https://www.ermetes.it/",
    domain: "www.ermetes.it",
    available: true,
    featured: true,
    images: {
      desktop: "/projects/ermetes-desktop.webp",
      tablet: "/projects/ermetes-tablet.webp",
      mobile: "/projects/ermetes-mobile.webp",
      mockup: "/projects/mockups/ermetes-mockup.webp",
    },
    technologies: ["TypeScript", "Responsive UI", "CMS", "Service calendar"],
    copy: {
      fa: {
        title: "ERMETES",
        descriptor: "وب‌سایت خدماتی و پنل‌های مدیریت عملیات",
        summary: "طراحی و توسعه تجربه وب Ermetes برای معرفی خدمات، دریافت درخواست و مدیریت کارها؛ همراه با تقویم خدمات، پنل تعاونی و مدیریت پرسنل.",
        role: "طراحی تجربه کاربر و توسعه سایت و پنل‌ها",
        imageAlt: "سه نمای واکنش‌گرا از دموی وب‌سایت خدماتی Ermetes",
        challenge: "معرفی خدمات و مسیر درخواست مشتری باید به تجربه‌ای روشن تبدیل می‌شد، در حالی که تیم داخلی به ابزارهای منسجم برای کارها، تقویم و اطلاعات پرسنل نیاز داشت.",
        approach: "سایت عمومی با مسیرهای معرفی خدمات و درخواست طراحی شد و پنل‌های خدمات و تعاونی در همان پروژه توسعه یافتند.",
        highlights: [
          "وب‌سایت واکنش‌گرا برای معرفی خدمات و محدوده فعالیت",
          "فرم‌های دریافت درخواست و مسیر ارتباط با مجموعه",
          "پنل مدیریت خدمات، کارها و تقویم",
          "پنل تعاونی، پرسنل و مدارک، همراه با محتوای قابل‌ویرایش CMS",
        ],
        sourceNote: "این پروژه با تأیید مالک در رکورد Future Media Services قرار گرفته است. تصاویر از دموی عمومی بازبینی ثبت شده‌اند؛ لینک پروژه به وب‌سایت اصلی هدایت می‌کند.",
      },
      en: {
        title: "ERMETES",
        descriptor: "A website and staff dashboards for a cooperative in Trento",
        summary: "ERMETES provides cleaning, property maintenance and car wash services in Trento, Italy. We designed its public website and built dashboards for service requests, scheduling and personnel records.",
        role: "User experience design, website and dashboard development",
        imageAlt: "Three responsive views of the Ermetes service website review demo",
        challenge: "Service information and customer enquiries needed a clear public experience, while the internal team needed consistent tools for jobs, scheduling and personnel information.",
        approach: "The public website brings together services and enquiry paths, with separate service and cooperative dashboards developed within the project.",
        highlights: [
          "Responsive service presentation and coverage information",
          "Enquiry forms and direct contact paths",
          "Services, jobs and calendar management dashboard",
          "Cooperative, personnel and document dashboard with editable CMS content",
        ],
        sourceNote: "This project is included in Future Media Services records with owner approval. The screenshots show the review demo. The link opens the official ERMETES website.",
      },
      it: {
        title: "ERMETES",
        descriptor: "Sito e pannelli di gestione per una cooperativa di Trento",
        summary: "ERMETES si occupa di pulizie, manutenzioni e autolavaggio a Trento. Abbiamo progettato il sito pubblico della cooperativa e sviluppato i pannelli per gestire richieste, interventi e personale.",
        role: "Progettazione dell’esperienza utente e sviluppo di sito e pannelli",
        imageAlt: "La demo di revisione del sito ERMETES su computer, tablet e telefono",
        challenge: "I clienti dovevano trovare il servizio e il contatto giusto. La cooperativa aveva bisogno di organizzare interventi, scadenze e documenti del personale.",
        approach: "Il sito pubblico presenta attività e zone servite. I pannelli riservati riuniscono calendario, attività della cooperativa e informazioni sul personale.",
        highlights: [
          "Presentazione dei servizi e delle zone coperte",
          "Moduli di richiesta e contatti diretti",
          "Calendario per servizi e interventi",
          "Gestione di personale, documenti e contenuti modificabili dal CMS",
        ],
        sourceNote: "Pubblicato con l’autorizzazione del titolare. Le immagini mostrano la demo di revisione. Il pulsante apre il sito ufficiale di ERMETES.",
      },
    },
  },
  {
    slug: "nafis-teb",
    url: "https://nafis-teb.ir",
    domain: "nafis-teb.ir",
    available: true,
    featured: true,
    status: "preview",
    images: {
      desktop: "/projects/nafis-teb-desktop.webp",
      tablet: "/projects/nafis-teb-tablet.webp",
      mobile: "/projects/nafis-teb-mobile.webp",
      mockup: "/projects/mockups/nafis-teb-mockup.webp",
    },
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle", "ZarinPal"],
    copy: {
      fa: {
        title: "نفیس‌طب",
        descriptor: "فروشگاه فارسی تجهیزات و لوازم پزشکی",
        summary: "طراحی و توسعه فروشگاه نفیس‌طب با کاتالوگ تجهیزات پزشکی، جست‌وجو و دسته‌بندی، سبد خرید و زیرساخت مدیریت محصول، سفارش و اتصال پرداخت.",
        role: "طراحی و توسعه فروشگاه و زیرساخت مدیریت",
        imageAlt: "سه نمای واکنش‌گرای فروشگاه فارسی تجهیزات پزشکی نفیس‌طب",
        challenge: "خریدار باید بتواند تجهیزات پزشکی را در یک تجربه فارسی و قابل‌فهم پیدا و مقایسه کند؛ قیمت، موجودی و اطلاعات سفارش نیز باید در سمت سرور مدیریت شوند.",
        approach: "فرانت‌اند راست‌به‌چپ با Next.js ساخته شد و داده‌های محصول و سفارش به PostgreSQL و Drizzle متصل شدند. مسیر خرید، مدیریت فروشگاه و لایه SEO فنی در یک ساختار مشترک توسعه یافتند.",
        highlights: [
          "کاتالوگ فارسی با جست‌وجو، دسته‌بندی و صفحات محصول",
          "سبد خرید ماندگار و اعتبارسنجی قیمت و موجودی در سرور",
          "زیرساخت مدیریت محصولات، سفارش‌ها و اتصال زرین‌پال",
          "طراحی واکنش‌گرا و داده ساختاریافته برای محصولات و کسب‌وکار",
        ],
        sourceNote: "این پروژه با تأیید مالک در رکورد Future Media Services قرار گرفته است. تصاویر از پیش‌نمایش محلی کد فروشگاه با داده‌های نمونه ثبت شده‌اند؛ قیمت و موجودی داخل تصاویر واقعی نیستند. دسترسی HTTPS به سایت هنگام ثبت تصاویر تأیید نشد.",
      },
      en: {
        title: "Nafis Teb",
        descriptor: "A Persian medical equipment storefront",
        summary: "Design and development of the Nafis Teb storefront, with a medical equipment catalogue, search and categories, a persistent cart and infrastructure for product, order and payment management.",
        role: "Storefront design, development and management infrastructure",
        imageAlt: "Three responsive views of the Persian Nafis Teb medical equipment storefront",
        challenge: "Customers needed a clear Persian experience for finding and comparing medical equipment, with product prices, stock and order information managed on the server.",
        approach: "A right-to-left Next.js frontend connects product and order data to PostgreSQL through Drizzle. The purchase experience, management tools and technical SEO foundation were developed together.",
        highlights: [
          "Persian catalogue with search, categories and product pages",
          "Persistent cart with server-side price and stock validation",
          "Product and order management infrastructure with ZarinPal integration",
          "Responsive design and product and business structured data",
        ],
        sourceNote: "This project is included in Future Media Services records with owner approval. Captures show a local preview of the storefront code with sample data, not actual prices or stock. HTTPS access to the public website could not be verified when the images were captured.",
      },
      it: {
        title: "Nafis Teb",
        descriptor: "E-commerce persiano di attrezzature mediche",
        summary: "Un catalogo di dispositivi medici con ricerca, categorie e carrello persistente, collegato agli strumenti di gestione di prodotti, ordini e pagamenti.",
        role: "Design e sviluppo del negozio e degli strumenti di gestione",
        imageAlt: "Il catalogo persiano di Nafis Teb su computer, tablet e telefono",
        challenge: "Il cliente doveva poter trovare e confrontare le attrezzature, mentre il negozio doveva mantenere prezzi e disponibilità aggiornati.",
        approach: "L’interfaccia RTL in Next.js usa Drizzle per collegarsi a PostgreSQL. Catalogo, flusso d’acquisto e strumenti di gestione sono stati sviluppati insieme.",
        highlights: [
          "Ricerca, categorie e schede prodotto in persiano",
          "Carrello persistente con verifica di prezzi e scorte sul server",
          "Gestione di prodotti e ordini con integrazione ZarinPal",
          "Design responsive e dati strutturati per prodotti e attività",
        ],
        sourceNote: "Scheda pubblicata con l’autorizzazione del titolare. Le schermate provengono da un’anteprima locale con dati di esempio. Per prezzi e disponibilità aggiornati consulta il negozio.",
      },
    },
  },
  {
    slug: "karats-diamond",
    url: "https://karatsdiamond.shop",
    domain: "karatsdiamond.shop",
    available: true,
    featured: true,
    status: "demo",
    images: {
      desktop: "/projects/karats-diamond-desktop.webp",
      tablet: "/projects/karats-diamond-tablet.webp",
      mobile: "/projects/karats-diamond-mobile.webp",
      mockup: "/projects/mockups/karats-diamond-mockup.webp",
    },
    technologies: ["Next.js", "TypeScript", "Supabase", "Cloudflare Workers"],
    copy: {
      fa: {
        title: "Karats Diamond",
        descriptor: "فروشگاه مینیمال جواهرات و مدیریت کاتالوگ",
        summary: "یک تجربه مینیمال برای معرفی جواهرات، بررسی مشخصات و انتخاب گزینه‌های محصول، همراه با پنل مدیریت کاتالوگ مبتنی بر Supabase. فروشگاه عمومی فعلاً از کاتالوگ دمو استفاده می‌کند.",
        role: "طراحی و توسعه فروشگاه و پنل مدیریت محصول",
        imageAlt: "سه نمای واکنش‌گرا از فروشگاه جواهرات Karats Diamond",
        challenge: "نمایش جواهرات باید ساده و دقیق می‌بود و انتخاب اندازه و مشخصات را روشن می‌کرد؛ در کنار آن، مدیریت محصول به ذخیره‌سازی واقعی و عملیات قابل‌بازیابی نیاز داشت.",
        approach: "ویترین با Next.js و یک کاتالوگ دموی مشخص ساخته شد. پنل مدیریت جداگانه به Supabase متصل است و افزودن، ویرایش، آپلود تصویر و حذف قابل‌بازیابی محصولات را پوشش می‌دهد.",
        highlights: [
          "طراحی مینیمال و واکنش‌گرا برای معرفی جواهرات",
          "صفحات محصول با انتخاب گزینه‌ها و سبد خرید ماندگار",
          "پنل مدیریت محصول با جست‌وجو، فیلتر و آپلود تصویر",
          "ذخیره‌سازی Supabase و حذف با امکان بازیابی از سطل زباله",
        ],
        sourceNote: "این پروژه با تأیید مالک در رکورد Future Media Services قرار گرفته است. فروشگاه عمومی کاتالوگ دمو دارد؛ داده‌های پنل در Supabase ذخیره می‌شوند و پیش‌نمایش خرید، سفارش یا پرداخت واقعی ثبت نمی‌کند.",
      },
      en: {
        title: "Karats Diamond",
        descriptor: "Minimal jewelry commerce and catalogue management",
        summary: "A minimal experience for discovering jewelry, reviewing specifications and selecting product options, with a Supabase-backed catalogue dashboard. The public storefront currently uses a demo catalogue.",
        role: "Storefront design, development and product dashboard",
        imageAlt: "Three responsive views of the Karats Diamond jewelry storefront",
        challenge: "Jewelry presentation needed a restrained layout and clear size and specification choices, alongside persistent product management with recoverable operations.",
        approach: "The Next.js storefront uses an explicit demo catalogue. A separate Supabase-backed dashboard supports product creation, editing, image uploads and recoverable deletion.",
        highlights: [
          "Minimal, responsive jewelry presentation",
          "Product options and a persistent shopping bag",
          "Product dashboard with search, filters and image uploads",
          "Supabase persistence and recoverable deletion through Trash",
        ],
        sourceNote: "This project is included in Future Media Services records with owner approval. The public catalogue is a demo; dashboard data persists in Supabase, and the checkout preview does not place an order or take payment.",
      },
      it: {
        title: "Karats Diamond",
        descriptor: "Gioielleria online e gestione del catalogo",
        summary: "Una vetrina essenziale per esplorare i gioielli, confrontare le caratteristiche e scegliere le varianti. Il catalogo pubblico è dimostrativo.",
        role: "Design e sviluppo del negozio e del pannello prodotti",
        imageAlt: "La vetrina di Karats Diamond su tre dispositivi",
        challenge: "La cura delle immagini doveva convivere con scelte di misura chiare e con una gestione del catalogo che permettesse di recuperare i prodotti rimossi.",
        approach: "La vetrina in Next.js usa un catalogo dimostrativo. Un pannello separato in Supabase gestisce prodotti, immagini, modifiche e ripristino dal cestino.",
        highlights: [
          "Vetrina responsive per la gioielleria",
          "Varianti dei prodotti e carrello persistente",
          "Pannello prodotti con ricerca, filtri e caricamento immagini",
          "Archiviazione su Supabase e ripristino dal cestino",
        ],
        sourceNote: "Scheda pubblicata con l’autorizzazione del titolare. Il checkout pubblico è dimostrativo. I dati del pannello di gestione sono conservati in Supabase.",
      },
    },
  },
  {
    slug: "simone-food",
    url: "https://simonefood.ir",
    domain: "simonefood.ir",
    available: true,
    featured: true,
    images: {
      desktop: "/projects/simone-food-desktop.webp",
      tablet: "/projects/simone-food-tablet.webp",
      mobile: "/projects/simone-food-mobile.webp",
      mockup: "/projects/mockups/simone-food-mockup.webp",
    },
    technologies: ["Next.js", "TypeScript", "JSON-LD"],
    copy: {
      fa: {
        title: "سیمون فود",
        seo: {
          title: "مطالعه موردی طراحی ویترین سیمون فود | FMS",
          description: "مطالعه موردی طراحی وب‌سایت سیمون فود با ویترین فارسی و واکنش‌گرا، کاتالوگ پک‌های شش‌تایی کوکی، صفحات محصول و راهنمای ارسال.",
        },
        descriptor: "ویترین فارسی برند کوکی سیمون",
        summary: "طراحی و توسعه وب‌سایت سیمون فود برای معرفی برند و نمایش پک‌های شش‌تایی کوکی، با صفحات محصول و راهنمای ارسال.",
        role: "طراحی و توسعه وب‌سایت و کاتالوگ",
        imageAlt: "نمای صفحهٔ اصلی سیمون فود در لپ‌تاپ، تبلت و موبایل",
        challenge: "وب‌سایت باید هویت بصری سیمون را حفظ می‌کرد و به بازدیدکننده کمک می‌کرد روی موبایل طعم‌ها را مقایسه کند و ترکیب هر بسته و شرایط ارسال را پیدا کند.",
        approach: "صفحهٔ اصلی با رنگ زرد سیمون و عکس کوکی‌ها برند را معرفی می‌کند. ویترین فارسی با Next.js و TypeScript پیاده‌سازی شد و بازدیدکننده را از معرفی طعم‌ها به جزئیات هر پک و پرسش‌های رایج می‌رساند.",
        highlights: [
          "طراحی واکنش‌گرا با تایپوگرافی فارسی و چیدمان راست‌به‌چپ",
          "کاتالوگ پک‌های شش‌تایی با معرفی طعم‌ها و ترکیب هر بسته",
          "راهنمای سفارش، ارسال و نگهداری کوکی‌ها در پرسش‌های رایج",
          "داده‌های ساختاریافته برای وب‌سایت و فهرست محصولات",
        ],
        sourceNote: "این پروژه در رکوردهای Future Media Services ثبت شده است. تصاویر سه دستگاه از صفحهٔ اصلی وب‌سایت عمومی سیمون فود گرفته شده‌اند.",
      },
      en: {
        title: "Simone Food",
        descriptor: "A Persian storefront for a cookie brand",
        summary: "Design and development of the Simone Food website, introducing the brand and its six-cookie packs through a Persian catalogue, product pages and delivery guidance.",
        role: "Website and catalogue design and development",
        imageAlt: "The Simone Food homepage on laptop, tablet and mobile",
        challenge: "The website needed to carry Simone’s visual identity while helping mobile visitors compare flavours, see what comes in each box and find delivery information.",
        approach: "The homepage introduces the brand with Simone’s yellow palette and cookie photography. The Persian storefront uses Next.js and TypeScript to connect flavour discovery with pack details and frequently asked questions.",
        highlights: [
          "Responsive design with Persian typography and right-to-left layouts",
          "Six-cookie pack catalogue with flavours and box contents",
          "Ordering, delivery and cookie storage guidance in the FAQ",
          "Structured data for the website and product catalogue",
        ],
        sourceNote: "This project is documented in Future Media Services project records. The three device captures show the public Simone Food homepage.",
      },
      it: {
        title: "Simone Food",
        descriptor: "Negozio di biscotti in persiano",
        summary: "Sito e catalogo per presentare il marchio Simone Food, i gusti e le confezioni da sei biscotti, con informazioni su ordini e consegne.",
        role: "Design e sviluppo del sito e del catalogo",
        imageAlt: "La home di Simone Food su computer, tablet e telefono",
        challenge: "Da telefono, il cliente doveva poter confrontare i gusti, vedere cosa contiene ogni confezione e trovare le informazioni sulla consegna.",
        approach: "La palette gialla del marchio e le fotografie dei biscotti guidano l’esplorazione. Next.js e TypeScript collegano il catalogo alle schede delle confezioni e alle domande frequenti.",
        highlights: [
          "Tipografia persiana e impaginazione da destra a sinistra",
          "Catalogo delle confezioni da sei con gusti e contenuto",
          "Informazioni su ordini, consegna e conservazione",
          "Dati strutturati per il sito e il catalogo",
        ],
        sourceNote: "Progetto documentato da Future Media Services. Le tre schermate mostrano la home pubblica di Simone Food.",
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
      mockup: "/projects/mockups/kashiland-mockup.webp",
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
        sourceNote: "این پروژه در آرشیو Future Media Services ثبت شده است؛ دامنه و تجربه عمومی وب‌سایت برای نگهداری این رکورد بررسی شده‌اند.",
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
        sourceNote: "This project is listed in the Future Media Services archive; its domain and public website experience were reviewed to maintain this record.",
      },
      it: {
        title: "Kashiland",
        descriptor: "E-commerce di finiture e materiali edili",
        summary: "Cataloghi di piastrelle, gres, sanitari e finiture con percorsi per marchio, consulenza e acquisto online.",
        role: "Progetto in archivio. Il dettaglio del contributo non è pubblicato.",
        imageAlt: "Il negozio specializzato Kashiland su più dispositivi",
        challenge: "La scelta dei materiali richiede confronto fra specifiche e marchi, consigli tecnici e informazioni sullo showroom.",
        approach: "Il sito affianca ai cataloghi le pagine dei marchi, le guide e le informazioni sulla consulenza, accompagnando il visitatore fino all’acquisto.",
        highlights: [
          "Categorie per piastrelle, gres, accessori e sanitari",
          "Cataloghi per marchio e prodotti più venduti",
          "Guide per gli acquisti tecnici",
          "Consulenza e informazioni sullo showroom",
        ],
        sourceNote: "Scheda dell’archivio Future Media Services, basata sul sito pubblico e sulla documentazione disponibile.",
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
        summary: "این دامنه در آرشیو Future Media Services به‌عنوان یک پروژه فروشگاهی ثبت شده، اما هنگام بررسی و ثبت دارایی‌های این نسخه در دسترس نبود.",
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
        sourceNote: "این پروژه در آرشیو Future Media Services نگهداری می‌شود؛ نسخه زنده در زمان بررسی در دسترس نبود و رکورد فقط اطلاعات قابل تأیید را نمایش می‌دهد.",
      },
      en: {
        title: "Mehrshad Store",
        descriptor: "A commerce project preserved in the archive",
        summary: "The Future Media Services archive lists this domain as a store project, but the website was unavailable when the assets for this version were verified.",
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
        sourceNote: "This project remains in the Future Media Services archive; the live site was unavailable during review, so the record shows only confirmable information.",
      },
      it: {
        title: "Mehrshad Store",
        descriptor: "Un negozio conservato in archivio",
        summary: "L’archivio FMS conserva il nome e il dominio del negozio. Il sito pubblico non era disponibile al momento della verifica.",
        role: "Scheda d’archivio. Ruolo e tecnologie non pubblicati.",
        imageAlt: "Scheda d’archivio di Mehrshad Store",
        challenge: "Il sito non era raggiungibile durante la raccolta delle schermate.",
        approach: "La scheda conserva solo i dati disponibili nell’archivio originale.",
        highlights: [
          "Nome e dominio conservati",
          "Disponibilità del sito segnalata",
          "Immagini e dettagli tecnici non disponibili",
          "Scheda aggiornabile se viene fornita documentazione verificabile",
        ],
        sourceNote: "L’archivio di Future Media Services conserva il progetto con le informazioni verificabili.",
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
      mockup: "/projects/mockups/paytakhte-ketab-mockup.webp",
    },
    technologies: ["Commerce", "Search & filtering", "Order tracking"],
    copy: {
      fa: {
        title: "پایتخت کتاب",
        seo: {
          title: "مطالعه موردی طراحی فروشگاه آنلاین پایتخت کتاب | FMS",
          description: "مطالعه موردی طراحی فروشگاه آنلاین پایتخت کتاب؛ بررسی جست‌وجو، فیلتر، خرید مهمان و تجربه پیگیری سفارش در یک کاتالوگ بزرگ آموزشی.",
        },
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
        sourceNote: "این پروژه در آرشیو Future Media Services ثبت شده است؛ دامنه و تجربه عمومی وب‌سایت برای نگهداری این رکورد بررسی شده‌اند.",
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
        sourceNote: "This project is listed in the Future Media Services archive; its domain and public website experience were reviewed to maintain this record.",
      },
      it: {
        title: "Paytakhte Ketab",
        descriptor: "Libreria online e materiali didattici",
        summary: "Libreria per testi scolastici, universitari, di preparazione agli esami e di interesse generale. Offre ricerca, acquisto come ospite e tracciamento dell’ordine.",
        role: "Progetto in archivio. Il dettaglio del contributo non è pubblicato.",
        imageAlt: "La libreria Paytakhte Ketab su tre dispositivi",
        challenge: "Studenti e famiglie devono orientarsi tra classe, materia, editore ed edizione e capire quale libro è disponibile.",
        approach: "Ricerca, filtri e pagine per classe si collegano ai consigli di lettura, al carrello e al monitoraggio dell’ordine.",
        highlights: [
          "Ricerca trasversale nel catalogo",
          "Percorsi per classe, materia ed editore",
          "Acquisto come ospite e tracciamento ordini",
          "Schede di approfondimento e informazioni sulla consegna",
        ],
        sourceNote: "Scheda dell’archivio Future Media Services, basata sul sito pubblico e sulla documentazione disponibile.",
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
      mockup: "/projects/mockups/noornegar-mockup.webp",
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
        sourceNote: "این پروژه در آرشیو Future Media Services ثبت شده است؛ دامنه و تجربه عمومی وب‌سایت برای نگهداری این رکورد بررسی شده‌اند.",
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
        sourceNote: "This project is listed in the Future Media Services archive; its domain and public website experience were reviewed to maintain this record.",
      },
      it: {
        title: "Noornegar",
        descriptor: "Negozio specializzato in foto e video",
        summary: "E-commerce di fotocamere, obiettivi, luci, audio e accessori, con ricerca, carrello e contenuti di approfondimento.",
        role: "Progetto in archivio. Il dettaglio del contributo non è pubblicato.",
        imageAlt: "Il negozio Noornegar su desktop, tablet e mobile",
        challenge: "Un ampio catalogo tecnico deve consentire sia ai professionisti sia a chi inizia di confrontare modelli e trovare accessori compatibili.",
        approach: "Il sito organizza i prodotti per tipo di attrezzatura, utilizzo e marchio. Al catalogo affianca materiale usato e contenuti formativi.",
        highlights: [
          "Categorie per foto, video, luci, audio e accessori",
          "Navigazione per marchio e utilizzo",
          "Ricerca, varianti, disponibilità e carrello",
          "Guide specialistiche collegate ai prodotti",
        ],
        sourceNote: "Scheda dell’archivio Future Media Services, basata sul sito pubblico e sulla documentazione disponibile.",
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
      mockup: "/projects/mockups/jaheshino-mockup.webp",
    },
    technologies: ["Course commerce", "Student panel", "Educational content"],
    copy: {
      fa: {
        title: "جهشینو",
        seo: {
          title: "مطالعه موردی طراحی پلتفرم آموزشی جهشینو | FMS",
          description: "مطالعه موردی طراحی پلتفرم آموزشی جهشینو؛ بررسی معرفی و فروش دوره، پنل کاربر، آزمون آنلاین و مسیرهای دسترسی و پرداخت.",
        },
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
        sourceNote: "این پروژه در آرشیو Future Media Services ثبت شده است؛ دامنه و تجربه عمومی وب‌سایت برای نگهداری این رکورد بررسی شده‌اند.",
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
        sourceNote: "This project is listed in the Future Media Services archive; its domain and public website experience were reviewed to maintain this record.",
      },
      it: {
        title: "Jaheshino",
        descriptor: "Piattaforma di corsi di fisica",
        summary: "Un portale didattico con corsi selezionati, acquisto online, area studenti e informazioni su accesso offline, test e rate.",
        role: "Progetto in archivio. Il dettaglio del contributo non è pubblicato.",
        imageAlt: "La piattaforma didattica Jaheshino su più dispositivi",
        challenge: "Gli studenti devono confrontare corsi, modalità di accesso, programmi e pagamenti prima di iniziare le lezioni.",
        approach: "Le pagine dei corsi collegano gli obiettivi didattici alle modalità di acquisto, all’area studenti e ai contenuti di approfondimento.",
        highlights: [
          "Corsi organizzati per obiettivi didattici",
          "Indicazioni per accesso offline, test online e pagamenti a rate",
          "Acquisto del corso collegato all’area studenti",
          "Materiali didattici e guide per la scelta",
        ],
        sourceNote: "Scheda dell’archivio Future Media Services, basata sul sito pubblico e sulla documentazione disponibile.",
      },
    },
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const additionalProjects = projects.filter((project) => !project.featured);
export const portfolioProjects = projects.filter((project) => project.images);
export const projectSlugs = projects.map((project) => project.slug);

export function projectCopy(project: Project, locale: Locale) {
  return project.copy[locale];
}

export function findProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

const italianTechnologyLabels: Record<string, string> = {
  "Responsive UI": "Interfaccia responsive", "Service calendar": "Calendario interventi", Commerce: "E-commerce",
  "Product catalogue": "Catalogo prodotti", "Editorial content": "Contenuti editoriali", "Archive record": "Archivio",
  "Search & filtering": "Ricerca e filtri", "Order tracking": "Tracciamento ordini", "Large catalogue": "Catalogo esteso",
  "Course commerce": "Vendita di corsi", "Student panel": "Area studenti", "Educational content": "Contenuti didattici",
};

export function projectTechnologies(project: Project, locale: Locale) {
  return locale === "it" ? project.technologies.map(item => italianTechnologyLabels[item] ?? item) : project.technologies;
}
