import { createServerClient } from "@/lib/supabase/server";
import RadioAdminClient from "@/components/admin/RadioAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminRadioPage() {
  const supabase = createServerClient();
  const { data } = await supabase.from("radio_settings").select("*").limit(1).single();

  const settings = data || {
    stream_url: "https://stream.zeno.fm/f3wvbbqmdg8uv",
    radio_name: "VDN Radio 98.5 FM",
    slogan: "Información veraz, oportuna y sin censura desde Jauja",
    is_broadcasting: true,
    current_program: "El Noticiero Central de VDN (Edición Matinal)",
    current_host: "Mesa de Redacción",
  };

  return <RadioAdminClient initialSettings={settings} />;
}
