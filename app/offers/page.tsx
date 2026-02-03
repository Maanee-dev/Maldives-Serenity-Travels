
import React from 'react';
import { Metadata } from 'next';
import { supabase, mapOffer } from '@/lib/supabase';
import { OFFERS } from '@/constants';
import OffersClient from '@/components/OffersClient';

export const metadata: Metadata = {
  title: "Exclusive Privileges | Serenity Maldives",
  description: "Curated seasonal offers and bespoke luxury packages for your Maldivian escape.",
};

export default async function OffersPage() {
  let offers = OFFERS;
  try {
    const { data: offersData } = await supabase
      .from('offers')
      .select('*, resorts(slug)')
      .order('created_at', { ascending: false });

    if (offersData && offersData.length > 0) {
      offers = offersData.map(mapOffer);
    }
  } catch (err) {
    console.error("Server Fetch Error:", err);
  }

  return <OffersClient initialOffers={offers} />;
}
