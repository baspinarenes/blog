import type { APIRoute } from "astro";
import { supabase } from "@utils";

export const prerender = false;

const LOCALE = "tr";

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const entryId = url.searchParams.get("entryId");

    if (!entryId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid parameters",
        }),
        { status: 400 }
      );
    }

    const result = await getViewCount(entryId);

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

const getViewCount = async (entryId: string) => {
  try {
    const { data, error } = await supabase
      .from("entry_views")
      .select("views")
      .eq("entry_id", entryId)
      .eq("locale", LOCALE)
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
