"use client";

import { useState } from "react";
import { Radio, Save, CheckCircle2, AlertCircle, Clock } from "lucide-react";

interface RadioAdminProps {
  initialSettings: {
    stream_url: string;
    radio_name: string;
    slogan: string;
    is_broadcasting: boolean;
    current_program: string;
    current_host: string;
  };
}

export default function RadioAdminClient({ initialSettings }: RadioAdminProps) {
  const [streamUrl, setStreamUrl] = useState(initialSettings.stream_url || "https://stream.zeno.fm/f3wvbbqmdg8uv");
  const [radioName, setRadioName] = useState(initialSettings.radio_name || "VDN Radio 98.5 FM");
  const [slogan, setSlogan] = useState(initialSettings.slogan || "Información veraz, oportuna y sin censura desde Jauja");
  const [isBroadcasting, setIsBroadcasting] = useState(initialSettings.is_broadcasting ?? true);
  const [currentProgram, setCurrentProgram] = useState(initialSettings.current_program || "El Noticiero Central de VDN (Edición Matinal)");
  const [currentHost, setCurrentHost] = useState(initialSettings.current_host || "Mesa de Redacción");

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/radio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          streamUrl,
          radioName,
          slogan,
          isBroadcasting,
          currentProgram,
          currentHost,
        }),
      });

      if (!res.ok) {
        throw new Error("No se pudo guardar la configuración");
      }

      setMessage({ type: "success", text: "¡Configuración de radio actualizada con éxito!" });
    } catch {
      setMessage({ type: "error", text: "Ocurrió un error al guardar los cambios." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="font-serif text-2xl font-black text-[#0A192F]">
          Control de Transmisión Radial 98.5 FM
        </h1>
        <p className="text-xs text-gray-500">
          Modifica el flujo de audio en vivo, programa actual al aire y conductores en cabina
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-md text-xs flex items-center gap-2 ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-serif text-base font-bold text-[#0A192F] pb-2 border-b border-gray-100 flex items-center gap-2">
              <Radio size={16} className="text-red-700" />
              <span>Parámetros de la Señal</span>
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Nombre de la Estación
              </label>
              <input
                type="text"
                value={radioName}
                onChange={(e) => setRadioName(e.target.value)}
                className="w-full text-xs border border-gray-300 p-2.5 rounded-sm focus:ring-2 focus:ring-amber-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Lema / Slogan
              </label>
              <input
                type="text"
                value={slogan}
                onChange={(e) => setSlogan(e.target.value)}
                className="w-full text-xs border border-gray-300 p-2.5 rounded-sm focus:ring-2 focus:ring-amber-500 italic"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                URL del Servidor Streaming (Icecast / Zeno FM / Shoutcast)
              </label>
              <input
                type="url"
                value={streamUrl}
                onChange={(e) => setStreamUrl(e.target.value)}
                className="w-full text-xs font-mono border border-gray-300 p-2.5 rounded-sm focus:ring-2 focus:ring-amber-500"
              />
              <span className="text-[10px] text-gray-400 mt-1 block">
                Alimentador del reproductor superior y la cabina de radio
              </span>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isBroadcasting}
                  onChange={(e) => setIsBroadcasting(e.target.checked)}
                  className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                />
                <div>
                  <span className="text-xs font-bold text-gray-900 block">
                    Señal en Directo Habilitada
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Si se desactiva, mostrará estado &ldquo;Fuera de Aire&rdquo; en el reproductor.
                  </span>
                </div>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-base font-bold text-[#0A192F] pb-2 border-b border-gray-100 flex items-center gap-2">
              <Clock size={16} className="text-amber-600" />
              <span>Al Aire Actualmente</span>
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Programa en Emisión
              </label>
              <input
                type="text"
                value={currentProgram}
                onChange={(e) => setCurrentProgram(e.target.value)}
                placeholder="Ej. El Noticiero Central de VDN"
                className="w-full text-xs border border-gray-300 p-2.5 rounded-sm focus:ring-2 focus:ring-amber-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Conductor(es) / Mesa de Conducción
              </label>
              <input
                type="text"
                value={currentHost}
                onChange={(e) => setCurrentHost(e.target.value)}
                placeholder="Ej. Elena Vílchez y Mesa Central"
                className="w-full text-xs border border-gray-300 p-2.5 rounded-sm focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Vista Previa del Widget */}
            <div className="p-4 bg-[#0A192F] text-white rounded-lg mt-4 border border-amber-500/30">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
                Vista previa del reproductor:
              </span>
              <div className="font-serif text-sm font-bold text-white mb-0.5">
                {currentProgram}
              </div>
              <div className="text-[11px] text-gray-300">
                Conducción: <strong>{currentHost}</strong> &middot; 98.5 FM
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider px-6 py-3 rounded-sm shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Save size={15} />
            <span>{isLoading ? "Guardando..." : "Guardar Configuración Radial"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
