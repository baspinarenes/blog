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

export type ContentfulItemTypes = "snippet" | "thought" | "book-review" | "article" | "writing";

export enum ContentfulEntity {
  ARTICLE = "article",
  WRITING = "writing",
  BOOK_REVIEW = "book-review",
  THOUGHT = "thought",
  SNIPPET = "snippet",
}

export type Language = "*" | "en" | "tr";
