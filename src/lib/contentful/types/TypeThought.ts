import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeThoughtFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    date: EntryFieldTypes.Date;
    content: EntryFieldTypes.RichText;
}

export type TypeThoughtSkeleton = EntrySkeletonType<TypeThoughtFields, "thought">;
export type TypeThought<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeThoughtSkeleton, Modifiers, Locales>;
