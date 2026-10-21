"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Save,
  Send,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const sections = [
  { value: "jauja-y-region", label: "Jauja y Región (Valle del Mantaro)" },
  { value: "nacional", label: "Nacional (Perú)" },
  { value: "internacional", label: "Internacional" },
  { value: "opinion", label: "Opinión y Análisis" },
  { value: "cultura", label: "Cultura & Tradición" },
  { value: "deportes", label: "Deportes VDN" },
];

export default function NuevoArticuloPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [contentHtml, setContentHtml] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [section, setSection] = useState("jauja-y-region");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);
  const [readingTime, setReadingTime] = useState(3);
  const [tagsInput, setTagsInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Generador de slug limpio a partir del título
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(val));
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")
      .slice(0, 100);
  };

  const handleSubmit = async (targetStatus: "draft" | "review" | "published") => {
    setErrorMsg("");
    setSuccessMsg("");

    if (!title.trim() || !slug.trim() || !excerpt.trim() || !contentHtml.trim()) {
      setErrorMsg("Completa los campos obligatorios: Título, Slug, Resumen y Contenido.");
      return;
    }

    setIsLoading(true);

    const tagsArray = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    try {
      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          contentHtml: contentHtml.includes("<p>")
            ? contentHtml
            : `<p class="lead text-base mb-4 leading-relaxed">${contentHtml.replace(/\n\n/g, "</p><p class='mb-4 leading-relaxed'>")}</p>`,
          coverImageUrl: coverImageUrl || null,
          section,
          isFeatured,
          isBreaking,
          status: targetStatus,
          readingTimeMinutes: readingTime,
          tags: tagsArray,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Error al guardar el artículo");
        setIsLoading(false);
        return;
      }

      setSuccessMsg(
        targetStatus === "published"
          ? "¡Artículo publicado con éxito en el portal!"
          : "¡Borrador guardado correctamente!"
      );

      setTimeout(() => {
        router.push("/admin/articulos");
        router.refresh();
      }, 1200);
    } catch {
      setErrorMsg("Error de red al conectar con el servidor.");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Barra superior de navegación */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/articulos"
            className="p-2 rounded-sm bg-white border border-gray-200 hover:bg-slate-100 text-gray-600 transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="font-serif text-2xl font-black text-[#0A192F]">
              Redactar Nueva Noticia
            </h1>
            <p className="text-xs text-gray-500">
              Mesa de Redacción Digital &middot; VDN Noticias Jauja
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isLoading}
            onClick={() => handleSubmit("draft")}
            className="bg-white hover:bg-slate-100 text-gray-700 text-xs font-bold px-4 py-2.5 rounded-sm border border-gray-300 transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <Save size={14} />
            <span>Guardar Borrador</span>
          </button>

          <button
            type="button"
            disabled={isLoading}
            onClick={() => handleSubmit("published")}
            className="bg-red-700 hover:bg-red-800 text-white text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-sm shadow-sm transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <Send size={14} />
            <span>Publicar en Portada</span>
          </button>
        </div>
      </div>

      {/* Alertas */}
      {errorMsg && (
        <div className="p-4 bg-red-50 border-l-4 border-red-600 rounded-r text-xs text-red-700 flex items-center gap-2">
          <AlertCircle size={16} className="shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 bg-emerald-50 border-l-4 border-emerald-600 rounded-r text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 size={16} className="shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Formulario en dos columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna Izquierda: Redacción Principal (2 cols) */}
        <div className="lg:col-span-2 space-y-5">
          {/* Título */}
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Titular Principal <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Ej. Aprueban Presupuesto Histórico para Pavimentación en Jauja..."
                className="w-full text-base sm:text-lg font-serif font-bold text-gray-900 border border-gray-300 p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                Slug Permanente (URL) <span className="text-red-600">*</span>
              </label>
              <div className="flex items-center text-xs text-gray-400 bg-slate-50 border border-gray-200 rounded-sm px-3 py-2 font-mono">
                <span className="hidden sm:inline">vdn.pe/noticia/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="bg-transparent text-gray-900 focus:outline-none flex-1 ml-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Bajada / Resumen (Excerpt) <span className="text-red-600">*</span>
              </label>
              <textarea
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Breve resumen de 2 o 3 líneas que contextualiza la noticia para la portada y redes sociales..."
                className="w-full text-xs text-gray-800 border border-gray-300 p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
              />
            </div>
          </div>

          {/* Cuerpo de la Noticia */}
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Cuerpo del Artículo (HTML o Texto) <span className="text-red-600">*</span>
              </label>
              <span className="text-[11px] text-gray-400">Párrafos con saltos de línea</span>
            </div>
            <textarea
              rows={14}
              value={contentHtml}
              onChange={(e) => setContentHtml(e.target.value)}
              placeholder="Escribe aquí el desarrollo de la noticia. Puedes usar párrafos normales o etiquetas HTML como <h2>, <blockquote>, etc."
              className="w-full font-serif text-sm text-gray-800 border border-gray-300 p-4 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
            />
          </div>
        </div>

        {/* Columna Derecha: Metadatos y Opciones Editoriales (1 col) */}
        <div className="space-y-5">
          {/* Sección y Categoría */}
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs space-y-4">
            <h3 className="font-serif text-sm font-bold text-[#0A192F] pb-2 border-b border-gray-100">
              Categorización Editorial
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Sección
              </label>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-gray-300 p-2.5 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              >
                {sections.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Tiempo de Lectura Estimado
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={readingTime}
                  onChange={(e) => setReadingTime(Number(e.target.value))}
                  className="w-20 text-xs border border-gray-300 p-2 rounded-sm text-center font-bold"
                />
                <span className="text-xs text-gray-500">minutos</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Etiquetas / Palabras Clave
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Jauja, Obras, Economía..."
                className="w-full text-xs border border-gray-300 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <span className="text-[10px] text-gray-400 mt-1 block">Separadas por comas</span>
            </div>
          </div>

          {/* Imagen de Portada */}
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs space-y-3">
            <h3 className="font-serif text-sm font-bold text-[#0A192F] pb-2 border-b border-gray-100">
              Imagen Principal
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                URL de la Fotografía
              </label>
              <input
                type="url"
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full text-xs border border-gray-300 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {coverImageUrl ? (
              <div className="relative w-full h-36 rounded-sm overflow-hidden bg-slate-900 border border-gray-200 mt-2">
                <Image
                  src={coverImageUrl}
                  alt="Vista previa"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="w-full h-24 rounded-sm border-2 border-dashed border-gray-200 flex items-center justify-center text-xs text-gray-400">
                Sin imagen seleccionada
              </div>
            )}
          </div>

          {/* Opciones Especiales */}
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs space-y-3">
            <h3 className="font-serif text-sm font-bold text-[#0A192F] pb-2 border-b border-gray-100">
              Visibilidad Especial
            </h3>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
              />
              <span className="text-xs text-gray-700 font-medium">
                Destacar como Noticia Principal (Hero)
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isBreaking}
                onChange={(e) => setIsBreaking(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
              />
              <span className="text-xs text-red-700 font-bold">
                Alerta de Último Minuto (Breaking News)
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
