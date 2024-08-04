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
    return fn();
  } catch (e) {
    return defaultVal;
  }
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
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
  const [, language, category, slug] = pathname.split("/");
  return { language, category, slug };
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
