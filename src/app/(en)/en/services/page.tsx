import { ServicesPage } from "@/components/pages/ServicesPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("en", "Web design and Instagram management | Future Media Services", "Custom Next.js and headless WordPress websites, plus access to specialist Instagram content management plans.", "/services");

export default function Page() {
  return <ServicesPage locale="en" />;
}
