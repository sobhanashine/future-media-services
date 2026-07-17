import { GeistSans } from "geist/font/sans";
import "@fontsource-variable/vazirmatn";
import "../globals.css";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata(
  "en",
  "Future Media Services | Strategy, design and digital products",
  "Future Media Services brings strategy, design, web development, SEO and digital content into one clear path for ambitious brands.",
);

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={GeistSans.variable}>
      <body className="font-en"><SiteFrame locale="en">{children}</SiteFrame></body>
    </html>
  );
}
