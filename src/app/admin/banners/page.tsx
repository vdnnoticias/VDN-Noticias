import { createServerClient } from "@/lib/supabase/server";
import { Image as ImageIcon } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminBannersPage() {
  const supabase = createServerClient();
  const { data: banners } = await supabase
    .from("banners")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="font-serif text-2xl font-black text-[#0A192F]">
            Publicidad &amp; Auspiciadores Regionales
          </h1>
          <p className="text-xs text-gray-500">
            Monetización y gestión de espacios publicitarios para marcas de Jauja y Junín
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-slate-50 flex items-center justify-between text-xs text-gray-600">
          <span className="font-semibold">
            {banners?.length || 0} banner{banners?.length !== 1 ? "s" : ""} registrado{banners?.length !== 1 ? "s" : ""}
          </span>
          <span className="text-[11px] text-gray-400">
            Formatos compatibles: Header, Sidebar, In-feed y Footer
          </span>
        </div>

        {!banners || banners.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-xs">
            <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="font-medium text-gray-700">Sin campañas publicitarias activas.</p>
            <p className="text-[11px] text-gray-400 mt-1 max-w-sm mx-auto">
              Los auspiciadores locales que adquieran pauta en VDN Noticias aparecerán listados aquí para el seguimiento de impresiones y clics.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-gray-600 uppercase text-[10px] tracking-wider border-b border-gray-200">
                <tr>
                  <th className="py-3 px-5">Auspiciador</th>
                  <th className="py-3 px-4">Ubicación</th>
                  <th className="py-3 px-4">Impresiones</th>
                  <th className="py-3 px-4">Clics</th>
                  <th className="py-3 px-4">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {(banners as unknown as Array<Record<string, unknown>>).map((b) => (
                  <tr key={String(b.id)} className="hover:bg-slate-50">
                    <td className="py-3.5 px-5 font-bold text-navy-950">
                      {String(b.sponsor_name)}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] uppercase">
                      {String(b.position)}
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      {Number(b.impressions).toLocaleString("es-PE")}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-700">
                      {Number(b.clicks).toLocaleString("es-PE")}
                    </td>
                    <td className="py-3.5 px-4">
                      {b.is_active ? (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Activo
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Pausado
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
