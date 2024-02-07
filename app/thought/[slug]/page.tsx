import { PostHeader } from "@/components/post-header";
import { RichText } from "@/components/rich-text";
import api from "@/lib/contentful/api";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const thoughts = await api["thought"].fetchAll({ preview: false });
  return thoughts.map((s) => ({ slug: s.slug }));
}

async function fetchData(slug: string) {
  const thought = await api["thought"].fetch({ slug, preview: draftMode().isEnabled });
  if (!thought) notFound();
  return { thought };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { thought } = await fetchData(slug);

  return (
    <div className="container mx-auto">
      <PostHeader {...thought} />
      <RichText document={thought.body} />
    </div>
  );
}
