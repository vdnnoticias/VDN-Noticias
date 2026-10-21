import { getCurrentProfile, createServiceClient } from "@/lib/supabase/server";
import UsersAdminClient from "@/components/admin/UsersAdminClient";
import { ShieldX } from "lucide-react";
import type { Profile } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function UsuariosAdminPage() {
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
          Solo la cuenta del Director General (vdnnoticias@gmail.com) cuenta con los permisos necesarios para gestionar roles y accesos al sistema.
        </p>
      </div>
    );
  }

  const supabase = createServiceClient();
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: true });

  const safeProfiles: Profile[] = profiles || [profile];

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="font-serif text-2xl font-black text-[#0A192F]">
          Control Jerárquico de Usuarios &amp; Redacción
        </h1>
        <p className="text-xs text-gray-500">
          Asigna roles editoriales, aprueba redactores y supervisa accesos de personal de VDN
        </p>
      </div>

      <UsersAdminClient initialProfiles={safeProfiles} />
    </div>
  );
}
