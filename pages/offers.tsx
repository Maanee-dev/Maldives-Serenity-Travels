import React, { useEffect, useState, useMemo } from 'react';
import { OFFERS } from '../constants';
import { Link } from 'react-router-dom';
import { Offer } from '../types';

const Offers: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    
    // Slight delay to ensure DOM is ready
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [activeCategory]);

  const categories = ['All', 'Honeymoon', 'Early Bird', 'Last Minute'];

  const filteredOffers = useMemo(() => {
    if (activeCategory === 'All') return OFFERS;
    return OFFERS.filter(offer => offer.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="bg-[#FCFAF7] min-h-screen selection:bg-sky-100 selection:text-sky-900 pb-32 overflow-hidden">
       
       {/* 1. IMMERSIVE EDITORIAL HEADER */}
       <section className="pt-64 pb-24 md:pb-32 px-6 text-center reveal active">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center items-center gap-6 mb-12">
               <div className="w-16 h-px bg-slate-200"></div>
               <span className="text-[10px] font-black text-sky-500 uppercase tracking-[1.5em] ml-[1.5em]">
                 The Curated Archive
               </span>
               <div className="w-16 h-px bg-slate-200"></div>
            </div>
            
            <h1 className="text-7xl md:text-[10rem] font-serif font-bold text-slate-950 tracking-tighter leading-[0.85] mb-16">
              Bespoke <br /> 
              <span className="italic text-sky-500 font-normal">Privileges.</span>
            </h1>
            
            <p className="text-slate-500 text-[12px] font-bold max-w-2xl mx-auto uppercase tracking-[0.6em] leading-[2.5] opacity-80 mb-24">
              A collection of negotiated rates and seasonal <br className="hidden md:block"/> dispatches, curated for the modern minimalist.
            </p>

            {/* Bespoke Filter Navigation */}
            <div className="inline-flex flex-wrap justify-center items-center gap-x-12 gap-y-8 px-12 py-8 rounded-full border border-slate-100 bg-white/50 backdrop-blur-sm shadow-sm transition-all duration-1000">
               {categories.map(cat => (
                 <button
                   key={cat}
                   onClick={() => setActiveCategory(cat)}
                   className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-700 relative group ${activeCategory === cat ? 'text-slate-950' : 'text-slate-300 hover:text-slate-500'}`}
                 >
                   {cat}
                   <span className={`absolute -bottom-2 left-0 h-0.5 bg-sky-500 transition-all duration-700 ${activeCategory === cat ? 'w-full' : 'w-0 group-hover:w-4'}`}></span>
                 </button>
               ))}
            </div>
          </div>
       </section>

       {/* 2. HIGH-FASHION OFFERS GRID */}
       <section className="max-w-[1440px] mx-auto px-6 lg:px-12 mt-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-x-16 lg:gap-y-24">
            {filteredOffers.map((offer, idx) => (
              <div key={offer.id} className="reveal" style={{ transitionDelay: `${idx * 150}ms` }}>
                <div className="group flex flex-col h-full bg-white rounded-[4rem] overflow-hidden shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-1000 border border-slate-50">
                  
                  {/* Cinematic Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                     <img 
                       src={offer.image} 
                       alt={offer.title} 
                       className="w-full h-full object-cover grayscale-[30%] brightness-[0.95] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-[3s] ease-out" 
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60"></div>
                     
                     {/* Floating Privilege Badge */}
                     <div className="absolute top-12 left-12 flex flex-col gap-3 items-start">
                        <div className="bg-slate-950 text-white px-6 py-2.5 rounded-full shadow-2xl border border-white/10 backdrop-blur-md">
                           <span className="text-[11px] font-black uppercase tracking-[0.3em]">{offer.discount}</span>
                        </div>
                        <span className="bg-white/90 backdrop-blur-md px-5 py-2 rounded-full text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] shadow-sm">
                           {offer.category}
                        </span>
                     </div>

                     {/* Urgency Overlay */}
                     <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                        <div className="flex flex-col gap-1">
                          <span className="text-[8px] font-black text-white/50 uppercase tracking-widest">Limited Engagement</span>
                          <span className="text-white text-[10px] font-black uppercase tracking-[0.4em] drop-shadow-lg">Subject to Availability</span>
                        </div>
                     </div>
                  </div>

                  {/* Content Architecture */}
                  <div className="p-12 md:p-16 flex-grow flex flex-col">
                     <h3 className="text-3xl font-serif font-bold text-slate-950 mb-8 leading-[1.1] group-hover:italic group-hover:text-sky-500 transition-all duration-1000">
                        {offer.title}
                     </h3>
                     
                     <div className="flex items-center gap-4 mb-16">
                        <div className="w-8 h-px bg-amber-400"></div>
                        <p className="text-slate-400 font-black text-[9px] uppercase tracking-[0.5em]">
                           {offer.resortName}
                        </p>
                     </div>
                     
                     <div className="mt-auto pt-10 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                          <span className="text-[9px] text-slate-300 font-bold uppercase tracking-widest text-center">Final Dispatch</span>
                          <span className="text-slate-900 font-black text-[11px] uppercase tracking-widest">
                            {new Date(offer.expiryDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                        
                        <Link 
                          to={`/stays/${offer.resortId}`} 
                          className="group/btn flex items-center gap-5 text-[10px] font-black uppercase tracking-[0.5em] text-slate-950 transition-all"
                        >
                          <span className="border-b-2 border-slate-100 group-hover/btn:border-sky-500 transition-colors pb-1">Refine</span>
                          <div className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center group-hover/btn:bg-slate-950 group-hover/btn:text-white group-hover/btn:border-slate-950 transition-all duration-700 shadow-sm">
                             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                             </svg>
                          </div>
                        </Link>
                     </div>
                  </div>
                </div>
              </div>
            ))}

            {/* 3. INTERACTIVE SERENITY CIRCLE */}
            <div className="reveal col-span-1 md:col-span-2 lg:col-span-1" style={{ transitionDelay: '300ms' }}>
              <div className="bg-slate-950 text-white rounded-[4rem] p-16 md:p-20 h-full flex flex-col justify-center items-center text-center shadow-2xl relative overflow-hidden group border border-white/5">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:scale-110 group-hover:opacity-[0.06] transition-all duration-[20s] ease-linear">
                   <h2 className="text-[40vw] font-serif italic whitespace-nowrap -rotate-12 translate-y-1/2">Collective</h2>
                </div>
                
                <div className="relative z-10 w-full max-w-sm">
                  <span className="text-[10px] font-bold text-sky-400 uppercase tracking-[1em] mb-12 block">Exclusive Dispatch</span>
                  <h3 className="text-4xl md:text-5xl font-serif font-bold mb-10 italic tracking-tighter">Serenity Circle.</h3>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] leading-loose mb-16 opacity-80">
                     Receive unlisted boutique escapes <br className="hidden md:block"/> and private atoll updates.
                  </p>
                  
                  <form className="w-full space-y-6" onSubmit={(e) => e.preventDefault()}>
                     <div className="relative">
                        <input 
                          type="email" 
                          placeholder="IDENTITY (EMAIL)" 
                          className="w-full bg-white/5 border border-white/10 rounded-full px-10 py-6 text-[10px] font-black uppercase tracking-[0.4em] focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all text-white placeholder:text-slate-600" 
                        />
                     </div>
                     <button className="w-full bg-white text-slate-950 font-black py-6 rounded-full text-[11px] uppercase tracking-[0.8em] hover:bg-sky-400 hover:text-white transition-all duration-700 shadow-xl active:scale-[0.98]">
                        Join The Inner Circle
                     </button>
                  </form>
                  
                  <p className="mt-12 text-[8px] text-slate-600 font-black uppercase tracking-[0.4em]">Defined by Perspective • 2026</p>
                </div>
              </div>
            </div>
          </div>
       </section>

       {/* Bottom Editorial Quote */}
       <section className="py-48 px-6 text-center reveal">
          <div className="max-w-4xl mx-auto">
             <div className="w-12 h-12 bg-amber-400/10 rounded-full flex items-center justify-center mx-auto mb-12">
                <span className="text-amber-500 font-serif text-3xl">“</span>
             </div>
             <p className="text-2xl md:text-4xl font-serif font-bold italic text-slate-900 leading-[1.6] mb-12">
                Luxury is not found in the abundance <br className="hidden md:block"/> but in the deliberate curation of the essential.
             </p>
             <div className="flex items-center justify-center gap-4">
                <div className="w-6 h-px bg-slate-200"></div>
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.5em]">The Philosophy</span>
                <div className="w-6 h-px bg-slate-200"></div>
             </div>
          </div>
       </section>
    </div>
  );
};

export default Offers;