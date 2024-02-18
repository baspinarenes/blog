import { useTranslation } from "@/app/i18n";
import { Journey } from "@/components/journey";
import contentfulFetcher from "@/lib/contentful/contentful-fetcher";
import { JourneyItem } from "@/lib/contentful/model";
import { Language, PageProps } from "@/lib/models";

export default async function JourneyPage({ params: { lng } }: PageProps) {
  const { journeyItems } = await fetchData(lng);
  const { t } = await useTranslation(lng, "journey");

  return (
    <div className="container mx-auto">
      <h1>{t("title")}</h1>
      <Journey journey={journeyItems} />
    </div>
  );
}

async function fetchData(lng: Language) {
  const journeyItems = await contentfulFetcher<JourneyItem>("journeyItem", {
    all: true,
    locale: lng,
  });

  const mappedJourneyItems: { year: number; items: JourneyItem[] }[] = [];

  journeyItems.map((ji) => {
    const year = new Date(ji.date).getFullYear();
    const yearEntry = mappedJourneyItems.find((item) => item.year === year)!;
    if (!yearEntry) mappedJourneyItems.push({ year, items: [ji] });
    else {
      yearEntry.items.push(ji);
      yearEntry.items = yearEntry.items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  });

  return { journeyItems: mappedJourneyItems.sort((a, b) => b.year - a.year) };
}
