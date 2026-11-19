import { ContactPage } from "@/components/pages/ContactPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("en", "Contact Future Media Services", "Leave your number for a callback about website design or Instagram management, or call Future Media Services directly.", "/contact");
export default function Page() { return <ContactPage locale="en" />; }
