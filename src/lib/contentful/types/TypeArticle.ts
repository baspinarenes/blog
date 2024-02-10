import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeAuthorSkeleton } from "./TypeAuthor";

export interface TypeArticleFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    content: EntryFieldTypes.RichText;
    excerpt: EntryFieldTypes.Symbol;
    coverImage?: EntryFieldTypes.AssetLink;
    date: EntryFieldTypes.Date;
    author: EntryFieldTypes.EntryLink<TypeAuthorSkeleton>;
}

export type TypeArticleSkeleton = EntrySkeletonType<TypeArticleFields, "article">;
export type TypeArticle<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeArticleSkeleton, Modifiers, Locales>;
