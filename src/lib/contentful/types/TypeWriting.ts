import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeAuthorSkeleton } from "./TypeAuthor";

export interface TypeWritingFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    content?: EntryFieldTypes.RichText;
    excerpt?: EntryFieldTypes.Symbol;
    coverImage?: EntryFieldTypes.AssetLink;
    date?: EntryFieldTypes.Date;
    author: EntryFieldTypes.EntryLink<TypeAuthorSkeleton>;
}

export type TypeWritingSkeleton = EntrySkeletonType<TypeWritingFields, "writing">;
export type TypeWriting<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeWritingSkeleton, Modifiers, Locales>;
