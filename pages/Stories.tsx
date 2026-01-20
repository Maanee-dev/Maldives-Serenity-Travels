import React, { useEffect } from 'react';
import { BLOG_POSTS } from '../constants';
import { Link } from 'react-router-dom';

const Stories: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#FCFAF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-48 md:py-64 lg:px-12">
        <div className="text-center mb-32 md:mb-56 reveal">
          <span className="text-[10px] font-bold text-sky-500 mb-12 block tracking-[1em] uppercase">The Journal</span>
          <h1 className="text-6xl md:text-9xl font-serif font-bold text-slate-900 tracking-tighter italic leading-none">Perspective.</h1>
          <div className="h-px w-24 bg-amber-400 mx-auto mt-16 mb-16"></div>
          <p className="text-slate-400 text-[11px] font-bold max-w-xl mx-auto uppercase tracking-[0.5em] leading-[2.5] opacity-80">
            A digital editorial exploring Maldivian heritage, <br className="hidden md:block"/> luxury insights, and the art of travel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 lg:gap-32">
          {BLOG_POSTS.map((post, idx) => (
            <Link 
              key={post.id} 
              to={`/stories/${post.slug}`} 
              className={`group flex flex-col reveal ${idx === 0 ? 'md:col-span-2' : ''}`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className={`relative overflow-hidden rounded-[3rem] md:rounded-[5rem] shadow-sm group-hover:shadow-2xl transition-all duration-1000 ${idx === 0 ? 'aspect-[21/9] mb-16' : 'aspect-[4/5] mb-12'}`}>
                 <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-[4s] ease-out group-hover:scale-105" />
                 <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-colors duration-1000"></div>
                 <div className="absolute top-10 left-10">
                    <span className="bg-white/90 backdrop-blur px-6 py-2 rounded-full text-[9px] font-bold text-slate-900 uppercase tracking-[0.4em] shadow-sm">
                       {idx === 0 ? 'Featured Feature' : 'Dispatch'}
                    </span>
                 </div>
              </div>
              
              <div className={idx === 0 ? 'max-w-4xl mx-auto text-center' : ''}>
                <span className="text-slate-300 font-bold text-[9px] uppercase tracking-[0.6em] mb-6 block">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <h2 className={`${idx === 0 ? 'text-4xl md:text-7xl' : 'text-3xl md:text-4xl'} font-serif font-bold text-slate-900 mb-8 group-hover:italic transition-all duration-700 leading-[1.1]`}>
                  {post.title}
                </h2>
                <p className={`text-slate-500 leading-relaxed font-medium opacity-80 mb-10 ${idx === 0 ? 'text-lg md:text-xl' : 'text-sm line-clamp-3'}`}>
                  {post.excerpt}
                </p>
                <div className={`flex items-center gap-6 ${idx === 0 ? 'justify-center' : ''}`}>
                   <div className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center font-bold text-slate-900 text-[10px] group-hover:bg-slate-950 group-hover:text-white transition-all duration-700">
                      {post.author.split(' ').map(n => n[0]).join('')}
                   </div>
                   <span className="text-slate-900 font-bold text-[10px] uppercase tracking-[0.4em]">{post.author}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Editorial Footer */}
      <section className="py-48 bg-white border-t border-slate-50">
         <div className="max-w-4xl mx-auto px-6 text-center reveal">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-slate-950 italic mb-12">The Archives</h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.5em] mb-20 leading-loose">
               Access our full collection of Maldivian dispatches <br className="hidden md:block"/> and photographic journals.
            </p>
            <div className="flex flex-wrap justify-center gap-10">
               {['Aesthetics', 'Heritage', 'Sustainability', 'Cuisine'].map(tag => (
                 <button key={tag} className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.4em] hover:text-slate-950 transition-colors border-b border-transparent hover:border-slate-950 pb-2">
                   {tag}
                 </button>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

export default Stories;