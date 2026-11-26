import "../globals.css";
import "../studio.css";
import { yekanBakh } from "../fonts/studio";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata(
  "en",
  "Web design and Instagram content | Future Media Services",
  "Explore our websites, online shops and Instagram services. See client projects, compare plans and request a call about your business.",
);

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={yekanBakh.variable}>
      <body className="font-en studio-site"><SiteFrame locale="en">{children}</SiteFrame></body>
    </html>
  );
}
