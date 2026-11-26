import { interfaceCopy } from "@/content/interface";
import Image from "next/image";
import type { Locale } from "@/content/site";
import chess from "./art/simone-chess.webp";
import poster from "./art/simone-poster.webp";
import smile from "./art/simone-smile.webp";
import reel from "./art/studio-reel.webp";
import edit from "./art/studio-edit.webp";
import story from "./art/studio-story.webp";
import symbol from "./art/studio-symbol.webp";
import stillLife from "./art/simone-still-life.webp";
import ofoqModel from "./art/ofoq-engineering.webp";
import booking from "./art/ermetes-booking.webp";
import art from "./Artwork.module.css";

const cardSize = "(min-width: 1000px) 27vw, (min-width: 680px) 42vw, 84vw";
const weeklyPlan = {
  fa: [["شنبه", "ریلز آموزشی"], ["دوشنبه", "پست ورقه‌ای"], ["چهارشنبه", "ریلز آموزشی"], ["جمعه", "نمونه‌کار"]],
  it: [["Sabato", "Reel didattico"], ["Lunedì", "Carosello"], ["Mercoledì", "Reel di design"], ["Venerdì", "Un progetto"]],
  en: [["Saturday", "Explainer reel"], ["Monday", "Carousel"], ["Wednesday", "Design reel"], ["Friday", "Project reel"]],
};

function CampaignPrints() {
  return <span className={art.prints} aria-hidden="true">{[smile, poster, chess].map(image =>
    <span key={image.src}><Image src={image} alt="" fill sizes="(min-width: 1000px) 10vw, 28vw"/></span>
  )}</span>;
}

export function FmsServiceArt({ index, locale }: { index: number; locale: Locale }) {
  if (index < 2) {
    const slug = index === 0 ? "ofoq" : "simone-food";
    return <span className={art.siteStudy} data-brand={slug} aria-hidden="true">
      <span className={art.desktop}><Image src={`/projects/${slug}-desktop.webp`} width={1440} height={900} sizes={cardSize} alt="" /></span>
      <span className={art.phone}><Image src={`/projects/${slug}-mobile.webp`} width={390} height={844} sizes="(min-width: 1000px) 6vw, 20vw" alt=""/></span>
    </span>;
  }
  if (index === 2) return <span className={art.profile} aria-hidden="true" dir="ltr">
    <Image src={symbol} alt="" className={art.profileMark} sizes="56px"/>
    <span>Future Media<br/><em>Services.</em></span>
    <Image src={stillLife} alt="" className={art.profilePrint} sizes="(min-width: 1000px) 9vw, 28vw"/>
  </span>;
  if (index === 3) return <span className={art.schedule} aria-hidden="true">
    <span className={art.planHeading}><em dir="ltr">FMS</em>{interfaceCopy[locale].calendar}</span>
    <span className={art.week}>{weeklyPlan[locale].map(([day,format]) => <span key={day}><small>{day}</small><b>{format}</b></span>)}</span>
  </span>;
  if (index === 4) return <CampaignPrints/>;
  return <span className={art.editSuite} aria-hidden="true">
    <Image src={reel} alt="" fill sizes={cardSize}/>
    <span className={art.timeline}>{[reel,edit,reel,edit].map((img,i) => <span key={i}><Image src={img} alt="" fill sizes="70px"/></span>)}</span>
  </span>;
}

export function FmsStudioArt({ locale }: {locale: Locale}) {
  return <figure className={art.desk}>
    <div className={art.deskSurface} aria-hidden="true">
      <div className={art.ofoqPrint}><span>OFOQ</span><Image src={ofoqModel} alt="" sizes="(min-width: 820px) 28vw, 60vw"/></div>
      <span className={art.catalogPrint}><Image src="/projects/nafis-teb-desktop.webp" width={1600} height={1000} sizes="(min-width: 820px) 25vw, 62vw" alt=""/></span>
      <span className={art.bookingPrint}><Image src={booking} alt="" sizes="(min-width: 820px) 14vw, 33vw"/></span>
    </div>
    <figcaption>{interfaceCopy[locale].fromWork}<span>{interfaceCopy[locale].artCaption}</span></figcaption>
  </figure>;
}

export function FmsSocialArt({ index }: {index: number}) {
  if (index === 0) return <span className={art.storySpread}><span><Image src={story} alt="" fill sizes="(min-width:810px) 11vw, 32vw"/></span></span>;
  if (index === 1) return <span className={art.reelCover}><Image src={edit} alt="" fill sizes="(min-width:810px) 26vw, 72vw"/><i aria-hidden="true"/></span>;
  return <span className={art.signatureCover}><Image src={symbol} alt="" sizes="(min-width:810px) 11vw, 30vw"/><span dir="ltr">Future Media Services</span></span>;
}

export function FeatureArt({ index, locale }: { index: number; locale: Locale }) {
  if (index === 0) return <div className={art.feature} aria-hidden="true">
    <span className={art.proof}><Image src={poster} alt="" fill sizes="115px"/></span>
    <span className={art.swatches}><i/><i/><i/></span>
  </div>;
  if (index === 1) return <div className={art.feature} aria-hidden="true">
    <div className={art.editor}><div className={art.editorTools} dir="ltr"><b>B</b><i>I</i><span>H₂</span></div><div className={art.editorLine}><span>{interfaceCopy[locale].overview}</span></div><div className={art.typedLines}/></div>
  </div>;
  return <div className={art.feature} aria-hidden="true">
    <span className={art.featureDevice}><Image src="/projects/simone-food-mobile.webp" alt="" width={390} height={844} sizes="115px"/></span>
  </div>;
}
