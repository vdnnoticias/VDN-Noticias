/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getCurrentProfile, createServiceClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const profile = await getCurrentProfile();
    if (!profile) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const canPublish = ["super_admin", "editor_in_chief"].includes(profile.role);
    if (!canPublish) {
      return NextResponse.json(
        { error: "No tienes permisos para gestionar festividades" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      name,
      scope,
      month,
      days,
      location,
      city,
      description,
      history,
      imageUrl,
      heritageStatus,
      traditionalDishes,
      tipsForTourists,
      isHighlight,
    } = body;

    if (!name || !scope || !month || !days || !location || !city || !description) {
      return NextResponse.json(
        { error: "Todos los campos principales son obligatorios" },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();
    const { data, error } = await (supabase.from("festivities") as any)
      .insert({
        name,
        scope,
        month: Number(month),
        days,
        location,
        city,
        description,
        history: history || null,
        image_url: imageUrl || null,
        heritage_status: heritageStatus || null,
        traditional_dishes: Array.isArray(traditionalDishes) ? traditionalDishes : [],
        tips_for_tourists: tipsForTourists || null,
        is_highlight: Boolean(isHighlight),
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, festivity: data });
  } catch (err) {
    console.error("Error en POST /api/admin/festivities:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
