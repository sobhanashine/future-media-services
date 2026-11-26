import { ContactPage } from "@/components/pages/ContactPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("en", "Contact Future Media Services", "Tell FMS about your website or Instagram project and receive an estimate by email.", "/contact");
export default function Page() { return <ContactPage locale="en" />; }
