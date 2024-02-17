import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeSnippetFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    date: EntryFieldTypes.Date;
    content: EntryFieldTypes.RichText;
    context?: EntryFieldTypes.Text;
}

export type TypeSnippetSkeleton = EntrySkeletonType<TypeSnippetFields, "snippet">;
export type TypeSnippet<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeSnippetSkeleton, Modifiers, Locales>;
