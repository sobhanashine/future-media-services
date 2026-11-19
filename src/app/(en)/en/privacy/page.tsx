import { PrivacyPage } from "@/components/pages/PrivacyPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("en", "Privacy | Future Media Services", "How FMS receives and uses your phone number when you request a callback.", "/privacy");
export default function Page() { return <PrivacyPage locale="en" />; }
