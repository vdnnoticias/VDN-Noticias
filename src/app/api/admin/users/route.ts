/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getCurrentProfile, createServiceClient } from "@/lib/supabase/server";

export async function PATCH(request: NextRequest) {
  try {
    const profile = await getCurrentProfile();
    if (!profile) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const isMaster =
      profile.role === "super_admin" || profile.email === "vdnnoticias@gmail.com";

    if (!isMaster) {
      return NextResponse.json(
        { error: "Solo el Director General (Super Administrador) puede modificar roles" },
        { status: 403 }
      );
    }

    const { userId, role, isActive } = await request.json();
    if (!userId) {
      return NextResponse.json({ error: "ID de usuario requerido" }, { status: 400 });
    }

    const supabase = createServiceClient();

    // Actualizar perfil
    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };
    if (role) updateData.role = role;
    if (typeof isActive === "boolean") updateData.is_active = isActive;

    const { error } = await (supabase.from("profiles") as any)
      .update(updateData)
      .eq("id", userId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Registrar en auditoría
    await (supabase.from("audit_logs") as any).insert({
      user_id: profile.id,
      action: "UPDATE_USER_ROLE",
      entity_type: "profile",
      entity_id: userId,
      details: { role, isActive },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error en PATCH /api/admin/users:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
