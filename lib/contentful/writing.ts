import { TypeWritingSkeleton } from "./types";
import { Entry } from "contentful";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import contentfulClient from "./client";

type WritingEntry = Entry<TypeWritingSkeleton, undefined, string>;

export type Writing = {
  title: string;
  slug: string;
  createdAt: Date;
  body: RichTextDocument | null;
  tags: string[];
};

export function parseContentfulWriting(writingEntry?: WritingEntry): Writing | null {
  if (!writingEntry) {
    return null;
  }

  return {
    title: writingEntry.fields.title || "",
    slug: writingEntry.fields.slug,
    body: writingEntry.fields.content || null,
    createdAt: new Date(writingEntry.sys.createdAt),
    tags: writingEntry.metadata?.tags?.map((tag) => tag.sys.id) ?? [],
  };
}

export async function fetchWritings({ preview }: { preview: boolean }): Promise<Writing[]> {
  const contentful = contentfulClient({ preview });

  const writingsResult = await contentful.getEntries<TypeWritingSkeleton>({
    content_type: "writing",
    include: 2,
    order: ["fields.title"],
  });

  return writingsResult.items.map(
    (writingEntry) => parseContentfulWriting(writingEntry) as Writing
  );
}

export async function fetchWriting({
  slug,
  preview,
}: {
  slug: string;
  preview: boolean;
}): Promise<Writing | null> {
  const contentful = contentfulClient({ preview });

  const writingsResult = await contentful.getEntries<TypeWritingSkeleton>({
    content_type: "writing",
    "fields.slug": slug,
    include: 2,
  });

  return parseContentfulWriting(writingsResult.items[0]);
}
