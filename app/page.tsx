import React from 'react';
import { supabase, mapResort } from '@/lib/supabase';
import { BLOG_POSTS, RESORTS } from '@/constants';
import HomeClient from '@/components/HomeClient';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache for 1 hour

export default async function HomePage() {
  let featuredResorts = RESORTS.slice(0, 6);
  let recentStories = BLOG_POSTS.slice(0, 3);

  try {
    // We use a Promise.race or a short-circuit to ensure the page renders 
    // even if Supabase is experiencing high latency.
    const fetchData = async () => {
      const [resortsRes, storiesRes] = await Promise.all([
        supabase.from('resorts').select('*').limit(6),
        supabase.from('stories').select('*').order('date', { ascending: false }).limit(3)
      ]);

      return {
        resorts: resortsRes.data && resortsRes.data.length > 0 ? resortsRes.data.map(mapResort) : RESORTS.slice(0, 6),
        stories: storiesRes.data && storiesRes.data.length > 0 ? (storiesRes.data as any) : BLOG_POSTS.slice(0, 3)
      };
    };

    // Timeout after 3 seconds to prevent long blank wait
    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000));
    const results = await Promise.race([fetchData(), timeout]) as any;
    
    featuredResorts = results.resorts;
    recentStories = results.stories;
  } catch (err) {
    console.error("Home Data Fetching Fallback Active:", err);
    // Fallback to constants is already initialized above
  }

  return <HomeClient featuredResorts={featuredResorts} recentStories={recentStories} />;
}