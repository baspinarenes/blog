import { PostHeader } from "@/components/post-header";
import { notFound } from "next/navigation";
import { PageProps } from "@/lib/models";
import contentfulFetcher from "@/lib/contentful/contentful-fetcher";
import { Writing } from "@/lib/contentful/model";
import { PostContent } from "@/components/post-content";
import { PageHeader } from "@/components/page-header";

export async function generateStaticParams({ params: { lng } }: PageProps) {
  const writings = await contentfulFetcher<Writing>("writing", { locale: lng });
  return writings.map((a) => ({ slug: a.slug }));
}

async function fetchData(params: PageProps["params"]) {
  const writings = await contentfulFetcher<Writing>("writing", {
    slug: params.slug,
    locale: params.lng,
  });

  if (!writings?.length) notFound();
  return { writing: writings[0] };
}

export default async function WritingPage({ params: { slug, lng } }: PageProps) {
  const { writing } = await fetchData({ slug, lng });

  return (
    <>
      <PageHeader lng={lng} />
      <PostHeader {...writing} locale={lng} />
      <PostContent document={writing.content} lng={lng} />
    </>
  );
}
