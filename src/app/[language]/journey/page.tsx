import { Title } from "@/components/atoms";
import { Journeys } from "@/components/molecules/Journeys";
import { getJson } from "@/lib/api";
import { JourneyGroup } from "@/types/journey";
import type { PageProps } from "../../../types/props";
import { draftMode } from "next/headers";

export default async function Page({ params: { language } }: PageProps) {
  const { isEnabled } = draftMode();
  const journeys = await getJson<JourneyGroup[]>({
    key: "journeys",
    language,
    preview: isEnabled || process?.env?.NODE_ENV === "development",
  });

  const sortedJourneys = journeys.sort((a, b) => b.year - a.year);

  return (
    <div className="mt-6">
      <Title level={1} className="hidden">
        Journey
      </Title>
      <Journeys journeyGroups={sortedJourneys} />
    </div>
  );
}
