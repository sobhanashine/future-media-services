import { InternationalJournal, journalText } from "@/components/pages/InternationalJournal";
import { createMetadata } from "@/lib/metadata";

const text = journalText.it;
export const metadata = createMetadata("it", text.title + " | FMS", text.intro, "/blog");

export default function Page() {
  return <InternationalJournal locale="it" />;
}
