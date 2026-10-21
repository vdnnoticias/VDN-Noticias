"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Calendar,
  Radio,
  Image as ImageIcon,
  Users,
  History,
  ExternalLink,
} from "lucide-react";
import type { AppRole } from "@/lib/supabase/types";

interface AdminSidebarProps {
  userRole: AppRole;
  userEmail: string;
}

export default function AdminSidebar({ userRole, userEmail }: AdminSidebarProps) {
  const pathname = usePathname();

  const isSuperAdmin = userRole === "super_admin" || userEmail === "vdnnoticias@gmail.com";
  const canPublish = isSuperAdmin || userRole === "editor_in_chief";

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
      allowed: true,
    },
    {
      name: "Artículos & Noticias",
      href: "/admin/articulos",
      icon: FileText,
      allowed: true,
    },
    {
      name: "Comentarios",
      href: "/admin/comentarios",
      icon: MessageSquare,
      allowed: isSuperAdmin || userRole === "editor_in_chief" || userRole === "moderator",
    },
    {
      name: "Festividades & Turismo",
      href: "/admin/turismo",
      icon: Calendar,
      allowed: canPublish,
    },
    {
      name: "Radio 98.5 FM",
      href: "/admin/radio",
      icon: Radio,
      allowed: isSuperAdmin || userRole === "editor_in_chief" || userRole === "radio_operator",
    },
    {
      name: "Publicidad & Banners",
      href: "/admin/banners",
      icon: ImageIcon,
      allowed: canPublish,
    },
    {
      name: "Usuarios & Permisos",
      href: "/admin/usuarios",
      icon: Users,
      badge: "Director",
      allowed: isSuperAdmin,
    },
    {
      name: "Bitácora de Auditoría",
      href: "/admin/auditoria",
      icon: History,
      allowed: isSuperAdmin,
    },
  ];

  return (
    <aside className="w-64 bg-[#071324] text-slate-300 flex flex-col shrink-0 border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800 gap-3">
        <div className="w-8 h-8 bg-red-700 text-white font-black text-sm flex items-center justify-center rounded-sm shadow-md">
          V
        </div>
        <div>
          <span className="font-serif text-lg font-black text-white tracking-tight block leading-none">
            VDN <span className="text-amber-400 text-sm">ADMIN</span>
          </span>
          <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">
            Mesa Editorial
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">
          Gestión de Contenidos
        </div>

        {navigation
          .filter((item) => item.allowed)
          .map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-sm text-xs font-medium transition-all ${
                  isActive
                    ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                    : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} className={isActive ? "text-slate-950" : "text-gray-400"} />
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-xs tracking-wider ${
                      isActive
                        ? "bg-slate-950 text-amber-400"
                        : "bg-red-950 text-red-300 border border-red-800"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
      </nav>

      {/* Quick link to public portal */}
      <div className="p-4 border-t border-slate-800 text-xs">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between p-2.5 rounded-sm bg-slate-900/60 hover:bg-slate-800 text-gray-300 hover:text-white transition-colors border border-slate-800"
        >
          <span className="flex items-center gap-2 text-[11px]">
            <ExternalLink size={13} className="text-amber-400" />
            <span>Ver Portal Público</span>
          </span>
          <span className="text-[10px] text-gray-500">En vivo &rarr;</span>
        </Link>
      </div>
    </aside>
  );
}
