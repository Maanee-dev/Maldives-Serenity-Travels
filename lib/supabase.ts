import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zocncwchaakjtsvlscmd.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Ot34P55l4JGe2RjZywLovA_UokWsJ0I';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * STORIES TABLE SCHEMA (SQL):
 * 
 * create table stories (
 *   id uuid default gen_random_uuid() primary key,
 *   title text not null,
 *   slug text unique not null,
 *   excerpt text,
 *   content text,
 *   image text,
 *   date date default now(),
 *   author text default 'Elena Rossi',
 *   category text check (category in ('Dispatch', 'Guide', 'Update', 'Tip')),
 *   is_featured boolean default false,
 *   created_at timestamp with time zone default now()
 * );
 * 
 * RESORTS TABLE SCHEMA (SQL):
 * 
 * create table resorts (
 *   id uuid primary key,
 *   name text not null,
 *   slug text unique not null,
 *   type text,
 *   atoll text,
 *   price_range text,
 *   rating integer,
 *   description text,
 *   short_description text,
 *   images jsonb,
 *   features jsonb,
 *   transfers jsonb,
 *   meal_plans jsonb,
 *   uvp text,
 *   is_featured boolean default false,
 *   room_types jsonb default '[]'::jsonb,
 *   dining_venues jsonb default '[]'::jsonb,
 *   created_at timestamp with time zone default now()
 * );
 * 
 * alter table stories enable row level security;
 * alter table resorts enable row level security;
 * create policy "Public can view stories" on stories for select using (true);
 * create policy "Public can view resorts" on resorts for select using (true);
 * create policy "Admin full access stories" on stories for all using (true);
 * create policy "Admin full access resorts" on resorts for all using (true);
 */