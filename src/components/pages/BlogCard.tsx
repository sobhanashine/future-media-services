import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import type { BlogPost } from "@/content/blog";
import { formatNumber, localePath } from "@/content/site";
import studioReel from "@/components/landing/art/studio-reel.webp";
import campaign from "@/components/landing/art/simone-chess.webp";
import catalog from "@/components/landing/art/simone-poster.webp";
import s from "./StudioJournal.module.css";

const categoryCovers: Record<string, StaticImageData | string> = {
  "مدیریت محتوای اینستاگرام": campaign,
  "طراحی سایت فروشگاهی": "/projects/simone-food-desktop.webp",
  "طراحی سایت شرکتی": "/projects/ofoq-desktop.webp",
  "وردپرس هدلس": "/projects/nafis-teb-desktop.webp",
  "معماری وب": "/projects/ofoq-desktop.webp",
  "طراحی سایت": "/projects/ermetes-desktop.webp",
  "عملکرد و سئو فنی": "/projects/nafis-teb-desktop.webp",
  "سئو فنی": "/projects/ofoq-desktop.webp",
};
const articleCovers: Record<string, StaticImageData> = {
  "instagram-content-calendar-guide": catalog,
  "instagram-management-outsourcing-access-handover-checklist": studioReel,
};
export function articleDate(value: string) {
  return new Intl.DateTimeFormat("fa-IR", { dateStyle: "long" }).format(new Date(`${value}T12:00:00+03:30`));
}

export function BlogVisual({ post }: { post: BlogPost }) {
  const cover = articleCovers[post.slug] ?? categoryCovers[post.category] ?? studioReel;
  return <div className={s.cover} data-screen={typeof cover === "string"} aria-hidden="true"><Image src={cover} fill sizes="(min-width: 900px) 37vw, 92vw" alt="" /></div>;
}

export function BlogCard({ post }: { post: BlogPost }) {
  const url = localePath("fa", `/blog/${post.slug}`);
  return (
    <article className={s.card} data-reveal>
      <div className={s.cardMeta}><time dateTime={post.publishedAt}>{articleDate(post.publishedAt)}</time><span>{formatNumber(post.readingTime, "fa")} دقیقه مطالعه</span></div>
      <h3><Link href={url}>{post.title}</Link></h3>
      <p>{post.excerpt}</p>
      <Link className={s.cardLink} href={url} aria-label={`مطالعه مقاله — ${post.title}`}>مطالعه مقاله<ArrowIcon /></Link>
    </article>
  );
}
