import React, { useEffect, useMemo } from 'react';
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

  const guides = useMemo(() => BLOG_POSTS.filter(p => p.category === 'Guide'), []);
  const dispatches = useMemo(() => BLOG_POSTS.filter(p => p.category === 'Dispatch'), []);

  return (
    <div className="bg-[#FCFAF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-48 md:py-64 lg:px-12">
        
        {/* Editorial Header */}
        <div className="text-center mb-32 md:mb-56 reveal">
          <span className="text-[10px] font-bold text-sky-500 mb-12 block tracking-[1em] uppercase">The Journal</span>
          <h1 className="text-6xl md:text-9xl font-serif font-bold text-slate-900 tracking-tighter italic leading-none">Perspective.</h1>
          <div className="h-px w-24 bg-amber-400 mx-auto mt-16 mb-16"></div>
          <p className="text-slate-400 text-[11px] font-bold max-w-xl mx-auto uppercase tracking-[0.5em] leading-[2.5] opacity-80">
            A digital editorial exploring Maldivian heritage, <br className="hidden md:block"/> luxury insights, and the art of travel.
          </p>
        </div>

        {/* Featured Latest Dispatch */}
        <div className="mb-48">
          <Link 
            to={`/stories/${dispatches[0].slug}`} 
            className="group flex flex-col reveal"
          >
            <div className="relative overflow-hidden rounded-[3rem] md:rounded-[5rem] shadow-sm group-hover:shadow-2xl transition-all duration-1000 aspect-[21/9] mb-16">
               <img src={dispatches[0].image} alt={dispatches[0].title} className="w-full h-full object-cover transition-transform duration-[4s] ease-out group-hover:scale-105" />
               <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-colors duration-1000"></div>
               <div className="absolute top-10 left-10">
                  <span className="bg-white/90 backdrop-blur px-6 py-2 rounded-full text-[9px] font-bold text-slate-900 uppercase tracking-[0.4em] shadow-sm">
                     Latest Dispatch
                  </span>
               </div>
            </div>
            
            <div className="max-w-4xl mx-auto text-center">
              <span className="text-slate-300 font-bold text-[9px] uppercase tracking-[0.6em] mb-6 block">
                {new Date(dispatches[0].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <h2 className="text-4xl md:text-7xl font-serif font-bold text-slate-900 mb-8 group-hover:italic transition-all duration-700 leading-[1.1]">
                {dispatches[0].title}
              </h2>
              <p className="text-slate-500 leading-relaxed font-medium opacity-80 mb-10 text-lg md:text-xl">
                {dispatches[0].excerpt}
              </p>
              <div className="flex items-center gap-6 justify-center">
                 <div className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center font-bold text-slate-900 text-[10px] group-hover:bg-slate-950 group-hover:text-white transition-all duration-700">
                    {dispatches[0].author.split(' ').map(n => n[0]).join('')}
                 </div>
                 <span className="text-slate-900 font-bold text-[10px] uppercase tracking-[0.4em]">{dispatches[0].author}</span>
              </div>
            </div>
          </Link>
        </div>

        {/* The Essential Guides Section */}
        <div className="mb-48 reveal">
          <div className="flex justify-between items-end mb-16">
            <div>
               <span className="text-sky-500 font-bold text-[10px] uppercase tracking-[1em] mb-4 block">Intelligence</span>
               <h3 className="text-4xl md:text-6xl font-serif font-bold text-slate-950 italic">The Guides.</h3>
            </div>
            <p className="hidden md:block text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-2">Evergreen Travel Wisdom</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {guides.map((guide, idx) => (
              <Link 
                key={guide.id} 
                to={`/stories/${guide.slug}`} 
                className="group reveal"
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] mb-10 shadow-sm transition-all duration-700 group-hover:shadow-2xl">
                  <img src={guide.image} alt={guide.title} className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-slate-950/10"></div>
                </div>
                <h4 className="text-2xl font-serif font-bold text-slate-900 mb-4 group-hover:italic transition-all leading-tight">{guide.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 opacity-80 mb-6">{guide.excerpt}</p>
                <span className="text-[9px] font-bold text-slate-950 uppercase tracking-[0.5em] border-b border-slate-100 group-hover:border-sky-500 transition-all pb-1">Read Guide</span>
              </Link>
            ))}
          </div>
        </div>

        {/* More Dispatches Grid */}
        <div className="reveal">
          <span className="text-sky-500 font-bold text-[10px] uppercase tracking-[1em] mb-16 block text-center">Industry Dispatches</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 lg:gap-32">
            {dispatches.slice(1).map((post, idx) => (
              <Link 
                key={post.id} 
                to={`/stories/${post.slug}`} 
                className="group flex flex-col reveal"
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="relative overflow-hidden rounded-[3rem] md:rounded-[5rem] shadow-sm group-hover:shadow-2xl transition-all duration-1000 aspect-[4/5] mb-12">
                   <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-[4s] ease-out group-hover:scale-105" />
                   <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-colors duration-1000"></div>
                </div>
                <div>
                  <span className="text-slate-300 font-bold text-[9px] uppercase tracking-[0.6em] mb-6 block">
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-8 group-hover:italic transition-all duration-700 leading-[1.1]">
                    {post.title}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium opacity-80 mb-10 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-6">
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