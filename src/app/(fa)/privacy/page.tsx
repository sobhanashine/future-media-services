import { PrivacyPage } from "@/components/pages/PrivacyPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("fa", "حریم خصوصی | Future Media Services", "سیاست موقت حریم خصوصی و پردازش اطلاعات فرم پروژه.", "/privacy");
export default function Page() { return <PrivacyPage locale="fa" />; }
