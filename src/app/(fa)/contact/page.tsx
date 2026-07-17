import { ContactPage } from "@/components/pages/ContactPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("fa", "شروع پروژه | Future Media Services", "درباره مسئله، هدف و زمان‌بندی پروژه خود با Future Media Services گفتگو کنید.", "/contact");
export default function Page() { return <ContactPage locale="fa" />; }
