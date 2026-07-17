import { ServicesPage } from "@/components/pages/ServicesPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("en", "Digital services | Future Media Services", "Brand strategy, UI/UX, web development, commerce, SEO and visual content.", "/services");

export default function Page() {
  return <ServicesPage locale="en" />;
}
