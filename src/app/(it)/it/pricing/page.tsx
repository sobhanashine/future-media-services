import { PlansPage } from "@/components/pages/PlansPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("it", "Prezzi per siti web e gestione Instagram | FMS", "Confronta costi, funzioni e tempi di consegna dei siti web e i canoni mensili per post, storie e reel su Instagram.", "/pricing");

export default function Page() {
  return <PlansPage locale="it" />;
}
