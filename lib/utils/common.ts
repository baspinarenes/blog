import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const dasherize = (text: string) => String(text).replace(/ +/g, "-").toLowerCase();
