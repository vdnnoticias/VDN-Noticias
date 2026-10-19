import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a192f] text-white pt-12 pb-6 border-t-4 border-[#dc2626]">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-serif font-bold mb-4">VDN</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Voces de la Noticia. Medio de comunicacion independiente dedicado a informar con veracidad, 
            oportunidad y sin censura desde la primera capital del Peru, Jauja, para toda la region Junin y el mundo.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4 text-[#d97706] uppercase text-sm tracking-wider">Secciones</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/jauja-y-region" className="hover:text-white transition-colors">Jauja y Region</Link></li>
            <li><Link href="/nacional" className="hover:text-white transition-colors">Nacional</Link></li>
            <li><Link href="/internacional" className="hover:text-white transition-colors">Internacional</Link></li>
            <li><Link href="/opinion" className="hover:text-white transition-colors">Opinion</Link></li>
            <li><Link href="/deportes" className="hover:text-white transition-colors">Deportes</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4 text-[#d97706] uppercase text-sm tracking-wider">Contacto</h3>
          <address className="not-italic text-sm text-gray-300 space-y-2">
            <p>Jiron Junin 123, Centro de Jauja</p>
            <p>Junin, Peru</p>
            <p className="pt-2">Telefono: (064) 123-456</p>
            <p>Email: contacto@vdn.pe</p>
          </address>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-gray-700 text-center text-xs text-gray-400">
        <p>&copy; {currentYear} VDN - Voces de la Noticia. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
