import { Document } from "@contentful/rich-text-types";

export interface ContentImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export type Snippet = {
  title: string;
  slug: string;
  createdAt: Date;
  content: Document | null;
  context: any;
  tags: string[];
};

export type Thought = {
  title: string;
  slug: string;
  createdAt: Date;
  content: Document | null;
  tags: string[];
};

export type Article = {
  title: string;
  slug: string;
  createdAt: Date;
  content: Document | null;
  tags: string[];
};

export type BookReview = {
  title: string;
  slug: string;
  createdAt: Date;
  content: Document | null;
  tags: string[];
};

export type Writing = {
  title: string;
  slug: string;
  createdAt: Date;
  content: Document | null;
  tags: string[];
};

export type JourneyItem = {
  title: string;
  content: Document;
  date: Date;
};

export type StaticPage = {
  title: string;
  content: Document;
};
