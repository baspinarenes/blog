import { JourneyItem } from "@/lib/contentful/model";
import { RichTextContent } from "./rich-text-content";
import { PlusIcon } from "lucide-react";

export const Journey: React.FC<JourneyProps> = (props) => {
  const { journey } = props;

  return (
    <div className="flex flex-col gap-6 lg:gap-12">
      {journey.map((j) => (
        <div key={j.year} className="flex flex-col lg:flex-row gap-4 lg:gap-16">
          <h2>{j.year}</h2>
          <div className="mb-0 mt-0.5 pl-2 lg:pl-0 gap-0">
            {j.items.map((ji) => (
              <div
                key={ji.title}
                className="relative flex text-sm lg:pb-8 last:pb-0 before:w-px before:last:hidden before:top-0 before:left-[0.732rem] before:h-full before:bg-slate-200 before:absolute"
              >
                <span className="flex justify-center items-center relative w-6 h-6 bg-black rounded-full flex-shrink-0 mr-4 lg:mr-8">
                  <PlusIcon color="white" size={16} />
                </span>
                <div className="leading-1">
                  <h3 className="leading-6 text-base">{ji.title}</h3>
                  <RichTextContent document={ji.content} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export type JourneyProps = {
  journey: {
    year: number;
    items: JourneyItem[];
  }[];
};
