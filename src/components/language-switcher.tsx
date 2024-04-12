"use client";

import { Language } from "@/lib/models";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LanguagesIcon } from "lucide-react";
import { lngCookieName, languages } from "@/app/i18n/settings";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ lng }) => {
  const pathname = usePathname();
  const [_, setCookie] = useCookies([lngCookieName]);
  const router = useRouter();

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
      <button
        className="hidden lg:block w-full bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url("/images/flags/${lng}.png")`,
        }}
        onClick={handleLanguageChange}
      />
      <button
        className="block lg:hidden w-9 h-9 bg-center bg-cover bg-no-repeat rounded-full"
        style={{
          backgroundImage: `url("/images/flags/small/${lng}.png")`,
        }}
        onClick={handleLanguageChange}
      />
      <LanguagesIcon size={20} className="hidden lg:block" />
    </div>
  );
};

type LanguageSwitcherProps = {
  lng: Language;
};
