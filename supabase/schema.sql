-- ==============================================================================
-- VDN (Voces de la Noticia) - Esquema de Base de Datos PostgreSQL / Supabase
-- Sede: Jauja, Junin, Peru
-- ==============================================================================

-- Habilitar extension para generacion de UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. TABLA: CATEGORIAS (Secciones tematicas)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 2. TABLA: AUTORES (Periodistas, directores y corresponsales)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.authors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(150) NOT NULL,
    role VARCHAR(100) DEFAULT 'Redactor' NOT NULL,
    email VARCHAR(150) UNIQUE,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 3. TABLA: ARTICULOS / NOTICIAS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(300) NOT NULL,
    slug VARCHAR(350) NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content_html TEXT NOT NULL,
    cover_image_url TEXT,
    section VARCHAR(50) NOT NULL DEFAULT 'local' CHECK (section IN ('local', 'nacional', 'internacional', 'opinion', 'deportes', 'cultura')),
    is_featured BOOLEAN DEFAULT FALSE NOT NULL,
    is_breaking BOOLEAN DEFAULT FALSE NOT NULL,
    status VARCHAR(20) DEFAULT 'draft' NOT NULL CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMP WITH TIME ZONE,
    author_id UUID REFERENCES public.authors(id) ON DELETE SET NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    views_count INTEGER DEFAULT 0 NOT NULL,
    reading_time_minutes INTEGER DEFAULT 3 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_articles_status_published ON public.articles(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_section ON public.articles(section);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);

-- ==============================================================================
-- 4. TABLA: BANNERS PUBLICITARIOS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.banners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sponsor_name VARCHAR(150) NOT NULL,
    image_url TEXT NOT NULL,
    target_url TEXT NOT NULL,
    position VARCHAR(50) NOT NULL CHECK (position IN ('header_top', 'sidebar', 'in_feed', 'footer')),
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    start_date DATE DEFAULT CURRENT_DATE NOT NULL,
    end_date DATE,
    impressions INTEGER DEFAULT 0 NOT NULL,
    clicks INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 5. TABLA: COMENTARIOS DE LECTORES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
    author_name VARCHAR(100) NOT NULL,
    author_email VARCHAR(150) NOT NULL,
    comment_text TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_comments_article_approved ON public.comments(article_id, is_approved);

-- ==============================================================================
-- 6. TABLA: CONFIGURACION DE RADIO EN VIVO
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.radio_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    stream_url TEXT NOT NULL,
    radio_name VARCHAR(150) NOT NULL DEFAULT 'VDN Radio Jauja',
    slogan VARCHAR(200) DEFAULT 'La voz informativa del Valle del Mantaro',
    is_broadcasting BOOLEAN DEFAULT TRUE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 7. TABLA: PARRILLA DE PROGRAMACION RADIAL
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.radio_schedule (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    radio_settings_id UUID REFERENCES public.radio_settings(id) ON DELETE CASCADE,
    program_name VARCHAR(150) NOT NULL,
    host_name VARCHAR(150) NOT NULL,
    day_of_week VARCHAR(20) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 8. POLÍTICAS DE SEGURIDAD (ROW LEVEL SECURITY - RLS)
-- ==============================================================================

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.radio_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.radio_schedule ENABLE ROW LEVEL SECURITY;

-- Lectura publica para contenido publicado
CREATE POLICY "Lectura publica de categorias" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Lectura publica de autores" ON public.authors FOR SELECT USING (true);
CREATE POLICY "Lectura publica de articulos publicados" ON public.articles FOR SELECT USING (status = 'published');
CREATE POLICY "Lectura publica de banners activos" ON public.banners FOR SELECT USING (is_active = true);
CREATE POLICY "Lectura publica de comentarios aprobados" ON public.comments FOR SELECT USING (is_approved = true);
CREATE POLICY "Lectura publica de radio" ON public.radio_settings FOR SELECT USING (true);
CREATE POLICY "Lectura publica de programacion radial" ON public.radio_schedule FOR SELECT USING (true);

-- Insercion publica de comentarios (pasan a moderacion con is_approved = false)
CREATE POLICY "Insercion de comentarios por lectores" ON public.comments FOR INSERT WITH CHECK (is_approved = false);

-- Acceso total para usuarios autenticados (Panel Administrativo)
CREATE POLICY "Admin full access categorias" ON public.categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access autores" ON public.authors FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access articulos" ON public.articles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access banners" ON public.banners FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access comentarios" ON public.comments FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access radio" ON public.radio_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access programacion" ON public.radio_schedule FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ==============================================================================
-- 9. DATOS INICIALES (SEED DATA)
-- ==============================================================================

-- Categorias base
INSERT INTO public.categories (name, slug, description) VALUES
('Jauja y Region', 'jauja-y-region', 'Noticias locales de la provincia de Jauja y el Valle del Mantaro'),
('Nacional', 'nacional', 'Acontecimientos politicos, economicos y sociales del Peru'),
('Internacional', 'internacional', 'Panorama global y noticias del mundo'),
('Opinion', 'opinion', 'Columnas de analisis, editorial y debate'),
('Cultura y Tradicion', 'cultura', 'Patrimonio historico, danzas y festividades de Jauja')
ON CONFLICT (slug) DO NOTHING;

-- Configuracion de Radio inicial
INSERT INTO public.radio_settings (stream_url, radio_name, slogan, is_broadcasting) VALUES
('https://stream.zeno.fm/f3wvbbqmdg8uv', 'VDN Radio 98.5 FM', 'Informacion veraz, oportuna y sin censura desde Jauja', true)
ON CONFLICT DO NOTHING;

-- Autor inicial del medio
INSERT INTO public.authors (full_name, role, email, bio) VALUES
('Redaccion VDN', 'Mesa de Redaccion', 'redaccion@vdnnoticias.pe', 'Equipo periodistico de investigacion y cobertura regional de Voces de la Noticia.')
ON CONFLICT DO NOTHING;
