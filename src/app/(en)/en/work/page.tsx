import { WorkPage } from "@/components/pages/WorkPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("en", "Work | Future Media Services", "Verified work and case studies from Future Media Services.", "/work");
export default function Page() { return <WorkPage locale="en" />; }
