/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getCurrentProfile, createServiceClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const profile = await getCurrentProfile();
    if (!profile) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const canManageRadio = [
      "super_admin",
      "editor_in_chief",
      "radio_operator",
    ].includes(profile.role);

    if (!canManageRadio) {
      return NextResponse.json(
        { error: "No tienes permisos para configurar la radio" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { streamUrl, radioName, slogan, isBroadcasting, currentProgram, currentHost } = body;

    const supabase = createServiceClient();

    // Actualizar la primera fila o insertar si no existe
    const { data: existing } = await (supabase.from("radio_settings") as any)
      .select("id")
      .limit(1)
      .single();

    if (existing) {
      await (supabase.from("radio_settings") as any)
        .update({
          stream_url: streamUrl,
          radio_name: radioName,
          slogan,
          is_broadcasting: isBroadcasting,
          current_program: currentProgram,
          current_host: currentHost,
          updated_at: new Date().toISOString(),
        })
        .eq("id", (existing as any).id);
    } else {
      await (supabase.from("radio_settings") as any).insert({
        stream_url: streamUrl,
        radio_name: radioName,
        slogan,
        is_broadcasting: isBroadcasting,
        current_program: currentProgram,
        current_host: currentHost,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error en POST /api/admin/radio:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
