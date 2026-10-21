import "server-only";
import { createClient } from "@supabase/supabase-js";
import { createServerClient as createSsrServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database, Profile, AppRole } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

/**
 * Client para queries públicas del lado del servidor (Server Components).
 * Usa la anon key con RLS activo sin cookies.
 */
export const createServerClient = () => {
  return createClient<Database>(supabaseUrl, supabaseAnonKey);
};

/**
 * Client de servicio con permisos de super admin.
 * Solo usar en Server Actions y API routes protegidas.
 * Bypasses RLS completamente.
 */
export const createServiceClient = () => {
  return createClient<Database>(supabaseUrl, supabaseServiceKey);
};

/**
 * Client autenticado con cookies para Server Components y Server Actions.
 * Respeta el contexto del usuario autenticado y las políticas RLS.
 */
export async function createAuthServerClient() {
  const cookieStore = await cookies();

  return createSsrServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Ignorado en Server Components cuando se ejecutan en lectura pura
        }
      },
    },
  });
}

/**
 * Obtiene el perfil completo del usuario actualmente autenticado.
 */
export async function getCurrentProfile(): Promise<Profile | null> {
  try {
    const supabase = await createAuthServerClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) return null;

    // Buscar perfil en tabla public.profiles
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profile) return profile as Profile;

    // Fallback: Si el usuario es el correo principal de VDN pero aún no tiene fila en profiles
    const isVdnMaster = user.email === "vdnnoticias@gmail.com";
    return {
      id: user.id,
      email: user.email || "",
      full_name: (user.user_metadata?.full_name as string) || (isVdnMaster ? "Director General" : "Usuario VDN"),
      role: (isVdnMaster ? "super_admin" : "journalist") as AppRole,
      avatar_url: null,
      bio: null,
      phone: null,
      is_active: true,
      created_at: user.created_at,
      updated_at: user.created_at,
    };
  } catch {
    return null;
  }
}
