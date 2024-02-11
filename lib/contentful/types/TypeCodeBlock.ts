import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeCodeBlockFields {
    title: EntryFieldTypes.Symbol;
    language: EntryFieldTypes.Symbol;
    code: EntryFieldTypes.Text;
}

export type TypeCodeBlockSkeleton = EntrySkeletonType<TypeCodeBlockFields, "codeBlock">;
export type TypeCodeBlock<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeCodeBlockSkeleton, Modifiers, Locales>;
