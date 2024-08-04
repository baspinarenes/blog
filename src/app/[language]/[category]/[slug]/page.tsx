import { fallbackLng } from "@/app/i18n/settings";
import ContentfulImage from "@/components/atoms/ContentfulImage";
import { MarkdownContent } from "@/components/molecules/MarkdownContent";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import type { SlugPageProps } from "../../../../types/props";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const allPosts = await getAllPosts({ language: fallbackLng, preview: false });

  return allPosts.map((entity) => ({
    slug: entity.slug,
    category: entity.category,
  }));
}

export default async function Page({
  params: { language, category, slug },
}: SlugPageProps) {
  const { isEnabled } = draftMode();

  const post = await getPostBySlug({
    category,
    language,
    slug,
    preview: isEnabled || process?.env?.NODE_ENV === "development",
  });

  if (!post) notFound();

  return (
    <main className="mt-6">
      {post.coverImage && <ContentfulImage src={post.coverImage} />}
      <MarkdownContent>{post.content}</MarkdownContent>
    </main>
  );
}
