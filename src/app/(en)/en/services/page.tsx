import { ServicesPage } from "@/components/pages/ServicesPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("en", "Web design and Instagram management | Future Media Services", "Explore custom websites, online stores and Instagram content management. See our process, deliverables, project examples and pricing.", "/services");

export default function Page() {
  return <ServicesPage locale="en" />;
}
