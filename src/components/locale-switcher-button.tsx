"use client";

import { useRouter, usePathname } from "../navigation";
import { LanguagesIcon } from "lucide-react";
import { Button } from "./ui/button";
import { MouseEvent } from "react";
import { locales } from "@/config";
import { Language } from "@/lib/models";

export const LocaleSwitcherButton: React.FC<LocaleSwitcherButtonProps> = ({ locale }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (e: MouseEvent<HTMLButtonElement>) => {
    const currentLocaleIndex = locales.indexOf(locale);
    router.replace(pathname, { locale: locales[currentLocaleIndex + 1] ?? locales[0] });
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        className="w-full bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url("/flags/${locale}.png")`,
        }}
        onClick={handleLocaleChange}
      />
      <LanguagesIcon size={20} />
    </div>
  );
};

export type LocaleSwitcherButtonProps = {
  locale: Language;
};
