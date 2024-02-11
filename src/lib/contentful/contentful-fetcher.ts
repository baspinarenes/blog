import { Entry } from "contentful";
import { ContentfulItemType, Language } from "../models";
import contentfulClient from "./client";
import {
  parseContentfulArticle,
  parseContentfulBookReview,
  parseContentfulJourneyItem,
  parseContentfulSnippet,
  parseContentfulStaticPage,
  parseContentfulThought,
  parseContentfulWriting,
} from "./parser";
import {
  TypeArticleSkeleton,
  TypeBookReviewSkeleton,
  TypeJourneyItemSkeleton,
  TypeSnippetSkeleton,
  TypeThoughtSkeleton,
  TypeWritingSkeleton,
} from "./types";
import { TypeStaticPageSkeleton } from "../../../lib/contentful/types";

type Options = {
  slug?: string;
  all?: boolean;
  locale: Language;
};

async function contentfulFetcher<T>(type: ContentfulItemType, options?: Options): Promise<T[]> {
  const contentful = contentfulClient({ preview: false });

  const result = await contentful.getEntries({
    content_type: type,
    include: 2,
    locale: options?.locale,
    order: ["fields.title"],
    ...(!options?.all && { "fields.slug": options?.slug }),
  });

  switch (type) {
    case "bookReview":
      return (result.items as Entry<TypeBookReviewSkeleton, undefined, string>[])
        .filter(Boolean)
        .map(parseContentfulBookReview) as T[];
    case "snippet":
      return (result.items as Entry<TypeSnippetSkeleton, undefined, string>[])
        .filter(Boolean)
        .map(parseContentfulSnippet) as T[];
    case "thought":
      return (result.items as Entry<TypeThoughtSkeleton, undefined, string>[])
        .filter(Boolean)
        .map(parseContentfulThought) as T[];
    case "writing":
      return (result.items as Entry<TypeWritingSkeleton, undefined, string>[])
        .filter(Boolean)
        .map(parseContentfulWriting) as T[];
    case "article":
      return (result.items as Entry<TypeArticleSkeleton, undefined, string>[])
        .filter(Boolean)
        .map(parseContentfulArticle) as T[];
    case "journeyItem":
      return (result.items as Entry<TypeJourneyItemSkeleton, undefined, string>[])
        .filter(Boolean)
        .map(parseContentfulJourneyItem) as T[];
    case "staticPage":
      return (result.items as Entry<TypeStaticPageSkeleton, undefined, string>[])
        .filter(Boolean)
        .map(parseContentfulStaticPage) as T[];
    default:
      return [];
  }
}

export default contentfulFetcher;
