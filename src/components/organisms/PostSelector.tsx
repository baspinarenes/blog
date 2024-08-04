import { getPostsByCategory } from "@/libraries/api";
import { CategoryType } from "@/models";
import { draftMode } from "next/headers";
import { PostSelectorCard } from "../molecules/PostSelectorCard";

export async function PostSelector({ language, category }: PostSelectorProps) {
  const { isEnabled } = draftMode();
  const posts = await getPostsByCategory({
    category,
    language,
    preview: isEnabled || process?.env?.NODE_ENV === "development",
  });

  return (
    <aside className="flex flex-col max-h-screen border-r border-border bg-gray-50">
      <div className="border-b border-border px-4 py-2">
        <strong className="text-sm">Posts</strong>
      </div>
      <div className="flex flex-col gap-2 px-4 py-2 overflow-y-auto">
        {posts.map((post) => (
          <PostSelectorCard
            key={post.slug}
            language={language}
            hideIcon
            isPostSelector
            {...post}
          />
        ))}
      </div>
    </aside>
  );
}

export type PostSelectorProps = Readonly<{
  language: string;
  category: CategoryType;
}>;
