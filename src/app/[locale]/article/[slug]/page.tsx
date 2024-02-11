import { notFound } from "next/navigation";
import { PostHeader } from "@/components/post-header";
import contentfulFetcher from "@/lib/contentful/contentful-fetcher";
import { PageProps } from "@/lib/models";
import { Article } from "@/lib/contentful/model";
import { PostContent } from "@/components/post-content";
import { unstable_setRequestLocale } from "next-intl/server";

export async function generateStaticParams({ params: { locale } }: PageProps) {
  const articles = await contentfulFetcher<Article>("article", { locale });
  return articles.map((a) => ({ slug: a.slug }));
}

async function fetchData(params: PageProps["params"]) {
  const articles = await contentfulFetcher<Article>("article", {
    slug: params.slug,
    locale: params.locale,
  });

  if (!articles?.length) notFound();
  return { article: articles[0] };
}

export default async function ArticlePage({ params }: PageProps) {
  unstable_setRequestLocale(params.locale);
  const { article } = await fetchData(params);

  return (
    <div className="container mx-auto">
      <PostHeader {...article} locale={params.locale} />
      <PostContent document={article.body} />
    </div>
  );
}
