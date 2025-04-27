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

const tools = defineCollection({
  loader: file("src/content/tools.json"),
  schema: () =>
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.object({
        en: z.string(),
        tr: z.string(),
      }),
      link: z.string(),
    }),
});

const openSourceTechStack = defineCollection({
  loader: file("src/content/opensource-tech-stack.json"),
  schema: () =>
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.object({
        en: z.string(),
        tr: z.string(),
      }),
      link: z.string(),
    }),
});

const journey = defineCollection({
  loader: file("src/content/journey.json"),
  schema: () =>
    z.object({
      id: z.string(),
      year: z.number(),
      items: z.array(
        z.object({
          title: z.object({
            en: z.string(),
            tr: z.string(),
          }),
          description: z.object({
            en: z.string(),
            tr: z.string(),
          }),
          image: z.string().optional(),
        })
      ),
    }),
});

const articles = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.mdx",
    base: "./src/content/blog/articles",
  }),
  schema: entrySchema,
});

const snippets = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.mdx",
    base: "./src/content/blog/snippets",
  }),
  schema: entrySchema
});

const writings = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.mdx",
    base: "./src/content/blog/writings",
  }),
  schema: entrySchema
});

const thoughts = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.mdx",
    base: "./src/content/blog/thoughts",
  }),
  schema: entrySchema
});

export const collections = {
  tools,
  openSourceTechStack,
  journey,
  articles,
  snippets,
  writings,
  thoughts,
};
