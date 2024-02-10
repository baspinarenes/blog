import { ContentMenu } from "@/components/content-menu";
import { Article } from "@/lib/contentful/article";
import api from "@/lib/contentful/api";
import { formatDate } from "@/lib/utils/common";
import { draftMode } from "next/headers";

async function fetchData() {
  const articles = await api["article"].fetchAll({ preview: draftMode().isEnabled });
  return { articles };
}

export default async function ArticleLayout({ children }: { children: React.ReactNode }) {
  const { articles } = await fetchData();

  const generateDescription = (snippet: Article) => {
    return formatDate(snippet.createdAt);
  };

  return (
    <section className="flex w-full h-full">
      <ContentMenu
        type="article"
        list={articles?.map((s: Article) => ({
          title: s.title,
          description: generateDescription(s),
          slug: s.slug,
          tags: s.tags,
        }))}
      />
      {children}
    </section>
  );
}
