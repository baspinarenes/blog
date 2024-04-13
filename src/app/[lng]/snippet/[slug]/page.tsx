import { useTranslation } from "@/app/i18n";
import { MarkdownContent } from "@/components/markdown-content";
import { MessageBox } from "@/components/message-box";
import { PageHeader } from "@/components/page-header";
import { PostHeader } from "@/components/post-header";
import { Profile } from "@/components/profile";
import contentfulFetcher from "@/lib/contentful/contentful-fetcher";
import { Snippet } from "@/lib/contentful/model";
import { PageProps } from "@/lib/models";
import { notFound } from "next/navigation";

export async function generateStaticParams({ params: { lng } }: PageProps) {
  const snippets = await contentfulFetcher<Snippet>("snippet", { locale: lng });
  return snippets.map((s) => ({ slug: s.slug }));
}

async function fetchData(params: PageProps["params"]) {
  const snippets = await contentfulFetcher<Snippet>("snippet", {
    slug: params.slug,
    locale: params.lng,
  });

  if (!snippets?.length) notFound();
  return { snippet: snippets[0] };
}

export default async function SnippetPage({ params: { lng, slug } }: PageProps) {
  const { snippet } = await fetchData({ lng, slug });
  const { t } = await useTranslation(lng, "common");

  return (
    <>
      <PageHeader lng={lng} />
      <PostHeader {...snippet} locale={lng} />
      {!snippet.context && <MessageBox type="danger" content={t("not-available-in-this-language")} />}
      <MarkdownContent>{snippet.context}</MarkdownContent>
    </>
  );
}
