import { PostHeader } from "@/components/post-header";
import { fetchSnippet, fetchSnippets } from "@/lib/contentful/snippet";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const snippets = await fetchSnippets({ preview: false });
  return snippets.map((s) => ({ slug: s.slug }));
}

async function fetchData(slug: string) {
  const snippet = await fetchSnippet({ slug, preview: false });
  if (!snippet) notFound();
  return { snippet };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { snippet } = await fetchData(slug);

  return (
    <div className="container mx-auto">
      <PostHeader title={snippet.title} date={snippet.createdAt} />
    </div>
  );
}
