import { Title } from "@/components/atoms";
import { Journeys } from "@/components/molecules";
import { useTranslation } from "@/i18n";
import { getJson } from "@/libraries/api";
import { JourneyGroup, PageProps } from "@/models";
import { draftMode } from "next/headers";

export default async function Page({ params: { language } }: PageProps) {
  const { isEnabled } = draftMode();
  const { t } = await useTranslation(language, "journey");
  const journeys = await getJson<JourneyGroup[]>({
    key: "journeys",
    language,
    preview: isEnabled || process?.env?.NODE_ENV === "development",
  });

  const sortedJourneys = journeys.sort((a, b) => b.year - a.year);

  return (
    <main className="w-full mt-6 sm:mt-12 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <Title level={1} className="hidden sm:block">
          {t("title")}
        </Title>
        <Journeys journeyGroups={sortedJourneys} />
      </div>
    </main>
  );
}
