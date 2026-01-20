
import React from 'react';
import { BLOG_POSTS } from '../constants';
import { Link } from 'react-router-dom';

const Stories: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold text-slate-900 mb-4">The Serenity Journal</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">Discover the magic of the Maldives through our curated guides, travel stories, and expert tips.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {BLOG_POSTS.map((post, idx) => (
            <Link key={post.id} to={`/stories/${post.slug}`} className={`group flex flex-col ${idx === 0 ? 'md:col-span-2 md:flex-row gap-8 items-center border-b border-slate-100 pb-16 mb-8' : ''}`}>
              <div className={`relative overflow-hidden rounded-3xl shadow-lg ${idx === 0 ? 'md:w-3/5 h-[400px]' : 'h-72 mb-8'}`}>
                 <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                 <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-bold text-sky-700 uppercase tracking-[0.2em] shadow-xl">
                    Insider Guide
                 </div>
              </div>
              <div className={idx === 0 ? 'md:w-2/5' : ''}>
                <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-3 block">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <h2 className={`${idx === 0 ? 'text-4xl' : 'text-2xl'} font-serif font-bold text-slate-900 mb-4 group-hover:text-sky-600 transition-colors leading-tight`}>
                  {post.title}
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center font-bold text-sky-700 text-xs">
                      {post.author.split(' ').map(n => n[0]).join('')}
                   </div>
                   <span className="text-slate-900 font-bold text-sm tracking-wide">{post.author}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stories;
