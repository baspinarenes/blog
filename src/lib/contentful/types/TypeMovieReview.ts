import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeMovieReviewFields {
  title: EntryFieldTypes.Symbol;
  slug: EntryFieldTypes.Symbol;
  myRating: EntryFieldTypes.Object;
  coverImage?: EntryFieldTypes.Symbol;
  releasedAt: EntryFieldTypes.Date;
  content: EntryFieldTypes.Text;
  director?: EntryFieldTypes.Symbol;
  category?: EntryFieldTypes.Symbol;
  description: EntryFieldTypes.Symbol;
}

export type TypeMovieReviewSkeleton = EntrySkeletonType<TypeMovieReviewFields, "movie-review">;
export type TypeMovieReview<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<
  TypeMovieReviewSkeleton,
  Modifiers,
  Locales
>;
