import { notFound } from "next/navigation";
import { PostHeader } from "@/components/post-header";
import contentfulFetcher from "@/lib/contentful/contentful-fetcher";
import { PageProps } from "@/lib/models";
import { Article } from "@/lib/contentful/model";
import { PostContent } from "@/components/post-content";

export async function generateStaticParams({ params: { lng } }: PageProps) {
  const articles = await contentfulFetcher<Article>("article", { locale: lng });
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: PageProps) {
  const { article } = await fetchData(params);

  return (
    <div className="container mx-auto">
      <PostHeader {...article} locale={params.lng} />
      <PostContent document={article.content} lng={params.lng} />
    </div>
  );
}

async function fetchData({ lng, slug }: PageProps["params"]) {
  const articles = await contentfulFetcher<Article>("article", {
    slug,
    locale: lng,
  });

  if (!articles?.length) notFound();
  return { article: articles[0] };
}
