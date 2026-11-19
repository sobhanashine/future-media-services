import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { phoneHref } from "@/lib/contact";
import { persianBlogPosts, type BlogPost } from "@/content/blog";
import { formatNumber, localePath } from "@/content/site";
import { articleDate, BlogVisual } from "./BlogCard";
import s from "./StudioJournal.module.css";

export function PersianBlogPostPage({ post }: { post: BlogPost }) {
  const relatedPosts = persianBlogPosts.filter(item => item.slug !== post.slug).slice(0,2);
  return (
    <article className={s.journal}>
      <header className={`container-shell ${s.articleHero}`}>
        <div className={s.articleHead} data-hero-reveal>
          <Link className={s.back} href="/blog"><ArrowIcon direction="left" />بازگشت به بلاگ</Link>
          <p className={s.label}>{post.category}</p>
          <h1>{post.title}</h1><p className={s.excerpt}>{post.excerpt}</p>
          <div className={s.byline}>
            <span>{post.authorName}</span>
            <time dateTime={post.publishedAt}>انتشار {articleDate(post.publishedAt)}</time>
            <span>{formatNumber(post.readingTime,"fa")} دقیقه مطالعه</span>
          </div>
        </div>
        <div className={s.articleCover} data-fms-reveal="media"><BlogVisual post={post}/></div>
      </header>
      <div className={`container-shell ${s.readingLayout}`}>
        <nav className={s.outline} aria-label="فهرست این نوشته">
          <details>
            <summary>فهرست این نوشته<i aria-hidden="true"/></summary>
            <ol>{post.sections.map((section,index) => <li key={section.heading}><a href={`#section-${index+1}`}>{section.heading}</a></li>)}</ol>
            <a href="#article-faq">پرسش‌های متداول</a>
            <a href="#blog-sources-title">منابع و مطالعه بیشتر</a>
          </details>
        </nav>
        <div className={s.prose}>
          {post.sections.map((section,index) => (
            <section id={`section-${index+1}`} key={section.heading}>
              <h2 data-reveal>{section.heading}</h2>
              {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              {section.links?.map(link => <p key={link.href}><Link href={link.href}>{link.label}</Link></p>)}
              {section.bullets && <ul>{section.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>}
              {section.table && <div className={s.tableWrap} role="region" aria-label={section.heading} tabIndex={0}>
                <table>
                  <thead><tr>{section.table.headers.map(header => <th scope="col" key={header}>{header}</th>)}</tr></thead>
                  <tbody>{section.table.rows.map(row => <tr key={row[0]}>{row.map((cell,column) => <td key={column}>{cell}</td>)}</tr>)}</tbody>
                </table>
              </div>}
            </section>
          ))}
          <section className={s.articleFaq} id="article-faq">
            <h2 data-reveal>پرسش‌های متداول</h2>
            {post.faq.map(item => <details key={item.question}><summary>{item.question}<i aria-hidden="true"/></summary><p>{item.answer}</p></details>)}
          </section>
          <section className={s.sources} aria-labelledby="blog-sources-title">
            <h2 id="blog-sources-title" data-reveal>منابع و مطالعه بیشتر</h2>
            <ul>{post.sources.map(source => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label}<ArrowIcon /></a></li>)}</ul>
          </section>
        </div>
        <aside className={s.readNext}>
          <div className={s.nextCard} data-reveal>
            <p className={s.label}>قدم بعدی</p>
            <h2>می‌خواهید این موضوع را برای پروژه خودتان بررسی کنید؟</h2>
            <p>در یک تماس کوتاه، هدف سایت، محتوای موجود و مسیر مناسب اجرا را مشخص می‌کنیم.</p>
            <a className="button" href={phoneHref}>تماس برای مشاوره<ArrowIcon /></a>
          </div>
          <div className={s.moreReads} data-reveal>
            {post.relatedServicePath && <Link className={s.cardLink} href={localePath("fa", post.relatedServicePath)}>مشاهده خدمت مرتبط<ArrowIcon /></Link>}
            {relatedPosts.length > 0 && <>
              <h2>مقاله‌های مرتبط</h2>
              {relatedPosts.map(related => <Link key={related.slug} href={`/blog/${related.slug}`}>{related.title}<ArrowIcon /></Link>)}
            </>}
          </div>
        </aside>
      </div>
    </article>
  );
}
