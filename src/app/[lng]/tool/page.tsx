import { PageHeader } from "@/components/page-header";
import { RichTextContent } from "@/components/rich-text-content";
import contentfulFetcher from "@/lib/contentful/contentful-fetcher";
import { StaticPage } from "@/lib/contentful/model";
import { Language, PageProps } from "@/lib/models";

export default async function ToolPage({ params: { lng } }: PageProps) {
  const content = await fetchData(lng);

  return (
    <div>
      <PageHeader lng={lng} />
      <RichTextContent document={content} />
    </div>
  );
}

async function fetchData(lng: Language) {
  const staticPages = await contentfulFetcher<StaticPage>("static-page", {
    slug: "tool",
    locale: lng,
  });

  return staticPages[0].content;
}
