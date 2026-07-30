import { FaqPage } from "@/components/pages/FaqPage";
import { persianSeoMetadata } from "@/content/seo";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("fa", persianSeoMetadata.faq.title, persianSeoMetadata.faq.description, "/faq");

export default function Page() {
  return <FaqPage locale="fa" />;
}
