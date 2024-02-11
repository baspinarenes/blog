import { PostContent } from "@/components/post-content";
import { PostHeader } from "@/components/post-header";
import contentfulFetcher from "@/lib/contentful/contentful-fetcher";
import { Snippet } from "@/lib/contentful/model";
import { Language, PageProps } from "@/lib/models";
import { unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateStaticParams({ params: { locale } }: PageProps) {
  const snippets = await contentfulFetcher<Snippet>("snippet", { locale });
  return snippets.map((s) => ({ slug: s.slug }));
}

async function fetchData(params: PageProps["params"]) {
  const snippets = await contentfulFetcher<Snippet>("snippet", {
    slug: params.slug,
    locale: params.locale,
  });

  if (!snippets?.length) notFound();
  return { snippet: snippets[0] };
}

export default async function SnippetPage({ params }: SnippetPageProps) {
  unstable_setRequestLocale(params.locale);
  const { snippet } = await fetchData(params);

  return (
    <div className="container mx-auto">
      <PostHeader {...snippet} locale={params.locale} />
      <PostContent document={snippet.body} />
    </div>
  );
}

type SnippetPageProps = {
  params: {
    slug: string;
    locale: Language;
  };
};
