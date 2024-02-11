import { ContentfulItemType, Language } from "@/lib/models";
import { ContentItem } from "./content-item";
import { NAVIGATIONS } from "@/lib/utils/constants";
import contentfulFetcher from "@/lib/contentful/contentful-fetcher";
import { getTranslations } from "next-intl/server";
import { formatDate } from "@/lib/utils/common";

async function fetchData(type: ContentfulItemType, locale: Language) {
  return contentfulFetcher<any>(type, { all: true, locale });
}

export const EntityMenu: React.FC<EntityMenuProps> = async ({ type, locale }) => {
  const navigation = NAVIGATIONS.find((nav) => nav.id === type);
  const t = await getTranslations("Navigations");
  const entities = await fetchData(type, locale);

  const generateDescription = (entity: any) => {
    return formatDate(entity.createdAt, locale);
  };

  return (
    <aside className="flex flex-col lg:border-r lg:w-80 bg-zinc-50 flex-shrink-0 overflow-y-auto">
      <div className="sticky top-0 z-10 border-b bg-zinc-50 px-5 py-4">
        <h2 className="text-sm font-semibold tracking-tight">{t(navigation?.id)}</h2>
      </div>
      <div className="flex flex-col gap-1 p-3">
        {entities.map((entity, index) => (
          <ContentItem
            key={index}
            title={entity.title}
            description={generateDescription(entity)}
            slug={entity.slug}
            tag={entity.tags ? entity.tags[0] : ""}
            type={type}
          />
        ))}
      </div>
    </aside>
  );
};

export type EntityMenuProps = {
  type: ContentfulItemType;
  locale: Language;
  list?: Array<{
    title: string;
    description: string;
    slug: string;
    tags?: string[];
  }>;
};
