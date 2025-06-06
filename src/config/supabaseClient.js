import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl) {
    console.error("Critical Error: SUPABASE_URL is missing from your .env file");
    process.exit(1);
}
if (!supabaseAnonKey) {
    console.error("Critical Error: SUPABASE_ANON_KEY is missing from your .env file");
    process.exit(1);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: false
    }
});

console.log("Supabase client configured for backend using Anon Key.");

