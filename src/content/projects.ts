import type { Locale } from "./site";

type LocalizedProjectCopy = {
  title: string;
  descriptor: string;
  summary: string;
  role: string;
  imageAlt: string;
};

export type FeaturedProject = {
  slug: string;
  url: string;
  domain: string;
  image: string;
  technologies: string[];
  copy: Record<Locale, LocalizedProjectCopy>;
};

export type ProjectLink = {
  url: string;
  domain: string;
  available?: boolean;
  title: Record<Locale, string>;
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "ofoq",
    url: "https://ofoq-web.vercel.app",
    domain: "ofoq-web.vercel.app",
    image: "/projects/ofoq.png",
    technologies: ["Next.js", "TypeScript", "WPGraphQL", "WordPress", "next-intl"],
    copy: {
      fa: {
        title: "افق",
        descriptor: "پلتفرم محتوای Headless و چندزبانه",
        summary: "فرانت‌اند Next.js روی بک‌اند وردپرس با پشتیبانی فارسی، انگلیسی و عربی، رندر کامل RTL و زیرساخت SEO مبتنی بر Metadata API و JSON-LD.",
        role: "معماری Headless و توسعه فرانت‌اند",
        imageAlt: "نمای صفحه اصلی وب‌سایت چندزبانه افق",
      },
      en: {
        title: "OFOQ",
        descriptor: "A multilingual headless content platform",
        summary: "A Next.js frontend on a WordPress backend, supporting Persian, English and Arabic with full RTL rendering and an SEO foundation built on the Metadata API and JSON-LD.",
        role: "Headless architecture & frontend development",
        imageAlt: "OFOQ multilingual website homepage",
      },
    },
  },
  {
    slug: "aura-disposable",
    url: "https://auradisposable.com",
    domain: "auradisposable.com",
    image: "/projects/aura-disposable.png",
    technologies: ["Next.js", "Supabase", "TypeScript"],
    copy: {
      fa: {
        title: "Aura Disposable",
        descriptor: "فروشگاه آنلاین لوکس با سامانه اصالت‌سنجی",
        summary: "یک فروشگاه دیجیتال و درگاه عمده‌فروشی با فرانت‌اند Next.js، زیرساخت Supabase و سامانه اختصاصی تأیید اصالت محصول با کد یکتا.",
        role: "راهبری توسعه وب",
        imageAlt: "نمای صفحه اصلی فروشگاه Aura Disposable",
      },
      en: {
        title: "Aura Disposable",
        descriptor: "Luxury commerce with product verification",
        summary: "A digital storefront and wholesale portal with a Next.js frontend, Supabase infrastructure and a custom authenticity system based on unique product codes.",
        role: "Web development lead",
        imageAlt: "Aura Disposable ecommerce homepage",
      },
    },
  },
  {
    slug: "digimoragheb",
    url: "https://digimoragheb.com",
    domain: "digimoragheb.com",
    image: "/projects/digimoragheb.png",
    technologies: ["Vue.js", "Node.js", "Express", "PostgreSQL", "WebSockets"],
    copy: {
      fa: {
        title: "دیجی‌مراقب",
        descriptor: "پلتفرم سلامت برای اتصال بیمار و پزشک",
        summary: "پلتفرم مشاوره و نوبت‌دهی آنلاین با چت بلادرنگ، APIهای ثبت‌نام و رزرو نوبت و معماری داده برای کاربران و قرارهای پزشکی.",
        role: "توسعه فول‌استک و قابلیت‌های بلادرنگ",
        imageAlt: "نمای صفحه اصلی پلتفرم سلامت دیجی‌مراقب",
      },
      en: {
        title: "DigiMoragheb",
        descriptor: "A health platform connecting patients and doctors",
        summary: "An online consultation and booking platform with real-time chat, APIs for registration and appointments, and data architecture for users and medical bookings.",
        role: "Full-stack & real-time development",
        imageAlt: "DigiMoragheb healthcare platform homepage",
      },
    },
  },
];

export const additionalProjects: ProjectLink[] = [
  {
    url: "https://kashiland.com",
    domain: "kashiland.com",
    title: { fa: "کاشی‌لند", en: "Kashiland" },
  },
  {
    url: "https://mehrshadstore.ir",
    domain: "mehrshadstore.ir",
    available: false,
    title: { fa: "فروشگاه مهرشاد", en: "Mehrshad Store" },
  },
  {
    url: "https://paytakhteketab.com",
    domain: "paytakhteketab.com",
    title: { fa: "پایتخت کتاب", en: "Paytakhte Ketab" },
  },
  {
    url: "https://noornegar.com",
    domain: "noornegar.com",
    title: { fa: "نورنگار", en: "Noornegar" },
  },
  {
    url: "https://jaheshino.ir",
    domain: "jaheshino.ir",
    title: { fa: "جهشینو", en: "Jaheshino" },
  },
  {
    url: "https://sakkou-cowork.ir",
    domain: "sakkou-cowork.ir",
    title: { fa: "فضای کار اشتراکی سکّو", en: "Sakkou Coworking" },
  },
];

export function projectCopy(project: FeaturedProject, locale: Locale) {
  return project.copy[locale];
}
