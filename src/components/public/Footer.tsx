import Link from "next/link";
import { Radio, Compass, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#071324] text-white pt-12 pb-6 border-t-4 border-[#dc2626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        
        {/* Columna 1: Identidad VDN */}
        <div className="md:col-span-1">
          <Link href="/" className="inline-block mb-3">
            <span className="text-3xl font-serif font-black tracking-tight text-white block">
              VDN
            </span>
            <span className="text-[11px] font-bold text-red-500 uppercase tracking-widest">
              Voces de la Noticia
            </span>
          </Link>
          <p className="text-xs text-gray-300 leading-relaxed mb-4">
            Medio de comunicación independiente fundado en la Primera Capital Histórica del Perú, Jauja. Informando con veracidad, rigor y sin censura para todo el Valle del Mantaro y el mundo.
          </p>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold bg-white/5 p-2 rounded border border-white/10">
            <Radio size={14} />
            <span>Sintoniza en vivo: 98.5 FM</span>
          </div>
        </div>

        {/* Columna 2: Secciones Editoriales */}
        <div>
          <h3 className="text-xs font-bold mb-4 text-[#d97706] uppercase tracking-wider">
            Secciones
          </h3>
          <ul className="space-y-2 text-xs text-gray-300">
            <li><Link href="/" className="hover:text-amber-400 transition-colors">Portada Principal</Link></li>
            <li><Link href="/jauja-y-region" className="hover:text-amber-400 transition-colors">Jauja y Región</Link></li>
            <li><Link href="/turismo" className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-amber-300 font-medium"><Compass size={13} /><span>Turismo & Fiestas</span></Link></li>
            <li><Link href="/nacional" className="hover:text-amber-400 transition-colors">Nacional</Link></li>
            <li><Link href="/internacional" className="hover:text-amber-400 transition-colors">Internacional</Link></li>
            <li><Link href="/opinion" className="hover:text-amber-400 transition-colors">Opinión & Columnas</Link></li>
            <li><Link href="/cultura" className="hover:text-amber-400 transition-colors">Cultura & Tradición</Link></li>
            <li><Link href="/deportes" className="hover:text-amber-400 transition-colors">Deportes</Link></li>
          </ul>
        </div>

        {/* Columna 3: Institucional & Servicios */}
        <div>
          <h3 className="text-xs font-bold mb-4 text-[#d97706] uppercase tracking-wider">
            Institucional & Radio
          </h3>
          <ul className="space-y-2 text-xs text-gray-300">
            <li><Link href="/radio" className="hover:text-amber-400 transition-colors flex items-center gap-1"><Radio size={12} className="text-amber-400" /><span>Cabina de Radio en Vivo</span></Link></li>
            <li><Link href="/nosotros" className="hover:text-amber-400 transition-colors">Quiénes Somos & Línea Editorial</Link></li>
            <li><Link href="/buscar" className="hover:text-amber-400 transition-colors">Buscador de Noticias</Link></li>
            <li><Link href="/nosotros" className="hover:text-amber-400 transition-colors">Publicidad & Auspicios</Link></li>
            <li><Link href="/nosotros" className="hover:text-amber-400 transition-colors">Código de Ética Periodística</Link></li>
          </ul>
        </div>

        {/* Columna 4: Redacción & Contacto */}
        <div>
          <h3 className="text-xs font-bold mb-4 text-[#d97706] uppercase tracking-wider">
            Redacción Central
          </h3>
          <address className="not-italic text-xs text-gray-300 space-y-2.5">
            <p className="flex items-start gap-2">
              <MapPin size={14} className="text-red-500 shrink-0 mt-0.5" />
              <span>Jr. Junín 123, Centro Histórico de Jauja, Junín, Perú</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone size={14} className="text-amber-400 shrink-0" />
              <span>Cabina: (064) 362-100</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail size={14} className="text-amber-400 shrink-0" />
              <span>prensa@vdnnoticias.pe</span>
            </p>
          </address>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
        <p>&copy; {currentYear} VDN - Voces de la Noticia. Todos los derechos reservados.</p>
        <p className="text-[11px] text-gray-500">
          Transmitiendo desde Jauja, Primera Capital Histórica del Perú.
        </p>
      </div>
    </footer>
  );
}
