import { PlansPage } from "@/components/pages/PlansPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("fa", "تعرفه طراحی سایت و مدیریت اینستاگرام | FMS", "مقایسهٔ قیمت، زمان تحویل و امکانات پلن‌های سایت شخصی، شرکتی و فروشگاهی و پلن‌های ماهانهٔ اینستاگرام.", "/pricing");
export default function Page() { return <PlansPage locale="fa" />; }
