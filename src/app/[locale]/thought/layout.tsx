import { EntityMenu } from "@/components/entity-menu";
import contentfulFetcher from "@/lib/contentful/contentful-fetcher";
import { Thought } from "@/lib/contentful/model";
import { Language, LayoutProps } from "@/lib/models";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function ThoughtLayout({ children, params }: LayoutProps) {
  unstable_setRequestLocale(params.locale);

  return (
    <section className="flex w-full h-full">
      <EntityMenu type="thought" locale={params.locale} />
      {children}
    </section>
  );
}
