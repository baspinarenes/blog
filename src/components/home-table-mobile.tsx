import { generateYearArray } from "@/lib/utils";
import Link from "next/link";
import { EntityByYear, Language } from "@/lib/models";
import contentfulFetcher from "@/lib/contentful/contentful-fetcher";
import { Article, BookReview, Snippet, Thought, Writing } from "@/lib/contentful/model";
import { useTranslation } from "@/app/i18n";

export const HomeTableMobile: React.FC<HomeTableMobileProps> = async ({ lng }) => {
  const data = await fetchData(lng);
  const { t } = await useTranslation(lng, "common");

  return (
    <div className="block lg:hidden">
      {Object.keys(data)
        .filter(
          (category: string) => !Object.keys(data[category]).every((year: string) => !data[category][year].length)
        )
        .map((category) => (
          <div>
            <h2 className="text-xl mb-4 text-balance capitalize">{t(`navigation.${category}`)}</h2>
            <div>
              {Object.keys(data[category])
                .filter((year: string) => data[category][year].length)
                .map((year: string) => (
                  <ul className="list-none p-0 flex flex-col gap-4">
                    {data[category][year].map((item) => (
                      <li className="flex flex-col gap-1">
                        <Link
                          href={`${category}/${item.slug}`}
                          className="text-blue-600 text-base link break-words inline-flex text-pretty leading-6"
                        >
                          {item.title}
                        </Link>
                        <div className="flex gap-1 text-xs">
                          <time>
                            {item.date.getDate().toString().padStart(2, "0")}{" "}
                            {` ${item.date.toLocaleString(lng, {
                              month: "short",
                            })} `}
                            {item.date.getFullYear()}
                          </time>
                          {/* <span>-</span> */}
                          {/* <span>??? View</span> */}
                        </div>
                      </li>
                    ))}
                  </ul>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export type HomeTableMobileProps = {
  lng: Language;
};

async function fetchData(locale: Language): Promise<EntityByYear> {
  const [writings, articles, bookReviews, snippets, thoughts] = await Promise.all([
    contentfulFetcher<Writing>("writing", { all: true, filterByContent: true, orderWithDate: true, locale }),
    contentfulFetcher<Article>("article", { all: true, filterByContent: true, orderWithDate: true, locale }),
    contentfulFetcher<BookReview>("bookReview", { all: true, filterByContent: true, orderWithDate: true, locale }),
    contentfulFetcher<Snippet>("snippet", { all: true, filterByContent: true, orderWithDate: true, locale }),
    contentfulFetcher<Thought>("thought", { all: true, filterByContent: true, orderWithDate: true, locale }),
  ]);

  const entityRecords: Record<string, any[]> = {
    writings,
    articles,
    bookReviews,
    snippets,
    thoughts,
  };

  const data = ["article", "thought", "writing", "snippet"].reduce((categoryObject, key) => {
    categoryObject[key] = generateYearArray().reduce(
      (acc: Record<number, { title: string; slug: string; date: Date }[]>, year: number) => {
        acc[year] = entityRecords[`${key}s`]
          .filter((item) => item.createdAt.getFullYear() === year)
          .map((item) => ({
            title: item.title,
            slug: item.slug,
            date: item.createdAt,
          }));

        return acc;
      },
      {}
    );

    return categoryObject;
  }, {} as EntityByYear);

  return data;
}
