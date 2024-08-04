"use client";

import { usePathname } from "next/navigation";
import { capitalize, parsePathname } from "@/lib/utils";
import { useTranslation } from "@/app/i18n/client";

export const HeaderTitle = ({ language }: HeaderTitleProps) => {
  const { t } = useTranslation(language, "common");
  const pathname = usePathname();
  const { category, slug } = parsePathname(pathname);
  const title = slug || (category ? t(`title.${category}`) : t(`title.home`));

  const isQuestionTitle = ["when", "where", "why", "how", "what", "who"].some(
    (word) => pathname.includes(word)
  );
  const beutifiedTitle = `${capitalize(title.replaceAll("-", " "))}${
    isQuestionTitle ? "?" : ""
  }`;

  if (!beutifiedTitle) return null;

  return (
    <span className="font-semibold text-sm leading-4 line-clamp-2">
      {beutifiedTitle}
    </span>
  );
};

export type HeaderTitleProps = Readonly<{
  language: string;
}>;
