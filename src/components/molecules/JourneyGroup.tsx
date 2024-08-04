import type { Journey as JourneyType } from "@/types/journey";
import { type FC } from "react";
import { Journey } from "../atoms/Journey";
import { Title } from "../atoms";

export const JourneyGroup: FC<JourneyGroupProps> = ({ year, journeys }) => {
  return (
    <div>
      <Title level={2} className="mt-0">
        {String(year)}
      </Title>
      <div className="flex flex-col">
        {journeys.map((journey) => (
          <Journey key={journey.title} {...journey} />
        ))}
      </div>
    </div>
  );
};

export type JourneyGroupProps = {
  year: number;
  journeys: JourneyType[];
};
