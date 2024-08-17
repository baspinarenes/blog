import { Title } from "@/components/atoms";
import { MarkdownContent } from "@/components/molecules";
import { useTranslation } from "@/i18n";
import { getStaticPage } from "@/libraries/api";
import { CategoryPageProps } from "@/models";
import { draftMode } from "next/headers";

export default async function Page({
  params: { language },
}: CategoryPageProps) {
  const { isEnabled } = draftMode();
  const { t } = await useTranslation(language, "tools");
  const toolsContent = await getStaticPage({
    slug: "tools",
    language,
    preview: isEnabled || process?.env?.NODE_ENV === "development",
  });

  return (
    <main className="w-full my-6 sm:mb-10 sm:mt-12 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <Title level={1} className="hidden sm:block">
          {t("title")}
        </Title>
        <MarkdownContent>{toolsContent}</MarkdownContent>
      </div>
    </main>
  );
}
