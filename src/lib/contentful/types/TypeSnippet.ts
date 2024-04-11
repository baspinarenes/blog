import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeSnippetFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    date: EntryFieldTypes.Date;
    context?: EntryFieldTypes.Text;
    description: EntryFieldTypes.Symbol;
    category: EntryFieldTypes.Symbol<"Bash" | "CSS" | "Gitlab" | "HTML" | "JavaScript" | "React" | "TypeScript">;
    tags?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
}

export type TypeSnippetSkeleton = EntrySkeletonType<TypeSnippetFields, "snippet">;
export type TypeSnippet<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeSnippetSkeleton, Modifiers, Locales>;
