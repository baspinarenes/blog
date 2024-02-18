import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeAuthorSkeleton } from "./TypeAuthor";

export interface TypeArticleFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    coverImage?: EntryFieldTypes.AssetLink;
    date?: EntryFieldTypes.Date;
    author: EntryFieldTypes.EntryLink<TypeAuthorSkeleton>;
    context?: EntryFieldTypes.Text;
}

export type TypeArticleSkeleton = EntrySkeletonType<TypeArticleFields, "article">;
export type TypeArticle<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeArticleSkeleton, Modifiers, Locales>;
