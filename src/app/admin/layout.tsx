import { getCurrentProfile } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();

  // El middleware ya maneja la redirección de seguridad.
  // Si no hay perfil pero estamos en login, renderizamos directamente el contenido.
  if (!profile) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden text-navy-950 font-body">
      {/* Sidebar fijo a la izquierda */}
      <AdminSidebar
        userRole={profile.role}
        userEmail={profile.email}
      />

      {/* Área Principal de Contenido */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AdminHeader profile={profile} />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
