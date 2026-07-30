import Link from "next/link";
import { phoneHref } from "@/lib/contact";
import type { BlogPost } from "@/content/blog";
import { persianBlogPosts } from "@/content/blog";
import { localePath } from "@/content/site";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("fa-IR", { dateStyle: "long" }).format(new Date(`${value}T12:00:00+03:30`));
}

export function PersianBlogPostPage({ post }: { post: BlogPost }) {
  const relatedPosts = persianBlogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <article className="blog-post">
      <header className="blog-post__header container-shell">
        <Link className="back-link" href={localePath("fa", "/blog")}>
          <span aria-hidden="true">←</span> بازگشت به بلاگ
        </Link>
        <p className="eyebrow">{post.category}</p>
        <h1>{post.title}</h1>
        <p className="blog-post__excerpt">{post.excerpt}</p>
        <div className="blog-post__meta">
          <span>{post.authorName}</span>
          <time dateTime={post.publishedAt}>انتشار: {formatDate(post.publishedAt)}</time>
          <span>{post.readingTime} دقیقه مطالعه</span>
        </div>
      </header>

      <div className="blog-post__layout container-shell">
        <div className="blog-post__body">
          {post.sections.map((section) => (
            <section className="blog-post__section" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              ) : null}
              {section.table ? (
                <div className="blog-post__table-wrap">
                  <table>
                    <thead><tr>{section.table.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
                    <tbody>
                      {section.table.rows.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </section>
          ))}

          <section className="blog-post__section blog-post__faq">
            <h2>پرسش‌های متداول</h2>
            {post.faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </section>

          <section className="blog-post__sources" aria-labelledby="blog-sources-title">
            <h2 id="blog-sources-title">منابع و مطالعه بیشتر</h2>
            <ul>
              {post.sources.map((source) => (
                <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label} ↗</a></li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="blog-post__aside">
          <div className="blog-post__aside-card">
            <p className="eyebrow">قدم بعدی</p>
            <h2>می‌خواهید این موضوع را برای پروژه خودتان بررسی کنید؟</h2>
            <p>در یک تماس کوتاه، هدف سایت، محتوای موجود و مسیر مناسب اجرا را مشخص می‌کنیم.</p>
            <a className="button" href={phoneHref}>تماس برای مشاوره <span aria-hidden="true">↗</span></a>
          </div>
          {post.relatedServicePath ? (
            <Link className="blog-post__service-link" href={localePath("fa", post.relatedServicePath)}>
              مشاهده خدمت مرتبط <span aria-hidden="true">↗</span>
            </Link>
          ) : null}
          {relatedPosts.length > 0 ? (
            <div className="blog-post__related">
              <p className="eyebrow">مقاله‌های مرتبط</p>
              {relatedPosts.map((related) => (
                <Link key={related.slug} href={localePath("fa", `/blog/${related.slug}`)}>
                  {related.title} <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          ) : null}
        </aside>
      </div>
    </article>
  );
}
