export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  imageUrl?: string;
  readTime: string;
  slug?: string;
}

export interface OpinionPiece {
  id: string;
  author: string;
  role: string;
  title: string;
  avatarUrl: string;
  initials: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
  photographer: string;
}

export const heroNews: NewsItem = {
  id: "hero-1",
  title: "Gobierno Regional Anuncia Modernización Integral del Aeropuerto Francisco Carlé",
  excerpt: "El histórico terminal aéreo de Jauja recibirá una inversión estratégica para ampliar la pista de aterrizaje, habilitar vuelos nocturnos y modernizar la sala de embarque comercial, consolidando al Valle del Mantaro como el eje logístico central del Perú.",
  author: "Mesa de Redacción VDN",
  date: "17 Oct 2026",
  category: "Economía Regional",
  imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop",
  readTime: "4 min",
  slug: "modernizacion-aeropuerto-francisco-carle-jauja"
};

export const secondaryNews: NewsItem[] = [
  {
    id: "sec-1",
    title: "Productores de Papa Nativa de Jauja y Concepción Exportarán a Mercados Europeos",
    excerpt: "Tras obtener la exigente certificación fitosanitaria orgánica, 15 asociaciones campesinas aseguran contratos directos en Francia, Alemania y España.",
    author: "Carlos Mendoza",
    date: "17 Oct 2026",
    category: "Agricultura",
    imageUrl: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?q=80&w=2000&auto=format&fit=crop",
    readTime: "3 min",
    slug: "productores-papa-nativa-jauja-exportacion-europa"
  },
  {
    id: "sec-2",
    title: "Preparativos para la Tunantada 2027: Patrimonio Cultural Fortalecerá Cobertura y Seguridad",
    excerpt: "Autoridades locales y cuadrillas de danzantes acuerdan plan maestro para recibir a más de 80,000 visitantes en la plaza de Yauyos con transmisión en vivo.",
    author: "Elena Vílchez",
    date: "17 Oct 2026",
    category: "Cultura",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2000&auto=format&fit=crop",
    readTime: "5 min",
    slug: "preparativos-tunantada-2027-patrimonio-yauyos"
  }
];

export const jaujaNews: NewsItem[] = [
  {
    id: "jau-1",
    title: "Renovación Integral del Sistema de Agua Potable y Alcantarillado en Sausa",
    excerpt: "Concluyen las pruebas hidráulicas en la red matriz que garantizará servicio continuo las 24 horas a más de 3,500 familias.",
    author: "Corresponsal VDN",
    date: "17 Oct 2026",
    category: "Servicios",
    imageUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=2000&auto=format&fit=crop",
    readTime: "2 min",
    slug: "renovacion-sistema-agua-potable-sausa"
  },
  {
    id: "jau-2",
    title: "Hospital Domingo Olavegoya Pone en Operación Nuevo Tomógrafo de Alta Precisión",
    excerpt: "El nosocomio jaujino amplía su capacidad resolutiva evitando traslados de emergencia hacia Huancayo o Lima.",
    author: "Redacción Salud",
    date: "17 Oct 2026",
    category: "Salud",
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2000&auto=format&fit=crop",
    readTime: "3 min",
    slug: "hospital-domingo-olavegoya-nuevo-tomografo"
  },
  {
    id: "jau-3",
    title: "Inauguran 12 Cuadras de Pavimentación Rígida y Áreas Verdes en Huarancayo",
    excerpt: "Alcaldía provincial entregó moderna infraestructura vial que dinamiza el comercio barrial y la seguridad peatonal.",
    author: "Área Municipal",
    date: "16 Oct 2026",
    category: "Obras",
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2000&auto=format&fit=crop",
    readTime: "2 min",
    slug: "inauguracion-pavimentacion-huarancayo-jauja"
  },
  {
    id: "jau-4",
    title: "Culminan Obras de Mantenimiento y Refuerzo Estructural en el Puente Stuart",
    excerpt: "MTC concluyó trabajos de señalización y defensas ribereñas garantizando la fluidez vehicular en el eje vial interprovincial.",
    author: "Transportes VDN",
    date: "16 Oct 2026",
    category: "Vialidad",
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2000&auto=format&fit=crop",
    readTime: "2 min",
    slug: "mantenimiento-puente-stuart-valle-mantaro"
  }
];

export const nacionalNews: NewsItem[] = [
  {
    id: "nac-1",
    title: "Congreso de la República Aprueba Nueva Ley de Descentralización Fiscal",
    excerpt: "La iniciativa legislativa transferirá mayores recursos del canon directamente a municipalidades provinciales del interior.",
    author: "Corresponsalía Lima",
    date: "17 Oct 2026",
    category: "Política",
    imageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=2000&auto=format&fit=crop",
    readTime: "4 min",
    slug: "congreso-aprueba-descentralizacion-fiscal"
  },
  {
    id: "nac-2",
    title: "BCR Confirma Estabilidad de la Inflación Anual en el Rango Meta de 2.1%",
    excerpt: "El presidente del Banco Central destacó la solidez monetaria y la recuperación sostenida de la inversión privada regional.",
    author: "Sección Economía",
    date: "17 Oct 2026",
    category: "Economía",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2000&auto=format&fit=crop",
    readTime: "3 min",
    slug: "bcr-inflacion-estable-rango-meta"
  },
  {
    id: "nac-3",
    title: "Ministerio de Educación Habilita 18,000 Nuevas Plazas en la Carrera Pública Magisterial",
    excerpt: "Se priorizará la asignación de plazas docentes en zonas rurales y bilingües de la sierra y selva central.",
    author: "Educación & Sociedad",
    date: "16 Oct 2026",
    category: "Educación",
    imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=2000&auto=format&fit=crop",
    readTime: "3 min",
    slug: "minedu-plazas-carrera-publica-magisterial"
  }
];

export const internacionalNews: NewsItem[] = [
  {
    id: "int-1",
    title: "Cumbre Climática de Ginebra: 140 Naciones Sellan Acuerdo de Descarbonización",
    excerpt: "El histórico pacto incluye un fondo multilateral de adaptación para naciones vulnerables a los deshielos glaciares andinos.",
    author: "Agencia Global",
    date: "17 Oct 2026",
    category: "Medio Ambiente",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
    readTime: "5 min",
    slug: "cumbre-climatica-ginebra-acuerdo-descarbonizacion"
  },
  {
    id: "int-2",
    title: "Mercados Financieros Globales se Disparan Impulsados por Semiconductores",
    excerpt: "Índices en Tokio, Frankfurt y Wall Street registran máximos trimestrales ante la alta demanda de chips de inteligencia artificial.",
    author: "Finanzas Internacionales",
    date: "17 Oct 2026",
    category: "Mercados",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2000&auto=format&fit=crop",
    readTime: "3 min",
    slug: "mercados-financieros-maximos-semiconductores"
  },
  {
    id: "int-3",
    title: "Unión Europea Actualiza Protocolos Sanitarios para Agroexportaciones",
    excerpt: "Nuevas normativas de trazabilidad digital entrarán en vigor en 2027 beneficiando a productores certificados libres de pesticidas.",
    author: "Comercio Exterior",
    date: "16 Oct 2026",
    category: "Comercio",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop",
    readTime: "4 min",
    slug: "union-europea-protocolos-agroexportacion"
  }
];

export const opinionPieces: OpinionPiece[] = [
  {
    id: "opi-1",
    author: "Dr. Arturo Villanueva",
    role: "Analista Político y Catedrático",
    title: "El Desafío Hídrico y el Futuro Agropecuario del Valle del Mantaro",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    initials: "AV"
  },
  {
    id: "opi-2",
    author: "Dra. María Fernández",
    role: "Economista & Consultora Regional",
    title: "Descentralización Productiva: De la Promesa Electoral a la Realidad",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
    initials: "MF"
  },
  {
    id: "opi-3",
    author: "Ing. Roberto Cáceres",
    role: "Especialista en Transporte e Infraestructura",
    title: "La Nueva Carretera Central y la Conectividad de Jauja hacia el Mundo",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    initials: "RC"
  }
];

export const jaujaPhotoGallery: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Laguna de Paca al Amanecer",
    location: "Distrito de Paca, Jauja",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop",
    photographer: "Archivo Gráfico VDN"
  },
  {
    id: "gal-2",
    title: "Campiñas y Andenes del Valle del Mantaro",
    location: "Sausa / Acolla",
    imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=2000&auto=format&fit=crop",
    photographer: "Marco Antonio Ruiz"
  },
  {
    id: "gal-3",
    title: "Arquitectura y Casonas Históricas de la Primera Capital",
    location: "Centro Histórico de Jauja",
    imageUrl: "https://images.unsplash.com/photo-1548625361-16a715f3ec56?q=80&w=2000&auto=format&fit=crop",
    photographer: "Fototeca Regional"
  },
  {
    id: "gal-4",
    title: "Pachamanca Tradicional y Riqueza Gastronómica",
    location: "Yauyos, Jauja",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2000&auto=format&fit=crop",
    photographer: "Turismo Jauja"
  },
  {
    id: "gal-5",
    title: "La Elegancia de la Tunantada Jaujina",
    location: "Plaza Jerau, Yauyos",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000&auto=format&fit=crop",
    photographer: "Patrimonio Inmaterial VDN"
  }
];
