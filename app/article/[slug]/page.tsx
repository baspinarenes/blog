import Link from "next/link";
import { draftMode } from "next/headers";
import MoreStories from "../../../components/more-stories";
import Avatar from "../../../components/avatar";
import Date from "../../../components/date";
import CoverImage from "../../../components/cover-image";
import { Markdown } from "@/lib/markdown";
import { notFound } from "next/navigation";
import { fetchArticle, fetchArticles } from "@/lib/contentful/article";
import { PostHeader } from "@/components/post-header";

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
      <PostHeader title={article.title} date={article.createdAt} />
    </div>
  );
}
