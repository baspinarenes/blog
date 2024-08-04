"use client";

import { type FC } from "react";
import { usePathname } from "next/navigation";
import { parsePathname } from "@/libraries/utils";
import { Spacer } from "../atoms";
import { HeaderTitle } from "../molecules/HeaderTitle";
import { HamburgerMenu, LanguageSwitcher, ReturnButton } from "../molecules";

export const MobileHeader: FC<MobileHeaderProps> = ({ language }) => {
  const pathname = usePathname();
  const { category, slug } = parsePathname(pathname);
  const isHomepage = !category && !slug;

  return (
    <header className="flex items-center bg-gray-50 border-b border-b-border h-12 px-6 sticky top-0 right-0 w-screen left-0 z-50">
      {isHomepage ? (
        <HamburgerMenu language={language} />
      ) : (
        <ReturnButton pathname={pathname!} />
      )}
      <HeaderTitle />
      <Spacer />
      <LanguageSwitcher />
    </header>
  );
};

export type MobileHeaderProps = Readonly<{
  language: string;
}>;
