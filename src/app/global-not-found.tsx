import type { Metadata } from "next";
import { NotFoundView } from "@/components/layout/NotFoundView";
import s from "@/components/layout/SiteState.module.css";
import { studioLight } from "./fonts/studio";

export const metadata: Metadata = { title: "صفحه پیدا نشد | Future Media Services", robots: { index: false } };

export default function GlobalNotFound() {
  return <html lang="fa" dir="rtl">
    <body className={`${s.document} ${studioLight.className}`}>
      <main><NotFoundView locale="fa" showLanguageLinks /></main>
    </body>
  </html>;
}
