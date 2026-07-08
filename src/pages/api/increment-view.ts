import type { APIRoute } from "astro";
import { supabaseAdmin } from "@utils";

export const prerender = false;

const LOCALE = "tr";

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { entryId } = data;

    if (!entryId) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid parameters" }),
        { status: 400 }
      );
    }

    const result = await incrementViewCount(entryId);

    if (!result.success) {
      return new Response(
        JSON.stringify({ success: false, error: result.error }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("[ERROR] Increment view API error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500 }
    );
  }
};

const incrementViewCount = async (entryId: string) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("entry_views")
      .select("*")
      .eq("entry_id", entryId)
      .eq("locale", LOCALE)
      .maybeSingle();

    if (error) {
      console.error("[ERROR] View increment error:", error);
      return { success: false, error };
    }

    if (data) {
      const { error: updateError } = await supabaseAdmin
        .from("entry_views")
        .update({
          views: data.views + 1,
          updated_at: new Date().toISOString(),
        })
        .eq("entry_id", entryId)
        .eq("locale", LOCALE);

      if (updateError) {
        console.error("[ERROR] View update error:", updateError);
        return { success: false, error: updateError };
      }
    } else {
      const { error: insertError } = await supabaseAdmin
        .from("entry_views")
        .insert({
          entry_id: entryId,
          locale: LOCALE,
          views: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (insertError) {
        console.error("[ERROR] View insert error:", insertError);
        return { success: false, error: insertError };
      }
    }

    return { success: true };
  } catch (error) {
    console.error("[ERROR] View increment unexpected error:", error);
    return { success: false, error };
  }
};
