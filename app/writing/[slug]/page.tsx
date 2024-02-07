import { PostHeader } from "@/components/post-header";
import { RichText } from "@/components/rich-text";
import { Writing } from "@/lib/contentful/writing";
import api from "@/lib/contentful/api";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const writings = await api["writing"].fetchAll({ preview: false });
  return writings.map((w: Writing) => ({ slug: w.slug }));
}

async function fetchData(slug: string) {
  const writing = await api["writing"].fetch({ slug, preview: draftMode().isEnabled });
  if (!writing) notFound();
  return { writing };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { writing } = await fetchData(slug);

  return (
    <div className="container mx-auto">
      <PostHeader {...writing} />
      <RichText document={writing.body} />
    </div>
  );
}
