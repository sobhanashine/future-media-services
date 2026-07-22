import { FaqPage } from "@/components/pages/FaqPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("en", "FAQs | Future Media Services", "Answers to common questions about website design, installment payments and Instagram content management.", "/faq");

export default function Page() {
  return <FaqPage locale="en" />;
}
