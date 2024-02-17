import { useTranslation } from "@/app/i18n";
import { RichText } from "@/components/rich-text";
import contentfulFetcher from "@/lib/contentful/contentful-fetcher";
import { StaticPage } from "@/lib/contentful/model";
import { Language, PageProps } from "@/lib/models";

export default async function ToolsPage({ params: { lng } }: PageProps) {
  const content = await fetchData(lng);
  const { t } = await useTranslation(lng, "tools");

  return (
    <div className="container mx-auto">
      <h1 className="mb-8">{t("title")}</h1>
      <RichText document={content} />
    </div>
  );
}

async function fetchData(lng: Language) {
  const staticPages = await contentfulFetcher<StaticPage>("staticPage", {
    slug: "tools",
    locale: lng,
  });

  return staticPages[0].content;
}
