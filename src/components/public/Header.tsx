import Link from "next/link";
import { Search, Compass, Radio } from "lucide-react";
import BreakingNewsTicker from "./BreakingNewsTicker";
import LiveClock from "./LiveClock";
import TopRadioBar from "./TopRadioBar";

export default function Header() {
  return (
    <header className="w-full flex flex-col shadow-sm">
      {/* 1. Barra Superior con Ubicación y Reloj en Tiempo Real */}
      <div className="bg-[#071324] text-white text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-red-600"></span>
            <span className="font-semibold tracking-wider uppercase text-gray-200">
              JAUJA &middot; JUNÍN &middot; VALLE DEL MANTARO &middot; PERÚ
            </span>
          </div>

          {/* Reloj Digital con Hora Exacta en Vivo */}
          <LiveClock />
        </div>
      </div>

      {/* 2. Reproductor de Radio en Vivo al Principio (Top Bar) */}
      <TopRadioBar />

      {/* 3. Ticker de Noticias de Último Minuto */}
      <BreakingNewsTicker message="ALERTA VIAL: TRÁNSITO RESTRINGIDO EN LA CARRETERA CENTRAL KM 45 POR OBRAS DE MANTENIMIENTO | SENAMHI PRONOSTICA DESCENSO DE TEMPERATURAS EN EL VALLE DEL MANTARO | CELEBRACIONES DE LA TUNANTADA 2027 YA TIENEN COMITÉ ORGANIZADOR." />

      {/* 4. Cabecera Principal y Logotipo */}
      <div className="bg-white py-6 md:py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="hidden md:flex flex-col text-xs text-gray-500">
            <span className="font-bold text-navy-950 uppercase">Edición Digital</span>
            <span>Diario & Radiodifusión</span>
            <span className="text-red-700 font-semibold mt-0.5">Cobertura Regional</span>
          </div>

          <Link href="/" className="flex flex-col items-center group text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-[#0A192F] font-serif tracking-tight group-hover:text-red-700 transition-colors">
              VDN
            </h1>
            <span className="text-xs md:text-sm font-bold text-red-700 tracking-[0.25em] uppercase font-sans mt-0.5">
              Voces de la Noticia
            </span>
            <p className="text-xs text-gray-500 mt-1 italic tracking-wide font-serif">
              &quot;Información veraz, oportuna y sin censura&quot;
            </p>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/buscar"
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs px-3.5 py-2 rounded-full border border-gray-200 transition-colors"
            >
              <Search size={14} className="text-gray-500" />
              <span className="hidden sm:inline">Buscar noticias</span>
            </Link>

            <Link
              href="/radio"
              className="hidden lg:flex items-center gap-1.5 bg-[#0A192F] hover:bg-red-700 text-white text-xs font-bold px-3.5 py-2 rounded-full transition-colors"
            >
              <Radio size={14} className="text-amber-400" />
              <span>Cabina 98.5 FM</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 5. Barra de Navegación por Secciones */}
      <nav className="bg-[#0A192F] w-full sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-start lg:justify-center space-x-3 sm:space-x-6 py-3 text-xs md:text-sm font-bold text-white tracking-wide overflow-x-auto whitespace-nowrap scrollbar-none">
            <li>
              <Link href="/" className="hover:text-amber-400 transition-colors uppercase py-1 border-b-2 border-transparent hover:border-amber-400">
                Portada
              </Link>
            </li>
            <li>
              <Link href="/jauja-y-region" className="hover:text-amber-400 transition-colors uppercase py-1 border-b-2 border-transparent hover:border-amber-400">
                Jauja y Región
              </Link>
            </li>
            <li>
              <Link href="/turismo" className="text-amber-400 hover:text-amber-300 transition-colors uppercase py-1 border-b-2 border-amber-400 flex items-center gap-1">
                <Compass size={14} />
                <span>Turismo & Fiestas</span>
              </Link>
            </li>
            <li>
              <Link href="/nacional" className="hover:text-amber-400 transition-colors uppercase py-1 border-b-2 border-transparent hover:border-amber-400">
                Nacional
              </Link>
            </li>
            <li>
              <Link href="/internacional" className="hover:text-amber-400 transition-colors uppercase py-1 border-b-2 border-transparent hover:border-amber-400">
                Internacional
              </Link>
            </li>
            <li>
              <Link href="/opinion" className="hover:text-amber-400 transition-colors uppercase py-1 border-b-2 border-transparent hover:border-amber-400">
                Opinión
              </Link>
            </li>
            <li>
              <Link href="/cultura" className="hover:text-amber-400 transition-colors uppercase py-1 border-b-2 border-transparent hover:border-amber-400">
                Cultura & Tradición
              </Link>
            </li>
            <li>
              <Link href="/deportes" className="hover:text-amber-400 transition-colors uppercase py-1 border-b-2 border-transparent hover:border-amber-400">
                Deportes
              </Link>
            </li>
            <li>
              <Link href="/radio" className="hover:text-amber-400 transition-colors uppercase py-1 border-b-2 border-transparent hover:border-amber-400 flex items-center gap-1 text-gray-300">
                <Radio size={13} className="text-amber-400" />
                <span>Radio 98.5 FM</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
