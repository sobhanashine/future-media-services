import { WorkPage } from "@/components/pages/WorkPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("en", "Work | Future Media Services", "Selected web projects with roles, technologies and direct links to the live products.", "/work");
export default function Page() { return <WorkPage locale="en" />; }
