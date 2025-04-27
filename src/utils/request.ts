import { getCollection, type CollectionEntry } from "astro:content";

export async function getEntries({
  category,
  locale
}: {
  category: string;
  locale?: string;
}) {
  const entries = (await getCollection(category as any)) as unknown as CollectionEntry<"snippets">[];

  const mappedEntries = entries.map((entry) => {
    const [slug, lang] = entry.id.split("/");
    
    return ({
      ...entry,
      id: slug,
      href: `/${lang}/${entry.collection}/${slug}`,
      lang: lang,
    });
  });

  const filteredEntries = mappedEntries.filter((entry) => {
    return !locale || entry.lang === locale;
  });

  const sortedEntries = filteredEntries.sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });

  return sortedEntries;
}