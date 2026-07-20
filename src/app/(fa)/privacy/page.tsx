import { PrivacyPage } from "@/components/pages/PrivacyPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("fa", "حریم خصوصی | Future Media Services", "این وب‌سایت فرم پروژه یا اطلاعات تماس کاربران را دریافت و ذخیره نمی‌کند.", "/privacy");
export default function Page() { return <PrivacyPage locale="fa" />; }
