"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navlink: React.FC<NavlinkProps> = (props) => {
  const { href, icon, label, external = false, onClick } = props;

  const pathname = usePathname();
  let isActive = false;

  if (pathname?.length > 0 && !external) {
    const splittedPathname = pathname.split("/");
    const currentPathname = splittedPathname[1] ?? "";
    isActive = currentPathname === href.split("/")[1];
  }

  const LinkComponent = external ? "a" : Link;

  return (
    <LinkComponent
      key={href}
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center justify-between rounded-lg p-2 transition delay-50 duration-150",
        isActive ? "bg-black text-white" : "hover:bg-gray-200"
      )}
    >
      <div className="flex items-center w-full gap-2">
        {icon}
        <span className={cn("text-sm flex-grow", isActive && "text-white")}>{label}</span>
        {external && <ArrowUpRightIcon size={16} className="ml-auto" />}
      </div>
    </LinkComponent>
  );
};

export type NavlinkProps = {
  href: string;
  label: string;
  external?: boolean;
  icon: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
};
