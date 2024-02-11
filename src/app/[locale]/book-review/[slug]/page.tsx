import { PostHeader } from "@/components/post-header";
import { RichText } from "@/components/rich-text";
import contentfulFetcher from "@/lib/contentful/contentful-fetcher";
import { BookReview } from "@/lib/contentful/model";
import { PageProps } from "@/lib/models";
import { unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateStaticParams({ params: { locale } }: PageProps) {
  const bookReviews = await contentfulFetcher<BookReview>("bookReview", { all: true, locale });
  return bookReviews.map((b) => ({ slug: b.slug }));
}

async function fetchData(params: PageProps["params"]) {
  const bookReviews = await contentfulFetcher<BookReview>("bookReview", {
    slug: params.slug,
    locale: params.locale,
  });

  if (!bookReviews?.length) notFound();
  return { bookReview: bookReviews[0] };
}

export default async function BookReviewPage({ params }: PageProps) {
  unstable_setRequestLocale(params.locale);
  const { bookReview } = await fetchData(params);

  return (
    <div className="container mx-auto">
      <PostHeader {...bookReview} locale={params.locale} />
      <RichText document={bookReview.body} />
    </div>
  );
}
