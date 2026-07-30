import { PrivacyPage } from "@/components/pages/PrivacyPage";
import { persianSeoMetadata } from "@/content/seo";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("fa", persianSeoMetadata.privacy.title, persianSeoMetadata.privacy.description, "/privacy");
export default function Page() { return <PrivacyPage locale="fa" />; }
