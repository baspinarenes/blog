"use client";

import { cn, dasherize, parsePathname } from "@/libraries/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FC } from "react";
import { Icon } from "./Icon";
import { useTranslation } from "@/i18n/client";

export const NavigationLink: FC<NavigationLinkProps> = ({ name, href }) => {
  const pathname = usePathname();
  const { language } = parsePathname(pathname);
  const isActive =
    (href === `/${language}` && pathname === `/${language}`) ||
    (href !== `/${language}` && pathname.includes(href));
  const { t } = useTranslation(language, "common");

  return (
    <Link
      href={href}
      className={cn("flex gap-4 items-center px-2 py-2 rounded-lg text-sm", {
        "bg-black text-white": isActive,
        "hover:bg-gray-200": !isActive,
      })}
    >
      <Icon name={dasherize(name) || "home"} size={18} />
      {t(`title.${dasherize(name)}`)}
    </Link>
  );
};

export type NavigationLinkProps = Readonly<{
  name: string;
  href: string;
}>;
