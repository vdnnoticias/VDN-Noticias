"use client";

import { useState } from "react";
import { ShieldAlert, Check } from "lucide-react";
import type { AppRole, Profile } from "@/lib/supabase/types";

const rolesList: { value: AppRole; label: string; desc: string }[] = [
  {
    value: "super_admin",
    label: "Director General (Principal de Principales)",
    desc: "Control absoluto de usuarios, publicaciones, roles, base de datos y auditoría.",
  },
  {
    value: "editor_in_chief",
    label: "Jefe de Redacción",
    desc: "Aprobación y publicación final de artículos, gestión de banners y festividades.",
  },
  {
    value: "journalist",
    label: "Periodista Redactor",
    desc: "Creación y edición de sus propios artículos (quedan en borrador o revisión).",
  },
  {
    value: "columnist",
    label: "Columnista de Opinión",
    desc: "Publicación de artículos en la sección de Opinión y Columnas.",
  },
  {
    value: "radio_operator",
    label: "Operador de Radio",
    desc: "Control de emisión radial, programas al aire y parrilla semanal de 98.5 FM.",
  },
  {
    value: "moderator",
    label: "Moderador de Comentarios",
    desc: "Revisión y aprobación de comentarios de lectores.",
  },
];

export default function UsersAdminClient({
  initialProfiles,
}: {
  initialProfiles: Profile[];
}) {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  const handleRoleChange = async (userId: string, newRole: AppRole) => {
    setLoadingId(userId);
    setSuccessId(null);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });

      if (res.ok) {
        setProfiles((prev) =>
          prev.map((p) => (p.id === userId ? { ...p, role: newRole } : p))
        );
        setSuccessId(userId);
        setTimeout(() => setSuccessId(null), 2500);
      }
    } finally {
      setLoadingId(null);
    }
  };

  const handleStatusToggle = async (userId: string, currentStatus: boolean) => {
    setLoadingId(userId);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, isActive: !currentStatus }),
      });

      if (res.ok) {
        setProfiles((prev) =>
          prev.map((p) => (p.id === userId ? { ...p, is_active: !currentStatus } : p))
        );
      }
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-950/40 to-slate-900 p-6 rounded-lg border border-red-900/40 flex items-start gap-4">
        <ShieldAlert className="w-8 h-8 text-amber-400 shrink-0 mt-1" />
        <div>
          <h2 className="font-serif text-lg font-bold text-white mb-1">
            Gestión Jerárquica de Roles (Solo Director General)
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed">
            Como <strong>Principal de principales (vdnnoticias@gmail.com)</strong>, tienes la facultad de designar jefes de redacción, periodistas, conductores de radio y moderadores. Cualquier cambio surte efecto inmediato en las políticas RLS de PostgreSQL en Supabase.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-slate-50 flex items-center justify-between text-xs text-gray-600">
          <span className="font-semibold">
            {profiles.length} cuenta{profiles.length !== 1 ? "s" : ""} registrada{profiles.length !== 1 ? "s" : ""}
          </span>
          <span className="text-[11px] text-gray-400">
            Tabla public.profiles enlazada a auth.users
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-gray-600 uppercase text-[10px] tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3 px-5">Usuario / Periodista</th>
                <th className="py-3 px-4">Correo Electrónico</th>
                <th className="py-3 px-4">Rol Asignado</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-right">Modificar Rol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {profiles.map((p) => {
                const isMasterUser = p.email === "vdnnoticias@gmail.com";
                return (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-[#0A192F] whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-900 text-amber-400 text-[10px] font-bold flex items-center justify-center">
                          {p.full_name?.slice(0, 2).toUpperCase() || "VD"}
                        </div>
                        <div>
                          <span>{p.full_name}</span>
                          {isMasterUser && (
                            <span className="ml-2 bg-red-600 text-white text-[9px] font-black uppercase px-1.5 py-0.2 rounded">
                              Dueño
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-600 text-[11px]">
                      {p.email}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-gray-800 text-[11px]">
                        {rolesList.find((r) => r.value === p.role)?.label || p.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {p.is_active ? (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Activo
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Inactivo
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      {isMasterUser ? (
                        <span className="text-[11px] text-gray-400 italic">
                          Rol Protegido
                        </span>
                      ) : (
                        <div className="inline-flex items-center gap-2">
                          <select
                            disabled={loadingId === p.id}
                            value={p.role}
                            onChange={(e) =>
                              handleRoleChange(p.id, e.target.value as AppRole)
                            }
                            className="text-xs bg-slate-50 border border-gray-300 p-1.5 rounded focus:ring-2 focus:ring-amber-500 font-medium"
                          >
                            {rolesList.map((r) => (
                              <option key={r.value} value={r.value}>
                                {r.label}
                              </option>
                            ))}
                          </select>

                          <button
                            disabled={loadingId === p.id}
                            onClick={() => handleStatusToggle(p.id, p.is_active)}
                            className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${
                              p.is_active
                                ? "bg-red-50 text-red-700 hover:bg-red-100"
                                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            }`}
                          >
                            {p.is_active ? "Suspender" : "Reactivar"}
                          </button>

                          {successId === p.id && (
                            <Check size={14} className="text-emerald-600 animate-bounce" />
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
