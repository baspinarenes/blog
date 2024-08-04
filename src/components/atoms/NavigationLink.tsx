"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FC } from "react";
import { Icon } from "./Icon";

export const NavigationLink: FC<NavigationLinkProps> = ({ name, href }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn("flex gap-4 items-center px-2 py-2 rounded-lg text-sm", {
        "bg-black text-white": isActive,
      })}
    >
      <Icon name={href.slice(1) || "home"} size={18} />
      {name}
    </Link>
  );
};

export type NavigationLinkProps = Readonly<{
  name: string;
  href: string;
}>;
