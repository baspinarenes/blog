import { Asset, AssetLink, Entry } from "contentful";
import {
  TypeArticleSkeleton,
  TypeBookReviewSkeleton,
  TypeJourneyItemSkeleton,
  TypeSnippetSkeleton,
  TypeThoughtSkeleton,
  TypeWritingSkeleton,
} from "./types";
import { Article, BookReview, ContentImage, JourneyItem, Snippet, StaticPage, Thought, Writing } from "./model";
import { TypeStaticPageSkeleton } from "@/lib/contentful/types";

export function parseContentfulSnippet(snippetEntry: Entry<TypeSnippetSkeleton, undefined, string>): Snippet {
  return {
    title: snippetEntry.fields.title || "",
    slug: snippetEntry.fields.slug,
    content: snippetEntry.fields.content || null,
    context: snippetEntry.fields.context || null,
    createdAt: new Date(snippetEntry.sys.createdAt),
    tags: snippetEntry.metadata?.tags?.map((tag) => tag.sys.id) ?? [],
  };
}

export function parseContentfulThought(entry: Entry<TypeThoughtSkeleton, undefined, string>): Thought {
  return {
    title: entry.fields.title || "",
    slug: entry.fields.slug,
    content: entry.fields.content || null,
    createdAt: new Date(entry.sys.createdAt),
    tags: entry.metadata?.tags?.map((tag) => tag.sys.id) ?? [],
  };
}

export function parseContentfulArticle(entry: Entry<TypeArticleSkeleton, undefined, string>): Article {
  return {
    title: entry.fields.title || "",
    slug: entry.fields.slug,
    content: entry.fields.content || null,
    createdAt: new Date(entry.sys.createdAt),
    tags: entry.metadata?.tags?.map((tag) => tag.sys.id) ?? [],
  };
}

export function parseContentfulBookReview(entry: Entry<TypeBookReviewSkeleton, undefined, string>): BookReview {
  return {
    title: entry.fields.title || "",
    slug: entry.fields.slug,
    content: entry.fields.content || null,
    createdAt: new Date(entry.sys.createdAt),
    tags: entry.metadata?.tags?.map((tag) => tag.sys.id) ?? [],
  };
}

export function parseContentfulWriting(entry: Entry<TypeWritingSkeleton, undefined, string>): Writing {
  return {
    title: entry.fields.title || "",
    slug: entry.fields.slug,
    content: entry.fields.content || null,
    createdAt: new Date(entry.sys.createdAt),
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
