import { PostHeader } from "@/components/post-header";
import { notFound } from "next/navigation";
import { PageProps } from "@/lib/models";
import contentfulFetcher from "@/lib/contentful/contentful-fetcher";
import { Writing } from "@/lib/contentful/model";
import { PostContent } from "@/components/post-content";

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

export default async function WritingPage({ params }: PageProps) {
  const { writing } = await fetchData(params);

  return (
    <div className="container mx-auto">
      <PostHeader {...writing} locale={params.lng} />
      <PostContent document={writing.content} lng={params.lng} />
    </div>
  );
}
