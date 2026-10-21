import Link from "next/link";
import Image from "next/image";
import { PlusCircle, Eye } from "lucide-react";
import { createServerClient } from "@/lib/supabase/server";
import { NewsService } from "@/services/news.service";

export const dynamic = "force-dynamic";

export default async function ArticulosAdminPage() {
  const supabase = createServerClient();

  // Consultar todos los artículos (incluyendo no publicados)
  const { data: dbArticles } = await supabase
    .from("articles")
    .select(`
      *,
      author:profiles!articles_author_id_fkey(full_name)
    `)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  // Si no hay artículos en BD, usar los de mock
  const articles =
    dbArticles && dbArticles.length > 0
      ? (dbArticles as unknown as Array<Record<string, unknown>>).map((a) => ({
          id: String(a.id),
          title: String(a.title),
          slug: String(a.slug),
          excerpt: String(a.excerpt),
          section: String(a.section),
          status: String(a.status),
          author: (a.author as Record<string, string> | null)?.full_name || "Redacción VDN",
          viewsCount: Number(a.views_count),
          date: a.published_at
            ? new Date(String(a.published_at)).toLocaleDateString("es-PE")
            : new Date(String(a.created_at)).toLocaleDateString("es-PE"),
          imageUrl: a.cover_image_url ? String(a.cover_image_url) : undefined,
          isBreaking: Boolean(a.is_breaking),
        }))
      : (await NewsService.getAllArticles()).map((a) => ({
          ...a,
          status: "published",
        }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="font-serif text-2xl font-black text-[#0A192F]">
            Catálogo Editorial de Artículos
          </h1>
          <p className="text-xs text-gray-500">
            Administra, revisa y publica noticias para todas las secciones de VDN Noticias
          </p>
        </div>

        <Link
          href="/admin/articulos/nuevo"
          className="bg-red-700 hover:bg-red-800 text-white text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-sm shadow-sm transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <PlusCircle size={16} />
          <span>Redactar Noticia</span>
        </Link>
      </div>

      {/* Tabla de Artículos */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-slate-50 flex items-center justify-between text-xs text-gray-600">
          <span className="font-semibold">
            Total: <strong>{articles.length}</strong> artículos registrados
          </span>
          <span className="text-[11px] text-gray-400">
            Base de datos PostgreSQL con RLS y FTS
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-gray-600 uppercase text-[10px] tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3 px-5">Artículo</th>
                <th className="py-3 px-4">Sección</th>
                <th className="py-3 px-4">Autor</th>
                <th className="py-3 px-4">Fecha</th>
                <th className="py-3 px-4">Vistas</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-5 max-w-md">
                    <div className="flex items-center gap-3">
                      {art.imageUrl && (
                        <div className="relative w-12 h-12 rounded-sm overflow-hidden bg-slate-200 shrink-0">
                          <Image
                            src={art.imageUrl}
                            alt={art.title}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                      )}
                      <div>
                        <Link
                          href={`/${art.section}/${art.slug}`}
                          target="_blank"
                          className="font-bold text-[#0A192F] hover:text-red-700 transition-colors line-clamp-1"
                        >
                          {art.title}
                        </Link>
                        <p className="text-[11px] text-gray-400 line-clamp-1">
                          {art.excerpt}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-xs uppercase">
                      {art.section}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap font-medium text-gray-900">
                    {art.author}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-gray-500 font-mono text-[11px]">
                    {art.date}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap font-mono font-semibold text-gray-700">
                    {art.viewsCount.toLocaleString("es-PE")}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {art.status === "published" ? (
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>Publicado</span>
                      </span>
                    ) : art.status === "review" ? (
                      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span>En Revisión</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 border border-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span>Borrador</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-right">
                    <Link
                      href={`/${art.section}/${art.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900 transition-colors mr-3"
                    >
                      <Eye size={13} />
                      <span>Ver</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
