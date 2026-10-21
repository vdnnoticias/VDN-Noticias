import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, User, TrendingUp, ChevronRight, ArrowRight, Radio } from "lucide-react";
import { NewsService } from "@/services/news.service";
import ArticleCard from "@/components/public/ArticleCard";

interface SectionPageProps {
  params: Promise<{
    section: string;
  }>;
}

export async function generateMetadata({ params }: SectionPageProps): Promise<Metadata> {
  const { section } = await params;
  const meta = NewsService.getSectionMeta(section);

  return {
    title: `${meta.title} | VDN Noticias Jauja`,
    description: meta.description,
  };
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { section } = await params;
  
  const sectionMeta = NewsService.getSectionMeta(section);
  const [articles, mostRead] = await Promise.all([
    NewsService.getArticlesBySection(section),
    NewsService.getMostReadArticles(5),
  ]);

  const featured = articles[0];
  const remainingArticles = articles.slice(1);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-red-700 transition-colors">
            Inicio
          </Link>
          <ChevronRight size={12} className="text-gray-400" />
          <span className="text-gray-900 font-semibold">{sectionMeta.title}</span>
        </nav>

        {/* Cabecera de la Sección */}
        <header className="bg-white p-6 sm:p-8 rounded-sm border border-gray-200 border-t-4 border-t-[#0A192F] shadow-xs mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className={`inline-block ${sectionMeta.badgeColor} text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-xs mb-2`}>
                Sección Editorial
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#0A192F]">
                {sectionMeta.title}
              </h1>
              <p className="text-sm text-gray-600 mt-1 max-w-2xl font-serif italic">
                {sectionMeta.subtitle}
              </p>
            </div>
            <p className="text-xs text-gray-500 max-w-xs md:text-right">
              {sectionMeta.description}
            </p>
          </div>
        </header>

        {articles.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-sm border border-gray-200 shadow-xs">
            <h2 className="font-serif text-xl font-bold text-navy-950 mb-2">
              Próximamente más noticias en esta sección
            </h2>
            <p className="text-xs text-gray-500 max-w-md mx-auto mb-6">
              Nuestra mesa de redacción está recopilando y verificando informaciones en tiempo real para esta categoría.
            </p>
            <Link
              href="/"
              className="bg-[#0A192F] text-white text-xs font-bold px-6 py-2.5 rounded-xs uppercase tracking-wider"
            >
              Volver a la portada
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Contenido Principal de Noticias (70%) */}
            <main className="lg:w-[70%] flex flex-col gap-8">
              
              {/* Noticia Principal / Hero de la Sección */}
              {featured && (
                <article className="group bg-white rounded-sm border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                  <Link href={`/${section}/${featured.slug}`} className="block">
                    <div className="relative w-full h-[320px] sm:h-[400px] bg-slate-900 overflow-hidden">
                      {featured.imageUrl && (
                        <Image
                          src={featured.imageUrl}
                          alt={featured.title}
                          fill
                          priority
                          sizes="(max-width: 1024px) 100vw, 70vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-wider rounded-xs mb-2 inline-block">
                          {featured.category}
                        </span>
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight group-hover:text-amber-300 transition-colors mb-2">
                          {featured.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 hidden sm:block">
                          {featured.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>

                  <div className="p-4 sm:p-6 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-red-700" />
                      <span className="font-semibold text-gray-700">{featured.author}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{featured.date}</span>
                      </div>
                      <span className="text-amber-800 font-bold">{featured.readTime}</span>
                    </div>
                  </div>
                </article>
              )}

              {/* Cuadrícula de 2 columnas con las noticias restantes */}
              {remainingArticles.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {remainingArticles.map((art) => (
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

            </main>

            {/* Barra Lateral (30%) */}
            <aside className="lg:w-[30%] flex flex-col gap-6">
              
              {/* Bloque: Lo más leído de VDN */}
              <div className="bg-white p-5 rounded-sm border border-gray-200 shadow-xs border-t-4 border-t-red-700">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                  <TrendingUp className="w-4 h-4 text-red-700" />
                  <h3 className="font-serif text-base font-bold text-[#0A192F] uppercase tracking-wide">
                    Más Leídas en VDN
                  </h3>
                </div>

                <div className="flex flex-col divide-y divide-gray-100">
                  {mostRead.map((item, idx) => (
                    <article key={item.id} className="py-3 first:pt-0 last:pb-0 group">
                      <Link href={`/${item.sectionSlug}/${item.slug}`} className="flex gap-3 items-start">
                        <span className="font-serif font-black text-2xl text-amber-500/80 leading-none shrink-0 w-6">
                          0{idx + 1}
                        </span>
                        <div>
                          <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block mb-0.5">
                            {item.category}
                          </span>
                          <h4 className="font-serif text-xs sm:text-sm font-bold text-[#0A192F] group-hover:text-red-700 transition-colors leading-snug line-clamp-2">
                            {item.title}
                          </h4>
                          <span className="text-[11px] text-gray-400 mt-1 block">
                            {item.viewsCount} lecturas
                          </span>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>

              {/* Callout Sintoniza la Radio */}
              <div className="bg-[#0A192F] text-white p-6 rounded-sm shadow-sm border-l-4 border-amber-500 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Radio className="w-4 h-4" />
                  <span>VDN Radio 98.5 FM</span>
                </div>
                <h4 className="font-serif text-lg font-bold">
                  Infórmate al instante con la señal en directo
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Escucha nuestros programas informativos y enlaces desde toda la provincia de Jauja y el Valle del Mantaro.
                </p>
                <Link
                  href="/radio"
                  className="mt-2 inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-2.5 px-4 rounded-xs transition-colors"
                >
                  <span>Ir a Cabina de Radio</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Banner Publicitario */}
              <div className="bg-slate-100 border border-gray-200 p-6 rounded-sm flex flex-col items-center justify-center text-center">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">
                  Espacio Auspiciador
                </span>
                <span className="text-xs text-gray-500">
                  Publicita en VDN Noticias y llega a más de 50,000 lectores en la región Junín.
                </span>
              </div>

            </aside>

          </div>
        )}

      </div>
    </div>
  );
}
