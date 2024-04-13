import { useTranslation } from "@/app/i18n";
import { MetaImage } from "@/components/meta-image";
import { TITLE } from "@/lib/constants";
import { PageProps } from "@/lib/models";
import { getJetBrainsMonoBold, getJetBrainsMonoRegular } from "@/lib/utils";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = TITLE;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params: { lng } }: PageProps) {
  const { t } = await useTranslation(lng, "tools");

  return new ImageResponse(<MetaImage title="Tools" description={t("description")} />, {
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
