"use client";

import { useState, useRef, useEffect } from "react";
import {
  Radio,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Clock,
  Phone,
  MessageSquare,
  MapPin
} from "lucide-react";

interface ProgramItem {
  time: string;
  title: string;
  host: string;
  days: string;
  description: string;
}

const fullSchedule: ProgramItem[] = [
  {
    time: "05:30 - 08:00",
    title: "Amanecer Jaujino & Voces del Campo",
    host: "Marcos Mayta",
    days: "Lunes a Sábado",
    description: "Espacio dedicado a los agricultores y ganaderos del Valle del Mantaro. Precios de mercados de papa, hortalizas y reportes del clima."
  },
  {
    time: "08:00 - 10:30",
    title: "El Noticiero Central de VDN (Edición Matinal)",
    host: "Mesa de Redacción Central",
    days: "Lunes a Sábado",
    description: "El informativo líder de la región. Cobertura en directo con unidades móviles desde Jauja, Huancayo, Tarma y Lima."
  },
  {
    time: "10:30 - 12:30",
    title: "Tribuna Popular & Defensoría del Oyente",
    host: "Carlos Huamán",
    days: "Lunes a Viernes",
    description: "Micrófono abierto para denuncias ciudadanas, fiscalización de obras públicas y reclamos de servicios en los 34 distritos de Jauja."
  },
  {
    time: "12:30 - 14:30",
    title: "La Voz del Mantaro (Edición Mediodía)",
    host: "Elena Vílchez",
    days: "Lunes a Sábado",
    description: "Resumen periodístico del mediodía con entrevistas a las principales autoridades provinciales y regionales."
  },
  {
    time: "14:30 - 17:00",
    title: "Estampas y Tradiciones de Nuestra Tierra",
    host: "Prof. Alberto Salcedo",
    days: "Lunes a Domingo",
    description: "Difusión de la Tunantada, huaynos del recuerdo, mulizas jaujinas e historia de la Primera Capital Histórica del Perú."
  },
  {
    time: "17:00 - 19:00",
    title: "Marcador Deportivo VDN",
    host: "Equipo de Deportes VDN",
    days: "Lunes a Viernes",
    description: "Seguimiento de la Copa Perú, fondistas del Valle del Mantaro y la actualidad de los clubes jaujinos."
  },
  {
    time: "19:00 - 21:00",
    title: "Resumen Informativo Nocturno & Análisis",
    host: "Dr. Arturo Villanueva",
    days: "Lunes a Viernes",
    description: "Mesa de debate y opinión con especialistas analizando los sucesos políticos, sociales y económicos del país."
  },
  {
    time: "21:00 - 23:00",
    title: "Sintonía de Luna Llena & Baladas del Alma",
    host: "Programación Musical",
    days: "Lunes a Domingo",
    description: "Música instrumental, baladas y compañía nocturna para los hogares del Valle del Mantaro."
  }
];

export default function RadioHubPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
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
    } else {
      try {
        setIsLoading(true);
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Error al reproducir audio:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
      <audio
        ref={audioRef}
        src="https://stream.zeno.fm/f3wvbbqmdg8uv"
        preload="none"
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => {
          setIsLoading(false);
          setIsPlaying(true);
        }}
      />

      {/* HERO: ESTUDIO DE RADIO EN VIVO */}
      <section className="bg-gradient-to-b from-[#071324] via-[#0A192F] to-[#0A192F] text-white py-16 border-b border-amber-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Lado Izquierdo: Datos de la Emisora y Controles */}
            <div className="lg:w-3/5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 text-red-400 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>Transmisión en Vivo desde Jauja</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black mb-3 leading-tight">
                VDN Radio <span className="text-amber-400">98.5 FM</span>
              </h1>
              <p className="text-gray-300 text-sm sm:text-lg mb-8 max-w-xl font-serif italic">
                &ldquo;La voz informativa y cultural del Valle del Mantaro, con veracidad, oportunidad y sin censura.&rdquo;
              </p>

              {/* Botón Principal de Reproducción */}
              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                <button
                  onClick={togglePlay}
                  disabled={isLoading}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 focus:outline-none focus:ring-4 focus:ring-amber-400/50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                  <span>{isLoading ? "Conectando..." : isPlaying ? "Pausar Transmisión" : "Escuchar Señal en Vivo"}</span>
                </button>

                {/* Control de Volumen */}
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2.5 rounded-full">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-gray-300 hover:text-amber-400 transition-colors"
                  >
                    {isMuted || volume === 0 ? <VolumeX size={18} className="text-red-400" /> : <Volume2 size={18} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.02"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(parseFloat(e.target.value));
                      if (isMuted) setIsMuted(false);
                    }}
                    className="w-24 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>
              </div>

              {/* Programa al Aire */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-3 justify-center lg:justify-start text-xs text-gray-300">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Al Aire Ahora: <strong>Noticiero Central VDN &middot; Edición Matinal</strong></span>
              </div>
            </div>

            {/* Lado Derecho: Tarjeta de Cabina y Contacto */}
            <div className="lg:w-2/5 w-full bg-[#071324] p-6 sm:p-8 rounded-xl border border-amber-500/30 shadow-2xl">
              <h3 className="font-serif text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Radio className="w-5 h-5 text-amber-400" />
                <span>Líneas de Cabina en Vivo</span>
              </h3>
              <p className="text-xs text-gray-400 mb-6">
                Participa en directo en nuestros programas, envía saludos o reporta noticias desde tu distrito:
              </p>

              <div className="space-y-4 text-xs">
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                  <div className="w-9 h-9 rounded-full bg-green-600/20 text-green-400 flex items-center justify-center shrink-0">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">WhatsApp de Cabina</span>
                    <span className="text-white font-mono font-bold text-sm">+51 964 123 456</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                  <div className="w-9 h-9 rounded-full bg-amber-600/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Teléfono Fijo Jauja</span>
                    <span className="text-white font-mono font-bold text-sm">(064) 362-100</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                  <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Estudios Principales</span>
                    <span className="text-white font-bold">Jr. Junín 123, Centro de Jauja, Perú</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PARRILLA COMPLETA DE PROGRAMACIÓN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="border-b-2 border-amber-500 pb-4 mb-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-red-700 block mb-1">
              Guía de Emisión
            </span>
            <h2 className="font-serif text-3xl font-black text-[#0A192F]">
              Parrilla Semanal de Programas
            </h2>
          </div>
          <span className="text-xs text-gray-500">Transmisión ininterrumpida las 24 horas del día</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fullSchedule.map((prog, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="bg-amber-100 text-amber-900 border border-amber-300 font-mono font-bold text-xs px-2.5 py-1 rounded">
                    {prog.time}
                  </span>
                  <span className="text-[11px] font-semibold text-gray-500 bg-slate-100 px-2 py-0.5 rounded">
                    {prog.days}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#0A192F] mb-1">
                  {prog.title}
                </h3>
                <p className="text-xs font-semibold text-red-700 mb-3">
                  Conducción: {prog.host}
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {prog.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                <span>98.5 FM &middot; Streaming Digital</span>
                <span className="text-amber-700 font-semibold">En Directo</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
