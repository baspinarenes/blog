import { notFound } from "next/navigation";
import { PostHeader } from "@/components/post-header";
import contentfulFetcher from "@/lib/contentful/contentful-fetcher";
import { PageProps } from "@/lib/models";
import { Article } from "@/lib/contentful/model";
import { MarkdownContent } from "@/components/markdown-content";
import ContentfulImage from "@/components/contentful-image";

export async function generateStaticParams({ params: { lng } }: PageProps) {
  const articles = await contentfulFetcher<Article>("article", { locale: lng });
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: PageProps) {
  const { article } = await fetchData(params);

  return (
    <div className="w-full overflow-y-auto">
      <div className="container mx-auto">
        <PostHeader {...article} locale={params.lng} />
        <ContentfulImage
          src={article.coverImage.fields.file.url}
          alt={article.coverImage.title}
          width={article.coverImage.fields.file.details.image.width}
          height={article.coverImage.fields.file.details.image.height}
        />
        {/* <PostContent document={article.contet} lng={params.lng} /> */}
        <MarkdownContent>{article.context}</MarkdownContent>
      </div>
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
