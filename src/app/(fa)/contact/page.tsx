import { ContactPage } from "@/components/pages/ContactPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("fa", "تماس تلفنی | Future Media Services", "برای انتخاب پلن و شروع پروژه طراحی سایت، مستقیماً با Future Media Services تماس بگیرید.", "/contact");
export default function Page() { return <ContactPage locale="fa" />; }
