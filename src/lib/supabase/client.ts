import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// NEXT_PUBLIC_SUPABASE_URL is the URL of your Supabase project
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// NEXT_PUBLIC_SUPABASE_ANON_KEY is the public anon key for your Supabase project
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const createBrowserClient = () => {
  return createClient<Database>(supabaseUrl, supabaseAnonKey);
};
