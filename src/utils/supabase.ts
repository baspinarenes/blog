import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.SUPABASE_URL || "";
const supabaseKey = import.meta.env.SUPABASE_ANON_KEY || "";
const supabaseServiceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
