import {
  ContentfulImage,
  ReadingTime,
  Title,
  ViewCount,
} from "@/components/atoms";
import { MarkdownContent } from "@/components/molecules";
import { fallbackLng } from "@/i18n/settings";
import { getAllPosts, getPostBySlug } from "@/libraries/api";
import { dasherize, formatDate } from "@/libraries/utils";
import { SlugPageProps } from "@/models";
import { Content } from "next/font/google";
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

  if (!post || !post.content) notFound();

  return (
    <main className="w-full sm:overflow-auto py-6 sm:py-10 sm:px-8">
      <div className="max-w-3xl mx-auto">
        {post.heroImage && (
          <ContentfulImage
            src={post.heroImage.url}
            width={post.heroImage.width}
            height={post.heroImage.height}
            className="rounded-none sm:rounded-md -mt-6 -mx-6 min-w-[100vw] h-14 sm:mx-0 sm:min-w-fit sm:h-fit sm:-mt-0"
          />
        )}
        <Title level={1} className="mb-2">
          {post.title}
        </Title>
        <div className="mb-6 sm:mb-8 flex justify-between text-sm w-full">
          <div className="flex items-center gap-2 sm:gap-3 w-full text-gray-400">
            <span>{post.createdAt ? formatDate(post.createdAt) : ""}</span>
            <span>/</span>
            {post.tags?.length && (
              <div className="flex gap-1">
                {post.tags.map((x) => `#${dasherize(x)}`).join(" ")}
              </div>
            )}
            <span>/</span>
            <ViewCount count={post.views} />
            <ReadingTime text={post.readingTime} />
          </div>
        </div>
        {post.coverImage && (
          <ContentfulImage
            src={post.coverImage.url}
            width={post.coverImage.width}
            height={post.coverImage.height}
          />
        )}
        <MarkdownContent>{post.content}</MarkdownContent>
      </div>
    </main>
  );
}
