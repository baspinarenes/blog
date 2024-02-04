import { TypeArticleSkeleton } from "./types";
import { Entry } from "contentful";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import contentfulClient from "./client";

type ArticleEntry = Entry<TypeArticleSkeleton, undefined, string>;

export type Article = {
  title: string;
  slug: string;
  createdAt: Date;
  body: RichTextDocument | null;
};

export function parseContentfulArticle(articleEntry?: ArticleEntry): Article | null {
  if (!articleEntry) {
    return null;
  }

  return {
    title: articleEntry.fields.title || "",
    slug: articleEntry.fields.slug,
    body: articleEntry.fields.content || null,
    createdAt: new Date(articleEntry.sys.createdAt),
  };
}

export async function fetchArticles({ preview }: { preview: boolean }): Promise<Article[]> {
  const contentful = contentfulClient({ preview });

  const articlesResult = await contentful.getEntries<TypeArticleSkeleton>({
    content_type: "article",
    include: 2,
    order: ["fields.title"],
  });

  return articlesResult.items.map(
    (articleEntry) => parseContentfulArticle(articleEntry) as Article
  );
}

export async function fetchArticle({
  slug,
  preview,
}: {
  slug: string;
  preview: boolean;
}): Promise<Article | null> {
  const contentful = contentfulClient({ preview });

  const articlesResult = await contentful.getEntries<TypeArticleSkeleton>({
    content_type: "article",
    "fields.slug": slug,
    include: 2,
  });

  return parseContentfulArticle(articlesResult.items[0]);
}
