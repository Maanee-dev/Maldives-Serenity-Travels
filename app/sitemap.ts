
import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';
import { RESORTS } from '@/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://maldivesserenity.com';

  // Core Pages
  const routes = ['', '/stays', '/offers', '/experiences', '/stories', '/plan'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Resorts
  try {
    const { data: resorts } = await supabase.from('resorts').select('slug, updated_at');
    const resortRoutes = (resorts || []).map((res) => ({
      url: `${baseUrl}/stays/${res.slug}`,
      lastModified: res.updated_at || new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    // Dynamic Stories
    const { data: stories } = await supabase.from('stories').select('slug, date');
    const storyRoutes = (stories || []).map((post) => ({
      url: `${baseUrl}/stories/${post.slug}`,
      lastModified: post.date || new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    return [...routes, ...resortRoutes, ...storyRoutes];
  } catch (e) {
    return routes;
  }
}
