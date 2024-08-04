"use client";

import { usePathname } from "next/navigation";
import { capitalize, parsePathname } from "@/libraries/utils";
import { useTranslation } from "@/i18n/client";

export const HeaderTitle = () => {
  const pathname = usePathname();
  const { language, category, slug } = parsePathname(pathname);
  const { t } = useTranslation(language, "common");

  if (slug) {
    return (
      <span className="font-semibold text-sm leading-4 line-clamp-2">Post</span>
    );
  }
  if (category && t(`title.${category}`) === `title.${category}`) return null;

  const categoryText = category ? t(`title.${category}`) : category;
  const title = categoryText || t(`title.home`);
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
