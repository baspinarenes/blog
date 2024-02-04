import { capitalize } from "@/lib/common";
import { ContentItem } from "./content-item";
import { NAVIGATIONS } from "@/lib/utils/constants";

export const ContentMenu: React.FC<ContentMenuProps> = (props) => {
  const { type } = props;
  const navigation = NAVIGATIONS.find((nav) => nav.href === `/${type}`);

  return (
    <aside className="flex flex-col lg:border-r lg:w-96 bg-zinc-50 flex-shrink-0 overflow-y-auto">
      <div className="sticky top-0 z-10 border-b bg-zinc-50 px-5 py-4">
        <h2 className="text-sm font-semibold tracking-tight">{navigation?.label}</h2>
      </div>
      <div className="flex flex-col gap-1 p-3">
        {Array.from(Array(10).keys()).map((_, index) => (
          <ContentItem
            key={index}
            title="Dummy title"
            description="January 04, 2024"
            type={type}
            index={index}
          />
        ))}
      </div>
    </aside>
  );
};

export type ContentMenuProps = {
  type: "snippet" | "thought" | "book-review" | "article";
};
