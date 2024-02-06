import { PostHeader } from "@/components/post-header";
import { RichText } from "@/components/rich-text";
import { fetchBookReview, fetchBookReviews } from "@/lib/contentful/book-review";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const bookReviews = await fetchBookReviews({ preview: false });
  return bookReviews.map((s) => ({ slug: s.slug }));
}

async function fetchData(slug: string) {
  const bookReview = await fetchBookReview({ slug, preview: draftMode().isEnabled });
  if (!bookReview) notFound();
  return { bookReview };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { bookReview } = await fetchData(slug);

  return (
    <div className="container mx-auto">
      <PostHeader {...bookReview} />
      <RichText document={bookReview.body} />
    </div>
  );
}
