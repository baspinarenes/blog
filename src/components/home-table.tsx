import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { capitalize, cn, generateYearArray } from "@/lib/utils";
import Link from "next/link";
import { EntityByYear, Language } from "@/lib/models";
import contentfulFetcher from "@/lib/contentful/contentful-fetcher";
import { Article, BookReview, Snippet, Thought, Writing } from "@/lib/contentful/model";
import { useTranslation } from "@/app/i18n";

export const HomeTable: React.FC<HomeTableProps> = async ({ lng }) => {
  const data = await fetchData(lng);
  const { t } = await useTranslation(lng, "home");

  return (
    <Table className="hidden lg:block font-medium text-gray-500 mb-12">
      <TableHeader>
        <TableRow className="hover:bg-transparent text-sm">
          <TableHead className="w-[60px]">{t("table.year")}</TableHead>
          <TableHead className="w-[80px]">{t("table.type")}</TableHead>
          <TableHead className="w-[80px]">{t("table.date")}</TableHead>
          <TableHead>{t("table.title")}</TableHead>
          <TableHead className="text-center w-20">{t("table.view")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.keys(data)
          .map(Number)
          .sort((a, b) => b - a)
          .map((year: number) =>
            Object.entries(data[Number(year)]).map(([type, items], i) =>
              items.map((item, j) => {
                const isYearAlreadyWrited = i + j !== 0;
                const isTypeAlreadyWrited = j !== 0;

                return (
                  <TableRow className="h-14 hover:bg-transparent">
                    <TableCell className={cn("font-medium", isYearAlreadyWrited && "border-t border-white")}>
                      {!isYearAlreadyWrited ? year : ""}
                    </TableCell>
                    <TableCell className={cn(isTypeAlreadyWrited && "border-t border-white")}>
                      {!isTypeAlreadyWrited ? capitalize(type) : ""}
                    </TableCell>
                    <TableCell>{` ${item.date.toLocaleString(lng, {
                      month: "short",
                    })} ${item.date.getDate().toString().padStart(2, "0")}`}</TableCell>
                    <TableCell>
                      <Link href={`${type}/${item.slug}`} className="text-blue-600 link break-words inline-flex">
                        {item.title}
                      </Link>
                    </TableCell>
                    <TableCell className="text-center">?</TableCell>
                  </TableRow>
                );
              })
            )
          )}
      </TableBody>
    </Table>
  );
};

export type HomeTableProps = {
  lng: Language;
};

async function fetchData(locale: Language): Promise<EntityByYear> {
  const [writings, articles, bookReviews, snippets, thoughts] = await Promise.all([
    contentfulFetcher<Writing>("writing", { all: true, filterByContent: true, orderWithDate: true, locale }),
    contentfulFetcher<Article>("article", { all: true, filterByContent: true, orderWithDate: true, locale }),
    contentfulFetcher<BookReview>("book-review", { all: true, filterByContent: true, orderWithDate: true, locale }),
    contentfulFetcher<Snippet>("snippet", { all: true, filterByContent: true, orderWithDate: true, locale }),
    contentfulFetcher<Thought>("thought", { all: true, filterByContent: true, orderWithDate: true, locale }),
  ]);

  const entityRecords: Record<string, any[]> = {
    writings,
    articles,
    "book-reviews": bookReviews,
    snippets,
    thoughts,
  };

  const data = generateYearArray().reduce(
    (acc: Record<number, Record<string, { title: string; slug: string; date: Date }[]>>, year: number) => {
      acc[year] = {};

      ["snippet", "thought", "book-review", "article", "writing"].map((type) => {
        const entityItems = entityRecords[`${type}s`]
          .filter((item) => item.createdAt.getFullYear() === year)
          .map((item) => ({
            title: item.title,
            slug: item.slug,
            date: item.createdAt,
          }));

        entityItems.length > 0 && (acc[year][type] = entityItems);
      });

      return acc;
    },
    {}
  );

  return data;
}
