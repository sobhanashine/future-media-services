import { ServicesPage } from "@/components/pages/ServicesPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("fa", "خدمات دیجیتال | Future Media Services", "استراتژی برند، طراحی UI/UX، توسعه وب، فروشگاه، SEO و محتوای بصری.", "/services");

export default function Page() {
  return <ServicesPage locale="fa" />;
}
