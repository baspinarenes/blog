import { EmptyContent } from "@/components/atoms";
import { PostCardList } from "@/components/molecules";
import { getPostsByCategory } from "@/lib/api";
import type { CategoryPageProps } from "../../../types/props";
import { draftMode } from "next/headers";

export async function generateStaticParams() {
  const categories = ["article", "writing", "snippet", "thought"];

  return categories.map((category) => ({ category }));
}

export default async function Page({
  params: { language, category },
}: CategoryPageProps) {
  const { isEnabled } = draftMode();
  const posts = await getPostsByCategory({
    category,
    language,
    preview: isEnabled || process?.env?.NODE_ENV === "development",
  });

  if (posts.length === 0) return <EmptyContent />;

  return (
    <div>
      <PostCardList language={language} entries={posts} hideIcons />
    </div>
  );
}
