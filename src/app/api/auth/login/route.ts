/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { createAuthServerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Correo electrónico y contraseña requeridos" },
        { status: 400 }
      );
    }

    const supabase = await createAuthServerClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error) {
      // Mensajes de error en español claro
      let message = "Credenciales incorrectas. Verifica tu correo y contraseña.";
      if (error.message.includes("Email not confirmed")) {
        message = "El correo no ha sido confirmado aún en Supabase.";
      } else if (error.message.includes("Invalid login credentials")) {
        message = "Correo o contraseña no válidos.";
      }

      return NextResponse.json({ error: message }, { status: 401 });
    }

    // Obtener rol del usuario
    const { data: profileData } = await supabase
      .from("profiles")
      .select("role, full_name, is_active")
      .eq("id", data.user.id)
      .single();

    const profile = profileData as any;

    if (profile && !profile.is_active) {
      await supabase.auth.signOut();
      return NextResponse.json(
        { error: "Tu cuenta ha sido desactivada por la dirección editorial." },
        { status: 403 }
      );
    }

    return NextResponse.json({
      ok: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        role: profile?.role || (data.user.email === "vdnnoticias@gmail.com" ? "super_admin" : "journalist"),
        fullName: profile?.full_name || "Redacción VDN",
      },
    });
  } catch (err) {
    console.error("Error en login:", err);
    return NextResponse.json(
      { error: "Ocurrió un error en el servidor al autenticar." },
      { status: 500 }
    );
  }
}
