import { ServicesPage } from "@/components/pages/ServicesPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("it", "Sviluppo siti web e gestione Instagram | FMS", "Siti aziendali, e-commerce, siti personali e gestione dei contenuti Instagram. Scopri servizi, esempi di progetto e tariffe.", "/services");

export default function Page() {
  return <ServicesPage locale="it" />;
}
