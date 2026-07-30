import { ServicesPage } from "@/components/pages/ServicesPage";
import { persianSeoMetadata } from "@/content/seo";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("fa", persianSeoMetadata.services.title, persianSeoMetadata.services.description, "/services");

export default function Page() {
  return <ServicesPage locale="fa" />;
}
