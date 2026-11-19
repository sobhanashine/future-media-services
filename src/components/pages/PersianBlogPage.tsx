import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { BlogCard, BlogVisual } from "@/components/pages/BlogCard";
import { persianBlogPosts, type BlogPost } from "@/content/blog";
import { persianSeoMetadata } from "@/content/seo";
import { formatNumber, localePath } from "@/content/site";
import { JsonLd } from "@/components/layout/JsonLd";
import { siteUrl } from "@/lib/metadata";
import s from "./StudioJournal.module.css";

export function PersianBlogPage() {
  const posts = [...persianBlogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const [featuredPost, ...archivePosts] = posts;
  const groups = new Map<string, BlogPost[]>();
  for (const post of archivePosts) {
    const group = groups.get(post.category);
    if (group) group.push(post);
    else groups.set(post.category, [post]);
  }

  return (
    <div className={s.journal}>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "CollectionPage",
        name: persianSeoMetadata.blog.title, description: persianSeoMetadata.blog.description, inLanguage: "fa-IR",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: persianBlogPosts.map((post, index) => ({
            "@type": "ListItem", position: index + 1,
            url: new URL(`/blog/${post.slug}`, siteUrl).toString(), name: post.title,
          })),
        },
      }}/>
      <div className={`container-shell ${s.archiveHero}`}>
        <header className={s.masthead} data-hero-reveal>
          <p className={s.label}>مجلهٔ FMS</p>
          <h1 id="blog-page-title">راهنماهایی برای تصمیم‌های بهتر در وب و محتوا.</h1>
          <p>مقاله‌های فارسی FMS برای وقتی که قبل از اجرا، به یک نگاه روشن‌تر درباره طراحی سایت، معماری وب، SEO و محتوا نیاز دارید.</p>
          <a className={s.textAction} href="#blog-archive-title">{formatNumber(posts.length, "fa")} یادداشت منتشرشده<ArrowIcon direction="down" /></a>
        </header>
        {featuredPost && <article className={s.feature} aria-labelledby="featured-blog-title" data-hero-reveal>
          <BlogVisual post={featuredPost} />
          <div className={s.featureText}>
            <div className={s.cardMeta}><span>یادداشت منتخب</span><span>{featuredPost.category}</span></div>
            <h2 id="featured-blog-title"><Link href={localePath("fa", `/blog/${featuredPost.slug}`)}>{featuredPost.title}</Link></h2>
            <p>{featuredPost.excerpt}</p>
            <div className={s.featureFoot}>
              <Link className={s.cardLink} href={localePath("fa", `/blog/${featuredPost.slug}`)}>شروع مطالعه<ArrowIcon/></Link>
              <span>{formatNumber(featuredPost.readingTime, "fa")} دقیقه مطالعه</span>
            </div>
          </div>
        </article>}
      </div>
      <section className={`container-shell ${s.archive}`} aria-labelledby="blog-archive-title">
        <header className={s.archiveIntro} data-reveal>
          <p className={s.label}>آرشیو نوشته‌ها</p><h2 id="blog-archive-title">موضوع را انتخاب کنید، بعد عمیق‌تر بخوانید.</h2>
          <p>هر نوشته با مثال، چک‌لیست و منابع قابل بررسی نوشته شده تا یک قدم واقعی از آن بردارید.</p>
        </header>
        <nav className={s.topics} aria-label="موضوع نوشته‌ها">
          {[...groups.keys()].map((category, index) => <a href={`#topic-${index+1}`} key={category}>{category}</a>)}
        </nav>
        {[...groups.entries()].map(([category, items], index) => (
          <section className={s.category} key={category} aria-labelledby={`topic-${index+1}`}>
            <h2 id={`topic-${index+1}`} data-reveal>{category}</h2>
            <div className={s.cardGrid}>{items.map(post => <BlogCard post={post} key={post.slug}/>)}</div>
          </section>
        ))}
      </section>
    </div>
  );
}
