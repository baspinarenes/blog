import { TypeSnippetSkeleton } from "./types";
import { Entry } from "contentful";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import contentfulClient from "./client";

type SnippetEntry = Entry<TypeSnippetSkeleton, undefined, string>;

export type Snippet = {
  title: string;
  slug: string;
  createdAt: Date;
  body: RichTextDocument | null;
  tags: string[];
};

export function parseContentfulSnippet(snippetEntry?: SnippetEntry): Snippet | null {
  if (!snippetEntry) {
    return null;
  }

  return {
    title: snippetEntry.fields.title || "",
    slug: snippetEntry.fields.slug,
    body: snippetEntry.fields.content || null,
    createdAt: new Date(snippetEntry.sys.createdAt),
    tags: snippetEntry.metadata?.tags?.map((tag) => tag.sys.id) ?? [],
  };
}

export async function fetchSnippets({ preview }: { preview: boolean }): Promise<Snippet[]> {
  const contentful = contentfulClient({ preview });

  const snippetsResult = await contentful.getEntries<TypeSnippetSkeleton>({
    content_type: "snippet",
    include: 2,
    order: ["fields.title"],
  });

  return snippetsResult.items.map(
    (snippetEntry) => parseContentfulSnippet(snippetEntry) as Snippet
  );
}

export async function fetchSnippet({
  slug,
  preview,
}: {
  slug: string;
  preview: boolean;
}): Promise<Snippet | null> {
  const contentful = contentfulClient({ preview });

  const snippetsResult = await contentful.getEntries<TypeSnippetSkeleton>({
    content_type: "snippet",
    "fields.slug": slug,
    include: 2,
  });

  return parseContentfulSnippet(snippetsResult.items[0]);
}
