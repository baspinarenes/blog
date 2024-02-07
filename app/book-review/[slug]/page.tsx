import { PostHeader } from "@/components/post-header";
import { RichText } from "@/components/rich-text";
import api from "@/lib/contentful/api";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const bookReviews = await api["book-review"].fetchAll({ preview: false });
  return bookReviews.map((s) => ({ slug: s.slug }));
}

async function fetchData(slug: string) {
  const bookReview = await api["book-review"].fetch({ slug, preview: draftMode().isEnabled });
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
