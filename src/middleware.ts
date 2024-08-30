import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages, cookieName } from "./i18n/settings";

acceptLanguage.languages(languages);

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.endsWith(".svg") || req.nextUrl.pathname.includes("fonts") || req.nextUrl.pathname.includes("logo")) {
    return NextResponse.next();
  }

  const headers = new Headers(req.headers);
  headers.set("x-current-path", req.nextUrl.pathname);

  let lng: string = fallbackLng;
  if (req.cookies.has(cookieName)) {
    lng = acceptLanguage.get(req.cookies.get(cookieName)!.value)!;
  } else if (!lng) {
    lng = acceptLanguage.get(req.headers.get("Accept-Language"))!;
  }

  const hasLanguageInPath = languages.some((language) =>
    req.nextUrl.pathname.startsWith(`/${language}`)
  );

  if (!hasLanguageInPath) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url),
      { headers }
    );
  }

  return NextResponse.next({ headers });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest|\.svg).*)",
  ],
};
