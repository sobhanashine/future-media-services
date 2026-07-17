import { WorkPage } from "@/components/pages/WorkPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("fa", "نمونه‌کارها | Future Media Services", "نمونه‌کارهای منتخب وب با نقش، فناوری و لینک مستقیم به نسخه زنده.", "/work");
export default function Page() { return <WorkPage locale="fa" />; }
