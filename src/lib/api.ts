import { CategoryType, ContentfulPost, Post } from "@/types/contentful";

const POST_GRAPHQL_FIELDS = `
  title
  slug
  description
  content
  coverImage {
    title
    description
    url
    width
    height
  }
  tags
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
    coverImage: post.coverImage,
    tags: post.tags,
    postSeries: post.postSeries,
    readingTime: 0,
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

  return extractPost(post);
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
  const mappedPosts = posts.map(mapPost);

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
  const mappedPosts = posts.map(mapPost);

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
