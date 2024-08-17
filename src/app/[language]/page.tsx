import React from "react";
import { draftMode } from "next/headers";
import { PageProps } from "@/models";
import { getAllPosts } from "@/libraries/api";
import { useTranslation } from "@/i18n";
import { Paragraph, Title } from "@/components/atoms";
import { PostCardList } from "@/components/organisms/PostCardList";
import { author } from "@/configs";
import Image from "next/image";
import screamLogo from "@/../public/scream.svg";

export default async function Home({ params: { language } }: PageProps) {
  const { isEnabled } = draftMode();
  const allPosts = await getAllPosts({
    language,
    preview: isEnabled || process?.env?.NODE_ENV === "development",
  });
  const { t } = await useTranslation(language, "home");

  return (
    <main className="w-full pt-4 sm:py-12 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <Title level={1} className="hidden sm:block">
          {t("title")}
        </Title>
        <Image
          src={screamLogo}
          alt="scream"
          width={120}
          height={120}
          priority={true}
          className="mx-auto mb-4 animate-scream mt-4 sm:hidden"
        />
        <Paragraph align="justify">{t("description", { ...author })}</Paragraph>
        <Title level={2} className="mt-12 mb-8">
          {t("subTitle")}
        </Title>
        <PostCardList language={language} entries={allPosts} />
      </div>
    </main>
  );
}
