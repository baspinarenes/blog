import type { MiddlewareHandler } from "astro";
import { pathManager } from "./utils/pathManager";

export const onRequest: MiddlewareHandler = async (context, next) => {
  if (
    context.url.pathname.startsWith("/api") ||
    context.url.pathname.startsWith("/packages") ||
    context.url.pathname.startsWith("/_astro") ||
    context.url.pathname.startsWith("/.well-known") ||
    context.url.pathname.startsWith("/sitemap") ||
    context.url.pathname.startsWith("/robots") ||
    context.url.pathname.startsWith("/favicon.ico") ||
    context.url.pathname.startsWith("/apple-touch-icon") ||
    context.url.pathname.startsWith("/apple-touch-icon-precomposed") ||
    context.url.pathname.startsWith("/apple-touch-icon-precomposed-180x180")
  ) {
    return next();
  }

  if (!pathManager.isAvailable(context.url.pathname)) {
    return context.redirect(`/${pathManager.getLocale(context.url.pathname)}`);
  }

  return next();
};
