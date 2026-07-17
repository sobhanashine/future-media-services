import { PrivacyPage } from "@/components/pages/PrivacyPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("en", "Privacy | Future Media Services", "The temporary privacy and project-enquiry data policy.", "/privacy");
export default function Page() { return <PrivacyPage locale="en" />; }
