import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getPostBySlug } from "../../../lib/api";
import { CategoryType } from "@/types/contentful";
import { fallbackLng } from "@/app/i18n/settings";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const category = searchParams.get("category") as CategoryType;
  const slug = searchParams.get("slug") as string;

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  const post = await getPostBySlug({
    language: fallbackLng,
    category,
    slug,
    preview: true,
  });

  if (!post) {
    return new Response("Invalid slug", { status: 404 });
  }

  draftMode().enable();
  redirect(`/posts/${post.slug}`);
}
