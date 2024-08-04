import { type FC } from "react";
import Link from "next/link";
import { Icon } from "./Icon";
import { generatePathname, parsePathname } from "@/lib/utils";

export const ReturnButton: FC<ReturnButtonProps> = ({ pathname }) => {
  const { language, category, slug } = parsePathname(pathname);

  return (
    <Link
      href={generatePathname({
        language,
        category,
        slug,
        wantPrev: true,
      })}
      className="p-0 mr-2"
    >
      <Icon name="back" stroke="black" strokeWidth={1.2} size={18} />
    </Link>
  );
};

export type ReturnButtonProps = Readonly<{
  pathname: string;
}>;
