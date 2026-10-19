import {
  heroNews,
  secondaryNews,
  jaujaNews,
  nacionalNews,
  internacionalNews,
  opinionPieces,
  type NewsItem,
} from "@/lib/mock-data";

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

// Catálogo consolidado de noticias con contenido completo
export const allFullArticles: FullArticle[] = [
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
        El Gobierno Regional de Junín, en estrecha coordinación con el Ministerio de Transportes y Comunicaciones (MTC) y la Corporación Peruana de Aeropuertos y Aviación Comercial (CORPAC), oficializó hoy la aprobación del expediente técnico para la ampliación y modernización integral del Aeropuerto Francisco Carlé de la provincia de Jauja.
      </p>

      <h2 class="text-2xl font-serif font-bold text-navy-950 mt-8 mb-4">
        Ampliación de pista y tecnología para vuelos nocturnos
      </h2>
      <p class="text-slate-700 leading-relaxed mb-4">
        La obra cuenta con un presupuesto proyectado de más de 120 millones de soles. La intervención priorizará la extensión de la pista de aterrizaje de 2,870 metros a más de 3,200 metros lineales, lo que permitirá el arribo seguro de aeronaves de mayor fuselaje tipo Airbus A320 y Boeing 737 a máxima capacidad de carga y pasajeros sin restricciones de altitud.
      </p>
      <p class="text-slate-700 leading-relaxed mb-6">
        Asimismo, se instalará un moderno sistema de luces de aproximación y radioayudas aeronáuticas ILS (Instrument Landing System), requisito indispensable para habilitar operaciones en condiciones meteorológicas adversas y despegues y aterrizajes nocturnos durante todo el año.
      </p>

      <div class="my-8 p-6 bg-slate-50 border-l-4 border-amber-500 rounded-r-md">
        <blockquote class="italic text-navy-950 font-serif text-lg leading-relaxed mb-2">
          &ldquo;Jauja es la puerta de entrada aérea a toda la sierra y selva central. Con esta modernización, no solo duplicaremos el flujo de turistas hacia el Valle del Mantaro, Tarma y Chanchamayo, sino que dinamizaremos la exportación directa de flores, café y hortalizas finas a la capital y al extranjero.&rdquo;
        </blockquote>
        <cite class="text-xs font-bold uppercase tracking-wider text-amber-700 block mt-2">
          — Declaración oficial de la mesa técnica de transporte regional
        </cite>
      </div>

      <h2 class="text-2xl font-serif font-bold text-navy-950 mt-8 mb-4">
        Nueva terminal de pasajeros con identidad jaujina
      </h2>
      <p class="text-slate-700 leading-relaxed mb-4">
        El proyecto arquitectónico contempla una nueva terminal de dos niveles dotada de salas de embarque climatizadas, fajas electromecánicas de equipaje, locales comerciales para artesanía jaujina y gastronomía típica, además de un amplio estacionamiento vehicular con conexión fluida hacia la Carretera Central y el ramal hacia Huancayo.
      </p>
      <p class="text-slate-700 leading-relaxed mb-6">
        Se estima que los trabajos preliminares de movimiento de tierras comenzarán el próximo mes, con un plazo de ejecución de 14 meses continuos bajo estricta veeduría ciudadana y gremial.
      </p>
    `
  },
  {
    ...secondaryNews[0],
    section: "Jauja y Región",
    sectionSlug: "jauja-y-region",
    slug: secondaryNews[0].slug || "productores-papa-nativa-jauja-exportacion-europa",
    viewsCount: 2190,
    tags: ["Agricultura", "Papa Nativa", "Exportación", "Jauja", "Economía"],
    authorRole: "Corresponsal Agrario",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    contentHtml: `
      <p class="lead text-lg text-slate-700 font-serif leading-relaxed mb-6 font-medium">
        Un importante hito comercial alcanzaron más de 150 familias productoras de papa nativa de las comunidades campesinas de Jauja y Concepción tras concretar la firma de convenios de exportación directa hacia Francia, España y Países Bajos.
      </p>
      <h2 class="text-2xl font-serif font-bold text-navy-950 mt-8 mb-4">
        Variedades ancestrales conquistan el mercado gourmet europeo
      </h2>
      <p class="text-slate-700 leading-relaxed mb-4">
        Las variedades seleccionadas incluyen la Huayro Macho, Camotillo, Ceccorani y Amarilla Tumbay, tubérculos que destacan por su altísimo contenido de antioxidantes naturales y su cultivo libre de agroquímicos a más de 3,600 metros sobre el nivel del mar.
      </p>
      <p class="text-slate-700 leading-relaxed mb-6">
        Los envíos se realizarán en presentaciones procesadas al vacío en chips gourmet y tubérculos en fresco bajo rigurosos protocolos sanitarios avalados por Senasa.
      </p>
    `
  },
  {
    ...secondaryNews[1],
    section: "Cultura",
    sectionSlug: "cultura",
    slug: secondaryNews[1].slug || "preparativos-tunantada-2027-patrimonio-yauyos",
    viewsCount: 4620,
    tags: ["Tunantada", "Yauyos", "Cultura", "Jauja", "Patrimonio"],
    authorRole: "Especialista en Tradiciones y Folclore",
    authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
    contentHtml: `
      <p class="lead text-lg text-slate-700 font-serif leading-relaxed mb-6 font-medium">
        En una asamblea comunal extraordinaria celebrada en la Plaza Jerau del distrito de Yauyos, la Asociación de Instituciones Tunanteras y las autoridades locales presentaron el plan maestro de organización y seguridad para la Festividad de la Tunantada.
      </p>
      <h2 class="text-2xl font-serif font-bold text-navy-950 mt-8 mb-4">
        Proyección de más de 80,000 visitantes y transmisión en alta definición
      </h2>
      <p class="text-slate-700 leading-relaxed mb-4">
        La Tunantada, declarada Patrimonio Cultural de la Nación, convocará a más de 45 instituciones tunanteras con sus orquestas típicas. Para esta edición se habilitarán corredores turísticos peatonales, graderías con control biométrico y una cobertura audiovisual completa que VDN Radio y Televisión transmitirá para todo el mundo.
      </p>
    `
  },
  ...jaujaNews.map((item, idx) => ({
    ...item,
    section: "Jauja y Región",
    sectionSlug: "jauja-y-region",
    slug: item.slug || `jauja-noticia-${idx + 1}`,
    viewsCount: 1450 + idx * 280,
    tags: ["Jauja", item.category, "Región Junín"],
    authorRole: "Redacción Regional VDN",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    contentHtml: `
      <p class="lead text-lg text-slate-700 font-serif leading-relaxed mb-6 font-medium">
        ${item.excerpt}
      </p>
      <h2 class="text-2xl font-serif font-bold text-navy-950 mt-8 mb-4">
        Impacto comunitario y seguimiento de obras en Jauja
      </h2>
      <p class="text-slate-700 leading-relaxed mb-4">
        La mesa de trabajo ciudadana y las autoridades competentes supervisaron el cumplimiento de los cronogramas establecidos, enfatizando la importancia de la fiscalización comunal para garantizar obras de larga durabilidad en beneficio de las familias de la provincia.
      </p>
      <p class="text-slate-700 leading-relaxed mb-6">
        Voces de la Noticia continuará brindando cobertura minuto a minuto de las incidencias y el avance de este proyecto clave para el desarrollo del Valle del Mantaro.
      </p>
    `
  })),
  ...nacionalNews.map((item, idx) => ({
    ...item,
    section: "Nacional",
    sectionSlug: "nacional",
    slug: item.slug || `nacional-noticia-${idx + 1}`,
    viewsCount: 2800 + idx * 310,
    tags: ["Perú", item.category, "Política", "Economía"],
    authorRole: "Corresponsalía Lima",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    contentHtml: `
      <p class="lead text-lg text-slate-700 font-serif leading-relaxed mb-6 font-medium">
        ${item.excerpt}
      </p>
      <h2 class="text-2xl font-serif font-bold text-navy-950 mt-8 mb-4">
        Alcance y debate en las principales fuerzas del país
      </h2>
      <p class="text-slate-700 leading-relaxed mb-4">
        Analistas constitucionales y económicos han coincidido en que las medidas adoptadas definirán el rumbo de la inversión descentralizada durante el próximo bienio, estableciendo nuevos incentivos para las regiones del centro y sur peruano.
      </p>
    `
  })),
  ...internacionalNews.map((item, idx) => ({
    ...item,
    section: "Internacional",
    sectionSlug: "internacional",
    slug: item.slug || `internacional-noticia-${idx + 1}`,
    viewsCount: 1950 + idx * 190,
    tags: ["Mundo", item.category, "Geopolítica"],
    authorRole: "Agencia Global de Prensa",
    authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
    contentHtml: `
      <p class="lead text-lg text-slate-700 font-serif leading-relaxed mb-6 font-medium">
        ${item.excerpt}
      </p>
      <h2 class="text-2xl font-serif font-bold text-navy-950 mt-8 mb-4">
        Repercusiones en los mercados emergentes de América Latina
      </h2>
      <p class="text-slate-700 leading-relaxed mb-4">
        Las decisiones tomadas en los foros internacionales tendrán un impacto directo en las tasas arancelarias y en las metas de transición energética de las economías sudamericanas en los próximos cinco años.
      </p>
    `
  })),
  // Artículos de Deportes
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
    tags: ["Deportes", "Copa Perú", "Jauja", "Fútbol"],
    authorRole: "Comentarista Deportivo",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    contentHtml: `
      <p class="lead text-lg text-slate-700 font-serif leading-relaxed mb-6 font-medium">
        Una verdadera fiesta deportiva se vivió en el Estadio Monumental de Jauja. Con goles en el segundo tiempo, el Club Defensor Jauja selló su clasificación a la ansiada Etapa Nacional de la Copa Perú ante más de 7,000 enfervorizados hinchas.
      </p>
      <h2 class="text-2xl font-serif font-bold text-navy-950 mt-8 mb-4">
        Rumbo a la Liga 2 con solidez defensiva y apoyo popular
      </h2>
      <p class="text-slate-700 leading-relaxed mb-4">
        El cuerpo técnico destacó el compromiso de los futbolistas y convocó a todo el empresariado local a sumar auspicios para solventar los viajes hacia el norte y sur del país en las llaves eliminatorias de ida y vuelta.
      </p>
    `
  },
  {
    id: "dep-2",
    title: "Fondistas Jaujinos Copan el Podio en la Media Maratón Internacional de los Andes",
    excerpt: "Atletas formados en las alturas de Acolla y Paccha imponen nuevos récords en la tradicional competencia de 21K por el Valle del Mantaro.",
    author: "Redacción Deportiva",
    date: "17 Oct 2026",
    category: "Atletismo",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2000&auto=format&fit=crop",
    readTime: "3 min",
    section: "Deportes",
    sectionSlug: "deportes",
    slug: "fondistas-jaujinos-podio-maraton-internacional-andes",
    viewsCount: 1890,
    tags: ["Atletismo", "Fondismo", "Jauja", "Valle del Mantaro"],
    authorRole: "Cronista Deportivo",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    contentHtml: `
      <p class="lead text-lg text-slate-700 font-serif leading-relaxed mb-6 font-medium">
        El atletismo de fondo reafirmó al Valle del Mantaro como la capital sudamericana de la resistencia aeróbica tras una jornada memorable en la Media Maratón Internacional de los Andes.
      </p>
    `
  },
  ...opinionPieces.map((op, idx) => ({
    id: op.id,
    title: op.title,
    excerpt: `Columna de análisis regional sobre el desarrollo del Valle del Mantaro y la descentralización del Perú, por ${op.author}.`,
    author: op.author,
    date: "17 Oct 2026",
    category: "Opinión",
    imageUrl: op.avatarUrl,
    readTime: "4 min",
    section: "Opinión",
    sectionSlug: "opinion",
    slug: `columna-${op.author.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${idx + 1}`,
    viewsCount: 2400 + idx * 300,
    tags: ["Opinión", "Análisis", "Valle del Mantaro", "Descentralización"],
    authorRole: op.role,
    authorAvatar: op.avatarUrl,
    contentHtml: `
      <p class="lead text-lg text-slate-700 font-serif leading-relaxed mb-6 font-medium">
        En esta entrega analizamos las perspectivas y desafíos que enfrenta nuestra región ante el nuevo escenario político y económico del país.
      </p>
      <h2 class="text-2xl font-serif font-bold text-navy-950 mt-8 mb-4">
        Diagnóstico y propuestas para el desarrollo regional
      </h2>
      <p class="text-slate-700 leading-relaxed mb-4">
        Es imperativo que la sociedad civil organizada y las universidades de la región Junín asuman un rol protagónico en la formulación de políticas públicas con visión de cuenca y sostenibilidad territorial.
      </p>
    `
  }))
];

// Comentarios simulados
export const mockComments: Record<string, ArticleComment[]> = {
  "modernizacion-aeropuerto-francisco-carle-jauja": [
    {
      id: "c-1",
      authorName: "Ing. Manuel Ramos",
      commentText: "Excelente iniciativa para nuestra provincia. Urge que los vuelos nocturnos se concreten pronto para que los jaujinos y turistas no dependan de la Carretera Central cuando hay huaicos.",
      createdAt: "Hace 3 horas"
    },
    {
      id: "c-2",
      authorName: "Dra. Gladys Palacios",
      commentText: "Felicidades a VDN por el seguimiento minucioso. Ojalá las autoridades cumplan los 14 meses y no existan adendas injustificadas.",
      createdAt: "Hace 1 hora"
    }
  ]
};

// Servicios de obtención de datos
export const NewsService = {
  getAllArticles: (): FullArticle[] => {
    return allFullArticles;
  },

  getArticleBySlug: (slug: string): FullArticle | undefined => {
    return allFullArticles.find((a) => a.slug === slug);
  },

  getArticlesBySection: (sectionSlug: string): FullArticle[] => {
    const normalized = sectionSlug.toLowerCase().trim();
    if (normalized === "todos" || normalized === "") return allFullArticles;
    return allFullArticles.filter(
      (a) => a.sectionSlug.toLowerCase() === normalized || a.category.toLowerCase().includes(normalized)
    );
  },

  getRelatedArticles: (currentSlug: string, sectionSlug?: string, limit: number = 3): FullArticle[] => {
    return allFullArticles
      .filter((a) => a.slug !== currentSlug && (!sectionSlug || a.sectionSlug === sectionSlug))
      .slice(0, limit);
  },

  getMostReadArticles: (limit: number = 5): FullArticle[] => {
    return [...allFullArticles].sort((a, b) => b.viewsCount - a.viewsCount).slice(0, limit);
  },

  searchArticles: (query: string): FullArticle[] => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return allFullArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)) ||
        a.author.toLowerCase().includes(q)
    );
  },

  getSectionMeta: (sectionSlug: string) => {
    const map: Record<string, { title: string; subtitle: string; badgeColor: string; description: string }> = {
      "jauja-y-region": {
        title: "Jauja y Región",
        subtitle: "Acontecimientos del Valle del Mantaro, Primera Capital y Provincias Hermanas",
        badgeColor: "bg-[#1e40af]",
        description: "Noticias de última hora, política municipal, obras públicas, transporte, agricultura y sociedad en la provincia de Jauja y todo el centro del país."
      },
      nacional: {
        title: "Noticias Nacionales",
        subtitle: "Panorama Político, Social y Económico del Perú",
        badgeColor: "bg-[#1d4ed8]",
        description: "Cobertura veraz desde el Congreso, Palacio de Gobierno, Ministerios y las principales regiones del territorio peruano."
      },
      internacional: {
        title: "Panorama Internacional",
        subtitle: "Actualidad Global, Geopolítica y Mercados",
        badgeColor: "bg-[#047857]",
        description: "Análisis y noticias de los sucesos más importantes en América Latina, Europa, Asia y el mundo."
      },
      opinion: {
        title: "Columnas y Opinión",
        subtitle: "Pluralidad de Voces, Debate y Pensamiento Crítico",
        badgeColor: "bg-[#b45309]",
        description: "Artículos de análisis, editoriales y columnas firmadas por destacados catedráticos, juristas, economistas y líderes de opinión regional."
      },
      cultura: {
        title: "Cultura y Tradición",
        subtitle: "Patrimonio Histórico, Danzas, Música y Costumbres",
        badgeColor: "bg-[#7e22ce]",
        description: "Difusión de la Tunantada, Huaconada de Mito, carnavales, folclore andino y el legado histórico de Jauja como Primera Capital del Perú."
      },
      deportes: {
        title: "Deportes VDN",
        subtitle: "Copa Perú, Fondismo, Fútbol y Deporte Regional",
        badgeColor: "bg-[#b91c1c]",
        description: "Seguimiento exhaustivo de los clubes de Jauja en la Copa Perú, fondistas de élite del Valle del Mantaro y competencias atléticas."
      }
    };

    return map[sectionSlug.toLowerCase()] || {
      title: sectionSlug.toUpperCase().replace(/-/g, " "),
      subtitle: "Información veraz y oportuna",
      badgeColor: "bg-navy-950",
      description: "Noticias e informes especiales de Voces de la Noticia."
    };
  }
};
