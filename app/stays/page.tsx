
import React from 'react';
import { Metadata } from 'next';
import { supabase, mapResort, mapOffer } from '@/lib/supabase';
import { RESORTS, OFFERS } from '@/constants';
import StaysClient from '@/components/StaysClient';

export const metadata: Metadata = {
  title: "Stays & Sanctuaries | Serenity Maldives",
  description: "Explore our handpicked collection of luxury overwater villas and private island retreats across the Maldives.",
};

export default async function StaysPage() {
  let resorts = RESORTS;
  let offers = OFFERS;

  try {
    const { data: resortsData } = await supabase.from('resorts').select('*').order('name', { ascending: true });
    const { data: offersData } = await supabase.from('offers').select('*');

    if (resortsData && resortsData.length > 0) {
      resorts = resortsData.map(mapResort);
    }
    
    if (offersData && offersData.length > 0) {
      offers = offersData.map(mapOffer);
    }
  } catch (err) {
    console.error("Server Fetch Error:", err);
  }

  return <StaysClient initialResorts={resorts} initialOffers={offers} />;
}
