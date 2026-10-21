import { createServerClient } from "@/lib/supabase/server";
import {
  heroNews,
  secondaryNews,
  jaujaNews,
  nacionalNews,
  internacionalNews,
  opinionPieces,
  type NewsItem,
} from "@/lib/mock-data";

// =====================================================================
// Tipos compartidos (mismos que antes para mantener compatibilidad UI)
// =====================================================================
export interface FullArticle extends NewsItem {
  contentHtml: string;
  section: string;
  sectionSlug: string;
  isBreaking?: boolean;
  viewsCount: number;
  tags: string[];
  authorRole: string;
  authorAvatar?: string;
}

export interface ArticleComment {
  id: string;
  authorName: string;
  commentText: string;
  createdAt: string;
}

// =====================================================================
// Helpers
// =====================================================================
const isSupabaseConfigured = (): boolean => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !!url && !url.includes("your_supabase");
};

const formatTimeAgo = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `Hace ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `Hace ${hours}h`;
  const days = Math.floor(hours / 24);
  return `Hace ${days}d`;
};

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapArticleRow(a: any): FullArticle {
  const authorObj = a.author as Record<string, string> | null;
  const categoryObj = a.category as Record<string, string> | null;
  return {
    id: a.id,
    title: a.title,
    excerpt: a.excerpt,
    author: authorObj?.full_name || "Redacción VDN",
    date: a.published_at ? formatDate(a.published_at) : formatDate(a.created_at),
    category: categoryObj?.name || a.section,
    imageUrl: a.cover_image_url || undefined,
    readTime: `${a.reading_time_minutes} min`,
    slug: a.slug,
    contentHtml: a.content_html,
    section: categoryObj?.name || a.section,
    sectionSlug: categoryObj?.slug || a.section,
    isBreaking: a.is_breaking,
    viewsCount: Number(a.views_count),
    tags: a.tags || [],
    authorRole: "Redacción VDN",
    authorAvatar: authorObj?.avatar_url || undefined,
  };
}

const ARTICLE_SELECT = `
  *,
  author:profiles!articles_author_id_fkey(full_name, avatar_url, bio),
  category:categories!articles_category_id_fkey(name, slug)
`;

// =====================================================================
// Mock data consolidado (fallback cuando no hay artículos en Supabase)
// =====================================================================
const buildMockArticles = (): FullArticle[] => [
  {
    ...heroNews,
    section: "Jauja y Región",
    sectionSlug: "jauja-y-region",
    slug: heroNews.slug || "modernizacion-aeropuerto-francisco-carle-jauja",
    viewsCount: 3840,
    tags: ["Jauja", "Aeropuerto", "Inversión", "Valle del Mantaro", "Transportes"],
    authorRole: "Mesa de Redacción Central",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    contentHtml: `
      <p class="lead text-lg text-slate-700 font-serif leading-relaxed mb-6 font-medium">
        El Gobierno Regional de Junín oficializó hoy la aprobación del expediente técnico para la ampliación y modernización integral del Aeropuerto Francisco Carlé de Jauja.
      </p>
      <h2 class="text-2xl font-serif font-bold text-navy-950 mt-8 mb-4">
        Ampliación de pista y tecnología para vuelos nocturnos
      </h2>
      <p class="text-slate-700 leading-relaxed mb-4">
        La obra cuenta con un presupuesto proyectado de más de 120 millones de soles.
      </p>
    `,
  },
  ...secondaryNews.map((item, idx) => ({
    ...item,
    section: idx === 0 ? "Jauja y Región" : "Cultura",
    sectionSlug: idx === 0 ? "jauja-y-region" : "cultura",
    slug: item.slug || `secondary-${idx}`,
    viewsCount: 2190 + idx * 500,
    tags: [item.category, "Jauja"],
    authorRole: "Corresponsal",
    contentHtml: `<p class="lead text-lg text-slate-700 font-serif leading-relaxed mb-6">${item.excerpt}</p>`,
  })),
  ...jaujaNews.map((item, idx) => ({
    ...item,
    section: "Jauja y Región",
    sectionSlug: "jauja-y-region",
    slug: item.slug || `jauja-noticia-${idx + 1}`,
    viewsCount: 1450 + idx * 280,
    tags: ["Jauja", item.category, "Región Junín"],
    authorRole: "Redacción Regional VDN",
    contentHtml: `<p class="lead text-lg text-slate-700 font-serif leading-relaxed mb-6">${item.excerpt}</p>`,
  })),
  ...nacionalNews.map((item, idx) => ({
    ...item,
    section: "Nacional",
    sectionSlug: "nacional",
    slug: item.slug || `nacional-noticia-${idx + 1}`,
    viewsCount: 2800 + idx * 310,
    tags: ["Perú", item.category],
    authorRole: "Corresponsalía Lima",
    contentHtml: `<p class="lead text-lg text-slate-700 font-serif leading-relaxed mb-6">${item.excerpt}</p>`,
  })),
  ...internacionalNews.map((item, idx) => ({
    ...item,
    section: "Internacional",
    sectionSlug: "internacional",
    slug: item.slug || `internacional-noticia-${idx + 1}`,
    viewsCount: 1950 + idx * 190,
    tags: ["Mundo", item.category],
    authorRole: "Agencia Global de Prensa",
    contentHtml: `<p class="lead text-lg text-slate-700 font-serif leading-relaxed mb-6">${item.excerpt}</p>`,
  })),
  {
    id: "dep-1",
    title: "Club Defensor Jauja Clasifica a la Etapa Nacional de la Copa Perú",
    excerpt: "Tras vencer por 2-0 en el Estadio Monumental de Jauja, el representativo jaujino se consolida entre los 16 mejores equipos del fútbol amateur nacional.",
    author: "Deportes VDN",
    date: "18 Oct 2026",
    category: "Fútbol Regional",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2000&auto=format&fit=crop",
    readTime: "3 min",
    section: "Deportes",
    sectionSlug: "deportes",
    slug: "defensor-jauja-clasifica-etapa-nacional-copa-peru",
    viewsCount: 3120,
    tags: ["Deportes", "Copa Perú", "Jauja"],
    authorRole: "Comentarista Deportivo",
    contentHtml: `<p class="lead text-lg text-slate-700 font-serif leading-relaxed mb-6">Una verdadera fiesta deportiva se vivió en el Estadio Monumental de Jauja.</p>`,
  },
  {
    id: "dep-2",
    title: "Fondistas Jaujinos Copan el Podio en la Media Maratón Internacional de los Andes",
    excerpt: "Atletas formados en las alturas de Acolla y Paccha imponen nuevos récords.",
    author: "Redacción Deportiva",
    date: "17 Oct 2026",
    category: "Atletismo",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2000&auto=format&fit=crop",
    readTime: "3 min",
    section: "Deportes",
    sectionSlug: "deportes",
    slug: "fondistas-jaujinos-podio-maraton-internacional-andes",
    viewsCount: 1890,
    tags: ["Atletismo", "Jauja"],
    authorRole: "Cronista Deportivo",
    contentHtml: `<p class="lead text-lg text-slate-700 font-serif leading-relaxed mb-6">El atletismo de fondo reafirmó al Valle del Mantaro como la capital sudamericana de la resistencia aeróbica.</p>`,
  },
  ...opinionPieces.map((op, idx) => ({
    id: op.id,
    title: op.title,
    excerpt: `Columna de análisis regional por ${op.author}.`,
    author: op.author,
    date: "17 Oct 2026",
    category: "Opinión",
    imageUrl: op.avatarUrl,
    readTime: "4 min",
    section: "Opinión",
    sectionSlug: "opinion",
    slug: `columna-${op.author.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${idx + 1}`,
    viewsCount: 2400 + idx * 300,
    tags: ["Opinión", "Análisis", "Valle del Mantaro"],
    authorRole: op.role,
    authorAvatar: op.avatarUrl,
    contentHtml: `<p class="lead text-lg text-slate-700 font-serif leading-relaxed mb-6">En esta entrega analizamos las perspectivas y desafíos que enfrenta nuestra región.</p>`,
  })),
];

// =====================================================================
// SERVICIO DE NOTICIAS — Supabase con fallback a mock-data
// =====================================================================
export const NewsService = {
  getAllArticles: async (): Promise<FullArticle[]> => {
    if (!isSupabaseConfigured()) return buildMockArticles();
    try {
      const supabase = createServerClient();
      const { data, error } = await supabase
        .from("articles")
        .select(ARTICLE_SELECT)
        .eq("status", "published")
        .is("deleted_at", null)
        .order("published_at", { ascending: false })
        .limit(50);

      if (error || !data || data.length === 0) return buildMockArticles();
      return data.map(mapArticleRow);
    } catch {
      return buildMockArticles();
    }
  },

  getArticleBySlug: async (slug: string): Promise<FullArticle | undefined> => {
    if (!isSupabaseConfigured()) {
      return buildMockArticles().find((a) => a.slug === slug);
    }
    try {
      const supabase = createServerClient();
      const { data, error } = await supabase
        .from("articles")
        .select(ARTICLE_SELECT)
        .eq("slug", slug)
        .eq("status", "published")
        .is("deleted_at", null)
        .single();

      if (error || !data) {
        return buildMockArticles().find((a) => a.slug === slug);
      }
      return mapArticleRow(data);
    } catch {
      return buildMockArticles().find((a) => a.slug === slug);
    }
  },

  getArticlesBySection: async (sectionSlug: string): Promise<FullArticle[]> => {
    const normalized = sectionSlug.toLowerCase().trim();
    if (normalized === "todos" || normalized === "") {
      return NewsService.getAllArticles();
    }

    const mockFallback = () =>
      buildMockArticles().filter(
        (a) =>
          a.sectionSlug.toLowerCase() === normalized ||
          a.category.toLowerCase().includes(normalized)
      );

    if (!isSupabaseConfigured()) return mockFallback();

    try {
      const supabase = createServerClient();
      const { data, error } = await supabase
        .from("articles")
        .select(ARTICLE_SELECT)
        .eq("status", "published")
        .is("deleted_at", null)
        .eq("section", normalized)
        .order("published_at", { ascending: false })
        .limit(30);

      if (error || !data || data.length === 0) return mockFallback();
      return data.map(mapArticleRow);
    } catch {
      return mockFallback();
    }
  },

  getRelatedArticles: async (
    currentSlug: string,
    sectionSlug?: string,
    limit: number = 3
  ): Promise<FullArticle[]> => {
    const all = sectionSlug
      ? await NewsService.getArticlesBySection(sectionSlug)
      : await NewsService.getAllArticles();
    return all.filter((a) => a.slug !== currentSlug).slice(0, limit);
  },

  getMostReadArticles: async (limit: number = 5): Promise<FullArticle[]> => {
    const mockFallback = () =>
      [...buildMockArticles()].sort((a, b) => b.viewsCount - a.viewsCount).slice(0, limit);

    if (!isSupabaseConfigured()) return mockFallback();

    try {
      const supabase = createServerClient();
      const { data, error } = await supabase
        .from("articles")
        .select(ARTICLE_SELECT)
        .eq("status", "published")
        .is("deleted_at", null)
        .order("views_count", { ascending: false })
        .limit(limit);

      if (error || !data || data.length === 0) return mockFallback();
      return data.map(mapArticleRow);
    } catch {
      return mockFallback();
    }
  },

  searchArticles: async (query: string): Promise<FullArticle[]> => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const mockSearch = () =>
      buildMockArticles().filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)) ||
          a.author.toLowerCase().includes(q)
      );

    if (!isSupabaseConfigured()) return mockSearch();

    try {
      const supabase = createServerClient();
      // Full-Text Search en español
      const { data, error } = await supabase
        .from("articles")
        .select(ARTICLE_SELECT)
        .eq("status", "published")
        .is("deleted_at", null)
        .textSearch("search_vector", q, { type: "websearch", config: "spanish" })
        .order("published_at", { ascending: false })
        .limit(20);

      if (!error && data && data.length > 0) {
        return data.map(mapArticleRow);
      }

      // Fallback: ILIKE en título
      const { data: fallbackData } = await supabase
        .from("articles")
        .select(ARTICLE_SELECT)
        .eq("status", "published")
        .is("deleted_at", null)
        .ilike("title", `%${q}%`)
        .order("published_at", { ascending: false })
        .limit(20);

      if (fallbackData && fallbackData.length > 0) {
        return fallbackData.map(mapArticleRow);
      }

      return mockSearch();
    } catch {
      return mockSearch();
    }
  },

  getComments: async (articleSlug: string): Promise<ArticleComment[]> => {
    if (!isSupabaseConfigured()) return mockComments[articleSlug] || [];

    try {
      const supabase = createServerClient();
      const { data: articleRow } = await supabase
        .from("articles")
        .select("id")
        .eq("slug", articleSlug)
        .single();

      const artId = (articleRow as unknown as Record<string, string>)?.id;
      if (!artId) return mockComments[articleSlug] || [];

      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("article_id", artId)
        .eq("is_approved", true)
        .order("created_at", { ascending: false })
        .limit(50);

      if (error || !data || data.length === 0) {
        return mockComments[articleSlug] || [];
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (data as any[]).map((c) => ({
        id: c.id,
        authorName: c.author_name,
        commentText: c.comment_text,
        createdAt: formatTimeAgo(c.created_at),
      }));
    } catch {
      return mockComments[articleSlug] || [];
    }
  },

  incrementViews: async (articleId: string): Promise<void> => {
    if (!isSupabaseConfigured()) return;
    try {
      const supabase = createServerClient();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase.rpc as any)("increment_article_views", {
        article_id: articleId,
      });
    } catch {
      // No bloquear por error de vistas
    }
  },

  getSectionMeta: (sectionSlug: string) => {
    const map: Record<string, { title: string; subtitle: string; badgeColor: string; description: string }> = {
      "jauja-y-region": {
        title: "Jauja y Región",
        subtitle: "Acontecimientos del Valle del Mantaro, Primera Capital y Provincias Hermanas",
        badgeColor: "bg-[#1e40af]",
        description: "Noticias de última hora, política municipal, obras públicas, transporte, agricultura y sociedad en la provincia de Jauja.",
      },
      nacional: {
        title: "Noticias Nacionales",
        subtitle: "Panorama Político, Social y Económico del Perú",
        badgeColor: "bg-[#1d4ed8]",
        description: "Cobertura veraz desde el Congreso, Palacio de Gobierno, Ministerios y las principales regiones del territorio peruano.",
      },
      internacional: {
        title: "Panorama Internacional",
        subtitle: "Actualidad Global, Geopolítica y Mercados",
        badgeColor: "bg-[#047857]",
        description: "Análisis y noticias de los sucesos más importantes en América Latina, Europa, Asia y el mundo.",
      },
      opinion: {
        title: "Columnas y Opinión",
        subtitle: "Pluralidad de Voces, Debate y Pensamiento Crítico",
        badgeColor: "bg-[#b45309]",
        description: "Artículos de análisis, editoriales y columnas firmadas por destacados catedráticos, juristas, economistas y líderes de opinión regional.",
      },
      cultura: {
        title: "Cultura y Tradición",
        subtitle: "Patrimonio Histórico, Danzas, Música y Costumbres",
        badgeColor: "bg-[#7e22ce]",
        description: "Difusión de la Tunantada, Huaconada de Mito, carnavales, folclore andino y el legado histórico de Jauja.",
      },
      deportes: {
        title: "Deportes VDN",
        subtitle: "Copa Perú, Fondismo, Fútbol y Deporte Regional",
        badgeColor: "bg-[#b91c1c]",
        description: "Seguimiento exhaustivo de los clubes de Jauja en la Copa Perú, fondistas de élite del Valle del Mantaro.",
      },
    };

    return (
      map[sectionSlug.toLowerCase()] || {
        title: sectionSlug.toUpperCase().replace(/-/g, " "),
        subtitle: "Información veraz y oportuna",
        badgeColor: "bg-navy-950",
        description: "Noticias e informes especiales de Voces de la Noticia.",
      }
    );
  },
};

// Comentarios simulados (fallback)
export const mockComments: Record<string, ArticleComment[]> = {
  "modernizacion-aeropuerto-francisco-carle-jauja": [
    {
      id: "c-1",
      authorName: "Ing. Manuel Ramos",
      commentText: "Excelente iniciativa para nuestra provincia.",
      createdAt: "Hace 3 horas",
    },
    {
      id: "c-2",
      authorName: "Dra. Gladys Palacios",
      commentText: "Felicidades a VDN por el seguimiento minucioso.",
      createdAt: "Hace 1 hora",
    },
  ],
};
