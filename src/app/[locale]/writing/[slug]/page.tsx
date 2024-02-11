import { PostHeader } from "@/components/post-header";
import { notFound } from "next/navigation";
import { PageProps } from "@/lib/models";
import contentfulFetcher from "@/lib/contentful/contentful-fetcher";
import { Writing } from "@/lib/contentful/model";
import { PostContent } from "@/components/post-content";
import { unstable_setRequestLocale } from "next-intl/server";

export async function generateStaticParams({ params: { locale } }: PageProps) {
  const writings = await contentfulFetcher<Writing>("writing", { locale });
  return writings.map((a) => ({ slug: a.slug }));
}

async function fetchData(params: PageProps["params"]) {
  const writings = await contentfulFetcher<Writing>("writing", {
    slug: params.slug,
    locale: params.locale,
  });

  if (!writings?.length) notFound();
  return { writing: writings[0] };
}

export default async function WritingPage({ params }: PageProps) {
  unstable_setRequestLocale(params.locale);
  const { writing } = await fetchData(params);

  return (
    <div className="container mx-auto">
      <PostHeader {...writing} locale={params.locale} />
      <PostContent document={writing.body} />
    </div>
  );
}
