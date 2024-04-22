import { Entry } from "contentful";
import { ContentfulItemType, Language } from "../models";
import contentfulClient from "./client";
import {
  parseContentfulArticle,
  parseContentfulBookReview,
  parseContentfulJourneyItem,
  parseContentfulMovieReview,
  parseContentfulSnippet,
  parseContentfulStaticPage,
  parseContentfulThought,
  parseContentfulWriting,
} from "./parser";
import {
  TypeArticleSkeleton,
  TypeBookReviewSkeleton,
  TypeJourneyItemSkeleton,
  TypeMovieReviewSkeleton,
  TypeSnippetSkeleton,
  TypeThoughtSkeleton,
  TypeWritingSkeleton,
} from "./types";
import { TypeStaticPageSkeleton } from "@/lib/contentful/types";

type Options = {
  locale: Language;
  slug?: string;
  all?: boolean;
  orderWithDate?: boolean;
  filterByContent?: boolean;
};

const filterEntity = (entity: any, options?: Options) => {
  return entity && entity.fields.title && (!options?.filterByContent || entity.fields.context || entity.fields.content);
};

async function contentfulFetcher<T>(type: ContentfulItemType, options?: Options): Promise<T[]> {
  const contentful = contentfulClient({ preview: process.env.NODE_ENV !== "production" });
  const order = [options?.orderWithDate ? "-fields.date" : undefined, "fields.title"].filter(Boolean);

  const result = await contentful.getEntries({
    content_type: type,
    include: 2,
    locale: options?.locale,
    order: order as any,
    ...(!options?.all && { "fields.slug": options?.slug }),
  });

  switch (type) {
    case "book-review":
      return (result.items as Entry<TypeBookReviewSkeleton, undefined, string>[])
        .filter((e) => filterEntity(e, options))
        .map(parseContentfulBookReview)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) as T[];
    case "movie-review":
      return (result.items as Entry<TypeMovieReviewSkeleton, undefined, string>[])
        .filter((e) => filterEntity(e, options))
        .map(parseContentfulMovieReview)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) as T[];
    case "snippet":
      return (result.items as Entry<TypeSnippetSkeleton, undefined, string>[])
        .filter((e) => filterEntity(e, options))
        .map(parseContentfulSnippet)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) as T[];
    case "thought":
      return (result.items as Entry<TypeThoughtSkeleton, undefined, string>[])
        .filter((e) => filterEntity(e, options))
        .map(parseContentfulThought)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) as T[];
    case "writing":
      return (result.items as Entry<TypeWritingSkeleton, undefined, string>[])
        .filter((e) => filterEntity(e, options))
        .map(parseContentfulWriting)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) as T[];
    case "article":
      return (result.items as Entry<TypeArticleSkeleton, undefined, string>[])
        .filter((e) => filterEntity(e, options))
        .map(parseContentfulArticle)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) as T[];
    case "journey-item":
      return (result.items as Entry<TypeJourneyItemSkeleton, undefined, string>[])
        .filter((e) => filterEntity(e, options))
        .map(parseContentfulJourneyItem) as T[];
    case "static-page":
      return (result.items as Entry<TypeStaticPageSkeleton, undefined, string>[])
        .filter((e) => filterEntity(e, options))
        .map(parseContentfulStaticPage) as T[];
    default:
      return [];
  }
}

export default contentfulFetcher;
