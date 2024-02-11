import { locales } from "@/config";

export type ContentfulImageProps = {
  src: string;
  width?: number;
  height?: number;
  quality?: number;
  [key: string]: any; // For other props that might be passed
};

export enum PageType {
  HOME,
  WRITING,
  POST,
  NOT_FOUND,
  UNDEFINED,
  SNIPPET,
}

export type ContentfulItemType =
  | "journeyItem"
  | "snippet"
  | "thought"
  | "bookReview"
  | "article"
  | "writing"
  | "staticPage";

export type LayoutProps = {
  children: React.ReactNode;
  params: { locale: Language; slug: string };
};

export type PageProps = {
  params: { locale: Language; slug: string };
};

export enum ContentfulEntity {
  ARTICLE = "article",
  WRITING = "writing",
  BOOK_REVIEW = "bookReview",
  THOUGHT = "thought",
  SNIPPET = "snippet",
}

export type EntitySummary = {
  title: string;
  slug: string;
  date: Date;
};

export type EntityByYear = Record<number, Record<string, EntitySummary[]>>;

export type Language = (typeof locales)[number];
