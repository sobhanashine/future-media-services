import { AboutPage } from "@/components/pages/AboutPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("it", "Chi siamo | Future Media Services", "Scopri il team FMS e il nostro metodo per realizzare siti web e contenuti Instagram, dal primo incontro alla pubblicazione.", "/about");

export default function Page() {
  return <AboutPage locale="it" />;
}
