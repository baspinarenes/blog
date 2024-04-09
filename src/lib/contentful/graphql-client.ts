export async function getAssetUrl(asset: string) {
  const query = `
  query assetCollectionQuery {
    assetCollection(where:{
      title: "${asset}"
    }){
      items {
        title
        url
      }
    }
  }
`;

  const response = await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });
}

export class ContentfulGraphqlClient {
  static baseUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;
  static token = `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`;

  constructor() {}

  static async fetch(method: "get" | "post", graphqlQuery: string) {
    const response = await fetch(ContentfulGraphqlClient.baseUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query: graphqlQuery }),
    });

    return response.json();
  }

  static async getAssetUrl(asset: string) {
    const query = `
      query {
        assetCollection(where:{
          title: "${asset}"
        }){
          items {
            url
          }
        }
      }
    `;

    const assetResponse = await ContentfulGraphqlClient.fetch("post", query);
    return assetResponse.data.assetCollection.items[0].url;
  }

  static async getEntryBySlug(contentType: string, slug: string, lng: string) {
    const query = `
      query {
        ${contentType}Collection(locale: "${lng}", where:{
          slug: "${slug}"
        }){
          items {
            title
            description
            category
            contentfulMetadata {
              tags {
                name
              }
            }
          }
        }
      }
      `;

    const entryResponse = await ContentfulGraphqlClient.fetch("post", query);
    return entryResponse.data[`${contentType}Collection`].items[0];
  }
}
