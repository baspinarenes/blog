import type { Lang, Multilingual } from "@models/type";
import { C } from "../configuration";
import { pathManager } from "../utils";

export const DEFAULT_LOCALE = C.DEFAULT_LOCALE as Lang;

export function useTranslations(lang: Lang) {
  return function t(multilingual: Multilingual | string): string {
    if (!multilingual) return "";
    else if (typeof multilingual === "string") return multilingual;
    else return multilingual[lang] || multilingual[DEFAULT_LOCALE] || "";
  };
}

export function getLocalePaths(url: URL): LocalePath[] {
  return Object.keys(C.LOCALES).map((lang) => {
    return {
      lang: lang as Lang,
      path: pathManager.changeLocale(
        url.pathname.replace(/^\/[a-zA-Z-]+/, ""),
        lang
      ),
    };
  });
}
type LocalePath = {
  lang: Lang;
  path: string;
};

export const localeParams = Object.keys(C.LOCALES).map((lang) => ({
  params: { lang },
}));
