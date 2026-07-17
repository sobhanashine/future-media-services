import { ContactPage } from "@/components/pages/ContactPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("en", "Start a project | Future Media Services", "Tell Future Media Services about your problem, goal and project timing.", "/contact");
export default function Page() { return <ContactPage locale="en" />; }
