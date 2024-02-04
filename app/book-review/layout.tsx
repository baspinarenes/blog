import { ContentMenu } from "@/components/content-menu";
import { BookReview, fetchBookReviews } from "@/lib/contentful/book-review";
import { formatDate } from "@/lib/utils/common";
import { draftMode } from "next/headers";

async function fetchData() {
  const bookReviews = await fetchBookReviews({ preview: draftMode().isEnabled });
  return { bookReviews };
}

export default async function BookReviewLayout({ children }: { children: React.ReactNode }) {
  const { bookReviews } = await fetchData();

  const generateDescription = (snippet: BookReview) => {
    return formatDate(snippet.createdAt);
  };

  return (
    <section className="flex w-full">
      <ContentMenu
        type="book-review"
        list={bookReviews?.map((s: BookReview) => ({
          title: s.title,
          description: generateDescription(s),
          slug: s.slug,
        }))}
      />
      {children}
    </section>
  );
}
