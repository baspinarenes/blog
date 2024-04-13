import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages, lngCookieName } from "./app/i18n/settings";
import { Language } from "@/lib/models";

acceptLanguage.languages(languages);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

export function middleware(req: NextRequest) {
  if (["_next", "images", "opengraph-image"].some((u) => req.nextUrl.pathname.includes(u))) {
    return NextResponse.next();
  }

  if (req.nextUrl.pathname === "/") {
    const lng = getLanguage(req);
    const url = new URL(`/${lng}`, req.url);
    const response = NextResponse.redirect(url);
    response.headers.set("x-pathname", url.pathname);
    response.cookies.set(lngCookieName, lng);
    return response;
  }

  if (languages.every((lng) => !req.nextUrl.pathname.startsWith(`/${lng}`))) {
    const lng = getLanguage(req);
    const url = new URL(`/${getLanguage(req)}${req.nextUrl.pathname}`, req.url);
    const response = NextResponse.redirect(url);
    response.headers.set("x-pathname", url.pathname);
    response.cookies.set(lngCookieName, lng);
    return response;
  }

  if (
    req.nextUrl.pathname.startsWith("/en") &&
    ["movie-review", "book-review"].some((u) => req.nextUrl.pathname.includes(u))
  ) {
    const url = new URL(`/en`, req.url);
    const response = NextResponse.redirect(url);
    response.headers.set("x-pathname", url.pathname);
    response.cookies.set(lngCookieName, "en");
    return response;
  }

  if (languages.some((l) => req.nextUrl.pathname.startsWith(`/${l}`))) {
    const lng = req.nextUrl.pathname.slice(1).split("/")[0];
    const response = NextResponse.next();
    response.headers.set("x-pathname", req.nextUrl.pathname);
    response.cookies.set(lngCookieName, lng);
    return response;
  }

  return NextResponse.redirect(new URL(`/`, req.url));
}

function getLanguage(req: NextRequest): Language {
  let lng: Language | null = null;
  if (req.cookies.has(lngCookieName)) lng = acceptLanguage.get(req.cookies.get(lngCookieName)!.value);
  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;
  return lng;
}
