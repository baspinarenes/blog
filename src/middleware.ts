import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages, cookieName } from "./app/i18n/settings";
import { Language } from "@/lib/models";

acceptLanguage.languages(languages);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

export function middleware(req: NextRequest) {
  if (["_next", "images", "opengraph-image"].some((u) => req.nextUrl.pathname.includes(u))) {
    return NextResponse.next();
  }

  if (languages.some((l) => req.nextUrl.pathname.startsWith(`/${l}`))) {
    req.cookies.set(cookieName, req.nextUrl.pathname.slice(1).split("/")[0]);
    return NextResponse.next();
  }

  let lng: Language | null = null;
  if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName)!.value);
  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url));
}
