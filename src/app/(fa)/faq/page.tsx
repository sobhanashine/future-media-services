import { FaqPage } from "@/components/pages/FaqPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("fa", "سوالات متداول | Future Media Services", "پاسخ به سوالات رایج درباره طراحی سایت، پرداخت قسطی و مدیریت محتوای اینستاگرام.", "/faq");

export default function Page() {
  return <FaqPage locale="fa" />;
}
