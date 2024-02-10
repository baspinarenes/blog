import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import api from "@/lib/contentful/api";
import { PostHeader } from "@/components/post-header";
import { RichText } from "@/components/rich-text";

export async function generateStaticParams() {
  const articles = await api["article"].fetchAll({ preview: false });
  return articles.map((s) => ({ slug: s.slug }));
}

async function fetchData(slug: string) {
  const article = await api["article"].fetch({ slug, preview: draftMode().isEnabled });
  if (!article) notFound();
  return { article };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { article } = await fetchData(slug);

  return (
    <div className="container mx-auto">
      <PostHeader {...article} />
      <RichText document={article.body} />
    </div>
  );
}
