import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Language } from "../models";
import { headers } from "next/headers";

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date, locale: Language) {
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const dasherize = (text: string) => text.replace(/ +/g, "-").toLowerCase();
export const undasherize = (text: string) => {
  return text
    .split(/-+/g)
    .map((word) => capitalize(word))
    .join(" ");
};

export const undasherizeAsCamelcase = (text: string) => {
  return text
    .split(/-+/g)
    .map((word, i) => (i !== 0 ? capitalize(word) : word))
    .join("");
};

export const generateYearArray = () =>
  Array.from({ length: new Date().getFullYear() - 2020 + 1 }, (_, index) => 2020 + index).sort((a, b) => b - a);

export const getJetBrainsMonoBold = async () => {
  const response = await fetch(new URL("@/fonts/JetBrainsMono-Bold.ttf", import.meta.url));
  const font = await response.arrayBuffer();
  return font;
};

export const getJetBrainsMonoRegular = async () => {
  const response = await fetch(new URL("@/fonts/JetBrainsMono-Regular.ttf", import.meta.url));
  const font = await response.arrayBuffer();
  return font;
};

export const calculateReadingTime = (text: string = "") => {
  const WORDS_PER_MINUTE = 200;
  const regex = /\w+/g;

  const wordCount = text.match(regex)?.length || 0;
  const readingTimeMinute = Math.ceil(wordCount / WORDS_PER_MINUTE);
  const readingTime = `${readingTimeMinute} min`;

  return {
    wordCount,
    readingTime,
  };
};
