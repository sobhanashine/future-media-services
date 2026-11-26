import { WorkPage } from "@/components/pages/WorkPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("it", "Portfolio di siti web e progetti digitali | FMS", "Esplora i progetti di Future Media Services, tra cui ERMETES. Scopri il nostro ruolo, le tecnologie, le schermate e i siti.", "/work");

export default function Page() {
  return <WorkPage locale="it" />;
}
