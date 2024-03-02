import { PostContent } from "@/components/post-content";
import { PostHeader } from "@/components/post-header";
import contentfulFetcher from "@/lib/contentful/contentful-fetcher";
import { Thought } from "@/lib/contentful/model";
import { PageProps } from "@/lib/models";
import { notFound } from "next/navigation";

export async function generateStaticParams({ params: { lng } }: PageProps) {
  const thoughts = await contentfulFetcher<Thought>("thought", { locale: lng });
  return thoughts.map((a) => ({ slug: a.slug }));
}

async function fetchData(params: PageProps["params"]) {
  const thoughts = await contentfulFetcher<Thought>("thought", {
    slug: params.slug,
    locale: params.lng,
  });

  if (!thoughts?.length) notFound();
  return { thought: thoughts[0] };
}

export default async function Page({ params }: PageProps) {
  const { thought } = await fetchData(params);

  return (
    <>
      <PostHeader {...thought} locale={params.lng} />
      <PostContent document={thought.content} lng={params.lng} />
    </>
  );
}
