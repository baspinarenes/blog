import { Asset, AssetLink, Entry } from "contentful";
import {
  TypeArticleSkeleton,
  TypeBookReviewSkeleton,
  TypeJourneyItemSkeleton,
  TypeMovieReviewSkeleton,
  TypeSnippetSkeleton,
  TypeThoughtSkeleton,
  TypeWritingSkeleton,
} from "./types";
import {
  Article,
  BookReview,
  ContentImage,
  JourneyItem,
  MovieReview,
  Snippet,
  StaticPage,
  Thought,
  Writing,
} from "./model";
import { TypeStaticPageSkeleton } from "@/lib/contentful/types";

export function parseContentfulSnippet(entry: Entry<TypeSnippetSkeleton, undefined, string>): Snippet {
  return {
    title: entry.fields.title || "",
    slug: entry.fields.slug,
    context: entry.fields.context,
    createdAt: new Date(entry.fields.date ? entry.fields.date : entry.sys.createdAt),
    tags: entry.metadata?.tags?.map((tag) => tag.sys.id) ?? [],
  };
}

export function parseContentfulThought(entry: Entry<TypeThoughtSkeleton, undefined, string>): Thought {
  return {
    title: entry.fields.title || "",
    slug: entry.fields.slug,
    content: entry.fields.content || null,
    createdAt: new Date(entry.fields.date ? entry.fields.date : entry.sys.createdAt),
    tags: entry.metadata?.tags?.map((tag) => tag.sys.id) ?? [],
  };
}

export function parseContentfulArticle(entry: Entry<TypeArticleSkeleton, undefined, string>): Article {
  return {
    title: entry.fields.title || "",
    slug: entry.fields.slug,
    coverImage: entry.fields.coverImage,
    context: entry.fields.context,
    createdAt: new Date(entry.fields.date ? entry.fields.date : entry.sys.createdAt),
    tags: entry.metadata?.tags?.map((tag) => tag.sys.id) ?? [],
  };
}

export function parseContentfulBookReview(entry: Entry<TypeBookReviewSkeleton, undefined, string>): BookReview {
  return {
    title: entry.fields.title || "",
    slug: entry.fields.slug,
    content: entry.fields.content || null,
    createdAt: new Date(entry.fields.date ? entry.fields.date : entry.sys.createdAt),
    tags: entry.metadata?.tags?.map((tag) => tag.sys.id) ?? [],
  };
}

export function parseContentfulMovieReview(entry: Entry<TypeMovieReviewSkeleton, undefined, string>): MovieReview {
  return {
    title: entry.fields.title || "",
    slug: entry.fields.slug,
    coverImage: entry.fields.coverImage!,
    createdAt: new Date(entry.sys.createdAt),
    director: entry.fields.director || "",
    category: entry.fields.category || "",
    releasedAt: new Date(entry.fields.releasedAt),
    content: entry.fields.content,
    myRating: entry.fields.myRating as MovieReview["myRating"],
  };
}

export function parseContentfulWriting(entry: Entry<TypeWritingSkeleton, undefined, string>): Writing {
  return {
    title: entry.fields.title || "",
    slug: entry.fields.slug,
    content: entry.fields.content || null,
    createdAt: new Date(entry.fields.date ? entry.fields.date : entry.sys.createdAt),
    tags: entry.metadata?.tags?.map((tag) => tag.sys.id) ?? [],
  };
}

export function parseContentfulContentImage(asset: any | { sys: AssetLink }): ContentImage {
  return {
    src: asset.fields.file?.url || "",
    alt: asset.fields.description || "",
    width: asset.fields.file?.details.image?.width || 0,
    height: asset.fields.file?.details.image?.height || 0,
  };
}

export function parseContentfulJourneyItem(
  journeyItem: Entry<TypeJourneyItemSkeleton, undefined, string>
): JourneyItem {
  return {
    title: journeyItem.fields.title,
    content: journeyItem.fields.content,
    date: new Date(journeyItem.fields.date),
  };
}

export function parseContentfulStaticPage(staticPage: Entry<TypeStaticPageSkeleton, undefined, string>): StaticPage {
  return {
    title: staticPage.fields.title,
    content: staticPage.fields.content,
  };
}
