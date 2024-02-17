"use client";

import { Language } from "@/lib/models";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LanguagesIcon } from "lucide-react";
import { cookieName, languages } from "@/app/i18n/settings";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ lng }) => {
  const pathname = usePathname();
  const [_, setCookie] = useCookies([cookieName]);
  const router = useRouter();

  const handleLanguageChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const currentLocaleIndex = languages.indexOf(lng);
    const nextLanguage = languages[currentLocaleIndex + 1] ?? languages[0];
    const redirectedPathname = pathname.replace(/\/\w{2}($|(?=\/))/, `/${nextLanguage}`);
    setCookie(cookieName, nextLanguage, { path: "/" });
    router.push(redirectedPathname);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        className="w-full bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url("/images/flags/${lng}.png")`,
        }}
        onClick={handleLanguageChange}
      />
      <LanguagesIcon size={20} />
    </div>
  );
};

type LanguageSwitcherProps = {
  lng: Language;
};
