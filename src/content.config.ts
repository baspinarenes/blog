import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

const entrySchema = ({ image }: { image: any }) =>
  z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    topic: z.string(),
    tags: z.array(z.string()),
    cover: image().optional(),
    draft: z.boolean().optional(),
  });

const journey = defineCollection({
  loader: file("src/content/journey/data.json"),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      year: z.number(),
      items: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          image: image().optional(),
        })
      ),
    }),
});

const writings = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.mdx",
    base: "./src/content/blog/writings",
  }),
  schema: entrySchema,
});

const thoughts = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.mdx",
    base: "./src/content/blog/thoughts",
  }),
  schema: entrySchema,
});

const cultures = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.mdx",
    base: "./src/content/blog/cultures",
  }),
  schema: entrySchema,
});

const poems = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.mdx",
    base: "./src/content/blog/poems",
  }),
  schema: entrySchema,
});

export const collections = {
  journey,
  writings,
  thoughts,
  cultures,
  poems,
};
