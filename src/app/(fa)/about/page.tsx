import { AboutPage } from "@/components/pages/AboutPage";
import { persianSeoMetadata } from "@/content/seo";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("fa", persianSeoMetadata.about.title, persianSeoMetadata.about.description, "/about");
export default function Page() { return <AboutPage locale="fa" />; }
