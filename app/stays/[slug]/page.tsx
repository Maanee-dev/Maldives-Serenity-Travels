
import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabase, mapResort, mapOffer } from '@/lib/supabase';
import { RESORTS, OFFERS } from '@/constants';
import ResortDetailClient from '@/components/ResortDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: resort } = await supabase.from('resorts').select('name, uvp').eq('slug', slug).maybeSingle();
  const localResort = RESORTS.find(r => r.slug === slug);
  const name = resort?.name || localResort?.name || "Resort Detail";
  const uvp = resort?.uvp || localResort?.uvp || "Defined by Perspective";

  return {
    title: `${name} | Serenity Maldives`,
    description: uvp,
  };
}

export default async function ResortPage({ params }: PageProps) {
  const { slug } = await params;
  
  const { data: resData } = await supabase.from('resorts').select('*').eq('slug', slug).maybeSingle();
  const { data: allResortsData } = await supabase.from('resorts').select('*');
  const localBackup = RESORTS.find(r => r.slug === slug);

  if (!resData && !localBackup) {
    notFound();
  }

  const resort = resData ? mapResort(resData) : localBackup!;
  const allResorts = allResortsData ? allResortsData.map(mapResort) : RESORTS;

  let resortOffers = [];
  if (resData) {
    const { data: offersData } = await supabase.from('offers').select('*').eq('resort_id', resData.id);
    resortOffers = offersData ? offersData.map(mapOffer) : [];
  } else {
    resortOffers = OFFERS.filter(o => o.resortSlug === slug);
  }

  return (
    <ResortDetailClient 
      resort={resort} 
      allResorts={allResorts}
      resortOffers={resortOffers}
    />
  );
}
