import { MetaImage } from "@/components/meta-image";
import { TITLE } from "@/lib/constants";
import { ContentfulGraphqlClient } from "@/lib/contentful/graphql-client";
import { ContentfulEntity, PageProps } from "@/lib/models";
import { getJetBrainsMonoBold, getJetBrainsMonoRegular } from "@/lib/utils";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = TITLE;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: PageProps) {
  const entity = await ContentfulGraphqlClient.getEntryBySlug(ContentfulEntity.ARTICLE, params.slug, params.lng);
  const logo = await ContentfulGraphqlClient.getAssetUrl(`logo-${entity.category.toLowerCase()}`);

  return new ImageResponse(
    <MetaImage tags={entity.tags} title={entity.title} description={entity.description} logo={logo} />,
    {
      ...size,
      fonts: [
        {
          name: "JetBrainsMono-Bold",
          data: await getJetBrainsMonoBold(),
          style: "normal",
          weight: 600,
        },
        {
          name: "JetBrainsMono-Regular",
          data: await getJetBrainsMonoRegular(),
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
