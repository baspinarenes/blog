import { TypeBookReviewSkeleton } from "./types";
import { Entry } from "contentful";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import contentfulClient from "./client";

type BookReviewEntry = Entry<TypeBookReviewSkeleton, undefined, string>;

export type BookReview = {
  title: string;
  slug: string;
  createdAt: Date;
  body: RichTextDocument | null;
  tags: string[];
};

export function parseContentfulBookReview(bookReviewEntry?: BookReviewEntry): BookReview | null {
  if (!bookReviewEntry) {
    return null;
  }

  return {
    title: bookReviewEntry.fields.title || "",
    slug: bookReviewEntry.fields.slug,
    body: bookReviewEntry.fields.content || null,
    createdAt: new Date(bookReviewEntry.sys.createdAt),
    tags: bookReviewEntry.metadata?.tags?.map((tag) => tag.sys.id) ?? [],
  };
}

export async function fetchBookReviews({ preview }: { preview: boolean }): Promise<BookReview[]> {
  const contentful = contentfulClient({ preview });

  const bookReviewsResult = await contentful.getEntries<TypeBookReviewSkeleton>({
    content_type: "bookReview",
    include: 2,
    order: ["fields.title"],
  });

  return bookReviewsResult.items.map(
    (bookReviewEntry) => parseContentfulBookReview(bookReviewEntry) as BookReview
  );
}

export async function fetchBookReview({
  slug,
  preview,
}: {
  slug: string;
  preview: boolean;
}): Promise<BookReview | null> {
  const contentful = contentfulClient({ preview });

  const bookReviewsResult = await contentful.getEntries<TypeBookReviewSkeleton>({
    content_type: "bookReview",
    "fields.slug": slug,
    include: 2,
  });

  return parseContentfulBookReview(bookReviewsResult.items[0]);
}
