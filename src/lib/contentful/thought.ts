import { TypeThoughtSkeleton } from "./types";
import { Entry } from "contentful";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import contentfulClient from "./client";

type ThoughtEntry = Entry<TypeThoughtSkeleton, undefined, string>;

export type Thought = {
  title: string;
  slug: string;
  createdAt: Date;
  body: RichTextDocument | null;
  tags: string[];
};

export function parseContentfulThought(thoughtEntry?: ThoughtEntry): Thought | null {
  if (!thoughtEntry) {
    return null;
  }

  return {
    title: thoughtEntry.fields.title || "",
    slug: thoughtEntry.fields.slug,
    body: thoughtEntry.fields.content || null,
    createdAt: new Date(thoughtEntry.sys.createdAt),
    tags: thoughtEntry.metadata?.tags?.map((tag) => tag.sys.id) ?? [],
  };
}

export async function fetchThoughts({ preview }: { preview: boolean }): Promise<Thought[]> {
  const contentful = contentfulClient({ preview });

  const thoughtsResult = await contentful.getEntries<TypeThoughtSkeleton>({
    content_type: "thought",
    include: 2,
    order: ["fields.title"],
  });

  return thoughtsResult.items.map(
    (thoughtEntry) => parseContentfulThought(thoughtEntry) as Thought
  );
}

export async function fetchThought({
  slug,
  preview,
}: {
  slug: string;
  preview: boolean;
}): Promise<Thought | null> {
  const contentful = contentfulClient({ preview });

  const thoughtsResult = await contentful.getEntries<TypeThoughtSkeleton>({
    content_type: "thought",
    "fields.slug": slug,
    include: 2,
  });

  return parseContentfulThought(thoughtsResult.items[0]);
}
