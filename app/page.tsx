import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/lib/contentful/api";
import { capitalize, cn, generateYearArray } from "@/lib/utils/common";
import { AUTHOR } from "@/lib/utils/constants";
import { draftMode } from "next/headers";
import Link from "next/link";

async function fetchData() {
  const [writings, articles, bookReviews, snippets, thoughts] = await Promise.all([
    api["writing"].fetchAll({ preview: draftMode().isEnabled }),
    api["article"].fetchAll({ preview: draftMode().isEnabled }),
    api["book-review"].fetchAll({ preview: draftMode().isEnabled }),
    api["snippet"].fetchAll({ preview: draftMode().isEnabled }),
    api["thought"].fetchAll({ preview: draftMode().isEnabled }),
  ]);

  const entityRecords: Record<string, any[]> = {
    writings,
    articles,
    "book-reviews": bookReviews,
    snippets,
    thoughts,
  };

  const data = generateYearArray().reduce(
    (
      acc: Record<number, Record<string, { title: string; slug: string; date: Date }[]>>,
      year: number
    ) => {
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

  return { data };
}

export default async function Page() {
  const { data } = await fetchData();

  return (
    <div className="container mx-auto">
      <h1 className="mb-8">Home</h1>
      <p>
        I'm {AUTHOR.name}, {AUTHOR.age} yrs, a software engineer at Trendyol, live in Türkiye. I
        enjoy researching and learning new things. I like to tell others about what I've learned and
        that's why I keep the blog. I feel like screaming when I read monotonous and same content
        articles and that's why I try to do different things.
      </p>

      <h2 className="mt-12 mb-8">My Things</h2>

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
    </div>
  );
}

// return (
//   <TableRow className="h-14 hover:bg-transparent">
//     <TableCell className="font-medium">{2023}</TableCell>
//     <TableCell></TableCell>
//     <TableCell></TableCell>
//     <TableCell></TableCell>
//     <TableCell className="text-right"></TableCell>
//   </TableRow>
// );

{
  /* <TableRow className="h-14 hover:bg-transparent">
            <TableCell className="font-medium">2023</TableCell>
            <TableCell>05/10</TableCell>
            <TableCell>Almanya'dan Hollanda'ya taşındım</TableCell>
            <TableCell>Article</TableCell>
            <TableCell className="text-right">50.256</TableCell>
          </TableRow>
          <TableRow className="h-14 hover:bg-transparent">
            <TableCell className="font-medium border-t border-t-white"></TableCell>
            <TableCell>05/10</TableCell>
            <TableCell>Almanya'dan Hollanda'ya taşındım</TableCell>
            <TableCell>Writing</TableCell>
            <TableCell className="text-right">50.256</TableCell>
          </TableRow>
          <TableRow className="h-14 hover:bg-transparent">
            <TableCell className="font-medium border-t border-t-white"></TableCell>
            <TableCell>05/10</TableCell>
            <TableCell>Almanya'dan Hollanda'ya taşındım</TableCell>
            <TableCell>Book Review</TableCell>
            <TableCell className="text-right">50.256</TableCell>
          </TableRow> */
}
