import ContentfulImage from "@/components/contentful-image";
import { MarkdownContent } from "@/components/markdown-content";
import { PageHeader } from "@/components/page-header";
import { PostHeader } from "@/components/post-header";
import contentfulFetcher from "@/lib/contentful/contentful-fetcher";
import { ContentfulGraphqlClient } from "@/lib/contentful/graphql-client";
import { MovieReview } from "@/lib/contentful/model";
import { PageProps } from "@/lib/models";
import { formatDate } from "@/lib/utils";

import { notFound } from "next/navigation";

export async function generateStaticParams({ params: { lng } }: PageProps) {
  const movieReviews = await contentfulFetcher<MovieReview>("movie-review", { all: true, locale: lng });
  return movieReviews.map((b) => ({ slug: b.slug }));
}

async function fetchData(params: PageProps["params"]) {
  const movieReviews = await contentfulFetcher<MovieReview>("movie-review", {
    slug: params.slug,
    locale: params.lng,
  });

  if (!movieReviews?.length) notFound();
  return { movieReview: movieReviews[0] };
}

export default async function MovieReviewPage({ params }: PageProps) {
  const { lng } = params;
  const { movieReview } = await fetchData(params);
  const coverImage = await ContentfulGraphqlClient.getAssetUrl(`poster-${movieReview.slug}`);

  return (
    <>
      <PageHeader lng={lng} />
      <div className="relative overflow-hidden rounded-2xl mb-8">
        <ContentfulImage src={coverImage} alt="" width={1920} height={1080} className="mb-0 h-full" />
        <div className="text-black text-[10px] lg:text-sm">
          <div className="absolute left-0 top-0 px-2 lg:px-4 py-1 backdrop-blur-sm bg-white/50 rounded-br-2xl">
            {formatDate(movieReview.releasedAt, lng)}
          </div>
          <div className="absolute right-0 top-0 px-2 lg:px-4 py-1 backdrop-blur-sm bg-white/50 rounded-bl-2xl">
            {movieReview.category}
          </div>
          <div className="absolute right-0 bottom-0 px-2 lg:px-4 py-1 backdrop-blur-sm bg-white/50 rounded-tl-2xl">
            {movieReview.director}
          </div>
          <div className="absolute left-0 bottom-0 flex flex-col items-end backdrop-blur-sm bg-white/50 px-2 lg:px-4 py-2 rounded-tr-2xl">
            <span>Hikaye: {movieReview.myRating.story}/10</span>
            <span>Görsellik: {movieReview.myRating.visuality}/10</span>
            <span>Müzik: {movieReview.myRating.music}/10</span>
          </div>
        </div>
      </div>
      <PostHeader {...movieReview} locale={params.lng} />
      <MarkdownContent>{movieReview.content}</MarkdownContent>
    </>
  );
}
