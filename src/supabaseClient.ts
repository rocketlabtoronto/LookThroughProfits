import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "";
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || "";

// Debug logging
console.log("🔧 Supabase Client Environment Check:");
console.log("REACT_APP_SUPABASE_URL:", process.env.REACT_APP_SUPABASE_URL);
console.log("REACT_APP_SUPABASE_ANON_KEY:", process.env.REACT_APP_SUPABASE_ANON_KEY);
console.log("supabaseUrl:", supabaseUrl);
console.log("supabaseAnonKey:", supabaseAnonKey);

if (!supabaseUrl) {
  throw new Error("REACT_APP_SUPABASE_URL environment variable is required");
}

if (!supabaseAnonKey) {
  throw new Error("REACT_APP_SUPABASE_ANON_KEY environment variable is required");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
