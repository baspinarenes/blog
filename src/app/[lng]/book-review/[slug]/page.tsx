import { PostHeader } from "@/components/post-header";
import { RichTextContent } from "@/components/rich-text-content";
import contentfulFetcher from "@/lib/contentful/contentful-fetcher";
import { BookReview } from "@/lib/contentful/model";
import { PageProps } from "@/lib/models";

import { notFound } from "next/navigation";

export async function generateStaticParams({ params: { lng } }: PageProps) {
  const bookReviews = await contentfulFetcher<BookReview>("book-review", { all: true, locale: lng });
  return bookReviews.map((b) => ({ slug: b.slug }));
}

async function fetchData(params: PageProps["params"]) {
  const bookReviews = await contentfulFetcher<BookReview>("book-review", {
    slug: params.slug,
    locale: params.lng,
  });

  if (!bookReviews?.length) notFound();
  return { bookReview: bookReviews[0] };
}

export default async function BookReviewPage({ params }: PageProps) {
  const { bookReview } = await fetchData(params);

  return (
    <>
      <PostHeader {...bookReview} locale={params.lng} />
      <RichTextContent document={bookReview.content} />
    </>
  );
}
