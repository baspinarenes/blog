import { type FC } from "react";
import { JourneyGroup } from "./JourneyGroup";
import type { JourneyGroup as JourneyGroupType } from "@/types/journey";

export const Journeys: FC<JourneysProps> = ({ journeyGroups }) => {
  return (
    <div className="flex flex-col gap-5">
      {journeyGroups.map((journeyGroup) => (
        <JourneyGroup
          key={journeyGroup.year}
          year={journeyGroup.year}
          journeys={journeyGroup.items}
        />
      ))}
    </div>
  );
};

export type JourneysProps = Readonly<{
  journeyGroups: JourneyGroupType[];
}>;
