import { useLocale, useTranslations } from "next-intl";
import { LocaleSwitcherButton } from "./locale-switcher-button";
import { Language } from "@/lib/models";

export const LocaleSwitcher = () => {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale() as unknown as Language;

  return <LocaleSwitcherButton locale={locale} />;
};
