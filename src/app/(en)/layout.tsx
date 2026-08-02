import localFont from "next/font/local";
import "../globals.css";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { createMetadata } from "@/lib/metadata";

const geistSans = localFont({
  src: "../fonts/geist/Geist-Variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  preload: false,
  fallback: ["Arial", "sans-serif"],
});

export const metadata = createMetadata(
  "en",
  "Future Media Services | Next.js and headless WordPress websites",
  "Custom personal, corporate and commerce websites built with Next.js and headless WordPress, plus specialist Instagram content management.",
);

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={geistSans.variable}>
      <body className="font-en"><SiteFrame locale="en">{children}</SiteFrame></body>
    </html>
  );
}
