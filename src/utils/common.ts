import { Language } from "../models/enums";

export function getActiveNavigation(pathname: string): string | null {
  return pathname === "/" ? "homepage" : pathname.slice(1);
}

export function capitalize(sentence: string) {
  return sentence
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export function generateURLWithLanguage(language: string, path: string) {
  if (!path.includes(`${language}/`) && language === Language.EN) {
    return `/en${path}`;
  }

  return path;
}
