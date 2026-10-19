import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, User, TrendingUp, ChevronRight, Tag, Radio, ArrowRight } from "lucide-react";
import { NewsService, mockComments } from "@/services/news.service";
import ShareButtons from "@/components/public/ShareButtons";
import CommentsSection from "@/components/public/CommentsSection";
import ArticleCard from "@/components/public/ArticleCard";

interface ArticlePageProps {
  params: Promise<{
    section: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = NewsService.getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Noticia no encontrada | VDN Noticias",
    };
  }

  return {
    title: `${article.title} | VDN Noticias Jauja`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.imageUrl ? [{ url: article.imageUrl }] : [],
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = NewsService.getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const comments = mockComments[slug] || [];
  const relatedArticles = NewsService.getRelatedArticles(slug, article.sectionSlug, 3);
  const mostRead = NewsService.getMostReadArticles(5);

  return (
    <article className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb de Navegación */}
        <nav className="flex items-center space-x-2 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-red-700 transition-colors">
            Inicio
          </Link>
          <ChevronRight size={12} className="text-gray-400" />
          <Link href={`/${article.sectionSlug}`} className="hover:text-red-700 transition-colors uppercase">
            {article.section}
          </Link>
          <ChevronRight size={12} className="text-gray-400" />
          <span className="text-gray-900 font-semibold truncate max-w-[280px] sm:max-w-md">
            {article.title}
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Cuerpo del Artículo (70%) */}
          <div className="lg:w-[70%]">
            
            {/* Cabecera del Artículo */}
            <header className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-red-700 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-xs">
                  {article.category}
                </span>
                <span className="text-xs font-semibold text-gray-400">
                  {article.section}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#0A192F] leading-[1.18] mb-4">
                {article.title}
              </h1>

              <p className="text-base sm:text-lg text-gray-700 font-sans leading-relaxed mb-6 font-medium">
                {article.excerpt}
              </p>

              {/* Ficha del Autor y Fecha */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-t border-gray-200 text-xs text-gray-600">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-200 border border-gray-300">
                    {article.authorAvatar ? (
                      <Image
                        src={article.authorAvatar}
                        alt={article.author}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-gray-600 m-auto mt-2.5" />
                    )}
                  </div>
                  <div>
                    <span className="font-bold text-navy-950 block text-xs sm:text-sm">
                      Por: {article.author}
                    </span>
                    <span className="text-[11px] text-gray-500 font-sans">
                      {article.authorRole}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    <span>Publicado: {article.date}</span>
                  </div>
                  <span className="text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {article.readTime}
                  </span>
                </div>
              </div>

              {/* Barra de Compartir en Redes */}
              <ShareButtons title={article.title} />
            </header>

            {/* Fotografía Principal de la Noticia */}
            {article.imageUrl && (
              <figure className="mb-8">
                <div className="relative w-full h-[360px] sm:h-[480px] bg-slate-900 rounded-sm overflow-hidden shadow-md">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="text-xs text-gray-500 italic mt-2.5 flex items-center justify-between border-b border-gray-100 pb-2">
                  <span>Cobertura fotográfica oficial de VDN Noticias &middot; Jauja, Junín</span>
                  <span className="font-sans font-semibold text-gray-400">Archivo VDN</span>
                </figcaption>
              </figure>
            )}

            {/* Contenido HTML del Artículo */}
            <div
              className="prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />

            {/* Tags / Palabras Clave */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-gray-200">
                <Tag size={14} className="text-gray-400" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                  Temas relacionados:
                </span>
                {article.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs px-2.5 py-1 rounded transition-colors"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}

            {/* Segunda Barra de Compartir al final de la lectura */}
            <ShareButtons title={article.title} />

            {/* Caja de Comentarios Interactiva */}
            <CommentsSection
              articleSlug={article.slug || slug}
              initialComments={comments}
            />

          </div>

          {/* Barra Lateral (30%) */}
          <aside className="lg:w-[30%] flex flex-col gap-8">
            
            {/* Lo más leído */}
            <div className="bg-slate-50 p-5 rounded-sm border border-gray-200 shadow-xs border-t-4 border-t-red-700">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
                <TrendingUp className="w-4 h-4 text-red-700" />
                <h3 className="font-serif text-base font-bold text-[#0A192F] uppercase tracking-wide">
                  Lo Más Leído del Día
                </h3>
              </div>

              <div className="flex flex-col divide-y divide-gray-200/80">
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

            {/* Banner Señal Radial */}
            <div className="bg-[#0A192F] text-white p-6 rounded-sm shadow-md border-l-4 border-amber-500">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Radio className="w-4 h-4 animate-pulse" />
                <span>Señal en Vivo</span>
              </div>
              <h4 className="font-serif text-lg font-bold mb-2">
                ¿Prefieres escuchar la noticia?
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Sintoniza nuestra transmisión en directo de VDN Radio 98.5 FM desde la provincia de Jauja.
              </p>
              <Link
                href="/radio"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-xs transition-colors"
              >
                <span>Escuchar en Directo</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Espacio Publicitario */}
            <div className="bg-slate-100 border border-gray-200 p-6 rounded-sm text-center">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2 block">
                Auspiciador Local
              </span>
              <h5 className="font-serif font-bold text-sm text-navy-950 mb-1">
                Comercios y Servicios en Jauja
              </h5>
              <p className="text-xs text-gray-500 mb-3">
                Espacio publicitario disponible para marcas del Valle del Mantaro.
              </p>
              <span className="text-[11px] font-bold text-amber-700 underline cursor-pointer">
                contacto@vdn.pe
              </span>
            </div>

          </aside>

        </div>

        {/* Noticias Relacionadas al Pie */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-10 border-t-2 border-gray-200">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 bg-red-700" />
                <h3 className="font-serif text-2xl font-black text-[#0A192F] uppercase tracking-wide">
                  Noticias Relacionadas
                </h3>
              </div>
              <Link
                href={`/${article.sectionSlug}`}
                className="text-xs font-bold text-red-700 hover:text-red-900 transition-colors uppercase tracking-wider flex items-center gap-1"
              >
                <span>Ver más de {article.section}</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <ArticleCard
                  key={rel.id}
                  title={rel.title}
                  excerpt={rel.excerpt}
                  coverImageUrl={rel.imageUrl}
                  section={rel.section}
                  publishedAt={rel.date}
                  authorName={rel.author}
                  slug={rel.slug || rel.id}
                  isBreaking={rel.isBreaking}
                />
              ))}
            </div>
          </section>
        )}

      </div>
    </article>
  );
}
