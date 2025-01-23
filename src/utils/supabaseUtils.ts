import { createClient } from "@supabase/supabase-js";

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error(
        "Missing Supabase environment variables: SUPABASE_PROJECT_URL or SUPABASE_KEY"
    );
}

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
