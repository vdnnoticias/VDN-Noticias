"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Search,
  Utensils,
  Compass,
  Award,
  X,
  ChevronRight,
  Info,
} from "lucide-react";
import {
  festivitiesData,
  jaujaAttractions,
  type Festivity,
} from "@/lib/tourism-data";

const months = [
  { value: 0, label: "Todo el Año" },
  { value: 1, label: "Enero" },
  { value: 2, label: "Febrero" },
  { value: 3, label: "Marzo" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Mayo" },
  { value: 6, label: "Junio" },
  { value: 7, label: "Julio" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Septiembre" },
  { value: 10, label: "Octubre" },
  { value: 11, label: "Noviembre" },
  { value: 12, label: "Diciembre" },
];

const scopes = [
  { value: "all", label: "Todos los Ámbitos" },
  { value: "mantaro", label: "Valle del Mantaro (Jauja)" },
  { value: "junin", label: "Región Junín" },
  { value: "nacional", label: "Nacional (Perú)" },
  { value: "internacional", label: "Internacional" },
];

export default function TurismoPage() {
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [selectedScope, setSelectedScope] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalFestivity, setActiveModalFestivity] = useState<Festivity | null>(null);

  // Filtrado reactivo de festividades
  const filteredFestivities = useMemo(() => {
    return festivitiesData.filter((item) => {
      const matchesMonth = selectedMonth === 0 || item.month === selectedMonth;
      const matchesScope = selectedScope === "all" || item.scope === selectedScope;
      const matchesQuery =
        searchQuery === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.traditionalDishes.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesMonth && matchesScope && matchesQuery;
    });
  }, [selectedMonth, selectedScope, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* 1. HERO BANNER DE TURISMO Y CULTURA */}
      <section className="relative w-full h-[380px] md:h-[460px] bg-slate-900 overflow-hidden flex items-center justify-center text-white">
        <Image
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop"
          alt="Laguna de Paca y Turismo en Jauja"
          fill
          priority
          className="object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071324] via-black/40 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-xs">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Guía Turística &amp; Calendario Vivo</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 text-white drop-shadow-md">
            Fiestas, Costumbres y Turismo en Jauja
          </h1>

          <p className="text-gray-200 text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed drop-shadow-sm font-sans">
            Descubre la riqueza folclórica, danzas patrimoniales, paisajes altoandinos y sabores autóctonos de la <strong className="text-amber-300">Primera Capital Histórica del Perú</strong>, el Valle del Mantaro y el mundo.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
            <a
              href="#calendario"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-full transition-all shadow-lg flex items-center gap-2 transform hover:scale-105"
            >
              <Calendar className="w-4 h-4" />
              <span>Explorar Calendario de Fiestas</span>
            </a>
            <a
              href="#atractivos"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-full transition-all border border-white/20 backdrop-blur-xs"
            >
              Ver Atractivos de Jauja
            </a>
          </div>
        </div>
      </section>

      {/* 2. CALENDARIO DINÁMICO DE FIESTAS Y COSTUMBRES */}
      <section id="calendario" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="border-b-2 border-amber-500 pb-4 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 block mb-1">
              Patrimonio Inmaterial &amp; Tradición
            </span>
            <h2 className="font-serif text-3xl font-black text-[#0A192F]">
              Calendario Dinámico de Festividades
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Filtra por mes, ámbito territorial o busca tu festividad y danza favorita.
            </p>
          </div>

          {/* Buscador en Tiempo Real */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar festividad, ciudad o plato..."
              className="w-full bg-white text-xs text-gray-900 pl-10 pr-4 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filtros por Ámbito */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-bold text-gray-500 mr-2 uppercase tracking-wide">
            Ámbito:
          </span>
          {scopes.map((scope) => (
            <button
              key={scope.value}
              onClick={() => setSelectedScope(scope.value)}
              className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                selectedScope === scope.value
                  ? "bg-[#0A192F] text-white shadow-sm"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {scope.label}
            </button>
          ))}
        </div>

        {/* Filtros por Mes (Carrusel de Tabs) */}
        <div className="bg-white p-2 rounded-xl shadow-xs border border-gray-200 mb-8 overflow-x-auto scrollbar-none">
          <div className="flex items-center space-x-1 min-w-max">
            {months.map((m) => (
              <button
                key={m.value}
                onClick={() => setSelectedMonth(m.value)}
                className={`text-xs font-bold px-4 py-2 rounded-lg transition-all ${
                  selectedMonth === m.value
                    ? "bg-amber-500 text-slate-950 shadow-xs"
                    : "text-gray-600 hover:bg-slate-100 hover:text-navy-950"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Conteo de Resultados */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-6">
          <span>
            Mostrando <strong>{filteredFestivities.length}</strong> festividades encontradas
          </span>
          {(selectedMonth !== 0 || selectedScope !== "all" || searchQuery !== "") && (
            <button
              onClick={() => {
                setSelectedMonth(0);
                setSelectedScope("all");
                setSearchQuery("");
              }}
              className="text-red-700 hover:underline font-semibold"
            >
              Limpiar todos los filtros
            </button>
          )}
        </div>

        {/* Cuadrícula de Tarjetas de Festividades */}
        {filteredFestivities.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-lg border border-gray-200 shadow-xs">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-navy-950 mb-1">
              No se encontraron festividades con estos criterios
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto mb-4">
              Prueba cambiando el mes o borrando la búsqueda para ver más celebraciones del calendario.
            </p>
            <button
              onClick={() => {
                setSelectedMonth(0);
                setSelectedScope("all");
                setSearchQuery("");
              }}
              className="bg-[#0A192F] text-white text-xs font-bold px-4 py-2 rounded-md"
            >
              Ver todas las festividades
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFestivities.map((fest) => (
              <article
                key={fest.id}
                className="group flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300"
              >
                {/* Imagen y Badges */}
                <div className="relative w-full h-52 bg-slate-900 overflow-hidden">
                  <Image
                    src={fest.imageUrl}
                    alt={fest.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Fecha Destacada */}
                  <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded shadow-md uppercase tracking-wider">
                    {fest.days}
                  </div>

                  {/* Estado Patrimonial si existe */}
                  {fest.heritageStatus && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      <span>{fest.heritageStatus.includes("UNESCO") ? "UNESCO" : "Nacional"}</span>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-semibold text-amber-300 block mb-0.5">
                      {fest.scopeLabel}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-300">
                      <MapPin size={12} className="text-red-500" />
                      <span>{fest.city}</span>
                    </div>
                  </div>
                </div>

                {/* Contenido de la Tarjeta */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#0A192F] leading-snug mb-2 group-hover:text-amber-600 transition-colors">
                      {fest.name}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                      {fest.description}
                    </p>
                  </div>

                  <div>
                    {/* Platos Típicos */}
                    <div className="pt-3 border-t border-gray-100 mb-4">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700 mb-1.5">
                        <Utensils size={12} className="text-amber-600" />
                        <span>Gastronomía típica:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {fest.traditionalDishes.slice(0, 2).map((dish, i) => (
                          <span
                            key={i}
                            className="bg-amber-50 text-amber-900 border border-amber-200/60 text-[10px] px-2 py-0.5 rounded"
                          >
                            {dish}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveModalFestivity(fest)}
                      className="w-full bg-slate-100 hover:bg-[#0A192F] hover:text-white text-[#0A192F] text-xs font-bold py-2 rounded transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Ver Ficha Completa &amp; Consejos</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 3. ATRACTIVOS TURÍSTICOS IMPERDIBLES DE JAUJA */}
      <section id="atractivos" className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-red-700 block mb-1">
              Rutas y Circuitos del Valle
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#0A192F] mb-3">
              Atractivos Imperdibles en la Provincia de Jauja
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Jauja fue designada como Primera Capital del Perú en 1534 gracias a su benigno clima, abundante agua y fertilidad agrícola. Planifica tu itinerario con estos destinos esenciales:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {jaujaAttractions.map((att) => (
              <div
                key={att.id}
                className="flex flex-col sm:flex-row bg-slate-50 border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative w-full sm:w-2/5 h-56 sm:h-auto min-h-[200px]">
                  <Image
                    src={att.imageUrl}
                    alt={att.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-[#0A192F] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    {att.categoryLabel}
                  </span>
                </div>

                <div className="p-6 sm:w-3/5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-amber-700 font-semibold mb-1">
                      <MapPin size={13} />
                      <span>{att.location}</span>
                      <span>&middot;</span>
                      <span className="text-gray-500 font-normal">{att.distanceFromJauja}</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#0A192F] mb-2 leading-tight">
                      {att.name}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed mb-4">
                      {att.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                      Actividades destacadas:
                    </span>
                    <ul className="text-xs text-slate-700 space-y-1">
                      {att.activities.map((act, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MODAL DETALLADO DE FESTIVIDAD */}
      {activeModalFestivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in">
          <div className="bg-white text-navy-950 w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden border border-amber-500/30">
            {/* Header del Modal con Imagen */}
            <div className="relative w-full h-56 bg-slate-900">
              <Image
                src={activeModalFestivity.imageUrl}
                alt={activeModalFestivity.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <button
                onClick={() => setActiveModalFestivity(null)}
                className="absolute top-3 right-3 bg-black/60 hover:bg-black text-white p-1.5 rounded-full transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded shadow uppercase">
                  {activeModalFestivity.days}
                </span>
                <h3 className="font-serif text-2xl font-black mt-1 leading-tight text-white drop-shadow-md">
                  {activeModalFestivity.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-300 mt-1">
                  <MapPin size={13} className="text-red-400" />
                  <span>{activeModalFestivity.location} &mdash; {activeModalFestivity.city}</span>
                </div>
              </div>
            </div>

            {/* Cuerpo del Modal */}
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-5 text-xs sm:text-sm">
              <div>
                <h4 className="font-bold text-gray-900 uppercase text-xs tracking-wider mb-1 flex items-center gap-1.5">
                  <Info size={14} className="text-amber-600" />
                  <span>Descripción &amp; Manifestación</span>
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {activeModalFestivity.description}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 uppercase text-xs tracking-wider mb-1">
                  Historia y Significado Cultural
                </h4>
                <p className="text-gray-700 leading-relaxed bg-slate-50 p-3 rounded border border-gray-100">
                  {activeModalFestivity.history}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 uppercase text-xs tracking-wider mb-2 flex items-center gap-1.5">
                  <Utensils size={14} className="text-amber-600" />
                  <span>Platos Típicos Tradicionales para Degustar</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalFestivity.traditionalDishes.map((dish, idx) => (
                    <span
                      key={idx}
                      className="bg-amber-100 text-amber-900 font-semibold px-3 py-1 rounded-full text-xs border border-amber-300"
                    >
                      {dish}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r">
                <h4 className="font-bold text-blue-900 uppercase text-xs tracking-wider mb-1">
                  Consejo para el Visitante / Turista
                </h4>
                <p className="text-blue-800 text-xs leading-relaxed">
                  {activeModalFestivity.tipsForTourists}
                </p>
              </div>
            </div>

            {/* Footer del Modal */}
            <div className="px-6 py-3 bg-slate-100 border-t border-gray-200 flex justify-between items-center text-xs">
              <span className="text-gray-500 font-medium">VDN Noticias &middot; Guía de Tradiciones</span>
              <button
                onClick={() => setActiveModalFestivity(null)}
                className="bg-[#0A192F] hover:bg-navy-800 text-white font-bold px-5 py-2 rounded text-xs transition-colors"
              >
                Cerrar Ficha
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
