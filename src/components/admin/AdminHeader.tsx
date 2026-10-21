"use client";

import { useRouter } from "next/navigation";
import { LogOut, Radio } from "lucide-react";
import type { AppRole, Profile } from "@/lib/supabase/types";

interface AdminHeaderProps {
  profile: Profile | null;
}

const roleLabels: Record<AppRole, { label: string; badgeClass: string }> = {
  super_admin: {
    label: "Director General & Dueño",
    badgeClass: "bg-red-950 text-red-200 border-red-800",
  },
  editor_in_chief: {
    label: "Jefe de Redacción",
    badgeClass: "bg-blue-950 text-blue-200 border-blue-800",
  },
  journalist: {
    label: "Periodista Redactor",
    badgeClass: "bg-emerald-950 text-emerald-200 border-emerald-800",
  },
  columnist: {
    label: "Columnista de Opinión",
    badgeClass: "bg-amber-950 text-amber-200 border-amber-800",
  },
  radio_operator: {
    label: "Operador de Radio",
    badgeClass: "bg-purple-950 text-purple-200 border-purple-800",
  },
  moderator: {
    label: "Moderador de Comentarios",
    badgeClass: "bg-slate-800 text-slate-300 border-slate-700",
  },
};

export default function AdminHeader({ profile }: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  const roleInfo = profile?.role
    ? roleLabels[profile.role]
    : { label: "Redactor", badgeClass: "bg-slate-800 text-slate-300 border-slate-700" };

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shrink-0 shadow-xs">
      {/* Indicadores de Estado del Medio */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="hidden sm:inline">Servidor de Producción VDN:</span>
          <span className="font-mono text-[11px] text-gray-500">PostgreSQL Supabase</span>
        </div>

        <div className="hidden md:flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
          <Radio size={12} className="text-amber-600 animate-ping" />
          <span className="text-[11px] font-bold">98.5 FM Al Aire</span>
        </div>
      </div>

      {/* Usuario actual & Acciones */}
      <div className="flex items-center gap-4">
        {/* Info de Perfil */}
        <div className="flex items-center gap-3 text-right">
          <div>
            <div className="text-xs font-bold text-gray-900 leading-tight">
              {profile?.full_name || "Equipo VDN"}
            </div>
            <div className="flex items-center gap-1 justify-end">
              <span
                className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-xs border ${roleInfo.badgeClass}`}
              >
                {roleInfo.label}
              </span>
            </div>
          </div>

          <div className="w-9 h-9 rounded-full bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-xs shadow-xs border border-gray-200">
            {profile?.full_name
              ? profile.full_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
              : "VD"}
          </div>
        </div>

        {/* Separador */}
        <div className="h-6 w-px bg-gray-200" />

        {/* Botón Salir */}
        <button
          onClick={handleLogout}
          title="Cerrar sesión"
          className="text-gray-400 hover:text-red-700 p-2 rounded-md hover:bg-red-50 transition-colors"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
