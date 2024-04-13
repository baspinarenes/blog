import { useTranslation } from "@/app/i18n";
import contentfulFetcher from "@/lib/contentful/contentful-fetcher";
import { ContentfulItemType, Language } from "@/lib/models";
import Link from "next/link";
import { NoContent } from "./no-content";

async function fetchData(type: ContentfulItemType, lng: Language) {
  return contentfulFetcher<any>(type, { locale: lng, all: true, filterByContent: true });
}

export const EntitiesForMobile: React.FC<EntitiesForMobileProps> = async (props) => {
  const { type, lng } = props;
  const { t } = await useTranslation(lng, "common");
  const entities = await fetchData(type, lng);

  if (!entities.length) return <NoContent title={t("no-content")} />;

  return (
    <div className="block lg:hidden -ml-6 -mt-6 -mr-6">
      <ul className="list-none p-0 flex flex-col text-sm gap-0 m-0">
        {entities.map((entity) => (
          <li className="flex flex-col border-b px-4 py-3">
            <Link
              href={`${type}/${entity.slug}`}
              className="link break-words inline-flex text-pretty font-medium leading-6"
            >
              {entity.title}
            </Link>
            <div className="flex gap-1 text-slate-500">
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
