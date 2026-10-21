import { getCurrentProfile, createServiceClient } from "@/lib/supabase/server";
import { History, ShieldX } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AuditoriaAdminPage() {
  const profile = await getCurrentProfile();
  const isMaster =
    profile?.role === "super_admin" || profile?.email === "vdnnoticias@gmail.com";

  if (!isMaster) {
    return (
      <div className="bg-white p-12 text-center rounded-lg border border-red-200 max-w-md mx-auto my-12">
        <ShieldX className="w-12 h-12 text-red-600 mx-auto mb-3" />
        <h2 className="font-serif text-lg font-bold text-gray-900 mb-2">
          Acceso Restringido a la Dirección General
        </h2>
        <p className="text-xs text-gray-600 leading-relaxed">
          La bitácora de auditoría solo puede ser consultada por el Super Administrador.
        </p>
      </div>
    );
  }

  const supabase = createServiceClient();
  const { data: logs } = await supabase
    .from("audit_logs")
    .select(`
      *,
      user:profiles!audit_logs_user_id_fkey(full_name, email)
    `)
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="font-serif text-2xl font-black text-[#0A192F]">
          Bitácora de Auditoría Editorial
        </h1>
        <p className="text-xs text-gray-500">
          Registro inmutable de actividades, cambios de estado y modificaciones del sistema
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-slate-50 flex items-center justify-between text-xs text-gray-600">
          <span className="font-semibold">
            {logs?.length || 0} evento{logs?.length !== 1 ? "s" : ""} registrado{logs?.length !== 1 ? "s" : ""}
          </span>
          <span className="text-[11px] text-gray-400">
            Tabla public.audit_logs con políticas RLS
          </span>
        </div>

        {!logs || logs.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-xs">
            <History className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="font-medium text-gray-700">Sin eventos recientes de auditoría.</p>
            <p className="text-[11px] text-gray-400 mt-1">
              Las acciones de creación de artículos y cambios de roles se registrarán automáticamente aquí.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-gray-600 uppercase text-[10px] tracking-wider border-b border-gray-200">
                <tr>
                  <th className="py-3 px-5">Fecha y Hora</th>
                  <th className="py-3 px-4">Usuario Responsable</th>
                  <th className="py-3 px-4">Acción</th>
                  <th className="py-3 px-4">Entidad</th>
                  <th className="py-3 px-4">Detalles</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {(logs as unknown as Array<Record<string, unknown>>).map((log) => (
                  <tr key={String(log.id)} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-5 font-mono text-[11px] text-gray-500 whitespace-nowrap">
                      {new Date(String(log.created_at)).toLocaleString("es-PE")}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-navy-950 whitespace-nowrap">
                      {(log.user as Record<string, string> | null)?.full_name || "Sistema"}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="bg-blue-100 text-blue-900 text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono">
                        {String(log.action)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-gray-600 capitalize">
                      {String(log.entity_type)}
                    </td>
                    <td className="py-3.5 px-4 text-gray-500 font-mono text-[11px] max-w-xs truncate">
                      {JSON.stringify(log.details)}
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
