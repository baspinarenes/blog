import { fallbackLng } from "@/app/i18n/settings";
import { getCookie } from "@/lib/utils";
import { create } from "zustand";

interface LanguageStore {
  language: string;
}

export const useLanguageStore = create<LanguageStore>()((set) => ({
  language: getCookie("language", fallbackLng),
  changeLanguage: (value: string) =>
    set({
      language: value,
    }),
}));
