import { GeistSans } from "geist/font/sans";
import "@fontsource-variable/vazirmatn";
import "../globals.css";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata(
  "fa",
  "فیوچر مدیا سرویس | طراحی سایت با Next.js و WordPress Headless",
  "طراحی و توسعه سایت‌های شخصی، شرکتی و فروشگاهی با Next.js و WordPress Headless، به‌همراه دسترسی به مدیریت تخصصی محتوای اینستاگرام.",
);

export default function PersianRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={GeistSans.variable}>
      <body className="font-fa"><SiteFrame locale="fa">{children}</SiteFrame></body>
    </html>
  );
}
