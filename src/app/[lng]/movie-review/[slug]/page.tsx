import ContentfulImage from "@/components/contentful-image";
import { MarkdownContent } from "@/components/markdown-content";
import { PostHeader } from "@/components/post-header";
import { RichTextContent } from "@/components/rich-text-content";
import contentfulFetcher from "@/lib/contentful/contentful-fetcher";
import { MovieReview } from "@/lib/contentful/model";
import { PageProps } from "@/lib/models";
import { formatDate } from "@/lib/utils/common";

import { notFound } from "next/navigation";

export async function generateStaticParams({ params: { lng } }: PageProps) {
  const movieReviews = await contentfulFetcher<MovieReview>("movieReview", { all: true, locale: lng });
  return movieReviews.map((b) => ({ slug: b.slug }));
}

async function fetchData(params: PageProps["params"]) {
  const movieReviews = await contentfulFetcher<MovieReview>("movieReview", {
    slug: params.slug,
    locale: params.lng,
  });

  if (!movieReviews?.length) notFound();
  return { movieReview: movieReviews[0] };
}

export default async function MovieReviewPage({ params }: PageProps) {
  const {lng} = params;
  const { movieReview } = await fetchData(params);
  
  return (
    <>
      <ContentfulImage
        src={movieReview.coverImage}
        alt=""
        width={600}
        height={400}
        className="mb-8"
      />
      <PostHeader 
        {...movieReview}
        customDescription={
          <div>
            <div>Yayınlanma tarihi: {formatDate(movieReview.releasedAt, lng)}</div>
            <div>İzleme tarihi: {formatDate(movieReview.createdAt, lng)}</div>
            <div>Hikaye: {movieReview.myRating.story}/10 Görsellik: {movieReview.myRating.visuality}/10 Müzik: {movieReview.myRating.music}/10</div>
          </div>
        }
        locale={params.lng}
      />
      <MarkdownContent>{movieReview.content}</MarkdownContent>
    </>
  );
}
