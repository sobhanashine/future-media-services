import Link from "next/link";
import { BlogCard } from "@/components/pages/BlogCard";
import { persianBlogPosts } from "@/content/blog";
import { localePath } from "@/content/site";

export function BlogPreview() {
  const latestPosts = [...persianBlogPosts]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3);

  if (latestPosts.length === 0) return null;

  return (
    <section className="blog-preview section-block" aria-labelledby="latest-blog-title">
      <div className="container-shell">
        <header className="blog-preview__heading" data-reveal>
          <div>
            <p className="eyebrow">یادداشت‌های استودیو / FMS</p>
            <h2 id="latest-blog-title">ایده‌هایی که قبل از اجرا، مسیر را روشن می‌کنند.</h2>
          </div>
          <Link className="text-link" href={localePath("fa", "/blog")}>
            مشاهده همه‌ی نوشته‌ها <span aria-hidden="true">↗</span>
          </Link>
        </header>

        <div className="blog-preview__layout">
          <BlogCard post={latestPosts[0]} index={1} locale="fa" featured />
          <div className="blog-preview__rail">
            {latestPosts.slice(1).map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index + 2} locale="fa" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
