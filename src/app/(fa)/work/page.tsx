import { WorkPage } from "@/components/pages/WorkPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("fa", "نمونه‌کارها | Future Media Services", "نمونه‌کارها و case studyهای تأییدشده Future Media Services.", "/work");
export default function Page() { return <WorkPage locale="fa" />; }
