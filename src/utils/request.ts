import { getCollection, type CollectionEntry } from "astro:content";

export async function getEntries({ category }: { category: string }) {
  const entries = (await getCollection(
    category as any
  )) as unknown as CollectionEntry<"writings">[];

  const mappedEntries = entries.map((entry) => {
    const [slug] = entry.id.split("/");

    return {
      ...entry,
      id: slug,
      href: `/${entry.collection}/${slug}`,
    };
  });

  const sortedEntries = mappedEntries.sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });

  return sortedEntries.filter((entry) => !entry.data.draft);
}
