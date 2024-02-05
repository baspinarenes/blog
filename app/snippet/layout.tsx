import { ContentMenu } from "@/components/content-menu";
import { Snippet, fetchSnippets } from "@/lib/contentful/snippet";
import { formatDate } from "@/lib/utils/common";
import { draftMode } from "next/headers";

async function fetchData() {
  const snippets = await fetchSnippets({ preview: draftMode().isEnabled });
  return { snippets };
}

export default async function SnippetLayout({ children }: { children: React.ReactNode }) {
  const { snippets } = await fetchData();

  const generateDescription = (snippet: Snippet) => {
    return formatDate(snippet.createdAt);
  };

  return (
    <section className="flex w-full h-full">
      <ContentMenu
        type="snippet"
        list={snippets?.map((s) => ({
          description: generateDescription(s),
          slug: s.slug,
          title: s.title,
          tags: s.tags,
        }))}
      />
      {children}
    </section>
  );
}
