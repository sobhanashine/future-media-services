import { InternationalJournal, journalText } from "@/components/pages/InternationalJournal";
import { createMetadata } from "@/lib/metadata";

const text = journalText.en;
export const metadata = createMetadata("en", text.title + " | FMS", text.intro, "/blog");

export default function Page() {
  return <InternationalJournal locale="en" />;
}
