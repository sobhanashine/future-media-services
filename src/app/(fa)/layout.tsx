import "../globals.css";
import "../studio.css";
import { studioLight, yekanBakh } from "../fonts/studio";
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
    <html lang="fa" dir="rtl" className={`${yekanBakh.variable} ${studioLight.variable}`}>
      <body className="font-fa studio-site"><SiteFrame locale="fa">{children}</SiteFrame></body>
    </html>
  );
}
