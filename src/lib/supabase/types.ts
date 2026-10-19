export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content_html: string;
  cover_image_url: string | null;
  section: 'local' | 'nacional' | 'internacional' | 'opinion' | 'deportes' | 'cultura';
  is_featured: boolean;
  is_breaking: boolean;
  status: 'draft' | 'published' | 'archived';
  published_at: string | null;
  author_id: string;
  category_id: string | null;
  created_at: string;
  updated_at: string;
  reading_time_minutes: number;
}

export interface Author {
  id: string;
  full_name: string;
  role: string;
  avatar_url: string | null;
  bio: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface Comment {
  id: string;
  article_id: string;
  author_name: string;
  author_email: string;
  comment_text: string;
  is_approved: boolean;
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
  end_date: string;
  impressions: number;
  clicks: number;
  created_at: string;
}

export interface RadioSettings {
  id: string;
  stream_url: string;
  radio_name: string;
  slogan: string;
  is_broadcasting: boolean;
}

export interface RadioSchedule {
  id: string;
  radio_settings_id: string;
  program_name: string;
  host_name: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
}

export interface Database {
  public: {
    Tables: {
      articles: { Row: Article; Insert: Partial<Article>; Update: Partial<Article> };
      authors: { Row: Author; Insert: Partial<Author>; Update: Partial<Author> };
      categories: { Row: Category; Insert: Partial<Category>; Update: Partial<Category> };
      comments: { Row: Comment; Insert: Partial<Comment>; Update: Partial<Comment> };
      banners: { Row: Banner; Insert: Partial<Banner>; Update: Partial<Banner> };
      radio_settings: { Row: RadioSettings; Insert: Partial<RadioSettings>; Update: Partial<RadioSettings> };
      radio_schedules: { Row: RadioSchedule; Insert: Partial<RadioSchedule>; Update: Partial<RadioSchedule> };
    };
  };
}
