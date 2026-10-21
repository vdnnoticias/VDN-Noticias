import { createServerClient } from "@/lib/supabase/server";
import {
  festivitiesData,
  jaujaAttractions,
  type Festivity as UI_Festivity,
  type TouristAttraction,
} from "@/lib/tourism-data";

const isSupabaseConfigured = (): boolean => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !!url && !url.includes("your_supabase");
};

const scopeMap: Record<string, string> = {
  mantaro: "Valle del Mantaro (Jauja)",
  junin: "Región Junín",
  nacional: "Nacional (Perú)",
  internacional: "Internacional",
};

const monthMap: Record<number, string> = {
  1: "Enero",
  2: "Febrero",
  3: "Marzo",
  4: "Abril",
  5: "Mayo",
  6: "Junio",
  7: "Julio",
  8: "Agosto",
  9: "Septiembre",
  10: "Octubre",
  11: "Noviembre",
  12: "Diciembre",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapFestivityRow(row: any): UI_Festivity {
  return {
    id: row.id,
    name: row.name,
    scope: row.scope,
    scopeLabel: scopeMap[row.scope] || "General",
    month: row.month,
    monthLabel: monthMap[row.month] || "",
    days: row.days,
    location: row.location,
    city: row.city,
    description: row.description,
    history: row.history || "",
    imageUrl:
      row.image_url ||
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2000&auto=format&fit=crop",
    heritageStatus: row.heritage_status || undefined,
    traditionalDishes: row.traditional_dishes || [],
    tipsForTourists: row.tips_for_tourists || "",
    isHighlight: row.is_highlight,
  };
}

export const TourismService = {
  /**
   * Obtiene todas las festividades desde Supabase (con fallback local completo).
   */
  getAllFestivities: async (): Promise<UI_Festivity[]> => {
    if (!isSupabaseConfigured()) return festivitiesData;

    try {
      const supabase = createServerClient();
      const { data, error } = await supabase
        .from("festivities")
        .select("*")
        .order("month", { ascending: true });

      if (error || !data || data.length === 0) {
        return festivitiesData;
      }

      return data.map(mapFestivityRow);
    } catch {
      return festivitiesData;
    }
  },

  /**
   * Obtiene atractivos turísticos de Jauja y alrededores.
   */
  getAttractions: (): TouristAttraction[] => {
    return jaujaAttractions;
  },
};
