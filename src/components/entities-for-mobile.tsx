import { useTranslation } from "@/app/i18n";
import contentfulFetcher from "@/lib/contentful/contentful-fetcher";
import { ContentfulItemType, Language } from "@/lib/models";
import Link from "next/link";

async function fetchData(type: ContentfulItemType, lng: Language) {
  return contentfulFetcher<any>(type, { locale: lng, all: true, filterByContent: true });
}

export const EntitiesForMobile: React.FC<EntitiesForMobileProps> = async (props) => {
  const { type, lng } = props;
  const { t } = await useTranslation(lng, "common");
  const entities = await fetchData(type, lng);

  return (
    <div className="block lg:hidden">
      <h1 className="mb-8">{t(`navigation.${type}`)}</h1>
      <ul className="list-none p-0 flex flex-col gap-4">
        {entities.map((entity) => (
          <li className="flex flex-col gap-1">
            <Link
              href={`${type}/${entity.slug}`}
              className="text-blue-600 text-md link break-words inline-flex text-pretty leading-6"
            >
              {entity.title}
            </Link>
            <div className="flex gap-1 text-xs">
              <time>
                {entity.createdAt.getDate().toString().padStart(2, "0")}{" "}
                {` ${entity.createdAt.toLocaleString(lng, {
                  month: "short",
                })} `}
                {entity.createdAt.getFullYear()}
              </time>
              {/* <span>-</span> */}
              {/* <span>??? View</span> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export type EntitiesForMobileProps = {
  type: ContentfulItemType;
  lng: Language;
};
