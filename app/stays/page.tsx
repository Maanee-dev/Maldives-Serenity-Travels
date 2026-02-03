import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { supabase, mapResort, mapOffer } from '@/lib/supabase';
import { RESORTS, OFFERS } from '@/constants';
import StaysClient from '@/components/StaysClient';

export const metadata: Metadata = {
  title: "Stays & Sanctuaries | Serenity Maldives",
  description: "Explore our handpicked collection of luxury overwater villas and private island retreats across the Maldives. Defined by perspective.",
  openGraph: {
    title: "Stays & Sanctuaries | Serenity Maldives",
    description: "Curated luxury stays in the Maldives.",
    images: ['https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200'],
  }
};

/**
 * Server Component: Fetches initial data for SEO and performance.
 * Hands off to StaysClient for filtering and pagination.
 */
export default async function StaysPage() {
  let resorts = [];
  let offers = [];

  try {
    // Parallel data fetching for performance
    const [resortsResponse, offersResponse] = await Promise.all([
      supabase.from('resorts').select('*').order('name', { ascending: true }),
      supabase.from('offers').select('*')
    ]);

    if (resortsResponse.data && resortsResponse.data.length > 0) {
      resorts = resortsResponse.data.map(mapResort);
    } else {
      resorts = RESORTS; // Fallback to constants
    }
    
    if (offersResponse.data && offersResponse.data.length > 0) {
      offers = offersResponse.data.map(mapOffer);
    } else {
      offers = OFFERS; // Fallback to constants
    }
  } catch (err) {
    console.error("Server-side fetch failed for Stays:", err);
    resorts = RESORTS;
    offers = OFFERS;
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FCFAF7] flex items-center justify-center">
        <div className="w-8 h-8 border-t-sky-500 border-2 border-slate-200 rounded-full animate-spin"></div>
      </div>
    }>
      <StaysClient initialResorts={resorts} initialOffers={offers} />
    </Suspense>
  );
}