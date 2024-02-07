import { ContentMenu } from "@/components/content-menu";
import api from "@/lib/contentful/api";
import { Thought } from "@/lib/contentful/thought";
import { formatDate } from "@/lib/utils/common";
import { draftMode } from "next/headers";

async function fetchData() {
  const thoughts = await api["thought"].fetchAll({ preview: draftMode().isEnabled });
  return { thoughts };
}

export default async function ThoughtLayout({ children }: { children: React.ReactNode }) {
  const { thoughts } = await fetchData();

  const generateDescription = (snippet: Thought) => {
    return formatDate(snippet.createdAt);
  };

  return (
    <section className="flex w-full h-full">
      <ContentMenu
        type="thought"
        list={thoughts?.map((s: Thought) => ({
          title: s.title,
          description: generateDescription(s),
          slug: s.slug,
        }))}
      />
      {children}
    </section>
  );
}
