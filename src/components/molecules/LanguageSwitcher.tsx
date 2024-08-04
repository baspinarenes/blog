"use client";

import { type FC } from "react";
import { IconLanguage } from "@tabler/icons-react";
import Link from "next/link";
import { generatePathname, parsePathname } from "@/libraries/utils";
import { usePathname } from "next/navigation";

export const LanguageSwitcher: FC<LanguageSwitcherProps> = () => {
  const pathname = usePathname();
  const { language, category, slug } = parsePathname(pathname);
  const newLanguage = language === "en" ? "tr" : "en";

  return (
    <Link
      href={generatePathname({
        category,
        language: newLanguage,
        slug,
      })}
      className="p-0 h-fit ml-2"
    >
      <IconLanguage className="h-fit" size={20} stroke={1.6} />
    </Link>
  );
};

export type LanguageSwitcherProps = Readonly<{}>;
