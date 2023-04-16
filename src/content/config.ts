import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  schema: z.object({
    draft: z.boolean(),
    tags: z.array(z.string()).optional(),
    otherParts: z
      .array(
        z.object({
          text: z.string(),
          slug: z.string().optional(),
        })
      )
      .optional(),
    title: z.string(),
    description: z.string(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    heroImage: z.string().optional(),
    minutesRead: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
