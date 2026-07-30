import { WorkPage } from "@/components/pages/WorkPage";
import { persianSeoMetadata } from "@/content/seo";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("fa", persianSeoMetadata.work.title, persianSeoMetadata.work.description, "/work");
export default function Page() { return <WorkPage locale="fa" />; }
