import { PlansPage } from "@/components/pages/PlansPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("en", "Website and Instagram pricing | FMS", "Compare delivery times, scope and prices for personal websites, corporate sites, online stores and monthly Instagram plans.", "/pricing");
export default function Page() { return <PlansPage locale="en" />; }
