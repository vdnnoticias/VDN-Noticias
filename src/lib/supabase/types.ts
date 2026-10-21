export type AppRole =
  | 'super_admin'      // Director General / Dueño ("Principal de principales")
  | 'editor_in_chief'  // Jefe de Redacción / Editor General
  | 'journalist'       // Periodista / Redactor de planta
  | 'columnist'        // Columnista de Opinión
  | 'radio_operator'   // Operador / Conductor de Radio
  | 'moderator';       // Moderador de Comentarios de Lectores

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: AppRole;
  avatar_url: string | null;
  bio: string | null;
  phone: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  order_index: number;
  is_active: boolean;
  created_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content_html: string;
  cover_image_url: string | null;
  section: string;
  category_id: string | null;
  author_id: string | null;
  reviewed_by: string | null;
  is_featured: boolean;
  is_breaking: boolean;
  status: 'draft' | 'review' | 'published' | 'archived';
  published_at: string | null;
  views_count: number;
  reading_time_minutes: number;
  tags: string[];
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Festivity {
  id: string;
  name: string;
  scope: 'mantaro' | 'junin' | 'nacional' | 'internacional';
  month: number;
  days: string;
  location: string;
  city: string;
  description: string;
  history: string | null;
  image_url: string | null;
  heritage_status: string | null;
  traditional_dishes: string[];
  tips_for_tourists: string | null;
  is_highlight: boolean;
  created_at: string;
}

export interface Banner {
  id: string;
  sponsor_name: string;
  image_url: string;
  target_url: string;
  position: 'header_top' | 'sidebar' | 'in_feed' | 'footer';
  is_active: boolean;
  start_date: string;
  end_date: string | null;
  impressions: number;
  clicks: number;
  created_at: string;
}

export interface Comment {
  id: string;
  article_id: string;
  author_name: string;
  author_email: string;
  comment_text: string;
  is_approved: boolean;
  reviewed_by: string | null;
  created_at: string;
}

export interface RadioSettings {
  id: string;
  stream_url: string;
  radio_name: string;
  slogan: string;
  is_broadcasting: boolean;
  current_program: string | null;
  current_host: string | null;
  updated_at: string;
}

export interface RadioSchedule {
  id: string;
  radio_settings_id: string;
  program_name: string;
  host_name: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  description: string | null;
  created_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  details: Record<string, unknown> | null;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & { id: string; email: string; full_name: string };
        Update: Partial<Profile>;
        Relationships: [];
      };
      categories: {
        Row: Category;
        Insert: Partial<Category> & { name: string; slug: string };
        Update: Partial<Category>;
        Relationships: [];
      };
      articles: {
        Row: Article;
        Insert: Partial<Article> & { title: string; slug: string; excerpt: string; content_html: string };
        Update: Partial<Article>;
        Relationships: [];
      };
      festivities: {
        Row: Festivity;
        Insert: Partial<Festivity> & { name: string; scope: string; month: number; days: string; location: string; city: string; description: string };
        Update: Partial<Festivity>;
        Relationships: [];
      };
      banners: {
        Row: Banner;
        Insert: Partial<Banner> & { sponsor_name: string; image_url: string; target_url: string; position: string };
        Update: Partial<Banner>;
        Relationships: [];
      };
      comments: {
        Row: Comment;
        Insert: Partial<Comment> & { article_id: string; author_name: string; author_email: string; comment_text: string };
        Update: Partial<Comment>;
        Relationships: [];
      };
      radio_settings: {
        Row: RadioSettings;
        Insert: Partial<RadioSettings> & { stream_url: string };
        Update: Partial<RadioSettings>;
        Relationships: [];
      };
      radio_schedule: {
        Row: RadioSchedule;
        Insert: Partial<RadioSchedule> & { radio_settings_id: string; program_name: string; host_name: string; day_of_week: string; start_time: string; end_time: string };
        Update: Partial<RadioSchedule>;
        Relationships: [];
      };
      audit_logs: {
        Row: AuditLog;
        Insert: Partial<AuditLog> & { action: string; entity_type: string };
        Update: Partial<AuditLog>;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      increment_article_views: {
        Args: { article_id: string };
        Returns: void;
      };
      get_my_role: {
        Args: Record<PropertyKey, never>;
        Returns: AppRole;
      };
      is_super_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      can_publish: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      can_write_news: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      app_role: AppRole;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
