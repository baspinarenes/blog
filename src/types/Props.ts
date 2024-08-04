import type { ReactNode } from "react";
import { CategoryType, Post } from "./contentful";

export type LayoutProps = Readonly<{
  children: ReactNode;
  params: { language: string };
}>;

export type PageProps = Readonly<{
  params: { language: string };
}>;

export type CategoryPageProps = Readonly<{
  params: { language: string; category: CategoryType };
}>;

export type SlugPageProps = Readonly<{
  params: { language: string; category: CategoryType; slug: string };
}>;

export type PostCardProps = Readonly<
  Post & {
    language: string;
    hideIcon?: boolean;
  }
>;
