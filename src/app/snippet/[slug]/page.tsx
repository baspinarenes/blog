import { PostHeader } from "@/components/post-header";
import { RichText } from "@/components/rich-text";
import api from "@/lib/contentful/api";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const snippets = await api["snippet"].fetchAll({ preview: false });
  return snippets.map((s) => ({ slug: s.slug }));
}

async function fetchData(slug: string) {
  const snippet = await api["snippet"].fetch({ slug, preview: draftMode().isEnabled });

  if (!snippet) notFound();
  return { snippet };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { snippet } = await fetchData(slug);

  return (
    <div className="container mx-auto">
      <PostHeader {...snippet} />
      <RichText document={snippet.body} />
    </div>
  );
}
