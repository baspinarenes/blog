import { ArrowUpRightIcon } from "lucide-react";
import NextLink from "next/link";

export const isExternalLink = (href: string) => {
  if (!href) return false;
  return !href.startsWith("/") && !href.startsWith("#");
};

export const Link: React.FC<MenuContentProps> = (props) => {
  const { href = "#", children } = props;
  const isExternal = isExternalLink(href);

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 link break-words inline-flex"
      >
        {children}
        <ArrowUpRightIcon size={20} />
      </a>
    );
  }

  return (
    <NextLink href={href} className="link">
      {children}
    </NextLink>
  );
};

export type MenuContentProps = {
  href: string;
  children: React.ReactNode;
};
