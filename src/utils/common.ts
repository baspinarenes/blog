export function getActiveNavigation(pathname: string): string | null {
  return pathname === "/" ? "homepage" : pathname.slice(1);
}

export function capitalize(sentence: string) {
  return sentence
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
