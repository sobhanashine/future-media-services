import Link from "next/link";
import type { BlogPost } from "@/content/blog";
import { formatIndex, localePath, type Locale } from "@/content/site";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("fa-IR", { dateStyle: "long" }).format(
    new Date(`${value}T12:00:00+03:30`),
  );
}

export function BlogVisual({ post, index = 1 }: { post: BlogPost; index?: number }) {
  return (
    <div className={`blog-cover blog-cover--${((index - 1) % 3) + 1}`} aria-hidden="true">
      <span className="blog-cover__grid" />
      <span className="blog-cover__orb" />
      <span className="blog-cover__eyebrow">FMS / FIELD NOTES</span>
      <strong>{formatIndex(index, "fa")}</strong>
      <span className="blog-cover__category">{post.category}</span>
    </div>
  );
}

export function BlogCard({
  post,
  index,
  locale = "fa",
  featured = false,
}: {
  post: BlogPost;
  index: number;
  locale?: Locale;
  featured?: boolean;
}) {
  return (
    <article className={`blog-card-new${featured ? " blog-card-new--featured" : ""}`} data-reveal>
      <BlogVisual post={post} index={index} />
      <div className="blog-card-new__body">
        <div className="blog-card-new__topline">
          <span>{post.category}</span>
          <span>{formatIndex(index, locale)}</span>
        </div>
        <h2>
          <Link href={localePath(locale, `/blog/${post.slug}`)}>{post.title}</Link>
        </h2>
        <p>{post.excerpt}</p>
        <div className="blog-card-new__footer">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span>{post.readingTime} دقیقه مطالعه</span>
          <Link className="card-link" href={localePath(locale, `/blog/${post.slug}`)}>
            مطالعه مقاله <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
