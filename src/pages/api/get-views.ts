import type { APIRoute } from "astro";
import { C } from "@configuration";
import type { Lang } from "@models/type";
import { supabase } from "@utils";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const entryId = url.searchParams.get("entryId");
    const locale = url.searchParams.get("locale");

    if (!entryId || !locale || !Object.keys(C.LOCALES).includes(locale)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid parameters",
        }),
        { status: 400 }
      );
    }

    const result = await getViewCount({ entryId, locale: locale as Lang });

    return new Response(
      JSON.stringify({ success: true, views: result.views }),
      { status: 200 }
    );
  } catch (error) {
    console.error("[ERROR] Get views API error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500 }
    );
  }
};

const getViewCount = async ({
  entryId,
  locale,
}: {
  entryId: string;
  locale: Lang;
}) => {
  try {
    const { data, error } = await supabase
      .from("entry_views")
      .select("views")
      .eq("entry_id", entryId)
      .eq("locale", locale)
      .single();

    if (error) {
      console.error("[ERROR] Get view count error:", error);
      return { views: 0, error };
    }

    return { views: data?.views || 0 };
  } catch (error) {
    console.error("[ERROR] Get view count unexpected error:", error);
    return { views: 0, error };
  }
};
