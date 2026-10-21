-- ==============================================================================
-- VDN (Voces de la Noticia) - Esquema de Base de Datos PostgreSQL de Alta Escala
-- Sede: Jauja, Junín, Perú
-- Arquitectura: RBAC Jerárquico, FTS en Español, Workflow Editorial y RLS
-- ==============================================================================

-- 1. Habilitar extensiones requeridas
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- Búsqueda trigram para sugerencias de autocompletado

-- ==============================================================================
-- 2. ROLES JERÁRQUICOS DEL MEDIO PERIODÍSTICO (RBAC)
-- ==============================================================================
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM (
        'super_admin',      -- Director General / Dueño ("Principal de principales")
        'editor_in_chief',  -- Jefe de Redacción / Editor General
        'journalist',       -- Periodista / Redactor de planta
        'columnist',        -- Columnista de Opinión
        'radio_operator',   -- Productor / Conductor de Radio
        'moderator'         -- Moderador de Comentarios de Lectores
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ==============================================================================
-- 3. TABLA: PERFILES DE USUARIOS DEL SISTEMA (Vinculada a auth.users de Supabase)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(150) NOT NULL UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    role public.app_role NOT NULL DEFAULT 'journalist',
    avatar_url TEXT,
    bio TEXT,
    phone VARCHAR(30),
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- ==============================================================================
-- 4. FUNCIONES DE SEGURIDAD DEFINER (Evaluación instantánea en RLS)
-- ==============================================================================

-- Obtener el rol del usuario autenticado
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS public.app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid() AND is_active = true;
$$;

-- Verificar si es el Super Administrador ("Principal de principales")
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'super_admin' AND is_active = true
  );
$$;

-- Verificar si tiene permiso de aprobación y publicación editorial
CREATE OR REPLACE FUNCTION public.can_publish()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('super_admin', 'editor_in_chief') AND is_active = true
  );
$$;

-- Verificar si puede redactar o proponer contenidos
CREATE OR REPLACE FUNCTION public.can_write_news()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('super_admin', 'editor_in_chief', 'journalist', 'columnist') AND is_active = true
  );
$$;

-- ==============================================================================
-- 5. TRIGGER: REGISTRO AUTOMÁTICO DE USUARIOS Y ASIGNACIÓN DEL DIRECTOR
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  assigned_role public.app_role;
BEGIN
  -- Si el correo es el del medio o es el primer usuario en registrarse, asignarle SUPER_ADMIN
  IF NEW.email = 'vdnnoticias@gmail.com' OR NOT EXISTS (SELECT 1 FROM public.profiles) THEN
    assigned_role := 'super_admin';
  ELSE
    assigned_role := 'journalist';
  END IF;

  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    assigned_role
  )
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 6. TABLA: CATEGORIAS (Secciones tematicas)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE,
    description TEXT,
    order_index INTEGER DEFAULT 0 NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 7. TABLA: ARTICULOS Y NOTICIAS (Con Full-Text Search en Español y Soft-Delete)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(300) NOT NULL,
    slug VARCHAR(350) NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content_html TEXT NOT NULL,
    cover_image_url TEXT,
    section VARCHAR(50) NOT NULL DEFAULT 'jauja-y-region',
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    is_featured BOOLEAN DEFAULT FALSE NOT NULL,
    is_breaking BOOLEAN DEFAULT FALSE NOT NULL,
    status VARCHAR(20) DEFAULT 'draft' NOT NULL CHECK (status IN ('draft', 'review', 'published', 'archived')),
    published_at TIMESTAMP WITH TIME ZONE,
    views_count BIGINT DEFAULT 0 NOT NULL,
    reading_time_minutes INTEGER DEFAULT 3 NOT NULL,
    tags TEXT[] DEFAULT '{}',
    deleted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    
    -- Columna de Búsqueda de Texto Completo en Español generada automáticamente
    search_vector tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('spanish', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('spanish', coalesce(excerpt, '')), 'B')
    ) STORED
);

-- Índices de Alta Concurrencia
CREATE INDEX IF NOT EXISTS idx_articles_published_feed ON public.articles(published_at DESC) WHERE status = 'published' AND deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_articles_section_feed ON public.articles(section, published_at DESC) WHERE status = 'published' AND deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_articles_featured_feed ON public.articles(is_featured, published_at DESC) WHERE status = 'published' AND deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_articles_breaking_feed ON public.articles(is_breaking, published_at DESC) WHERE status = 'published' AND deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_articles_author ON public.articles(author_id);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_fts ON public.articles USING GIN(search_vector);

-- ==============================================================================
-- 8. TABLA: FESTIVIDADES Y TURISMO (Calendario Dinámico Regional e Internacional)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.festivities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    scope VARCHAR(50) NOT NULL CHECK (scope IN ('mantaro', 'junin', 'nacional', 'internacional')),
    month INTEGER NOT NULL CHECK (month BETWEEN 1 AND 12),
    days VARCHAR(100) NOT NULL,
    location VARCHAR(200) NOT NULL,
    city VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    history TEXT,
    image_url TEXT,
    heritage_status VARCHAR(150),
    traditional_dishes TEXT[] DEFAULT '{}',
    tips_for_tourists TEXT,
    is_highlight BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_festivities_month_scope ON public.festivities(month, scope);

-- ==============================================================================
-- 9. TABLA: BANNERS PUBLICITARIOS (Monetización de Auspiciadores Locales)
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
    impressions BIGINT DEFAULT 0 NOT NULL,
    clicks BIGINT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_banners_active ON public.banners(position, is_active);

-- ==============================================================================
-- 10. TABLA: COMENTARIOS DE LECTORES (Con Flujo de Moderación)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
    author_name VARCHAR(100) NOT NULL,
    author_email VARCHAR(150) NOT NULL,
    comment_text TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE NOT NULL,
    reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_comments_approved ON public.comments(article_id, is_approved, created_at DESC);

-- ==============================================================================
-- 11. TABLA: CONFIGURACION Y PARRILLA DE RADIO EN VIVO
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.radio_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    stream_url TEXT NOT NULL,
    radio_name VARCHAR(150) NOT NULL DEFAULT 'VDN Radio 98.5 FM',
    slogan VARCHAR(200) DEFAULT 'La voz informativa del Valle del Mantaro',
    is_broadcasting BOOLEAN DEFAULT TRUE NOT NULL,
    current_program VARCHAR(200) DEFAULT 'El Noticiero Central de VDN',
    current_host VARCHAR(150) DEFAULT 'Mesa de Redacción',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.radio_schedule (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    radio_settings_id UUID REFERENCES public.radio_settings(id) ON DELETE CASCADE,
    program_name VARCHAR(150) NOT NULL,
    host_name VARCHAR(150) NOT NULL,
    day_of_week VARCHAR(50) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 12. TABLA: BITÁCORA DE AUDITORÍA (Historial de Cambios Editoriales)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON public.audit_logs(created_at DESC);

-- ==============================================================================
-- 13. FUNCIÓN RPC: INCREMENTO DE LECTURAS SIN BLOQUEO DE FILA
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.increment_article_views(article_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    UPDATE public.articles
    SET views_count = views_count + 1
    WHERE id = article_id;
END;
$$;

-- ==============================================================================
-- 14. POLÍTICAS DE SEGURIDAD (ROW LEVEL SECURITY - RLS)
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.radio_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.radio_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.festivities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- --- POLÍTICAS DE PERFILES ---
-- Lectura pública básica de periodistas
CREATE POLICY "Lectura publica de autores" ON public.profiles FOR SELECT USING (is_active = true);
-- Los redactores pueden actualizar su foto y bio, pero NO su propio rol
CREATE POLICY "Usuarios editan su perfil" ON public.profiles FOR UPDATE USING (auth.uid() = id) 
WITH CHECK (auth.uid() = id AND role = (SELECT role FROM public.profiles WHERE id = auth.uid()));
-- Super Admin ("Principal de principales") tiene control total de usuarios y roles
CREATE POLICY "Super admin gestion total perfiles" ON public.profiles FOR ALL USING (public.is_super_admin());

-- --- POLÍTICAS DE ARTÍCULOS ---
-- 1. Lectura pública: Solo artículos publicados y no borrados
CREATE POLICY "Lectura publica articulos" ON public.articles FOR SELECT USING (status = 'published' AND deleted_at IS NULL);
-- 2. El equipo periodístico puede ver sus borradores y los artículos en revisión
CREATE POLICY "Staff ve articulos internos" ON public.articles FOR SELECT TO authenticated USING (deleted_at IS NULL OR public.is_super_admin());
-- 3. Inserción: Periodistas, editores y administradores
CREATE POLICY "Redactores crean articulos" ON public.articles FOR INSERT TO authenticated WITH CHECK (public.can_write_news() AND auth.uid() = author_id);
-- 4. Edición:
--    - Editores y Super Admin pueden editar cualquier artículo
--    - Periodistas solo pueden editar sus propios artículos si están en borrador o en revisión
CREATE POLICY "Edicion de articulos por rol" ON public.articles FOR UPDATE TO authenticated USING (
    public.can_publish() OR (author_id = auth.uid() AND status IN ('draft', 'review') AND deleted_at IS NULL)
);
-- 5. Eliminación: Solo Super Admin y Editores (Soft Delete). Hard Delete solo Super Admin.
CREATE POLICY "Eliminacion de articulos" ON public.articles FOR DELETE TO authenticated USING (public.is_super_admin());

-- --- POLÍTICAS DE COMENTARIOS ---
CREATE POLICY "Lectura publica comentarios aprobados" ON public.comments FOR SELECT USING (is_approved = true);
CREATE POLICY "Lectores publican comentarios" ON public.comments FOR INSERT WITH CHECK (is_approved = false);
CREATE POLICY "Moderadores gestionan comentarios" ON public.comments FOR ALL TO authenticated USING (
    public.get_my_role() IN ('super_admin', 'editor_in_chief', 'moderator')
);

-- --- POLÍTICAS DE RADIO, BANNERS Y FESTIVIDADES ---
CREATE POLICY "Lectura publica radio" ON public.radio_settings FOR SELECT USING (true);
CREATE POLICY "Lectura publica programacion" ON public.radio_schedule FOR SELECT USING (true);
CREATE POLICY "Operadores gestionan radio" ON public.radio_settings FOR ALL TO authenticated USING (
    public.get_my_role() IN ('super_admin', 'radio_operator', 'editor_in_chief')
);
CREATE POLICY "Operadores gestionan programacion" ON public.radio_schedule FOR ALL TO authenticated USING (
    public.get_my_role() IN ('super_admin', 'radio_operator', 'editor_in_chief')
);

CREATE POLICY "Lectura publica banners activos" ON public.banners FOR SELECT USING (is_active = true AND (end_date IS NULL OR end_date >= CURRENT_DATE));
CREATE POLICY "Gestion banners" ON public.banners FOR ALL TO authenticated USING (public.can_publish());

CREATE POLICY "Lectura publica festividades" ON public.festivities FOR SELECT USING (true);
CREATE POLICY "Gestion festividades" ON public.festivities FOR ALL TO authenticated USING (public.can_publish());

CREATE POLICY "Lectura publica categorias" ON public.categories FOR SELECT USING (is_active = true);
CREATE POLICY "Gestion categorias" ON public.categories FOR ALL TO authenticated USING (public.can_publish());

CREATE POLICY "Super admin ve auditoria" ON public.audit_logs FOR SELECT TO authenticated USING (public.is_super_admin());

-- ==============================================================================
-- 15. BUCKETS DE ALMACENAMIENTO (STORAGE PÚBLICO PARA IMÁGENES)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public) VALUES 
('articles', 'articles', true),
('banners', 'banners', true),
('avatars', 'avatars', true),
('festivities', 'festivities', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de Storage
CREATE POLICY "Lectura publica storage" ON storage.objects FOR SELECT USING (bucket_id IN ('articles', 'banners', 'avatars', 'festivities'));
CREATE POLICY "Subida autorizada storage" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id IN ('articles', 'banners', 'avatars', 'festivities'));
CREATE POLICY "Edicion autorizada storage" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id IN ('articles', 'banners', 'avatars', 'festivities'));
CREATE POLICY "Eliminacion storage admin" ON storage.objects FOR DELETE TO authenticated USING (public.can_publish());

-- ==============================================================================
-- 16. DATOS INICIALES (SEED DATA)
-- ==============================================================================
INSERT INTO public.categories (name, slug, description, order_index) VALUES
('Jauja y Región', 'jauja-y-region', 'Noticias locales de la provincia de Jauja y el Valle del Mantaro', 1),
('Nacional', 'nacional', 'Acontecimientos políticos, económicos y sociales del Perú', 2),
('Internacional', 'internacional', 'Panorama global y noticias del mundo', 3),
('Opinión', 'opinion', 'Columnas de análisis, editorial y debate', 4),
('Cultura & Tradición', 'cultura', 'Patrimonio histórico, danzas y festividades de Jauja', 5),
('Deportes', 'deportes', 'Copa Perú, fondismo y deportes regionales', 6)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.radio_settings (stream_url, radio_name, slogan, is_broadcasting, current_program, current_host) VALUES
('https://stream.zeno.fm/f3wvbbqmdg8uv', 'VDN Radio 98.5 FM', 'Información veraz, oportuna y sin censura desde Jauja', true, 'El Noticiero Central de VDN (Edición Matinal)', 'Mesa de Redacción')
ON CONFLICT DO NOTHING;
