import { PrivacyPage } from "@/components/pages/PrivacyPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("it", "Privacy e richieste di contatto | FMS", "Come Future Media Services riceve e utilizza il numero di telefono quando chiedi di essere richiamato.", "/privacy");

export default function Page() {
  return <PrivacyPage locale="it" />;
}
