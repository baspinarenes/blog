import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { capitalize, cn, generateYearArray } from "@/lib/utils/common";
import Link from "next/link";
import { EntityByYear, Language } from "@/lib/models";
import contentfulFetcher from "@/lib/contentful/contentful-fetcher";
import { Article, BookReview, Snippet, Thought, Writing } from "@/lib/contentful/model";
import { useLocale } from "next-intl";

export const HomeTable: React.FC<HomeTableProps> = async () => {
  const locale = useLocale();
  const data = await fetchData(locale as Language);

  return (
    <Table className="font-medium text-gray-500">
      <TableHeader>
        <TableRow className="hover:bg-transparent text-sm">
          <TableHead className="w-[100px]">Year</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-center">Views</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.keys(data).map((year: string) =>
          Object.entries(data[Number(year)]).map(([type, items], i) =>
            items.map((item, j) => {
              const isYearAlreadyWrited = i + j !== 0;
              const isTypeAlreadyWrited = j !== 0;

              return (
                <TableRow className="h-14 hover:bg-transparent">
                  <TableCell
                    className={cn("font-medium", isYearAlreadyWrited && "border-t border-white")}
                  >
                    {!isYearAlreadyWrited ? year : ""}
                  </TableCell>
                  <TableCell className={cn(isTypeAlreadyWrited && "border-t border-white")}>
                    {!isTypeAlreadyWrited ? capitalize(type) : ""}
                  </TableCell>
                  <TableCell>{`${item.date.getDate().toString().padStart(2, "0")}/${item.date
                    .getUTCMonth()
                    .toString()
                    .padStart(2, "0")}`}</TableCell>
                  <TableCell>
                    <Link
                      href={`${type}/${item.slug}`}
                      className="text-blue-600 link break-words inline-flex"
                    >
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

export type HomeTableProps = {};

async function fetchData(locale: Language): Promise<EntityByYear> {
  const [writings, articles, bookReviews, snippets, thoughts] = await Promise.all([
    contentfulFetcher<Writing>("writing", { all: true, locale }),
    contentfulFetcher<Article>("article", { all: true, locale }),
    contentfulFetcher<BookReview>("bookReview", { all: true, locale }),
    contentfulFetcher<Snippet>("snippet", { all: true, locale }),
    contentfulFetcher<Thought>("thought", { all: true, locale }),
  ]);

  const entityRecords: Record<string, any[]> = {
    writings,
    articles,
    bookReviews: bookReviews,
    snippets,
    thoughts,
  };

  const data = generateYearArray().reduce(
    (
      acc: Record<number, Record<string, { title: string; slug: string; date: Date }[]>>,
      year: number
    ) => {
      acc[year] = {};

      ["snippet", "thought", "bookReview", "article", "writing"].map((type) => {
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
