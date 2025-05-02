import type { APIRoute } from "astro";
import { supabaseAdmin } from "@utils";
import { C } from "@configuration";
import type { Lang } from "@models/type";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { entryIds, locale } = data;

    if (
      !entryIds ||
      !Array.isArray(entryIds) ||
      !locale ||
      !Object.keys(C.LOCALES).includes(locale)
    ) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid parameters" }),
        { status: 400 }
      );
    }

    const viewCounts = await getViewCounts(entryIds, locale);

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

const getViewCounts = async (
  entryIds: string[],
  locale: Lang
): Promise<Record<string, number>> => {
  try {
    const { data, error } = await supabaseAdmin
      .from("entry_views")
      .select("entry_id, views")
      .in("entry_id", entryIds)
      .eq("locale", locale);

    if (error) {
      console.error("[ERROR] View count fetch error:", error);
      return {};
    }

    const viewCounts: Record<string, number> = {};

    // Tüm istenen entry ID'leri için varsayılan 0 değerini ayarla
    entryIds.forEach((id) => {
      viewCounts[id] = 0;
    });

    // Bulunan verileri ekle
    data.forEach((item) => {
      viewCounts[item.entry_id] = item.views;
    });

    return viewCounts;
  } catch (error) {
    console.error("[ERROR] View count unexpected error:", error);
    return {};
  }
};
