import { Icon, SelectInfo } from "@/components/atoms";
import { PostSelector } from "@/components/organisms";
import { PostCardList } from "@/components/organisms/PostCardList";
import { useTranslation } from "@/i18n";
import { getPostsByCategory } from "@/libraries/api";
import { isMobileDevice } from "@/libraries/device";
import { CategoryPageProps } from "@/models";
import { draftMode } from "next/headers";

export async function generateStaticParams() {
  const categories = ["article", "writing", "snippet", "thought"];
  return categories.map((category) => ({ category }));
}

export default async function Page({ params }: CategoryPageProps) {
  const { isEnabled } = draftMode();
  const isMobile = await isMobileDevice();
  const { t } = await useTranslation(params.language, "common");
  const posts = await getPostsByCategory({
    category: params.category,
    language: params.language,
    preview: isEnabled || process?.env?.NODE_ENV === "development",
  });

  if (!isMobile) {
    return <SelectInfo />;
  }

  if (isMobile && posts.length === 0) {
    return (
      <div className="flex flex-col items-center content-center justify-center h-full text-gray-400 -mt-6">
        <Icon name="not-found" size={72} color="#999" className="mb-4" />
        <span className="mx-2 text-center">
          {t("not-found", { type: "category" })}
        </span>
      </div>
    );
  }

  return <PostCardList language={params.language} entries={posts} hideIcons />;
}
