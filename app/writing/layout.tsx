import { ContentMenu } from "@/components/content-menu";
import { Writing, fetchWritings } from "@/lib/contentful/writing";
import { formatDate } from "@/lib/utils/common";
import { draftMode } from "next/headers";

async function fetchData() {
  const writings = await fetchWritings({ preview: draftMode().isEnabled });
  return { writings };
}

export default async function WritingLayout({ children }: { children: React.ReactNode }) {
  const { writings } = await fetchData();

  const generateDescription = (w: Writing) => {
    return formatDate(w.createdAt);
  };

  return (
    <section className="flex w-full h-full">
      <ContentMenu
        type="writing"
        list={writings?.map((w: Writing) => ({
          title: w.title,
          description: generateDescription(w),
          slug: w.slug,
          tags: w.tags,
        }))}
      />
      {children}
    </section>
  );
}
