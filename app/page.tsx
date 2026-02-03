
import React from 'react';
import { supabase, mapResort } from '@/lib/supabase';
import { BLOG_POSTS, RESORTS } from '@/constants';
import HomeClient from '@/components/HomeClient';

// This is a Server Component - Google sees this immediately
export default async function HomePage() {
  let featuredResorts = RESORTS.slice(0, 6);
  let recentStories = BLOG_POSTS.slice(0, 3);

  try {
    const { data: resortsData } = await supabase
      .from('resorts')
      .select('*')
      .limit(6);
    
    if (resortsData && resortsData.length > 0) {
      featuredResorts = resortsData.map(mapResort);
    }

    const { data: storiesData } = await supabase
      .from('stories')
      .select('*')
      .order('date', { ascending: false })
      .limit(3);

    if (storiesData && storiesData.length > 0) {
      recentStories = storiesData as any;
    }
  } catch (err) {
    console.error("Server Fetch Error:", err);
  }

  return <HomeClient featuredResorts={featuredResorts} recentStories={recentStories} />;
}
