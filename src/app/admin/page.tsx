import Link from "next/link";
import {
  FileText,
  Eye,
  MessageSquare,
  Calendar,
  PlusCircle,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { getCurrentProfile, createServerClient } from "@/lib/supabase/server";
import { NewsService } from "@/services/news.service";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const profile = await getCurrentProfile();
  const supabase = createServerClient();

  // Consultar conteos en paralelo
  const [
    articlesCountRes,
    draftsCountRes,
    commentsPendingRes,
    festivitiesCountRes,
    recentArticles,
  ] = await Promise.all([
    supabase
      .from("articles")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
    supabase
      .from("articles")
      .select("id", { count: "exact", head: true })
      .in("status", ["draft", "review"]),
    supabase
      .from("comments")
      .select("id", { count: "exact", head: true })
      .eq("is_approved", false),
    supabase
      .from("festivities")
      .select("id", { count: "exact", head: true }),
    NewsService.getAllArticles(),
  ]);

  const totalPublished = articlesCountRes.count ?? recentArticles.length;
  const totalDrafts = draftsCountRes.count ?? 0;
  const pendingComments = commentsPendingRes.count ?? 0;
  const totalFestivities = festivitiesCountRes.count ?? 16;

  const totalViews = recentArticles.reduce(
    (acc, cur) => acc + (cur.viewsCount || 0),
    0
  );

  const isSuperAdmin =
    profile?.role === "super_admin" || profile?.email === "vdnnoticias@gmail.com";

  return (
    <div className="space-y-8">
      {/* Banner de Bienvenida */}
      <div className="bg-gradient-to-r from-[#071324] to-[#0A192F] text-white p-6 sm:p-8 rounded-lg shadow-sm border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 border border-amber-500/30">
            <ShieldCheck size={14} className="text-amber-400" />
            <span>
              {isSuperAdmin
                ? "Dirección General — Principal de Principales"
                : "Mesa de Redacción VDN"}
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-white">
            Bienvenido, {profile?.full_name || "Periodista VDN"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Panel de control editorial, gestión de transmisiones radiales y seguimiento de audiencias en Jauja y todo el Valle del Mantaro.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/articulos/nuevo"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider px-5 py-3 rounded-md shadow-md transition-all flex items-center gap-2"
          >
            <PlusCircle size={16} />
            <span>Redactar Noticia</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-4 py-3 rounded-md transition-colors border border-slate-700"
          >
            Ver Web en Vivo
          </Link>
        </div>
      </div>

      {/* Tarjetas de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Métricas 1: Artículos Publicados */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">
              Noticias Publicadas
            </span>
            <div className="font-serif text-3xl font-black text-[#0A192F]">
              {totalPublished}
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
              <CheckCircle2 size={12} />
              <span>{totalDrafts > 0 ? `${totalDrafts} en revisión/borrador` : "Disponibles en el portal"}</span>
            </span>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-lg flex items-center justify-center shrink-0">
            <FileText size={22} />
          </div>
        </div>

        {/* Métricas 2: Lecturas Totales */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">
              Lecturas Acumuladas
            </span>
            <div className="font-serif text-3xl font-black text-[#0A192F]">
              {totalViews.toLocaleString("es-PE")}
            </div>
            <span className="text-[11px] text-amber-700 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp size={12} />
              <span>Interacción de lectores</span>
            </span>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-lg flex items-center justify-center shrink-0">
            <Eye size={22} />
          </div>
        </div>

        {/* Métricas 3: Comentarios por moderar */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">
              Comentarios
            </span>
            <div className="font-serif text-3xl font-black text-[#0A192F]">
              {pendingComments}
            </div>
            <span
              className={`text-[11px] font-semibold mt-1 flex items-center gap-1 ${
                pendingComments > 0 ? "text-red-700 font-bold" : "text-gray-500"
              }`}
            >
              {pendingComments > 0 ? (
                <>
                  <AlertTriangle size={12} />
                  <span>Pendientes de moderación</span>
                </>
              ) : (
                <span>Al día sin pendientes</span>
              )}
            </span>
          </div>
          <div className="w-12 h-12 bg-purple-50 text-purple-700 rounded-lg flex items-center justify-center shrink-0">
            <MessageSquare size={22} />
          </div>
        </div>

        {/* Métricas 4: Fiestas en Calendario */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">
              Fiestas &amp; Turismo
            </span>
            <div className="font-serif text-3xl font-black text-[#0A192F]">
              {totalFestivities}
            </div>
            <span className="text-[11px] text-blue-700 font-semibold mt-1 flex items-center gap-1">
              <Calendar size={12} />
              <span>Valle del Mantaro y País</span>
            </span>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-lg flex items-center justify-center shrink-0">
            <Calendar size={22} />
          </div>
        </div>
      </div>

      {/* Tabla de Artículos Recientes */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-lg font-bold text-[#0A192F]">
              Últimas Publicaciones en Portada
            </h2>
            <p className="text-xs text-gray-500">
              Gestión editorial, estado de revisión y métricas de lectura
            </p>
          </div>
          <Link
            href="/admin/articulos"
            className="text-xs font-bold text-red-700 hover:text-red-900 transition-colors inline-flex items-center gap-1"
          >
            <span>Ver todos los artículos</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-gray-500 uppercase text-[10px] tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3 px-5">Título de la Noticia</th>
                <th className="py-3 px-4">Sección</th>
                <th className="py-3 px-4">Autor</th>
                <th className="py-3 px-4">Fecha</th>
                <th className="py-3 px-4">Lecturas</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {recentArticles.slice(0, 6).map((art) => (
                <tr key={art.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-5 max-w-sm">
                    <div className="font-bold text-[#0A192F] line-clamp-1 hover:text-red-700 transition-colors">
                      <Link href={`/${art.sectionSlug}/${art.slug}`} target="_blank">
                        {art.title}
                      </Link>
                    </div>
                    <span className="text-[11px] text-gray-400 line-clamp-1">
                      {art.excerpt}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-xs uppercase">
                      {art.section}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap font-medium text-gray-900">
                    {art.author}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-gray-500">
                    {art.date}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap font-mono text-gray-600 font-semibold">
                    {art.viewsCount.toLocaleString("es-PE")}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Publicado</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-right">
                    <Link
                      href={`/${art.sectionSlug}/${art.slug}`}
                      target="_blank"
                      className="text-xs font-semibold text-blue-700 hover:underline mr-3"
                    >
                      Ver
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
