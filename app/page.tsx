import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchArticles } from "@/lib/contentful/article";
import { fetchBookReviews } from "@/lib/contentful/book-review";
import { fetchSnippets } from "@/lib/contentful/snippet";
import { fetchThoughts } from "@/lib/contentful/thought";
import { fetchWritings } from "@/lib/contentful/writing";
import { capitalize, cn, generateYearArray } from "@/lib/utils/common";
import { AUTHOR } from "@/lib/utils/constants";
import { draftMode } from "next/headers";
import Link from "next/link";

async function fetchData() {
  const [writings, articles, bookReviews, snippets, thoughts] = await Promise.all([
    fetchWritings({ preview: draftMode().isEnabled }),
    fetchArticles({ preview: draftMode().isEnabled }),
    fetchBookReviews({ preview: draftMode().isEnabled }),
    fetchSnippets({ preview: draftMode().isEnabled }),
    fetchThoughts({ preview: draftMode().isEnabled }),
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
        I'm {AUTHOR.name}, {AUTHOR.age} yrs, a software engineer at{" "}
        <span className="text-orange-500">Trendyol</span>, live in Türkiye.
      </p>
      {/* <p>
        I studied image processing in college, and that was my graduation project. But then, I
        totally changed my path. I jumped into web development, even though I didn't know much. I
        joined to a bootcamp, got a job, and now I've decided to continue my blog. It will include
        book reviews, thoughts, and developer stuff. Join my world!
      </p> */}

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
