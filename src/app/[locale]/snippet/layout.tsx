import { EntityMenu } from "@/components/entity-menu";
import { locales } from "@/config";
import { LayoutProps } from "@/lib/models";
import { unstable_setRequestLocale } from "next-intl/server";
import React from "react";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function SnippetLayout({ children, params }: LayoutProps) {
  unstable_setRequestLocale(params.locale);

  return (
    <section className="flex w-full h-full">
      <EntityMenu type="snippet" locale={params.locale} />
      {children}
    </section>
  );
}
