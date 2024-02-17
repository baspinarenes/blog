import { languages } from "@/app/i18n/settings";

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
  params: { lng: Language; slug: string };
};

export type PageProps = {
  params: { lng: Language; slug: string };
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

export type Language = (typeof languages)[number];
