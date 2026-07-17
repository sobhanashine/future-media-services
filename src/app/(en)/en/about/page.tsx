import { AboutPage } from "@/components/pages/AboutPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("en", "About Future Media Services", "How Future Media Services connects strategy, design, technology and digital content.", "/about");
export default function Page() { return <AboutPage locale="en" />; }
