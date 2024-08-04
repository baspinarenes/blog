import type { Journey as JourneyType } from "@/models";
import { type FC } from "react";
import { Journey } from "@/components/atoms";

export const JourneyGroup: FC<JourneyGroupProps> = ({ year, journeys }) => {
  return (
    <div>
      <div className="border-b border-border text-black py-2">
        <h4 className="mt-0">{String(year)}</h4>
      </div>
      <ul className="hide-list-trace-line">
        {journeys.map((journey) => (
          <Journey key={journey.title} {...journey} />
        ))}
      </ul>
    </div>
  );
};

export type JourneyGroupProps = {
  year: number;
  journeys: JourneyType[];
};
