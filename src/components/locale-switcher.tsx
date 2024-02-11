import { useLocale } from "next-intl";
import { LocaleSwitcherButton } from "./locale-switcher-button";
import { Language } from "@/lib/models";

export const LocaleSwitcher = () => {
  const locale = useLocale() as unknown as Language;

  return <LocaleSwitcherButton locale={locale} />;
};
