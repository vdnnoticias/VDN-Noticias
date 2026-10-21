import { createServerClient } from "@/lib/supabase/server";
import CommentsModeratorClient from "@/components/admin/CommentsModeratorClient";

export const dynamic = "force-dynamic";

export default async function ComentariosAdminPage() {
  const supabase = createServerClient();

  const { data: comments } = await supabase
    .from("comments")
    .select(`
      *,
      article:articles!comments_article_id_fkey(title, slug, section)
    `)
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="font-serif text-2xl font-black text-[#0A192F]">
          Moderación de Comentarios de Lectores
        </h1>
        <p className="text-xs text-gray-500">
          Revisa y aprueba comentarios ciudadanos antes de que sean visibles en el portal
        </p>
      </div>

      <CommentsModeratorClient initialComments={comments || []} />
    </div>
  );
}
