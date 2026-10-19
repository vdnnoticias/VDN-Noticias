import Link from "next/link";
import Image from "next/image";
import SectionBadge from "./SectionBadge";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  coverImageUrl?: string;
  section: string;
  publishedAt: string;
  authorName: string;
  slug: string;
  isBreaking?: boolean;
}

export default function ArticleCard({
  title,
  excerpt,
  coverImageUrl,
  section,
  publishedAt,
  authorName,
  slug,
  isBreaking = false,
}: ArticleCardProps) {
  return (
    <Link href={`/${section.toLowerCase()}/${slug}`} className="block group h-full">
      <article className="flex flex-col h-full bg-white border border-gray-200/80 rounded-sm shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="relative w-full aspect-video bg-gray-100 overflow-hidden">
          {coverImageUrl ? (
            <Image
              src={coverImageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <span className="text-gray-400 font-serif text-2xl font-bold opacity-60">
                VDN
              </span>
            </div>
          )}

          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start z-10">
            {isBreaking && (
              <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-wider rounded-xs shadow-md animate-pulse">
                Último Minuto
              </span>
            )}
            <SectionBadge section={section} />
          </div>
        </div>

        <div className="p-4 sm:p-5 flex flex-col flex-1">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0A192F] mb-2 leading-snug group-hover:text-red-700 transition-colors">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 mb-4 flex-1 leading-relaxed">
            {excerpt}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100 mt-auto">
            <span className="font-semibold text-gray-700">{authorName}</span>
            <span className="text-gray-400">{publishedAt}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
