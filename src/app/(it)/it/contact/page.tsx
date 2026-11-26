import { ContactPage } from "@/components/pages/ContactPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("it", "Contatti e preventivi | Future Media Services", "Scrivi a FMS per il tuo sito o per Instagram. Ti risponderemo via email per definire tempi e preventivo.", "/contact");

export default function Page() {
  return <ContactPage locale="it" />;
}
