import type { CollectionEntry } from "astro:content";

export function categorizePosts(posts: CollectionEntry<"blog">[]) {
  const categorizedPosts: Record<string, CollectionEntry<"blog">[]> = {};

  for (const post of posts) {
    const category = post.id.split("/")[0];

    if (!categorizedPosts[category]) {
      categorizedPosts[category] = [];
    }

    categorizedPosts[category].push(post);
  }

  return categorizedPosts;
}
