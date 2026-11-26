import { PrivacyPage } from "@/components/pages/PrivacyPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("en", "Privacy | Future Media Services", "How FMS uses the email address and project details you send through the contact form.", "/privacy");
export default function Page() { return <PrivacyPage locale="en" />; }
