import { PostContent } from "@/components/post-content";
import { PostHeader } from "@/components/post-header";
import contentfulFetcher from "@/lib/contentful/contentful-fetcher";
import { Snippet } from "@/lib/contentful/model";
import { Language, PageProps } from "@/lib/models";

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

export default async function SnippetPage({ params }: PageProps) {
  const { snippet } = await fetchData(params);

  return (
    <div className="container mx-auto">
      <PostHeader {...snippet} locale={params.lng} />
      <PostContent document={snippet.body} lng={params.lng} />
    </div>
  );
}
