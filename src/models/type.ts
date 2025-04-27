import { C } from "@configuration";

export type Lang = keyof typeof C.LOCALES;
export type Multilingual = { [key in Lang]?: string };

export type Category = keyof typeof C.CATEGORIES_LABELS;
