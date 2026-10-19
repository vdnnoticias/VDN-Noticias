"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Radio, Calendar, X, Sparkles } from "lucide-react";

interface ScheduleItem {
  time: string;
  title: string;
  host: string;
  days: string;
}

const radioSchedule: ScheduleItem[] = [
  { time: "06:00 - 08:00", title: "Amanecer Jaujino & Noticias del Campo", host: "Marcos Mayta", days: "Lunes a Viernes" },
  { time: "08:00 - 10:00", title: "El Noticiero Central de VDN (Edición Matinal)", host: "Mesa de Redacción VDN", days: "Lunes a Sábado" },
  { time: "10:00 - 12:00", title: "Tribuna Popular & Enlace Regional", host: "Carlos Huamán", days: "Lunes a Viernes" },
  { time: "12:00 - 14:00", title: "La Voz del Mantaro (Edición Mediodía)", host: "Elena Vílchez", days: "Lunes a Sábado" },
  { time: "14:00 - 16:00", title: "Estampas y Tradiciones de Nuestra Tierra", host: "Prof. Alberto Salcedo", days: "Lunes a Domingo" },
  { time: "18:00 - 20:00", title: "Resumen Informativo & Análisis Político", host: "Dr. Arturo Villanueva", days: "Lunes a Viernes" },
  { time: "20:00 - 22:00", title: "Sintonía Nocturna & Música del Recuerdo", host: "Programación Musical", days: "Lunes a Domingo" },
];

export default function TopRadioBar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [prevVolume, setPrevVolume] = useState(0.85);
  const [showSchedule, setShowSchedule] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsLoading(false);
    } else {
      try {
        setIsLoading(true);
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Error al reproducir señal radial:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(prevVolume || 0.85);
    } else {
      setPrevVolume(volume);
      setIsMuted(true);
      setVolume(0);
    }
  };

  return (
    <>
      <div className="w-full bg-gradient-to-r from-[#071324] via-[#0A192F] to-[#0d1d36] text-white border-b border-amber-500/30 shadow-md">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes radioWave {
            0% { height: 4px; }
            50% { height: 18px; }
            100% { height: 4px; }
          }
          .radio-bar-active { animation: radioWave 0.7s ease-in-out infinite; }
          .radio-bar-2 { animation-delay: 0.15s; }
          .radio-bar-3 { animation-delay: 0.3s; }
          .radio-bar-4 { animation-delay: 0.45s; }
        `}} />

        <audio
          ref={audioRef}
          src="https://stream.zeno.fm/f3wvbbqmdg8uv"
          preload="none"
          onWaiting={() => setIsLoading(true)}
          onPlaying={() => {
            setIsLoading(false);
            setIsPlaying(true);
          }}
          onError={() => {
            setIsLoading(false);
            setIsPlaying(false);
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
          
          {/* Lado Izquierdo: Insignia En Vivo y Datos de Emisora */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-600"></span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-red-600/90 text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">
                AL AIRE
              </span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <Radio className="w-4 h-4 text-amber-400" />
                <span className="text-white">VDN RADIO</span>
                <span className="bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/40 text-[11px]">
                  98.5 FM
                </span>
              </div>
            </div>

            <span className="hidden md:inline text-gray-500">|</span>

            {/* Programa al aire */}
            <div className="hidden lg:flex items-center gap-2 text-xs">
              <span className="text-gray-300 font-medium">Programa:</span>
              <span className="text-white font-semibold truncate max-w-[260px]">
                Noticiero Central &quot;Voces del Mantaro&quot;
              </span>
              <span className="text-amber-400 font-mono text-[11px]">(En Directo)</span>
            </div>
          </div>

          {/* Centro: Controles de Reproducción y Ecualizador */}
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              disabled={isLoading}
              className="group flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-navy-950 font-bold px-4 py-1.5 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label={isPlaying ? "Pausar radio en vivo" : "Escuchar radio en vivo"}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-navy-950 border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-4 h-4 fill-current text-slate-950" />
              ) : (
                <Play className="w-4 h-4 fill-current text-slate-950 ml-0.5" />
              )}
              <span className="text-xs uppercase tracking-wider font-extrabold text-slate-950">
                {isLoading ? "Conectando..." : isPlaying ? "Pausar Señal" : "Escuchar en Vivo"}
              </span>
            </button>

            {/* Vúmetro / Ecualizador animado */}
            <div className="flex items-end h-5 space-x-1 px-2 py-0.5 bg-black/30 rounded border border-white/5">
              <div className={`w-1 bg-amber-400 rounded-t-sm transition-all ${isPlaying ? 'radio-bar-active' : 'h-1'}`} />
              <div className={`w-1 bg-amber-400 rounded-t-sm transition-all ${isPlaying ? 'radio-bar-active radio-bar-2' : 'h-1.5'}`} />
              <div className={`w-1 bg-amber-400 rounded-t-sm transition-all ${isPlaying ? 'radio-bar-active radio-bar-3' : 'h-2'}`} />
              <div className={`w-1 bg-amber-400 rounded-t-sm transition-all ${isPlaying ? 'radio-bar-active radio-bar-4' : 'h-1'}`} />
            </div>
          </div>

          {/* Lado Derecho: Volumen y Botón de Programación */}
          <div className="flex items-center gap-3">
            {/* Control de volumen */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="text-gray-400 hover:text-amber-400 transition-colors p-1"
                aria-label={isMuted ? "Activar sonido" : "Silenciar"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-red-400" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.02"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setVolume(val);
                  if (val > 0 && isMuted) setIsMuted(false);
                }}
                className="w-16 lg:w-20 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
                aria-label="Control de volumen"
              />
            </div>

            {/* Botón Parrilla de Programación */}
            <button
              onClick={() => setShowSchedule(true)}
              className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-amber-400 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded transition-colors border border-white/10"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Programación</span>
            </button>
          </div>

        </div>
      </div>

      {/* Modal de Parrilla de Programación */}
      {showSchedule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0A192F] text-white w-full max-w-2xl rounded-lg shadow-2xl border border-amber-500/30 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-[#071324]">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-lg font-bold font-serif text-white">
                    Parrilla de Programación — VDN Radio 98.5 FM
                  </h3>
                  <p className="text-xs text-gray-400">
                    Transmisión en vivo desde Jauja para todo el Valle del Mantaro
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSchedule(false)}
                className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Cerrar ventana"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto divide-y divide-slate-800">
              {radioSchedule.map((prog, idx) => (
                <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded text-xs font-mono font-bold whitespace-nowrap">
                      {prog.time}
                    </span>
                    <div>
                      <h4 className="font-semibold text-sm text-white">{prog.title}</h4>
                      <p className="text-xs text-gray-400">Conducción: {prog.host}</p>
                    </div>
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-gray-400 bg-slate-800/80 px-2 py-0.5 rounded self-start sm:self-center">
                    {prog.days}
                  </span>
                </div>
              ))}
            </div>

            <div className="px-6 py-3 bg-[#071324] border-t border-slate-800 flex justify-between items-center text-xs text-gray-400">
              <span>Sintonízanos en el 98.5 FM en toda la provincia de Jauja</span>
              <button
                onClick={() => setShowSchedule(false)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-1.5 rounded text-xs transition-colors"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
