import { PostHeader } from "@/components/post-header";
import { fetchThought, fetchThoughts } from "@/lib/contentful/thought";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const thoughts = await fetchThoughts({ preview: false });
  return thoughts.map((s) => ({ slug: s.slug }));
}

async function fetchData(slug: string) {
  const snippet = await fetchThought({ slug, preview: draftMode().isEnabled });
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
