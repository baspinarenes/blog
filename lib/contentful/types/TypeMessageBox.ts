import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeMessageBoxFields {
    content: EntryFieldTypes.Text;
    type: EntryFieldTypes.Symbol;
}

export type TypeMessageBoxSkeleton = EntrySkeletonType<TypeMessageBoxFields, "messageBox">;
export type TypeMessageBox<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeMessageBoxSkeleton, Modifiers, Locales>;
