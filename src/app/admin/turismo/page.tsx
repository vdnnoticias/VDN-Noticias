import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { TourismService } from "@/services/tourism.service";

export const dynamic = "force-dynamic";

export default async function AdminTurismoPage() {
  const festivities = await TourismService.getAllFestivities();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="font-serif text-2xl font-black text-[#0A192F]">
            Calendario de Festividades &amp; Turismo
          </h1>
          <p className="text-xs text-gray-500">
            Administra las fiestas patronales, danzas tradicionales y atractivos del Valle del Mantaro y la Región Junín
          </p>
        </div>

        <Link
          href="/turismo"
          target="_blank"
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-sm shadow-sm transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <span>Ver Calendario en Vivo</span>
        </Link>
      </div>

      {/* Grid de Festividades */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {festivities.map((fest) => (
          <div
            key={fest.id}
            className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative w-full h-40 bg-slate-900">
                <Image
                  src={fest.imageUrl}
                  alt={fest.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-2.5 left-2.5 bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded shadow uppercase">
                  {fest.days}
                </div>
                {fest.heritageStatus && (
                  <div className="absolute top-2.5 right-2.5 bg-red-700 text-white font-bold text-[9px] px-2 py-0.5 rounded shadow">
                    {fest.heritageStatus.includes("UNESCO") ? "UNESCO" : "Nacional"}
                  </div>
                )}
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
                  <MapPin size={12} className="text-red-600" />
                  <span>{fest.location} &mdash; {fest.city}</span>
                </div>

                <h3 className="font-serif text-base font-bold text-[#0A192F] leading-snug">
                  {fest.name}
                </h3>

                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {fest.description}
                </p>

                {fest.traditionalDishes.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2">
                    {fest.traditionalDishes.slice(0, 2).map((dish, i) => (
                      <span
                        key={i}
                        className="bg-amber-50 text-amber-900 border border-amber-200 text-[10px] px-1.5 py-0.2 rounded"
                      >
                        {dish}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="px-4 py-3 bg-slate-50 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold text-gray-500 uppercase">
                {fest.scopeLabel}
              </span>
              <span className="text-amber-700 font-bold text-[11px]">
                Mes {fest.month} ({fest.monthLabel})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
