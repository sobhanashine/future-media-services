import Link from "next/link";
import { BlogCard, BlogVisual } from "@/components/pages/BlogCard";
import { persianBlogPosts } from "@/content/blog";
import { persianSeoMetadata } from "@/content/seo";
import { formatIndex, localePath } from "@/content/site";
import { JsonLd } from "@/components/layout/JsonLd";
import { siteUrl } from "@/lib/metadata";

export function PersianBlogPage() {
  const posts = [...persianBlogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const [featuredPost, ...archivePosts] = posts;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: persianSeoMetadata.blog.title,
          description: persianSeoMetadata.blog.description,
          inLanguage: "fa-IR",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: persianBlogPosts.map((post, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: new URL(`/blog/${post.slug}`, siteUrl).toString(),
              name: post.title,
            })),
          },
        }}
      />
      <section className="blog-archive-hero" aria-labelledby="blog-page-title">
        <div className="container-shell blog-archive-hero__inner">
          <div className="blog-archive-hero__copy" data-hero-reveal>
            <p className="eyebrow eyebrow--light">FMS / FIELD NOTES / ۱۴۰۵</p>
            <h1 id="blog-page-title">راهنماهایی برای تصمیم‌های بهتر در وب و محتوا.</h1>
            <p>مقاله‌های فارسی FMS برای وقتی که قبل از اجرا، به یک نگاه روشن‌تر درباره طراحی سایت، معماری وب، SEO و محتوا نیاز دارید.</p>
          </div>
          <div className="blog-archive-hero__signal" data-hero-reveal>
            <span className="blog-archive-hero__signal-line" />
            <strong>{formatIndex(posts.length, "fa")}</strong>
            <span>یادداشت منتشرشده</span>
          </div>
        </div>
      </section>

      {featuredPost ? (
        <section className="blog-feature container-shell" aria-labelledby="featured-blog-title">
          <div className="blog-feature__visual" data-reveal>
            <BlogVisual post={featuredPost} index={1} />
          </div>
          <div className="blog-feature__content" data-reveal>
            <div className="blog-feature__meta">
              <span>یادداشت منتخب</span>
              <span>{featuredPost.category}</span>
            </div>
            <h2 id="featured-blog-title">
              <Link href={localePath("fa", `/blog/${featuredPost.slug}`)}>{featuredPost.title}</Link>
            </h2>
            <p>{featuredPost.excerpt}</p>
            <div className="blog-feature__footer">
              <span>{featuredPost.readingTime} دقیقه مطالعه</span>
              <Link className="button button--outline" href={localePath("fa", `/blog/${featuredPost.slug}`)}>
                شروع مطالعه <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="blog-archive container-shell" aria-labelledby="blog-archive-title">
        <header className="blog-archive__heading" data-reveal>
          <div>
            <p className="eyebrow">آرشیو نوشته‌ها</p>
            <h2 id="blog-archive-title">موضوع را انتخاب کنید، بعد عمیق‌تر بخوانید.</h2>
          </div>
          <p>هر نوشته با مثال، چک‌لیست و منابع قابل بررسی نوشته شده تا یک قدم واقعی از آن بردارید.</p>
        </header>
        <div className="blog-archive__grid">
          {archivePosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index + 2} locale="fa" />
          ))}
        </div>
      </section>
    </>
  );
}
