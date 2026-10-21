import 'server-only';
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

/**
 * Client para queries públicas del lado del servidor (Server Components).
 * Usa la anon key con RLS activo.
 */
export const createServerClient = () => {
  return createClient<Database>(supabaseUrl, supabaseAnonKey);
};

/**
 * Client de servicio con permisos de admin.
 * Solo usar en Server Actions y API routes protegidas.
 * Bypasses RLS completamente.
 */
export const createServiceClient = () => {
  return createClient<Database>(supabaseUrl, supabaseServiceKey);
};
