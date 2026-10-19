"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X, FileText } from "lucide-react";
import { NewsService } from "@/services/news.service";
import ArticleCard from "@/components/public/ArticleCard";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const quickTerms = ["Jauja", "Aeropuerto", "Tunantada", "Papa Nativa", "Hospital Olavegoya", "Copa Perú"];

  const results = useMemo(() => {
    return NewsService.searchArticles(query);
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera del Buscador */}
        <div className="bg-white p-6 sm:p-10 rounded-sm border border-gray-200 shadow-xs mb-8 text-center max-w-3xl mx-auto">
          <span className="text-[10px] font-black uppercase tracking-widest text-red-700 block mb-2">
            Hemeroteca &middot; Búsqueda en VDN
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#0A192F] mb-4">
            Buscador de Noticias y Reportajes
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mb-6">
            Ingresa palabras clave, nombres de autoridades, festividades o temas de interés en Jauja y el país.
          </p>

          {/* Input de Búsqueda */}
          <div className="relative max-w-xl mx-auto mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ej. Aeropuerto Francisco Carlé, Sausa, Tunantada..."
              className="w-full bg-slate-50 text-sm text-gray-900 pl-12 pr-10 py-3.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-inner"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Borrar búsqueda"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Términos Rápidos */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-gray-500">
            <span className="font-semibold text-gray-400">Tendencias:</span>
            {quickTerms.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 px-2.5 py-1 rounded-full text-[11px] transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Resultados de la Búsqueda */}
        {query.trim() === "" ? (
          <div className="bg-white p-12 text-center rounded-sm border border-gray-200 max-w-md mx-auto text-gray-400">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="text-sm">Escribe un término en el recuadro superior para iniciar la búsqueda.</p>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-200">
              <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wide">
                Resultados para &quot;<span className="text-red-700">{query}</span>&quot;
              </h2>
              <span className="text-xs text-gray-500">
                {results.length} noticia{results.length !== 1 ? "s" : ""} encontrada{results.length !== 1 ? "s" : ""}
              </span>
            </div>

            {results.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-sm border border-gray-200">
                <h3 className="font-serif text-lg font-bold text-navy-950 mb-2">
                  No se encontraron noticias con esos términos
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto mb-4">
                  Verifica que las palabras estén bien escritas o prueba con términos más generales.
                </p>
                <button
                  onClick={() => setQuery("")}
                  className="bg-[#0A192F] text-white text-xs font-bold px-4 py-2 rounded-xs"
                >
                  Limpiar búsqueda
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((art) => (
                  <ArticleCard
                    key={art.id}
                    title={art.title}
                    excerpt={art.excerpt}
                    coverImageUrl={art.imageUrl}
                    section={art.section}
                    publishedAt={art.date}
                    authorName={art.author}
                    slug={art.slug || art.id}
                    isBreaking={art.isBreaking}
                  />
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default function BuscarPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 py-12 text-center text-xs">Cargando buscador...</div>}>
      <SearchContent />
    </Suspense>
  );
}
