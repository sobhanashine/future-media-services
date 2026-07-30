import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/layout/JsonLd";
import { PersianBlogPostPage } from "@/components/pages/PersianBlogPostPage";
import { findPersianBlogPost, persianBlogSlugs } from "@/content/blog";
import { createPersianOnlyMetadata, siteUrl } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return persianBlogSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = findPersianBlogPost(slug);
  if (!post) return {};
  return createPersianOnlyMetadata(`${post.title} | FMS`, post.excerpt, `/blog/${post.slug}`);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = findPersianBlogPost(slug);
  if (!post) notFound();

  const articleUrl = `${siteUrl}/blog/${post.slug}`;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              "@id": `${articleUrl}#article`,
              headline: post.title,
              description: post.excerpt,
              datePublished: post.publishedAt,
              dateModified: post.updatedAt,
              inLanguage: "fa-IR",
              articleSection: post.category,
              keywords: post.keywords,
              mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
              author: { "@type": "Organization", name: post.authorName, url: `${siteUrl}/about` },
              publisher: { "@id": `${siteUrl}/#organization` },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "خانه", item: siteUrl },
                { "@type": "ListItem", position: 2, name: "بلاگ", item: `${siteUrl}/blog` },
                { "@type": "ListItem", position: 3, name: post.title, item: articleUrl },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: post.faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            },
          ],
        }}
      />
      <PersianBlogPostPage post={post} />
    </>
  );
}
