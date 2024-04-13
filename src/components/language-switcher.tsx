"use client";

import { Language } from "@/lib/models";
import { Button } from "./ui/button";
import { LanguagesIcon } from "lucide-react";
import { FlagButton } from "./flag-button";
import { usePathname, useRouter } from "next/navigation";
import { languages, lngCookieName } from "@/app/i18n/settings";
import { useCookies } from "react-cookie";

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ lng }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [_, setCookie] = useCookies([lngCookieName]);

  const handleLanguageChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const currentLocaleIndex = languages.indexOf(lng);
    const nextLanguage = languages[currentLocaleIndex + 1] ?? languages[0];
    const redirectedPathname = pathname.replace(/\/\w{2}($|(?=\/))/, `/${nextLanguage}`);
    setCookie(lngCookieName, nextLanguage, { path: "/" });
    router.push(redirectedPathname);
  };

  return (
    <div className="flex items-center gap-2 ml-auto">
      {/* Desktop */}
      <FlagButton lng={lng} handleLanguageChange={handleLanguageChange} />
      <LanguagesIcon size={20} className="hidden lg:block" />

      {/* Mobile */}
      <Button variant="ghost" onClick={handleLanguageChange} size="icon" className="lg:hidden">
        <LanguagesIcon size={16} />
      </Button>
    </div>
  );
};

type LanguageSwitcherProps = {
  lng: Language;
};
