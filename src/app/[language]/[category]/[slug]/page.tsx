import {
  ContentfulImage,
  ReadingTime,
  Title,
  ViewCount,
} from "@/components/atoms";
import { MarkdownContent } from "@/components/molecules";
import { url } from "@/configs";
import { fallbackLng } from "@/i18n/settings";
import { getAllPosts, getPostBySlug } from "@/libraries/api";
import { dasherize, formatDate } from "@/libraries/utils";
import { SlugPageProps } from "@/models";
import { draftMode } from "next/headers";
import Image from "next/image";
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
    <main className="w-full sm:overflow-y-scroll py-6 sm:py-16 sm:px-8">
      <div className="max-w-3xl mx-auto">
        {post.tag && (
          <Image
            src={`${url}/logo/${post.tag}.svg`}
            alt="Tag logo"
            height={60}
            width={60}
            className="mb-6 h-[60px] w-fit"
          />
        )}
        <Title level={1} className="mb-2">
          {post.title}
        </Title>
        <div className="mb-6 sm:mb-8 flex justify-between text-sm w-full">
          <div className="flex items-center gap-2 sm:gap-3 w-full text-gray-400">
            <span>{post.createdAt ? formatDate(post.createdAt) : ""}</span>
            <span>/</span>
            {post.tag && (
              <div className="flex gap-1">
                {`#${dasherize(post.tag)}`}
              </div>
            )}
            <span>/</span>
            <ViewCount count={post.views} />
            <ReadingTime text={post.readingTime} />
          </div>
        </div>
        {post.heroImage && (
          <ContentfulImage
            src={post.heroImage.url}
            width={post.heroImage.width}
            height={post.heroImage.height}
          />
        )}
        <MarkdownContent>{post.content}</MarkdownContent>
      </div>
    </main>
  );
}
