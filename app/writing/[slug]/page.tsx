import { PostHeader } from "@/components/post-header";
import { RichText } from "@/components/rich-text";
import { Writing, fetchWriting, fetchWritings } from "@/lib/contentful/writing";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const writings = await fetchWritings({ preview: false });
  return writings.map((w: Writing) => ({ slug: w.slug }));
}

async function fetchData(slug: string) {
  const writing = await fetchWriting({ slug, preview: draftMode().isEnabled });
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
