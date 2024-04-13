import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeJourneyItemFields {
  title: EntryFieldTypes.Symbol;
  content: EntryFieldTypes.RichText;
  date: EntryFieldTypes.Date;
}

export type TypeJourneyItemSkeleton = EntrySkeletonType<TypeJourneyItemFields, "journey-item">;
export type TypeJourneyItem<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<
  TypeJourneyItemSkeleton,
  Modifiers,
  Locales
>;
