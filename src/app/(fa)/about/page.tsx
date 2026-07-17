import { AboutPage } from "@/components/pages/AboutPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("fa", "درباره Future Media Services", "رویکرد Future Media Services به استراتژی، طراحی، فناوری و محتوای دیجیتال.", "/about");
export default function Page() { return <AboutPage locale="fa" />; }
