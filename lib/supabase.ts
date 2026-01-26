
import { createClient } from '@supabase/supabase-js';
import { Accommodation, AccommodationType, TransferType, MealPlan, Offer } from '../types';

const SUPABASE_URL = 'https://zocncwchaakjtsvlscmd.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Ot34P55l4JGe2RjZywLovA_UokWsJ0I';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * HELPER: Robust mapping from Supabase Row to Accommodation Interface
 */
export const mapResort = (item: any): Accommodation => {
  return {
    id: item.id,
    name: item.name,
    slug: item.slug,
    type: (item.type || 'RESORT') as AccommodationType,
    atoll: item.atoll || 'Unknown Atoll',
    priceRange: item.price_range || '$$$$',
    rating: item.rating || 5,
    description: item.description || '',
    shortDescription: item.short_description || '',
    images: Array.isArray(item.images) ? item.images : [],
    features: Array.isArray(item.features) ? item.features : [],
    transfers: (Array.isArray(item.transfers) ? item.transfers : []) as TransferType[],
    mealPlans: (Array.isArray(item.meal_plans) ? item.meal_plans : []) as MealPlan[],
    uvp: item.uvp || 'Defined by perspective.',
    isFeatured: !!item.is_featured,
    roomTypes: Array.isArray(item.room_types) ? item.room_types : [],
    diningVenues: Array.isArray(item.dining_venues) ? item.dining_venues : []
  };
};

/**
 * HELPER: Robust mapping from Supabase Row to Offer Interface
 */
export const mapOffer = (o: any): Offer => {
  return {
    id: o.id,
    resortId: o.resort_id,
    title: o.title,
    discount: o.discount,
    resortName: o.resort_name,
    expiryDate: o.expiry_date,
    image: o.image,
    category: o.category
  };
};

/**
 * DATABASE SCHEMA REFERENCE
 * 
 * --- OFFERS TABLE ---
 * create table offers (
 *   id uuid default gen_random_uuid() primary key,
 *   resort_id uuid references resorts(id) on delete cascade,
 *   title text not null,
 *   discount text,
 *   resort_name text,
 *   expiry_date date,
 *   image text,
 *   category text check (category in ('Early Bird', 'Last Minute', 'Honeymoon')),
 *   created_at timestamp with time zone default now()
 * );
 * 
 * --- STORIES TABLE ---
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
 * --- RESORTS TABLE ---
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
 */
