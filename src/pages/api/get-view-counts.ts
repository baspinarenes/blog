import type { APIRoute } from "astro";
import { supabaseAdmin } from "@utils";
import { C } from "@configuration";
import type { Lang } from "@models/type";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { locale } = data;

    if (!locale || !Object.keys(C.LOCALES).includes(locale)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid parameters" }),
        { status: 400 }
      );
    }

    const viewCounts = await getViewCounts(locale);

    return new Response(JSON.stringify({ success: true, viewCounts }), {
      status: 200,
    });
  } catch (error) {
    console.error("[ERROR] Get view counts API error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500 }
    );
  }
};

const getViewCounts = async (locale: Lang): Promise<Record<string, number>> => {
  try {
    const { data, error } = await supabaseAdmin
      .from("entry_views")
      .select("entry_id, views")
      .eq("locale", locale);

    if (error) {
      console.error("[ERROR] View count fetch error:", error);
      return {};
    }

    const viewCounts: Record<string, number> = {};

    data.forEach((item) => {
      viewCounts[item.entry_id] = item.views;
    });

    return viewCounts;
  } catch (error) {
    console.error("[ERROR] View count unexpected error:", error);
    return {};
  }
};
