export enum Category {
  Article = "article",
  Writing = "writing",
  Snippet = "snippet",
  Thought = "thought",
}

export type CategoryType = `${Category}`;

export type ContentfulPost = {
  title: string;
  slug: string;
  description: string;
  category: CategoryType;
  content: string;
  sys: {
    firstPublishedAt: string;
    publishedAt: string | null;
  };
  heroImage?: {
    title: string;
    description: string;
    url: string;
    width: number;
    height: number;
  };
  postSeries?: string;
  tag?: string;
  overridedCreatedAt?: string;
};

export type Post = {
  title: string;
  slug: string;
  category: CategoryType;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  readingTime: string;
  views: number;
  isDraft: boolean;
  heroImage?: {
    title: string;
    description: string;
    url: string;
    width: number;
    height: number;
  };
  postSeries?: string;
  tag?: string;
};
