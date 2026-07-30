import { ContactPage } from "@/components/pages/ContactPage";
import { persianSeoMetadata } from "@/content/seo";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("fa", persianSeoMetadata.contact.title, persianSeoMetadata.contact.description, "/contact");
export default function Page() { return <ContactPage locale="fa" />; }
