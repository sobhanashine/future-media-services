import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { BlogCard } from "@/components/pages/BlogCard";
import { persianBlogPosts } from "@/content/blog";
import s from "./StudioJournal.module.css";

export function BlogPreview() {
  const latest = [...persianBlogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0,3);
  if (!latest.length) return null;
  return <section className={`container-shell ${s.archive}`} aria-labelledby="latest-blog-title">
    <header className={s.archiveIntro} data-reveal>
      <p className={s.label}>یادداشت‌های FMS</p><h2 id="latest-blog-title">ایده‌هایی که قبل از اجرا، مسیر را روشن می‌کنند.</h2>
      <Link className={s.cardLink} href="/blog">مشاهده همه‌ی نوشته‌ها<ArrowIcon/></Link>
    </header>
    <div className={s.cardGrid}>{latest.map(post => <BlogCard post={post} key={post.slug}/>)}</div>
  </section>;
}
