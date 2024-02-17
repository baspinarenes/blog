import { Callback, InitOptions, TFunction } from "i18next";

export const fallbackLng = "tr";
export const languages = [fallbackLng, "en"];
export const defaultNS = "common";
export const cookieName = "i18next";

export function getOptions(lng = fallbackLng, ns: string | string[] = defaultNS): InitOptions<unknown> {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
