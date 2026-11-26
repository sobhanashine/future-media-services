import { FaqPage } from "@/components/pages/FaqPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("it", "Domande frequenti su siti web e Instagram | FMS", "Risposte su tempi di realizzazione, rate, gestione dei contenuti, assistenza e avvio del progetto.", "/faq");

export default function Page() {
  return <FaqPage locale="it" />;
}
