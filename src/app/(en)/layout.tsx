import "../globals.css";
import "../studio.css";
import { yekanBakh } from "../fonts/studio";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata(
  "en",
  "Future Media Services | Next.js and headless WordPress websites",
  "Custom personal, corporate and commerce websites built with Next.js and headless WordPress, plus specialist Instagram content management.",
);

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={yekanBakh.variable}>
      <body className="font-en studio-site"><SiteFrame locale="en">{children}</SiteFrame></body>
    </html>
  );
}
