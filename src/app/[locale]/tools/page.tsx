import { RichText } from "@/components/rich-text";
import contentfulFetcher from "@/lib/contentful/contentful-fetcher";
import { StaticPage } from "@/lib/contentful/model";
import { PageProps } from "@/lib/models";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export default async function ToolsPage({ params }: PageProps) {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations("ToolsPage");
  const content = await fetchData(params);

  return (
    <div className="container mx-auto">
      <h1 className="mb-8">{t("title")}</h1>
      <RichText document={content} />
    </div>
  );
}

async function fetchData(params: PageProps["params"]) {
  const staticPages = await contentfulFetcher<StaticPage>("staticPage", {
    slug: "tools",
    locale: params.locale,
  });

  return staticPages[0].content;
}
