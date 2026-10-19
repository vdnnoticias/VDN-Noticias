import Image from "next/image";
import Link from "next/link";
import { Clock, User, TrendingUp, Camera, Sparkles, MapPin, ChevronRight } from "lucide-react";
import {
  heroNews,
  secondaryNews,
  jaujaNews,
  nacionalNews,
  internacionalNews,
  opinionPieces,
  jaujaPhotoGallery,
} from "@/lib/mock-data";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      
      {/* 1. SECCIÓN PRINCIPAL: HERO + COLUMNA LOCAL JAUJA CON FOTOGRAFÍAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Lado Izquierdo: Noticia Central Hero + 2 Secundarias (65%) */}
          <div className="lg:w-[65%] flex flex-col gap-8">
            <article className="group cursor-pointer">
              <Link href={`/economia-regional/${heroNews.slug}`} className="block">
                <div className="relative w-full h-[380px] sm:h-[450px] mb-4 overflow-hidden rounded-sm bg-slate-900 shadow-md">
                  {heroNews.imageUrl && (
                    <Image
                      src={heroNews.imageUrl}
                      alt={heroNews.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 65vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-95 group-hover:opacity-100"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="bg-red-600 text-white text-xs font-black px-3 py-1 uppercase tracking-widest rounded-xs shadow-md">
                      {heroNews.category}
                    </span>
                    <span className="bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-xs border border-white/20">
                      Reportaje Especial
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white z-10 hidden sm:block">
                    <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-1">
                      Infraestructura y Conectividad
                    </span>
                    <p className="text-sm text-gray-200 line-clamp-2 drop-shadow-sm font-sans">
                      {heroNews.excerpt}
                    </p>
                  </div>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#0A192F] leading-[1.15] mb-3 group-hover:text-red-700 transition-colors">
                  {heroNews.title}
                </h1>
              </Link>

              <p className="text-gray-700 text-base sm:text-lg mb-4 line-clamp-3 leading-relaxed">
                {heroNews.excerpt}
              </p>

              <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 gap-4 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1.5 font-medium text-gray-700">
                  <User size={15} className="text-red-700" />
                  <span>{heroNews.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={15} className="text-gray-400" />
                  <span>{heroNews.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-700 font-semibold ml-auto">
                  <TrendingUp size={15} />
                  <span>{heroNews.readTime} de lectura</span>
                </div>
              </div>
            </article>

            {/* Dos Noticias Secundarias con Fotos 16:9 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t-2 border-gray-100">
              {secondaryNews.map((news) => (
                <article key={news.id} className="group cursor-pointer flex flex-col justify-between">
                  <Link href={`/${news.category.toLowerCase()}/${news.slug}`} className="block">
                    <div className="relative w-full h-52 mb-3 overflow-hidden rounded-sm bg-gray-100 shadow-xs">
                      {news.imageUrl && (
                        <Image
                          src={news.imageUrl}
                          alt={news.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute top-2.5 left-2.5 bg-red-700 text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-wider rounded-xs shadow-sm">
                        {news.category}
                      </div>
                    </div>

                    <h2 className="font-serif text-lg sm:text-xl font-bold text-[#0A192F] leading-snug mb-2 group-hover:text-red-700 transition-colors">
                      {news.title}
                    </h2>
                  </Link>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                    {news.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-100">
                    <span>{news.author}</span>
                    <span className="font-medium text-amber-700">{news.readTime}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Lado Derecho: Columna Jauja y Valle del Mantaro con Miniaturas (35%) */}
          <aside className="lg:w-[35%] flex flex-col gap-6">
            <div className="bg-slate-50 border-t-4 border-[#0A192F] p-5 rounded-xs shadow-xs border-x border-b border-gray-200">
              <div className="flex items-center justify-between mb-5 border-b border-gray-200 pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-700" />
                  <h2 className="font-serif text-xl font-black text-[#0A192F] uppercase tracking-wide">
                    Jauja y Región
                  </h2>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-800 px-2 py-0.5 rounded">
                  Valle Central
                </span>
              </div>

              {/* Noticias de Jauja con Miniaturas Visuales */}
              <div className="flex flex-col gap-4">
                {jaujaNews.map((news) => (
                  <article key={news.id} className="group cursor-pointer flex gap-3.5 pb-4 border-b border-gray-200/80 last:border-0 last:pb-0">
                    <Link href={`/${news.category.toLowerCase()}/${news.slug}`} className="relative w-24 h-24 shrink-0 overflow-hidden rounded-xs bg-gray-200 shadow-xs">
                      {news.imageUrl && (
                        <Image
                          src={news.imageUrl}
                          alt={news.title}
                          fill
                          sizes="96px"
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      )}
                    </Link>

                    <div className="flex flex-col justify-between flex-1 min-w-0">
                      <div>
                        <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block mb-1">
                          {news.category}
                        </span>
                        <Link href={`/${news.category.toLowerCase()}/${news.slug}`}>
                          <h3 className="font-serif text-sm font-bold text-[#0A192F] leading-tight line-clamp-3 group-hover:text-red-700 transition-colors">
                            {news.title}
                          </h3>
                        </Link>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-2">
                        <Clock size={11} className="text-gray-400" />
                        <span>{news.date}</span>
                        <span>&middot;</span>
                        <span className="text-amber-800 font-medium">{news.readTime}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Espacio Publicitario Regional */}
            <div className="w-full bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300 rounded-xs p-6 flex flex-col items-center justify-center text-center shadow-xs">
              <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">
                Auspiciador Oficial VDN
              </span>
              <h4 className="font-serif text-base font-bold text-navy-950 mb-1">
                Comercio y Turismo en Jauja
              </h4>
              <p className="text-xs text-gray-600 mb-4 max-w-xs">
                Llega a más de 50,000 lectores y oyentes diarios en toda la región Junín.
              </p>
              <button className="bg-[#0A192F] hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xs transition-colors shadow-sm">
                Publicita con Nosotros
              </button>
            </div>
          </aside>
        </div>
      </section>

      {/* 2. REPORTE FOTOGRÁFICO: POSTALES Y PATRIMONIO DEL VALLE DEL MANTARO */}
      <section className="bg-slate-900 text-white py-12 my-6 border-y border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">
                <Camera className="w-4 h-4" />
                <span>Fotoperiodismo &amp; Patrimonio</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-white">
                Postales de Jauja y la Riqueza del Valle
              </h2>
            </div>
            <span className="text-xs text-gray-400">
              Imágenes de nuestra corresponsalía y archivo gráfico regional
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {jaujaPhotoGallery.map((item, idx) => (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-xs bg-slate-800 shadow-md ${
                  idx === 0 ? "sm:col-span-2 lg:col-span-2 h-72 sm:h-80" : "h-72 sm:h-80"
                }`}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <span className="inline-block bg-amber-500 text-slate-950 font-black text-[9px] uppercase px-1.5 py-0.5 rounded-xs tracking-wider mb-1.5">
                    {item.location}
                  </span>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-white leading-snug drop-shadow-sm mb-1 group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-gray-300 flex items-center gap-1 font-mono">
                    <Sparkles size={10} className="text-amber-400" />
                    <span>{item.photographer}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SECCIÓN TRIPARTITA: NACIONAL, INTERNACIONAL Y OPINIÓN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          
          {/* Columna 1: Nacional con Miniaturas */}
          <div className="md:pr-8 pt-8 md:pt-0">
            <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-[#0A192F]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#0A192F]" />
                <h2 className="font-serif text-xl font-bold text-[#0A192F] uppercase tracking-wide">
                  Nacional
                </h2>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>

            <div className="flex flex-col gap-5">
              {nacionalNews.map((news) => (
                <article key={news.id} className="group cursor-pointer flex gap-3.5 items-start">
                  <Link href={`/nacional/${news.slug}`} className="relative w-20 h-20 shrink-0 rounded-xs overflow-hidden bg-gray-200">
                    {news.imageUrl && (
                      <Image
                        src={news.imageUrl}
                        alt={news.title}
                        fill
                        sizes="80px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/nacional/${news.slug}`}>
                      <h3 className="font-serif text-sm font-bold text-[#0A192F] leading-snug line-clamp-2 group-hover:text-red-700 transition-colors mb-1">
                        {news.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-1.5">
                      {news.excerpt}
                    </p>
                    <div className="text-[11px] text-gray-400 font-medium">{news.date}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Columna 2: Internacional con Miniaturas */}
          <div className="md:px-8 pt-8 md:pt-0">
            <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-red-700">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-700" />
                <h2 className="font-serif text-xl font-bold text-[#0A192F] uppercase tracking-wide">
                  Internacional
                </h2>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>

            <div className="flex flex-col gap-5">
              {internacionalNews.map((news) => (
                <article key={news.id} className="group cursor-pointer flex gap-3.5 items-start">
                  <Link href={`/internacional/${news.slug}`} className="relative w-20 h-20 shrink-0 rounded-xs overflow-hidden bg-gray-200">
                    {news.imageUrl && (
                      <Image
                        src={news.imageUrl}
                        alt={news.title}
                        fill
                        sizes="80px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/internacional/${news.slug}`}>
                      <h3 className="font-serif text-sm font-bold text-[#0A192F] leading-snug line-clamp-2 group-hover:text-red-700 transition-colors mb-1">
                        {news.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-1.5">
                      {news.excerpt}
                    </p>
                    <div className="text-[11px] text-gray-400 font-medium">{news.date}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Columna 3: Opinión y Columnistas con Fotos de Perfil */}
          <div className="md:pl-8 pt-8 md:pt-0">
            <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-amber-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-600" />
                <h2 className="font-serif text-xl font-bold text-[#0A192F] uppercase tracking-wide">
                  Opinión y Análisis
                </h2>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>

            <div className="flex flex-col gap-4">
              {opinionPieces.map((piece) => (
                <article
                  key={piece.id}
                  className="group cursor-pointer bg-slate-50 p-4 rounded-xs border border-gray-200 hover:border-amber-400 transition-all hover:shadow-xs"
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border-2 border-amber-500 shadow-xs">
                      {piece.avatarUrl ? (
                        <Image
                          src={piece.avatarUrl}
                          alt={piece.author}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#0A192F] text-white flex items-center justify-center font-bold text-xs">
                          {piece.initials}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-navy-950 group-hover:text-red-700 transition-colors">
                        {piece.author}
                      </h4>
                      <p className="text-[10px] text-gray-500 font-sans">{piece.role}</p>
                    </div>
                  </div>

                  <h3 className="font-serif text-sm font-bold text-[#0A192F] italic leading-tight group-hover:text-red-700 transition-colors">
                    &ldquo;{piece.title}&rdquo;
                  </h3>
                </article>
              ))}
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
