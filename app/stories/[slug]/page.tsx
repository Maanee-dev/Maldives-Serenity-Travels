
import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { BLOG_POSTS } from '@/constants';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);
  return { title: `${post?.title || 'Story'} | Serenity Journal` };
}

export default async function StoryPage({ params }: PageProps) {
  const { slug } = await params;
  let post = BLOG_POSTS.find(b => b.slug === slug);

  try {
    const { data } = await supabase.from('stories').select('*').eq('slug', slug).maybeSingle();
    if (data) post = data as any;
  } catch (e) {}

  if (!post) notFound();

  return (
    <article className="bg-white min-h-screen">
      <div className="h-[60vh] relative">
         <img src={post.image} className="w-full h-full object-cover" alt={post.title} />
         <div className="absolute inset-0 bg-black/30"></div>
         <div className="absolute bottom-20 left-0 right-0 max-w-4xl mx-auto px-6">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white italic leading-tight">{post.title}</h1>
         </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-20">
         <div className="prose prose-xl prose-slate max-w-none">
            <p className="text-2xl font-serif italic text-slate-700 mb-12 border-l-8 border-sky-400 pl-8">{post.excerpt}</p>
            <div className="text-slate-700 leading-loose text-lg space-y-8 whitespace-pre-wrap">{post.content}</div>
         </div>
         <div className="mt-20 p-12 bg-sky-50 rounded-[3rem] text-center">
            <h4 className="text-2xl font-serif font-bold italic mb-6">Inspired to visit?</h4>
            <Link href="/plan" className="inline-block bg-sky-600 text-white font-bold px-12 py-4 rounded-xl uppercase tracking-widest text-xs">Plan My Journey</Link>
         </div>
      </div>
    </article>
  );
}
