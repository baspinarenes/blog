import { Journey } from "@/components/journey";
import contentfulFetcher from "@/lib/contentful/contentful-fetcher";
import { JourneyItem } from "@/lib/contentful/model";
import { PageProps } from "@/lib/models";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export default async function JourneyPage({ params }: PageProps) {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations("JourneyPage");
  const { journeyItems } = await fetchData(params);

  return (
    <div className="container mx-auto">
      <h1 className="mb-8">{t("title")}</h1>
      <Journey journey={journeyItems} />
    </div>
  );
}

async function fetchData(params: PageProps["params"]) {
  const journeyItems = await contentfulFetcher<JourneyItem>("journeyItem", {
    all: true,
    locale: params.locale,
  });

  const mappedJourneyItems: { year: number; items: JourneyItem[] }[] = [];

  journeyItems.map((ji) => {
    const year = new Date(ji.date).getFullYear();
    const yearEntry = mappedJourneyItems.find((item) => item.year === year)!;
    if (!yearEntry) mappedJourneyItems.push({ year, items: [ji] });
    else {
      yearEntry.items.push(ji);
      yearEntry.items = yearEntry.items.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
  });

  return { journeyItems: mappedJourneyItems.sort((a, b) => b.year - a.year) };
}
