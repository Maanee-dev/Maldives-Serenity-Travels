
import React from 'react';
import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import { BLOG_POSTS } from '@/constants';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "The Journal | Serenity Maldives",
  description: "Editorial dispatches, travel guides, and luxury insights from the Maldivian archipelago.",
};

export default async function StoriesPage() {
  let stories = BLOG_POSTS;
  try {
    const { data } = await supabase.from('stories').select('*').order('date', { ascending: false });
    if (data && data.length > 0) stories = data as any;
  } catch (e) {}

  return (
    <div className="bg-[#FCFAF7] min-h-screen pt-48 pb-32">
       <div className="max-w-7xl mx-auto px-6 text-center mb-32">
          <span className="text-[10px] font-bold text-sky-500 mb-12 block tracking-[1em] uppercase">The Journal</span>
          <h1 className="text-6xl md:text-9xl font-serif font-bold text-slate-900 tracking-tighter italic leading-none">Perspective.</h1>
       </div>
       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20">
          {stories.map(post => (
            <Link key={post.id} href={`/stories/${post.slug}`} className="group block">
              <div className="aspect-[16/10] overflow-hidden rounded-[3rem] shadow-xl mb-8">
                 <img src={post.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={post.title} />
              </div>
              <span className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px]">{post.date}</span>
              <h2 className="text-3xl font-serif font-bold italic mt-4 group-hover:text-sky-600 transition-colors">{post.title}</h2>
              <p className="text-slate-600 mt-4 leading-relaxed line-clamp-2">{post.excerpt}</p>
            </Link>
          ))}
       </div>
    </div>
  );
}
