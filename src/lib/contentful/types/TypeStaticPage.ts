import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeStaticPageFields {
  title: EntryFieldTypes.Symbol;
  slug: EntryFieldTypes.Symbol;
  content: EntryFieldTypes.RichText;
}

export type TypeStaticPageSkeleton = EntrySkeletonType<TypeStaticPageFields, "static-page">;
export type TypeStaticPage<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<
  TypeStaticPageSkeleton,
  Modifiers,
  Locales
>;
