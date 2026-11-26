import type { Metadata } from "next";
import { PersianBlogPage } from "@/components/pages/PersianBlogPage";
import { persianSeoMetadata } from "@/content/seo";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata(
  "fa", persianSeoMetadata.blog.title,
  persianSeoMetadata.blog.description,
  "/blog",
);

export default function Page() {
  return <PersianBlogPage />;
}
