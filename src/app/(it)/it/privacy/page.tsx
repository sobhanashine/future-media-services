import { PrivacyPage } from "@/components/pages/PrivacyPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("it", "Privacy e richieste di contatto | FMS", "Come FMS usa l’indirizzo email e il messaggio che invii dal modulo di contatto.", "/privacy");

export default function Page() {
  return <PrivacyPage locale="it" />;
}
