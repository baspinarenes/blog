import { CategoryType } from "@/models";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getSafe(fn: () => any, defaultVal: any) {
  try {
    return fn() || defaultVal;
  } catch (e) {
    return defaultVal;
  }
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const dasherize = (text: string) =>
  text.replace(/ +/g, "-").toLowerCase();

export const getCookie = (name: string, defaultValue: string) => {
  try {
    const cookies = document.cookie.split("; ").reduce((acc, current) => {
      const [key, value] = current.split("=");
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    return cookies[name];
  } catch (error) {
    return defaultValue;
  }
};

export const parsePathname = (pathname: string) => {
  const pathnameWithoutSlash = pathname.startsWith("/")
    ? pathname.slice(1)
    : pathname;
  const [language, category, slug] = pathnameWithoutSlash.split("/");
  return { language, category: category as CategoryType, slug };
};

export const generatePathname = ({
  language,
  category,
  slug,
  wantPrev = false,
}: {
  language: string;
  category: string;
  slug: string;
  wantPrev?: boolean;
}) => {
  if (wantPrev) {
    if (slug) slug = "";
    else if (category) category = "";
    else language = "";
  }

  return `/${language}${category ? `/${category}` : ""}${
    slug ? `/${slug}` : ""
  }`;
};

export const parseCodeBlockMeta = (node: any) => {
  const meta: string = getSafe(() => node.children[0].data?.meta, "");
  const fileName = meta.match(/file=(\S+)/)?.[1] || "";
  return { fileName };
};
