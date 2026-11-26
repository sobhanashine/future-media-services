import { ContactPage } from "@/components/pages/ContactPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("it", "Contatti e preventivi | Future Media Services", "Parliamo del tuo sito o del tuo profilo Instagram. Chiamaci oppure lascia il tuo numero per essere ricontattato da FMS.", "/contact");

export default function Page() {
  return <ContactPage locale="it" />;
}
