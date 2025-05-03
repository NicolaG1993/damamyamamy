import { createClient } from "@supabase/supabase-js";

// Supabase configuration
const isDev = process.env.NODE_ENV === "development";
const supabaseUrl = `https://${
    isDev
        ? process.env.SUPABASE_PROJECT_URL_DEV
        : process.env.SUPABASE_PROJECT_URL_PROD
}`;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error(
        "Missing Supabase environment variables: SUPABASE_PROJECT_URL or SUPABASE_KEY"
    );
}

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
