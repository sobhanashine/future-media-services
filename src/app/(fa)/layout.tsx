import { GeistSans } from "geist/font/sans";
import "@fontsource-variable/vazirmatn";
import "../globals.css";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata(
  "fa",
  "فیوچر مدیا سرویس | طراحی، توسعه وب و خدمات دیجیتال",
  "فیوچر مدیا سرویس با ترکیب استراتژی، طراحی UI/UX، توسعه وب، SEO و محتوای دیجیتال، تجربه‌ای مدرن و نتیجه‌محور برای برندها می‌سازد.",
);

export default function PersianRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={GeistSans.variable}>
      <body className="font-fa"><SiteFrame locale="fa">{children}</SiteFrame></body>
    </html>
  );
}
