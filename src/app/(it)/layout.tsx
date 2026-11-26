import "../globals.css";
import "../studio.css";
import { yekanBakh } from "../fonts/studio";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata(
  "it",
  "Siti web e contenuti Instagram | Future Media Services",
  "Realizziamo siti aziendali, e-commerce e contenuti per Instagram. Scopri i progetti, confronta i piani e raccontaci di cosa ha bisogno la tua attività.",
);

export default function ItalianRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" dir="ltr" className={yekanBakh.variable}>
      <body className="font-it studio-site"><SiteFrame locale="it">{children}</SiteFrame></body>
    </html>
  );
}
