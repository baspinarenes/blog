import { PostContent } from "@/components/post-content";
import { PostHeader } from "@/components/post-header";
import { RichText } from "@/components/rich-text";
import contentfulFetcher from "@/lib/contentful/contentful-fetcher";
import { Thought } from "@/lib/contentful/model";
import { PageProps } from "@/lib/models";
import { unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateStaticParams({ params: { locale } }: PageProps) {
  const thoughts = await contentfulFetcher<Thought>("thought", { locale });
  return thoughts.map((a) => ({ slug: a.slug }));
}

async function fetchData(params: PageProps["params"]) {
  const thoughts = await contentfulFetcher<Thought>("thought", {
    slug: params.slug,
    locale: params.locale,
  });

  if (!thoughts?.length) notFound();
  return { thought: thoughts[0] };
}

export default async function Page({ params }: PageProps) {
  unstable_setRequestLocale(params.locale);
  const { thought } = await fetchData(params);

  return (
    <div className="container mx-auto">
      <PostHeader {...thought} locale={params.locale} />
      <PostContent document={thought.body} />
    </div>
  );
}
