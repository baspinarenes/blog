import { C } from "@configuration";

class PathManager {
  locales: string[] = Object.keys(C.LOCALES);
  defaultLocale: string = C.DEFAULT_LOCALE;

  getLocale(path: string) {
    const { lang } = this.parse(path);
    return lang;
  }

  changeLocale(path: string, newLocale: string) {
    const { path: pathWithoutLocale } = this.parse(path);
    const basePath = pathWithoutLocale === "/" ? "" : pathWithoutLocale;
    return `/${newLocale}${basePath}`;
  }

  isAvailable(path: string) {
    const { lang, path: pathWithoutLocale } = this.parse(path);
    const [_, category] = pathWithoutLocale.split("/");

    return C.NAVIGATIONS.some(
      (navigation) =>
        navigation.name.startsWith(category) &&
        navigation.locales.includes(lang)
    );
  }

  isActive(href: string, path: string) {
    // href: /tr/articles/what-is-function-overloading
    // path: /tr
    if (path.length === 3 && href.length !== 3) {
      return false;
    }
    return href.startsWith(path);
  }

  private parse(path: string): { lang: string; path: string } {
    const cleanPath = this.removeTrailingSlash(path);
    const parts = cleanPath.split("/");
    const potentialLang = parts[1];

    if (this.locales.includes(potentialLang)) {
      const pathWithoutLang = "/" + parts.slice(2).join("/");
      return { lang: potentialLang, path: pathWithoutLang };
    }

    return { lang: this.defaultLocale, path: cleanPath || "/" };
  }

  private removeTrailingSlash(path: string) {
    if (path !== "/" && path.endsWith("/")) {
      return path.slice(0, -1);
    }
    return path;
  }
}

export const pathManager = new PathManager();
