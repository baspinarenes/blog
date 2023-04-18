import type { CollectionEntry } from "astro:content";

export function categorize(posts: CollectionEntry<any>[]) {
  const categorizedPosts: Record<string, CollectionEntry<any>> = {};

  for (const post of posts) {
    const category = post.id.split("/")[0];

    if (!categorizedPosts[category]) {
      categorizedPosts[category] = [];
    }

    categorizedPosts[category].push(post);
  }

  return categorizedPosts;
}
