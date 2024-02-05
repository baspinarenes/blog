import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { fetchArticle, fetchArticles } from "@/lib/contentful/article";
import { PostHeader } from "@/components/post-header";
import { RichText } from "@/components/rich-text";

export async function generateStaticParams() {
  const articles = await fetchArticles({ preview: false });
  return articles.map((s) => ({ slug: s.slug }));
}

async function fetchData(slug: string) {
  const article = await fetchArticle({ slug, preview: draftMode().isEnabled });
  if (!article) notFound();
  return { article };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { article } = await fetchData(slug);

  return (
    <div className="container mx-auto">
      <PostHeader title={article.title} createdAt={article.createdAt} />
      <RichText document={article.body} />
    </div>
  );
}
