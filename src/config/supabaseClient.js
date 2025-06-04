import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Critical Error: Supabase URL or Anon Key is missing from your .env file");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: false
    }
});

if (supabaseUrl && supabaseAnonKey) {
    console.log("Supabase client configured for backend")
} else {
    console.warn("Supabase client configured WITHOUT URL/ANON KEY - operations will fail.")
}

