import { PlansPage } from "@/components/pages/PlansPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("fa", "قیمت طراحی وب‌سایت و تعرفهٔ ادمینی اینستاگرام | FMS", "هزینهٔ طراحی وب‌سایت شخصی، شرکتی و فروشگاهی، راهنمای شروع با بودجهٔ محدود و تعرفهٔ پلن‌های ماهانهٔ ادمینی اینستاگرام.", "/pricing");
export default function Page() { return <PlansPage locale="fa" />; }
