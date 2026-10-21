/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getCurrentProfile, createServiceClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const profile = await getCurrentProfile();
    if (!profile) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Comprobar si tiene permisos de redacción
    const canWrite = ["super_admin", "editor_in_chief", "journalist", "columnist"].includes(
      profile.role
    );
    if (!canWrite) {
      return NextResponse.json(
        { error: "No tienes permisos para redactar noticias" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      contentHtml,
      coverImageUrl,
      section,
      isFeatured,
      isBreaking,
      status,
      readingTimeMinutes,
      tags,
    } = body;

    if (!title || !slug || !excerpt || !contentHtml) {
      return NextResponse.json(
        { error: "Título, slug, resumen y contenido son obligatorios" },
        { status: 400 }
      );
    }

    // Solo super_admin y editor_in_chief pueden publicar directamente
    const canPublish = ["super_admin", "editor_in_chief"].includes(profile.role);
    const finalStatus = status === "published" && !canPublish ? "review" : status;

    const supabase = createServiceClient();

    // 1. Obtener category_id si existe
    const { data: category } = await (supabase.from("categories") as any)
      .select("id")
      .eq("slug", section)
      .single();

    // 2. Insertar artículo
    const { data: article, error } = await (supabase.from("articles") as any)
      .insert({
        title,
        slug,
        excerpt,
        content_html: contentHtml,
        cover_image_url: coverImageUrl || null,
        section,
        category_id: category?.id || null,
        author_id: profile.id,
        is_featured: Boolean(isFeatured),
        is_breaking: Boolean(isBreaking),
        status: finalStatus,
        published_at: finalStatus === "published" ? new Date().toISOString() : null,
        reading_time_minutes: Number(readingTimeMinutes) || 3,
        tags: Array.isArray(tags) ? tags : [],
      })
      .select()
      .single();

    if (error) {
      console.error("Error al insertar artículo:", error);
      return NextResponse.json(
        { error: `Error en base de datos: ${error.message}` },
        { status: 500 }
      );
    }

    // 3. Registrar en audit_logs
    try {
      await (supabase.from("audit_logs") as any).insert({
        user_id: profile.id,
        action: "CREATE_ARTICLE",
        entity_type: "article",
        entity_id: (article as any)?.id,
        details: { title, slug, status: finalStatus },
      });
    } catch {
      // No detener si falla el log
    }

    return NextResponse.json({ ok: true, article });
  } catch (err) {
    console.error("Error en POST /api/admin/articles:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
