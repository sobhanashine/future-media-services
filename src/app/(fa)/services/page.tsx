import { ServicesPage } from "@/components/pages/ServicesPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("fa", "طراحی سایت و مدیریت اینستاگرام | Future Media Services", "طراحی و توسعه سایت با Next.js و WordPress Headless، به‌همراه دسترسی به پلن‌های تخصصی مدیریت محتوای اینستاگرام.", "/services");

export default function Page() {
  return <ServicesPage locale="fa" />;
}
