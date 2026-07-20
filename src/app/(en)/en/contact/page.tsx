import { ContactPage } from "@/components/pages/ContactPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("en", "Call Future Media Services", "Call Future Media Services to choose a website plan and discuss your project.", "/contact");
export default function Page() { return <ContactPage locale="en" />; }
