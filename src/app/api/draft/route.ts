import api from "@/lib/contentful/api";
import { ContentfulEntity } from "@/lib/models";
import { draftMode } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug")!;
  const type = searchParams.get("type")!;

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  const entity = await api[type as ContentfulEntity].fetch({ slug, preview: true });

  if (!entity) {
    return new Response(`Invalid slug: ${slug}`, { status: 401 });
  }

  draftMode().enable();

  return new Response(null, {
    status: 307,
    headers: {
      Location: `/${type}/${entity.slug}`,
    },
  });
}
