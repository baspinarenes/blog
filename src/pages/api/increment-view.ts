import type { APIRoute } from "astro";
import { supabaseAdmin } from "@utils";
import { C } from "@configuration";
import type { Lang } from "@models/type";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { entryId, locale } = data;

    if (!entryId || !locale || !Object.keys(C.LOCALES).includes(locale)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid parameters" }),
        { status: 400 }
      );
    }

    const result = await incrementViewCount({ entryId, locale });

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

const incrementViewCount = async ({
  entryId,
  locale,
}: {
  entryId: string;
  locale: Lang;
}) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("entry_views")
      .select("*")
      .eq("entry_id", entryId)
      .eq("locale", locale)
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
        .eq("locale", locale);

      if (updateError) {
        console.error("[ERROR] View update error:", updateError);
        return { success: false, error: updateError };
      }
    } else {
      const { error: insertError } = await supabaseAdmin
        .from("entry_views")
        .insert({
          entry_id: entryId,
          locale,
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
