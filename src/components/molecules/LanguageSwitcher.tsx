import { type FC } from "react";
import { IconLanguage } from "@tabler/icons-react";
import Link from "next/link";
import { generatePathname } from "@/lib/utils";

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({
  language,
  category,
  slug,
}) => {
  const newLanguage = language === "en" ? "tr" : "en";

  return (
    <Link
      href={generatePathname({ language: newLanguage, category, slug })}
      className="p-0 h-fit ml-2"
    >
      <IconLanguage className="h-fit" size={20} stroke={1.6} />
    </Link>
  );
};

export type LanguageSwitcherProps = Readonly<{
  language: string;
  category: string;
  slug: string;
}>;
