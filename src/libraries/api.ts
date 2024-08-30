import { CategoryType, ContentfulPost, Post } from "@/models";
import { readingTime } from 'reading-time-estimator'

const POST_GRAPHQL_FIELDS = `
  title
  slug
  description
  content
  heroImage {
    title
    description
    url
    width
    height
  }
  tag
  postSeries
  category
  overridedCreatedAt
  sys {
    firstPublishedAt
    publishedAt
  }
`;

async function fetchGraphQL<T>(query: string, preview = false): Promise<T> {
  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ["contentful"] },
    }
  );

  const responseBody = await response.json();
  return responseBody;
}

function extractJson(fetchResponse: any): any {
  return fetchResponse?.data?.jsonCollection?.items?.[0]?.data;
}

function extractPost(fetchResponse: any): any {
  return fetchResponse?.data?.postCollection?.items?.[0];
}

function extractPosts(fetchResponse: any): any[] {
  return fetchResponse?.data?.postCollection?.items || [];
}

function extractStaticPage(fetchResponse: any): string {
  return fetchResponse?.data?.staticPageCollection?.items?.[0]?.content;
}

function mapPost(post: ContentfulPost): Post {
  return {
    title: post.title,
    slug: post.slug,
    description: post.description,
    category: post.category,
    createdAt: new Date(post.overridedCreatedAt || post.sys.firstPublishedAt),
    updatedAt: new Date(
      post.sys.publishedAt ||
        post.overridedCreatedAt ||
        post.sys.firstPublishedAt
    ),
    content: post.content,
    heroImage: post.heroImage,
    tag: post.tag,
    postSeries: post.postSeries,
    isDraft: post.sys.publishedAt === null,
    readingTime: `${readingTime(post.content || "", 180, "tr").minutes || 1} min`,
    views: 0,
  };
}

export async function getPostBySlug(params: {
  category: CategoryType;
  slug: string;
  language: string;
  preview?: boolean;
}): Promise<Post> {
  const { category, slug, language, preview = false } = params;
  const post = await fetchGraphQL<ContentfulPost>(
    `query {
      postCollection(
        where: { 
          category: "${category}"
          slug: "${slug}"
        },
        preview: ${preview}
        locale: "${language}"
        limit: 1
      ) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );

  return mapPost(extractPost(post));
}

export async function getPostsByCategory(params: {
  language: string;
  category: CategoryType;
  preview?: boolean;
}): Promise<Post[]> {
  const { category, language, preview = false } = params;

  const response = await fetchGraphQL<ContentfulPost[]>(
    `query {
      postCollection(
        where: { category: "${category}" }
        locale: "${language}"
        order: sys_firstPublishedAt_DESC
        preview: ${preview}
      ) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );

  const posts = extractPosts(response);

  if (!posts || posts.length === 0) {
    return [];
  }

  const filteredPosts = posts.filter((post) => post.title && post.content);
  const mappedPosts = filteredPosts.map(mapPost);

  return mappedPosts;
}

export async function getAllPosts(params: {
  language: string;
  preview?: boolean;
}): Promise<any[]> {
  const { language, preview = false } = params;

  const response = await fetchGraphQL<ContentfulPost[]>(
    `query {
      postCollection(
        order: sys_firstPublishedAt_DESC
        locale: "${language}"
        preview: ${preview ? "true" : "false"}
      ) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );

  const posts = extractPosts(response);
  const filteredPosts = posts.filter((post) => post.title && post.content);
  const mappedPosts = filteredPosts.map(mapPost);

  return mappedPosts;
}

export async function getJson<T>(params: {
  key: string;
  language: string;
  preview?: boolean;
}): Promise<T> {
  const { key, language, preview = false } = params;
  const response = await fetchGraphQL<ContentfulPost>(
    `query {
      jsonCollection (
        where: { key: "${key}" }
        locale: "${language}"
        preview: ${preview ? "true" : "false"}
        limit: 1
      ) {
        items {
          data
        }
      }
    }`,
    preview
  );

  return extractJson(response);
}

export async function getStaticPage(params: {
  slug: string;
  language: string;
  preview?: boolean;
}): Promise<string> {
  const { slug, language, preview = false } = params;
  const response = await fetchGraphQL<ContentfulPost>(
    `query {
      staticPageCollection(
        where: { slug: "${slug}" }
        locale: "${language}" 
        preview: ${preview ? "true" : "false"}
        limit: 1
      ) {
        items {
          content
        }
      }
    }`,
    preview
  );

  return extractStaticPage(response);
}
