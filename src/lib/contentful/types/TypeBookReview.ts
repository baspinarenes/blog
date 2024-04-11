import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeBookReviewFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    date: EntryFieldTypes.Date;
    content: EntryFieldTypes.RichText;
    description: EntryFieldTypes.Symbol;
}

export type TypeBookReviewSkeleton = EntrySkeletonType<TypeBookReviewFields, "bookReview">;
export type TypeBookReview<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeBookReviewSkeleton, Modifiers, Locales>;
