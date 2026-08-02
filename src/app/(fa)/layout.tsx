import localFont from "next/font/local";
import "../globals.css";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { persianSeoMetadata } from "@/content/seo";
import { createMetadata } from "@/lib/metadata";

const yekanBakh = localFont({
  src: [
    { path: "../fonts/yekan-bakh/YekanBakh-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/yekan-bakh/YekanBakh-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-yekan-bakh",
  display: "swap",
  preload: true,
  fallback: ["Arial", "sans-serif"],
});

export const metadata = createMetadata(
  "fa",
  persianSeoMetadata.home.title,
  persianSeoMetadata.home.description,
);

export default function PersianRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={yekanBakh.variable}>
      <body className="font-fa"><SiteFrame locale="fa">{children}</SiteFrame></body>
    </html>
  );
}
