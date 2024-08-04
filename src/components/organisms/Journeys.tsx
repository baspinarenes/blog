import { type FC } from "react";
import type { JourneyGroup as JourneyGroupType } from "@/models";
import { JourneyGroup } from "../molecules/JourneyGroup";

export const Journeys: FC<JourneysProps> = ({ journeyGroups }) => {
  return (
    <div className="flex flex-col sm:gap-4">
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
