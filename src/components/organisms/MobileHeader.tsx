"use client";

import { type FC } from "react";
import { HamburgerMenu } from "../molecules";
import { LanguageSwitcher } from "../molecules/LanguageSwitcher";
import { HeaderTitle } from "../atoms/HeaderTitle";
import { Spacer } from "../atoms";
import { ReturnButton } from "../atoms/ReturnButton";
import { usePathname } from "next/navigation";
import { parsePathname } from "@/lib/utils";

export const MobileHeader: FC<MobileHeaderProps> = ({ language }) => {
  const pathname = usePathname();
  const { category, slug } = parsePathname(pathname);
  const isHomepage = !category && !slug;

  return (
    <header className="flex items-center bg-gray-50 border-b border-b-border h-12 px-6 sticky top-0 right-0 w-screen left-0 z-50">
      {isHomepage ? <HamburgerMenu /> : <ReturnButton pathname={pathname!} />}
      <HeaderTitle language={language} />
      <Spacer />
      <LanguageSwitcher language={language} category={category} slug={slug} />
    </header>
  );
};

export type MobileHeaderProps = Readonly<{
  language: string;
}>;
