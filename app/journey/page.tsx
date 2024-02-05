import { Journey } from "@/components/journey";
import { JourneyItem, fetchJourneyItems } from "@/lib/contentful/journey";
import { draftMode } from "next/headers";

async function fetchData() {
  const journeyItems = await fetchJourneyItems({ preview: draftMode().isEnabled });
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

export default async function JourneyPage() {
  const { journeyItems } = await fetchData();

  return (
    <div className="container mx-auto">
      <h1 className="mb-8">Journey</h1>
      <Journey journey={journeyItems} />
    </div>
  );
}
