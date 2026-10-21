/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getCurrentProfile, createServiceClient } from "@/lib/supabase/server";

export async function PATCH(request: NextRequest) {
  try {
    const profile = await getCurrentProfile();
    if (!profile) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const canModerate = ["super_admin", "editor_in_chief", "moderator"].includes(
      profile.role
    );
    if (!canModerate) {
      return NextResponse.json(
        { error: "No tienes permisos de moderación" },
        { status: 403 }
      );
    }

    const { id, isApproved } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "ID de comentario requerido" }, { status: 400 });
    }

    const supabase = createServiceClient();
    const { error } = await (supabase.from("comments") as any)
      .update({
        is_approved: isApproved,
        reviewed_by: profile.id,
      })
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error en PATCH /api/admin/comments:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const profile = await getCurrentProfile();
    if (!profile) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const canModerate = ["super_admin", "editor_in_chief", "moderator"].includes(
      profile.role
    );
    if (!canModerate) {
      return NextResponse.json({ error: "No tienes permisos" }, { status: 403 });
    }

    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "ID requerido" }, { status: 400 });
    }

    const supabase = createServiceClient();
    const { error } = await supabase.from("comments").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error en DELETE /api/admin/comments:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
