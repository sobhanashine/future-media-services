import Image from "next/image";
import type { CSSProperties } from "react";
import type { Locale } from "@/content/site";
import { landingCopy } from "@/content/landing";
import horizon from "./art/horizon.webp";
import ofoq from "./art/ofoq-signature.webp";
import simone from "./art/simone-signature.webp";
import orbitSheet from "./art/orbit-photos.webp";
import s from "./Landing.module.css";

const strokes = {
  web: "M3 5h18v14H3z M3 9h18 M7 7h.01 M10 7h.01",
  store: "M4 10v11h16V10 M3 10l2-7h14l2 7 M3 10q2 4 5 0 2 4 4 0 2 4 4 0 3 4 5 0 M9 21v-6h6v6",
  person: "M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M4 21v-2a8 6 0 0 1 16 0v2",
  layers: "m12 3 10 5-10 5L2 8z M3 12l9 5 9-5 M3 16l9 5 9-5",
  pen: "m4 20 4-1 12-12-3-3L5 16z M14 7l3 3",
  play: "M4 4h16v16H4z M10 8l6 4-6 4z",
  phone: "M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z M10 18h4",
  globe: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M3 12h18 M12 3c5 4 5 14 0 18-5-4-5-14 0-18z",
  meter: "M3 17a9 9 0 1 1 18 0 M12 15l5-6 M4 17h16",
  check: "m5 12 4 4L19 6",
  share: "M13 4h7v7 M20 4 9 15 M10 5H4v15h15v-6",
  code: "m8 7-5 5 5 5 M16 7l5 5-5 5 M14 4l-4 16",
  chat: "M3 4h18v13H9l-6 4z M7 9h10 M7 12h6",
} as const;
export type StudioIcon = keyof typeof strokes;

export function Icon({ name }: { name: StudioIcon }) {
  return <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round"><path d={strokes[name]} /></svg>;
}

export function Horizon() {
  // The orthographic surface combines NASA Blue Marble Next Generation with Natural Earth coastlines.
  return <div className={s.sky} aria-hidden="true">
    <div className={s.horizon}>
      <Image src={horizon} fill sizes="(max-width: 400px) 610px, (max-width: 809px) 155vw, (max-width: 960px) 960px, (max-width: 1480px) 100vw, 1480px" alt="" preload />
      <span className={s.earthHalo} data-fms-halo="earth" />
    </div>
  </div>;
}

export function BrandReel({ locale }: { locale: Locale }) {
  const marks = (
    <>
      <Image className={s.ofoqMark} src={ofoq} width={90} height={28} alt="" />
      <span className={s.ermetes}>ERMETES</span>
      <Image className={s.simoneMark} src={simone} width={99} height={27} alt="" />
      <span className={s.nafis}>Nafis Teb</span>
      <span className={s.karats}>KARATS</span>
    </>
  );
  return (
    <div className={s.brandReel} role="img" aria-label={landingCopy[locale].clients + " · OFOQ, Ermetes, Simone Food, Nafis Teb, Karats"}>
      <div className={s.brandMask} aria-hidden="true" dir="ltr">
        <div className={s.brandTrack}><div>{marks}</div><div>{marks}</div></div>
      </div>
    </div>
  );
}

const sheet = { "--sheet": `url("${orbitSheet.src}")` } as CSSProperties;

function tilePosition(tile: number) {
  return { "--tile-x": (tile % 6) * 20 + "%", "--tile-y": tile < 6 ? "0%" : "100%" } as CSSProperties;
}

export function Orbit() {
  return <div className={s.orbitWindow} aria-hidden="true"><div className={s.orbitDisc} style={sheet}>
    {Array.from({ length: 24 }, (_, i) => {
      const tile = i % 12;
      const style = { ...tilePosition(tile), "--angle": i * 15 + "deg" } as CSSProperties;
      return <span className={s.orbitArm} key={i} style={style}><span><i /></span></span>;
    })}
  </div></div>;
}

export function ProjectFan() {
  return <div className={s.fan} style={sheet} aria-hidden="true">
    {[7, 4, 6, 9, 1, 2, 3].map(tile => <div key={tile} style={tilePosition(tile)}><i /></div>)}
  </div>;
}
