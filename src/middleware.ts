import type { MiddlewareHandler } from "astro";

const LEGACY_LOCALE_PREFIX = /^\/(tr|en)(\/|$)/;

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { pathname, search } = context.url;

  if (LEGACY_LOCALE_PREFIX.test(pathname)) {
    const target = pathname.replace(/^\/(tr|en)/, "") || "/";
    return context.redirect(`${target}${search}`, 301);
  }

  return next();
};
