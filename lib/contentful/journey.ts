import { TypeJourneyItemSkeleton } from "./types";
import { Entry } from "contentful";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import contentfulClient from "./client";

type JourneyItemEntry = Entry<TypeJourneyItemSkeleton, undefined, string>;

export type JourneyItem = {
  title: string;
  content: RichTextDocument;
  date: Date;
};

export function parseContentfulJourneyItem(snippetEntry?: JourneyItemEntry): JourneyItem | null {
  if (!snippetEntry) {
    return null;
  }

  return {
    title: snippetEntry.fields.title,
    content: snippetEntry.fields.content,
    date: new Date(snippetEntry.fields.date),
  };
}

export async function fetchJourneyItems({ preview }: { preview: boolean }): Promise<JourneyItem[]> {
  const contentful = contentfulClient({ preview });

  const snippetsResult = await contentful.getEntries<TypeJourneyItemSkeleton>({
    content_type: "journeyItem",
    include: 2,
    order: ["fields.title"],
  });

  return snippetsResult.items.map(
    (snippetEntry) => parseContentfulJourneyItem(snippetEntry) as JourneyItem
  );
}
