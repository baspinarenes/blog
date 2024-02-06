import { ContentfulItemTypes } from "@/lib/models";
import { ContentItem } from "./content-item";
import { NAVIGATIONS } from "@/lib/utils/constants";

export const ContentMenu: React.FC<ContentMenuProps> = (props) => {
  const { type, list } = props;
  const navigation = NAVIGATIONS.find((nav) => nav.href === `/${type}`);

  return (
    <aside className="flex flex-col lg:border-r lg:w-80 bg-zinc-50 flex-shrink-0 overflow-y-auto">
      <div className="sticky top-0 z-10 border-b bg-zinc-50 px-5 py-4">
        <h2 className="text-sm font-semibold tracking-tight">{navigation?.label}</h2>
      </div>
      <div className="flex flex-col gap-1 p-3">
        {list?.map((data, index) => (
          <ContentItem
            key={index}
            title={data.title}
            description={data.description}
            slug={data.slug}
            tag={data.tags ? data.tags[0] : ""}
            type={type}
          />
        ))}
      </div>
    </aside>
  );
};

export type ContentMenuProps = {
  type: ContentfulItemTypes;
  list?: Array<{
    title: string;
    description: string;
    slug: string;
    tags?: string[];
  }>;
};
