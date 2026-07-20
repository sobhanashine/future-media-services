import { GeistSans } from "geist/font/sans";
import "@fontsource-variable/vazirmatn";
import "../globals.css";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata(
  "en",
  "Future Media Services | Next.js and headless WordPress websites",
  "Custom personal, corporate and commerce websites built with Next.js and headless WordPress, plus specialist Instagram content management.",
);

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={GeistSans.variable}>
      <body className="font-en"><SiteFrame locale="en">{children}</SiteFrame></body>
    </html>
  );
}
