"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation";

export const Navlink: React.FC<NavlinkProps> = (props) => {
  const { href, icon, children, rounded = false, external = false, onClick } = props;

  const pathname = usePathname();
  const pathnameButRemovedLocale = pathname.replace(/\/[a-z]{2}/, "/");

  let isActive = href === "/" ? pathnameButRemovedLocale === "/" : pathnameButRemovedLocale.includes(href);
  const LinkComponent = external ? "a" : Link;

  return (
    <LinkComponent
      key={href}
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center justify-between p-2 transition delay-50 duration-150",
        isActive ? "bg-black text-white" : "hover:bg-gray-200",
        rounded ? "rounded-lg" : "rounded-none"
      )}
    >
      <div className="flex items-center w-full gap-2">
        {icon}
        <span className={cn("text-sm flex-grow", isActive && "text-white")}>{children}</span>
        {external && <ArrowUpRightIcon size={16} className="ml-auto" />}
      </div>
    </LinkComponent>
  );
};

export type NavlinkProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  rounded?: boolean;
  icon?: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
};
