import { PrivacyPage } from "@/components/pages/PrivacyPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("en", "Privacy | Future Media Services", "This website does not collect or store project form submissions or contact details.", "/privacy");
export default function Page() { return <PrivacyPage locale="en" />; }
