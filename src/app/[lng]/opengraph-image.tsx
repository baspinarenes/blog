import { MetaImage } from "@/components/meta-image";
import { DESCRIPTION, TITLE } from "@/lib/constants";
import { getJetBrainsMonoBold, getJetBrainsMonoRegular } from "@/lib/utils";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = TITLE;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(<MetaImage title={TITLE} description={DESCRIPTION} />, {
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
  });
}
