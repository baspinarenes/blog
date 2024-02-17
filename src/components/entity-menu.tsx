import { ContentfulItemType, Language } from "@/lib/models";
import { ContentItem } from "./content-item";
import { NAVIGATIONS } from "@/lib/constants";
import contentfulFetcher from "@/lib/contentful/contentful-fetcher";

import { formatDate } from "@/lib/utils/common";
import { useTranslation } from "@/app/i18n";

async function fetchData(type: ContentfulItemType, lng: Language) {
  return contentfulFetcher<any>(type, { locale: lng, all: true, filterByBody: true });
}

export const EntityMenu: React.FC<EntityMenuProps> = async ({ type, lng }) => {
  const navigation = NAVIGATIONS.find((nav) => nav.id === type);
  const entities = await fetchData(type, lng);
  const { t } = await useTranslation(lng, "common");

  const generateDescription = (entity: any) => {
    return formatDate(entity.createdAt, lng);
  };

  return (
    <aside className="flex flex-col lg:border-r lg:w-80 bg-zinc-50 flex-shrink-0 overflow-y-auto">
      <div className="sticky top-0 z-10 border-b bg-zinc-50 px-5 py-4">
        <h2 className="text-sm font-semibold tracking-tight">{t(`navigation.${navigation?.id}` as any)}</h2>
      </div>
      <div className="flex flex-col gap-1 p-3">
        {entities
          .filter((e) => e.title)
          .map((entity, index) => (
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
  lng: Language;
  list?: Array<{
    title: string;
    description: string;
    slug: string;
    tags?: string[];
  }>;
};
