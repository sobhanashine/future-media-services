import { GeistSans } from "geist/font/sans";
import "@fontsource-variable/vazirmatn";
import "../globals.css";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { persianSeoMetadata } from "@/content/seo";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata(
  "fa",
  persianSeoMetadata.home.title,
  persianSeoMetadata.home.description,
);

export default function PersianRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={GeistSans.variable}>
      <body className="font-fa"><SiteFrame locale="fa">{children}</SiteFrame></body>
    </html>
  );
}
