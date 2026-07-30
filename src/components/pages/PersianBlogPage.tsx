import Link from "next/link";
import { PageIntro } from "@/components/ui/PageIntro";
import { persianBlogPosts } from "@/content/blog";
import { persianSeoMetadata } from "@/content/seo";
import { localePath } from "@/content/site";
import { JsonLd } from "@/components/layout/JsonLd";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("fa-IR", { dateStyle: "long" }).format(new Date(`${value}T12:00:00+03:30`));
}

export function PersianBlogPage() {
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
              url: `/blog/${post.slug}`,
              name: post.title,
            })),
          },
        }}
      />
      <PageIntro
        locale="fa"
        eyebrow="بلاگ فارسی FMS"
        title="راهنماهایی برای تصمیم‌های بهتر در وب و محتوا."
        body="مقاله‌های فارسی FMS درباره طراحی سایت اختصاصی، Next.js، WordPress Headless، SEO و مدیریت محتوای اینستاگرام؛ با پاسخ روشن، منابع قابل بررسی و مسیر بعدی مشخص."
      />
      <section className="blog-list container-shell inner-section" aria-label="مقاله‌های فارسی">
        <div className="blog-list__grid">
          {persianBlogPosts.map((post, index) => (
            <article className="blog-card" key={post.slug} data-reveal>
              <div className="blog-card__topline">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{post.category}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <div className="blog-card__meta">
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                <span>{post.readingTime} دقیقه مطالعه</span>
              </div>
              <Link className="card-link" href={localePath("fa", `/blog/${post.slug}`)}>
                مطالعه مقاله <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
