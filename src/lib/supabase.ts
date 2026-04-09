import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Guard: si las env vars no están configuradas (ej. en local sin .env.local)
// no tiramos excepción — la app usa datos estáticos de fallback.
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key');

export interface CarouselSlide {
  id: number;
  title?: string;
  subtitle?: string;
  image_url: string;
  orden: number;
  show_overlay?: boolean;
  link?: string;
  mobile_image_url?: string;
} 