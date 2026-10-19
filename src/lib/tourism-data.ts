export interface Festivity {
  id: string;
  name: string;
  scope: 'mantaro' | 'junin' | 'nacional' | 'internacional';
  scopeLabel: string;
  month: number; // 1 - 12
  monthLabel: string;
  days: string;
  location: string;
  city: string;
  description: string;
  history: string;
  imageUrl: string;
  heritageStatus?: string;
  traditionalDishes: string[];
  tipsForTourists: string;
  isHighlight?: boolean;
}

export const festivitiesData: Festivity[] = [
  // --- ENERO ---
  {
    id: "fest-1",
    name: "Festival de la Tunantada en Honor a San Sebastián y San Fabián",
    scope: "mantaro",
    scopeLabel: "Valle del Mantaro (Jauja)",
    month: 1,
    monthLabel: "Enero",
    days: "20 al 25 de Enero",
    location: "Plaza Jerau, Distrito de Yauyos",
    city: "Jauja, Junín",
    description: "La fiesta más grande e importante de Jauja y del centro del Perú. Decenas de cuadrillas de tunantes bailan con elegancia satirizando a las clases sociales de la época virreinal.",
    history: "Declarada Patrimonio Cultural de la Nación. Sus personajes (el Príncipe, la Jaujina, el Chuto, el Huari, el Tucumano y el Jamille) representan la convivencia y mestizaje cultural en la primera capital histórica del Perú.",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2000&auto=format&fit=crop",
    heritageStatus: "Patrimonio Cultural de la Nación",
    traditionalDishes: ["Lechón jaujino al horno", "Pachamanca tres sabores", "Calentito de canela con chactado"],
    tipsForTourists: "Reserva hospedaje con semanas de anticipación en Jauja. Las mañanas son soleadas y las tardes/noches son frías; lleva ropa abrigadora.",
    isHighlight: true
  },
  {
    id: "fest-2",
    name: "La Huaconada de Mito",
    scope: "mantaro",
    scopeLabel: "Valle del Mantaro (Mito)",
    month: 1,
    monthLabel: "Enero",
    days: "01 al 04 de Enero",
    location: "Plaza Principal de Mito",
    city: "Concepción / Valle del Mantaro",
    description: "Danza ritual ancestral donde los huacones, hombres enmascarados con látigos (tronadores) y narices pronunciadas, representan el antiguo consejo de ancianos que velaba por la moral.",
    history: "Inscrita en la Lista Representativa del Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO en 2010. Combina vestimentas de bayeta de lana y máscaras talladas en madera de aliso.",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000&auto=format&fit=crop",
    heritageStatus: "Patrimonio Cultural Inmaterial UNESCO",
    traditionalDishes: ["Patasca o caldo de mondongo", "Cuy chactado con papas nativas"],
    tipsForTourists: "Guarda respeto ante el paso de los Huacones y el chasquido de sus látigos. Mito está ubicado a solo 20 minutos de Jauja.",
    isHighlight: true
  },
  {
    id: "fest-3",
    name: "Fiesta de la Bajada de Reyes y Danza de la Huaylijía",
    scope: "mantaro",
    scopeLabel: "Valle del Mantaro (Jauja)",
    month: 1,
    monthLabel: "Enero",
    days: "05 al 08 de Enero",
    location: "Distritos de Huertas, Acolla y Masma",
    city: "Jauja, Junín",
    description: "Celebración religiosa y comunitaria donde coros de damas y pastorcillas danzan con pañuelos de encaje al compás de orquestas típicas en adoración al Niño Jesús.",
    history: "Tradición que data de la evangelización franciscana en el Valle de Yanamarca y Mantaro.",
    imageUrl: "https://images.unsplash.com/photo-1548625361-16a715f3ec56?q=80&w=2000&auto=format&fit=crop",
    traditionalDishes: ["Sopa de verduras y cordero", "Buñuelos jaujinos bañados en miel"],
    tipsForTourists: "Excelente oportunidad para recorrer los pueblos tradicionales del circuito de Yanamarca."
  },
  {
    id: "fest-4",
    name: "Festival Nacional de la Marinera Norteña",
    scope: "nacional",
    scopeLabel: "Nacional (Perú)",
    month: 1,
    monthLabel: "Enero",
    days: "Segunda quincena de Enero",
    location: "Coliseo Gran Chimú",
    city: "Trujillo, La Libertad",
    description: "El concurso de danza más prestigioso del Perú que congrega a miles de parejas de marinera y chalanes con caballos de paso.",
    history: "La marinera es la danza nacional por excelencia, símbolo de galanteo y peruanidad costeña.",
    imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2000&auto=format&fit=crop",
    heritageStatus: "Patrimonio Cultural de la Nación",
    traditionalDishes: ["Shámbar trujillano", "Cebiche norteño", "Cabrito a la norteña"],
    tipsForTourists: "Adquiere tus entradas con anticipación para la gran final del domingo."
  },

  // --- FEBRERO ---
  {
    id: "fest-5",
    name: "Festividad de la Virgen de la Candelaria",
    scope: "nacional",
    scopeLabel: "Nacional (Perú)",
    month: 2,
    monthLabel: "Febrero",
    days: "02 al 15 de Febrero",
    location: "Santuario de la Candelaria y Calles de Puno",
    city: "Puno, Altiplano",
    description: "La manifestación cultural, dancística y musical más grande del continente americano, con más de 100,000 danzantes y 40,000 músicos en escena.",
    history: "Reconocida por la UNESCO como Patrimonio Inmaterial de la Humanidad. Es la cumbre de la devoción andina y los trajes de luces.",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop",
    heritageStatus: "Patrimonio Cultural Inmaterial UNESCO",
    traditionalDishes: ["Chairo puneño", "Thimpo de trucha", "Kankacho de cordero"],
    tipsForTourists: "Aclimatarse al menos 2 días en Puno (3,800 m.s.n.m.) y beber abundante mate de coca."
  },
  {
    id: "fest-6",
    name: "Carnaval Jaujino y Cortamontes de la Primera Capital",
    scope: "mantaro",
    scopeLabel: "Valle del Mantaro (Jauja)",
    month: 2,
    monthLabel: "Febrero",
    days: "Todo el mes de Febrero",
    location: "Barrios Tradicionales de Jauja y Marco",
    city: "Jauja, Junín",
    description: "El carnaval más elegante y tradicional del centro del Perú. Destacan los cortamontes (árboles engalanados) bailados en pandillas al son de bandas de músicos.",
    history: "El Carnaval Marqueño (del distrito de Marco en Jauja) es famoso por sus saltos atléticos y la alegría colectiva de sus comuneros.",
    imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2000&auto=format&fit=crop",
    heritageStatus: "Patrimonio Cultural de la Nación (Carnaval Marqueño)",
    traditionalDishes: ["Caldo verde de hierbas aromáticas", "Chicha de jora macerada"],
    tipsForTourists: "Lleva impermeable y prepárate para los juegos con talco, serpentinas y agua."
  },
  {
    id: "fest-7",
    name: "Carnaval de Río de Janeiro",
    scope: "internacional",
    scopeLabel: "Internacional",
    month: 2,
    monthLabel: "Febrero",
    days: "Semana previa al Miércoles de Ceniza",
    location: "Sambódromo Marquês de Sapucaí",
    city: "Río de Janeiro, Brasil",
    description: "El espectáculo dancístico a cielo abierto más multitudinario del planeta, donde compiten las principales escuelas de samba de Río.",
    history: "Fusión de carnavales portugueses con ritmos e instrumentos afrobrasileños.",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2000&auto=format&fit=crop",
    traditionalDishes: ["Feijoada completa", "Caipirinha tradicional"],
    tipsForTourists: "Cuidar pertenencias en los 'blocos' de calle y disfrutar la fiesta en el Sambódromo."
  },

  // --- MARZO / ABRIL ---
  {
    id: "fest-8",
    name: "Semana Santa y Alfombras Florales de Tarma",
    scope: "junin",
    scopeLabel: "Región Junín (Tarma)",
    month: 4,
    monthLabel: "Abril",
    days: "Semana Santa (Jueves y Viernes Santo)",
    location: "Centro Histórico de Tarma y Catedral Santa Ana",
    city: "Tarma, Junín",
    description: "La 'Perla de los Andes' se viste de fiesta con kilómetros de alfombras multicolores hechas con flores naturales que cubren el paso de las sagradas imágenes.",
    history: "Tradición con más de un siglo de antigüedad declarada Patrimonio Cultural de la Nación.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop",
    heritageStatus: "Patrimonio Cultural de la Nación",
    traditionalDishes: ["Puchero tarmeño", "Sopa verde", "Manjar blanco artesanal"],
    tipsForTourists: "Tarma se encuentra a solo 45 minutos de Jauja; combina ambas visitas para un circuito completo.",
    isHighlight: true
  },
  {
    id: "fest-9",
    name: "Aniversario de la Fundación Española de Jauja",
    scope: "mantaro",
    scopeLabel: "Valle del Mantaro (Jauja)",
    month: 4,
    monthLabel: "Abril",
    days: "25 de Abril",
    location: "Plaza de Armas de Jauja",
    city: "Jauja, Junín",
    description: "Conmemoración de la fundación de Jauja como Primera Capital del Perú en 1534 por Francisco Pizarro. Desfiles cívicos, ferias gastronómicas y presentaciones culturales.",
    history: "Jauja albergó el primer cabildo de la administración española y fue célebre por su fertilidad y clima saludable en todo el virreinato.",
    imageUrl: "https://images.unsplash.com/photo-1548625361-16a715f3ec56?q=80&w=2000&auto=format&fit=crop",
    traditionalDishes: ["Pachamanca jaujina", "Pastel de papa con lechón"],
    tipsForTourists: "Visita la Capilla de Cristo Pobre (réplica de la Sainte-Chapelle de París) ubicada en el centro de Jauja."
  },

  // --- MAYO ---
  {
    id: "fest-10",
    name: "Fiesta de las Cruces y Danza de la Jija",
    scope: "mantaro",
    scopeLabel: "Valle del Mantaro (Jauja)",
    month: 5,
    monthLabel: "Mayo",
    days: "01 al 05 de Mayo",
    location: "Comunidades de Paccha, Canchayllo, Paca y Huertas",
    city: "Jauja, Junín",
    description: "Imponente danza masculina agrícola-guerrera ejecutada con una hoz y un cencerro que rinde homenaje a la Santísima Cruz y bendice el inicio de las cosechas del maíz.",
    history: "Declarada Patrimonio Cultural de la Nación. Su vestimenta incluye elegantes camisas bordadas, polainas y sombreros de paja fina.",
    imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=2000&auto=format&fit=crop",
    heritageStatus: "Patrimonio Cultural de la Nación",
    traditionalDishes: ["Caldo de cabeza de carnero", "Mondongo jaujino"],
    tipsForTourists: "Ideal para amantes del turismo rural y la fotografía en los andenes de Canchayllo y Paccha."
  },

  // --- JUNIO ---
  {
    id: "fest-11",
    name: "Inti Raymi: La Fiesta del Sol en el Cusco",
    scope: "nacional",
    scopeLabel: "Nacional (Perú)",
    month: 6,
    monthLabel: "Junio",
    days: "24 de Junio",
    location: "Fortaleza de Sacsayhuamán, Coricancha y Plaza de Armas",
    city: "Cusco, Perú",
    description: "La escenificación incaica más majestuosa del Tahuantinsuyo, que celebra el solsticio de invierno y rinde tributo al dios Inti.",
    history: "Instituido por el inca Pachacútec cerca de 1430, conmemora el origen mítico de los hijos del Sol.",
    imageUrl: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2000&auto=format&fit=crop",
    traditionalDishes: ["Chiriuchu tradicional cusqueño", "Chicha de jora"],
    tipsForTourists: "Imprescindible reservar con meses de antelación para graderías en Sacsayhuamán."
  },
  {
    id: "fest-12",
    name: "Fiesta de San Juan en la Amazonía Peruana",
    scope: "nacional",
    scopeLabel: "Nacional (Perú)",
    month: 6,
    monthLabel: "Junio",
    days: "24 de Junio",
    location: "Riberas de ríos y lagunas en Iquitos, Pucallpa y Selva Central",
    city: "Selva Central (Chanchamayo/Satipo) y Loreto",
    description: "La festividad más alegre de la selva en homenaje a San Juan Bautista, con baños purificadores en ríos, danzas al ritmo de bombo baile y consumo masivo de juanes.",
    history: "Sincretismo entre la cosmovisión de las etnias originarias amazónicas y el catolicismo.",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop",
    traditionalDishes: ["Avispa juane", "Tacacho con cecina", "Chapo de plátano"],
    tipsForTourists: "Chanchamayo y Satipo están a solo 3 horas bajando por carretera desde Jauja."
  },

  // --- JULIO / AGOSTO ---
  {
    id: "fest-13",
    name: "Fiesta del Tayta Shanti (Santiago) en el Valle del Mantaro",
    scope: "mantaro",
    scopeLabel: "Valle del Mantaro (Jauja y Huancayo)",
    month: 7,
    monthLabel: "Julio y Agosto",
    days: "24 de Julio al 15 de Agosto",
    location: "Todos los distritos y campos de Jauja, Concepción y Huancayo",
    city: "Valle del Mantaro, Junín",
    description: "La fiesta más desbordante, telúrica y alegre de los Andes peruanos. Rinde culto a los apus protectores y al ganado con el marcado de orejas (cintachicuy), tinya, huajra y zapateo sin descanso.",
    history: "Raíz prehispánica de agradecimiento a la Pachamama y al Tayta Wamani, fusionada con el apóstol Santiago.",
    imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2000&auto=format&fit=crop",
    heritageStatus: "Patrimonio Cultural de la Nación",
    traditionalDishes: ["Yuyo con chalona y papas", "Lechón tierno", "Chicha de jora fuerte"],
    tipsForTourists: "Viste ropa cómoda para zapatear toda la noche en las comparsas familiares y comunales.",
    isHighlight: true
  },
  {
    id: "fest-14",
    name: "Fiesta Patronal de San Roque y la Virgen de la Asunción en Acolla",
    scope: "mantaro",
    scopeLabel: "Valle del Mantaro (Jauja)",
    month: 8,
    monthLabel: "Agosto",
    days: "14 al 18 de Agosto",
    location: "Distrito de Acolla (Capital Musical del Centro)",
    city: "Jauja, Junín",
    description: "Encuentro masivo de bandas y orquestas sinfónico-típicas en el pueblo de músicos más renombrado del Perú, con corrida de toros costumbrista y cuadrillas de chonguinos.",
    history: "Acolla es cuna de grandes directores y compositores de la música jaujina y centroandina.",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2000&auto=format&fit=crop",
    traditionalDishes: ["Pachamanca subterránea", "Trigo pelado con carne de res"],
    tipsForTourists: "Acolla se ubica a 15 minutos al norte de Jauja en la ruta hacia Tarma."
  },

  // --- OCTUBRE ---
  {
    id: "fest-15",
    name: "Festividad del Señor de los Milagros y Virgen del Rosario",
    scope: "nacional",
    scopeLabel: "Nacional (Perú y Jauja)",
    month: 10,
    monthLabel: "Octubre",
    days: "Todo el mes de Octubre",
    location: "Calles de Jauja y Centro Histórico de Lima",
    city: "Jauja y Lima, Perú",
    description: "Procesiones multitudinarias del 'Cristo Moreno', donde la feligresía viste el tradicional hábito morado, se sahuman las andas y se degusta el tradicional turrón de Doña Pepa.",
    history: "La imagen pintada por un esclavo angoleño en Pachacamilla en 1651 sobrevivió a devastadores terremotos y es hoy Patrón del Perú y de los migrantes peruanos en el mundo.",
    imageUrl: "https://images.unsplash.com/photo-1548625361-16a715f3ec56?q=80&w=2000&auto=format&fit=crop",
    traditionalDishes: ["Turrón de Doña Pepa", "Picarones con miel de higo", "Anticuchos de corazón"],
    tipsForTourists: "Acompaña la procesión en el centro de Jauja partiendo de la Iglesia Matriz."
  },

  // --- NOVIEMBRE ---
  {
    id: "fest-16",
    name: "Celebración del Día de los Muertos y Todos los Santos",
    scope: "internacional",
    scopeLabel: "Internacional y Tradición Andina",
    month: 11,
    monthLabel: "Noviembre",
    days: "01 y 02 de Noviembre",
    location: "Cementerio General de Jauja y Michoacán / Oaxaca (México)",
    city: "Jauja (Perú) / México",
    description: "En Jauja y los Andes, las familias preparan las 'Tanta Wawas' (panes con rostros de yeso) y coronas de flores para visitar y compartir manjares con las almas de sus difuntos.",
    history: "Celebración sincrética de comunión entre vivos y antepasados común en Mesoamérica y los Andes sudamericanos.",
    imageUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=2000&auto=format&fit=crop",
    traditionalDishes: ["Tanta Wawas de bizcochuelo", "Mazamorra morada con harina de maíz negro"],
    tipsForTourists: "Prueba las Tanta Wawas recién horneadas en los hornos comunales de Jauja."
  }
];

export interface TouristAttraction {
  id: string;
  name: string;
  category: 'naturaleza' | 'arqueologia' | 'cultura' | 'gastronomia';
  categoryLabel: string;
  location: string;
  distanceFromJauja: string;
  description: string;
  imageUrl: string;
  activities: string[];
}

export const jaujaAttractions: TouristAttraction[] = [
  {
    id: "att-1",
    name: "Laguna de Paca: Mitos, Paisaje y Paseos en Lancha",
    category: "naturaleza",
    categoryLabel: "Naturaleza & Paisajes",
    location: "Distritos de Paca y Pancán",
    distanceFromJauja: "3.5 km (10 minutos)",
    description: "Mítica laguna rodeada de totorales y casonas campestres. Es cuna de leyendas sobre sirenas y campanas de oro sumergidas durante la conquista.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop",
    activities: ["Paseo en lanchas a motor y remo", "Almuerzo campestre con trucha frita", "Caminata por el circuito mirador"]
  },
  {
    id: "att-2",
    name: "Cañón de Shucto y Río Piñascocha",
    category: "naturaleza",
    categoryLabel: "Aventura & Geología",
    location: "Distrito de Canchayllo",
    distanceFromJauja: "35 km (1 hora)",
    description: "Impresionante formación geológica con paredes rocosas verticales de más de 60 metros de altura esculpidas por el cauce del río Piñascocha.",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop",
    activities: ["Trekking fotográfico", "Ruta de escalada en roca", "Avistamiento de aves altoandinas"]
  },
  {
    id: "att-3",
    name: "Sitio Arqueológico de Tunanmarca",
    category: "arqueologia",
    categoryLabel: "Arqueología Wanka",
    location: "Distrito de Tunanmarca",
    distanceFromJauja: "15 km (35 minutos)",
    description: "La mayor ciudadela fortificada de la confederación de los Xauxas-Wankas antes de la invasión incaica, con miles de recintos circulares de piedra.",
    imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=2000&auto=format&fit=crop",
    activities: ["Caminata arqueológica", "Vista panorámica 360° del Valle de Yanamarca", "Fotografía histórica"]
  },
  {
    id: "att-4",
    name: "Capilla de Cristo Pobre (Sainte-Chapelle de Jauja)",
    category: "cultura",
    categoryLabel: "Patrimonio Histórico",
    location: "Jr. San Martín, Centro de Jauja",
    distanceFromJauja: "Centro de la ciudad",
    description: "Hermosa joya arquitectónica de estilo neogótico francés construida a fines del siglo XIX inspirada en la Santa Capilla de París.",
    imageUrl: "https://images.unsplash.com/photo-1548625361-16a715f3ec56?q=80&w=2000&auto=format&fit=crop",
    activities: ["Visita guiada arquitectónica", "Apreciación de vitrales franceses", "Fotografía urbana colonial"]
  }
];
