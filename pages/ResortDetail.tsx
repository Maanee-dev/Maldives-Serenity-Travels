import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RESORTS } from '../constants';

const ResortDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const resort = RESORTS.find(r => r.slug === slug);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (resort) {
      document.title = `${resort.name} | Serenity Maldives Portfolio`;
    }
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [resort]);

  if (!resort) return <div className="p-40 text-center font-serif text-2xl italic">Sanctuary not found.</div>;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const getGalleryImage = (index: number) => {
    if (resort.images && resort.images[index]) return resort.images[index];
    const fallbacks = [
      "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1573843225233-9fca73af994d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1200"
    ];
    return fallbacks[index % fallbacks.length];
  };

  return (
    <div className="bg-[#FCFAF7] min-h-screen selection:bg-sky-100 selection:text-sky-900 overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO - Enforced Height and Fixed Spacing */}
      <section className="relative px-4 md:px-6 pt-24 md:pt-32 reveal active z-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[70vh] md:h-[80vh]">
          {/* Main Frame */}
          <div className="col-span-1 md:col-span-8 relative overflow-hidden rounded-[2.5rem] md:rounded-[4rem] group shadow-2xl h-full">
            <img 
              src={getGalleryImage(0)} 
              alt={resort.name} 
              className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 max-w-[95%] md:max-w-3xl">
              <span className="inline-block bg-sky-500 text-white px-4 py-1.5 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-[0.5em] mb-4 shadow-xl">
                {resort.atoll}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-white tracking-tighter italic leading-[0.9] drop-shadow-2xl">
                {resort.name}
              </h1>
            </div>
          </div>

          {/* Secondary Stack */}
          <div className="hidden md:flex md:col-span-4 flex-col gap-4 h-full">
            <div className="flex-1 overflow-hidden relative rounded-[2.5rem] md:rounded-[3rem] group">
              <img src={getGalleryImage(1)} alt="Lifestyle" className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-110" />
            </div>
            <div className="flex-1 overflow-hidden relative rounded-[2.5rem] md:rounded-[3rem] group">
              <img src={getGalleryImage(2)} alt="Detail" className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-110" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN LAYOUT GRID - Using strict columns to avoid content collision */}
      <div className="max-w-[1440px] mx-auto px-6 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24">
          
          {/* LEFT: EDITORIAL COLUMN (7 of 12) */}
          <div className="lg:col-span-7 xl:col-span-8 reveal z-10">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center text-slate-300 text-[9px] font-bold uppercase tracking-[0.6em] gap-5 mb-16">
              <Link to="/stays" className="hover:text-sky-500 transition-colors">Portfolio</Link>
              <span className="text-amber-400 opacity-50">/</span>
              <span className="text-slate-900 truncate">{resort.name}</span>
            </nav>

            {/* Meta Information Bar */}
            <div className="flex flex-wrap items-center gap-8 mb-20 pb-12 border-b border-slate-100">
               <div className="flex gap-2">
                 {[...Array(resort.rating)].map((_, i) => (
                   <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                 ))}
               </div>
               <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.6em] md:border-l md:border-slate-200 md:pl-8">
                 {resort.atoll}
               </span>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.6em] md:border-l md:border-slate-200 md:pl-8">
                 {resort.priceRange} Luxury
               </span>
            </div>

            {/* Content Flow */}
            <div className="prose prose-slate max-w-none">
              <h2 className="text-3xl md:text-5xl xl:text-6xl font-serif font-bold text-slate-900 leading-[1.2] mb-16 italic border-l-4 border-amber-400 pl-8 py-2 tracking-tight">
                "{resort.uvp}"
              </h2>
              
              <p className="text-slate-500 leading-[2.2] text-lg md:text-xl mb-32 font-medium opacity-90 max-w-3xl">
                {resort.description}
              </p>

              {/* FEATURES GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-40">
                {resort.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="w-12 h-12 rounded-full border border-slate-200 flex-shrink-0 flex items-center justify-center group-hover:bg-slate-950 group-hover:border-slate-950 transition-all duration-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-500 group-hover:bg-white"></div>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.3em] mb-1">{feature}</h4>
                      <p className="text-[9px] text-slate-300 font-bold uppercase tracking-[0.2em]">Signature Standard</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* SLIDERS */}
              <div className="mb-48 reveal">
                <div className="flex justify-between items-end mb-12">
                  <h3 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 italic tracking-tighter">The Sanctuaries.</h3>
                  <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-slate-300 hidden sm:block">Scroll Gallery</span>
                </div>
                <div className="no-scrollbar overflow-x-auto flex gap-6 md:gap-10 pb-12 snap-x snap-mandatory -mx-6 px-6 lg:mx-0 lg:px-0">
                  {resort.roomTypes?.map((room, idx) => (
                    <div key={idx} className="flex-shrink-0 w-[80vw] sm:w-[50vw] md:w-[60%] lg:w-[48%] snap-start group">
                      <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-6 shadow-md transition-all duration-700 group-hover:shadow-2xl">
                        <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-105" />
                        <div className="absolute bottom-6 left-6">
                           <span className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-[8px] font-bold text-slate-950 uppercase tracking-[0.3em]">
                              {room.size} — {room.capacity}
                           </span>
                        </div>
                      </div>
                      <h4 className="text-2xl font-serif font-bold text-slate-900 mb-2 group-hover:italic transition-all">{room.name}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed opacity-80 mb-4 line-clamp-2">{room.description}</p>
                      <div className="w-8 h-px bg-slate-200 group-hover:w-full group-hover:bg-sky-50 transition-all duration-1000"></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-24 reveal">
                <div className="flex justify-between items-end mb-12">
                  <h3 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 italic tracking-tighter">Gastronomy.</h3>
                  <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-slate-300 hidden sm:block">Explore Venues</span>
                </div>
                <div className="no-scrollbar overflow-x-auto flex gap-6 md:gap-10 pb-12 snap-x snap-mandatory -mx-6 px-6 lg:mx-0 lg:px-0">
                  {resort.diningVenues?.map((venue, idx) => (
                    <div key={idx} className="flex-shrink-0 w-[80vw] sm:w-[50vw] md:w-[60%] lg:w-[48%] snap-start group">
                      <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-6 shadow-md transition-all duration-700 group-hover:shadow-2xl">
                        <img src={venue.image} alt={venue.name} className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-105" />
                        <div className="absolute bottom-6 left-6">
                           <span className="bg-sky-500 text-white px-4 py-2 rounded-full text-[8px] font-bold uppercase tracking-[0.3em]">
                              {venue.vibe}
                           </span>
                        </div>
                      </div>
                      <h4 className="text-2xl font-serif font-bold text-slate-900 mb-1 group-hover:italic transition-all">{venue.name}</h4>
                      <p className="text-sky-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-3">{venue.cuisine}</p>
                      <p className="text-slate-500 text-sm leading-relaxed opacity-80 mb-4 line-clamp-2">{venue.description}</p>
                      <div className="w-8 h-px bg-slate-200 group-hover:w-full group-hover:bg-sky-50 transition-all duration-1000"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: COMPACT STICKY SIDEBAR (5 of 12) */}
          <aside className="lg:col-span-5 xl:col-span-4 z-20">
            <div className="lg:sticky lg:top-32 space-y-8">
              <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.12)] border border-slate-50 reveal overflow-hidden relative group">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50/50 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 transition-transform duration-1000"></div>
                
                {isSubmitted ? (
                  <div className="text-center py-20 relative z-10">
                    <div className="w-14 h-14 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-8">
                      <svg className="w-6 h-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h4 className="text-2xl font-serif font-bold italic mb-4 text-slate-900">Request Received</h4>
                    <p className="text-slate-400 text-[9px] font-bold uppercase tracking-[0.4em] leading-relaxed max-w-[180px] mx-auto">A specialist will curate your portfolio shortly.</p>
                  </div>
                ) : (
                  <div className="relative z-10">
                    <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.6em] mb-8 block">Inquiry Protocol</span>
                    <h3 className="text-3xl font-serif font-bold text-slate-900 mb-6 italic leading-tight tracking-tighter">Bespoke Concierge.</h3>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] leading-relaxed mb-10 opacity-70">
                      Tailored Maldivian journeys and negotiated private rates.
                    </p>

                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      <div className="border-b border-slate-100 pb-2 transition-colors focus-within:border-slate-900">
                        <label className="block text-[8px] font-bold text-slate-300 uppercase tracking-[0.5em] mb-2">Full Identity</label>
                        <input type="text" placeholder="NAME" required className="w-full bg-transparent text-[11px] font-bold uppercase tracking-widest outline-none placeholder:text-slate-100" />
                      </div>
                      <div className="border-b border-slate-100 pb-2 transition-colors focus-within:border-slate-900">
                        <label className="block text-[8px] font-bold text-slate-300 uppercase tracking-[0.5em] mb-2">Signal Address</label>
                        <input type="email" placeholder="EMAIL" required className="w-full bg-transparent text-[11px] font-bold uppercase tracking-widest outline-none placeholder:text-slate-100" />
                      </div>
                      <div className="border-b border-slate-100 pb-2 transition-colors focus-within:border-slate-900">
                        <label className="block text-[8px] font-bold text-slate-300 uppercase tracking-[0.5em] mb-2">Travel Window</label>
                        <input type="text" placeholder="E.G. FALL 2024" className="w-full bg-transparent text-[11px] font-bold uppercase tracking-widest outline-none placeholder:text-slate-100" />
                      </div>
                      
                      <button type="submit" className="w-full bg-slate-950 text-white font-bold py-5 rounded-full text-[9px] uppercase tracking-[0.5em] hover:bg-sky-500 transition-all duration-700 shadow-xl mt-4">
                        Consult Specialist
                      </button>
                    </form>
                    
                    <div className="mt-8 flex items-center justify-center gap-4 opacity-30">
                      <div className="w-1 h-1 rounded-full bg-amber-400 animate-pulse"></div>
                      <span className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.6em]">Secure Protocol</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-10 bg-sky-50 rounded-[3rem] border border-sky-100 reveal transition-all duration-1000 delay-500 shadow-sm hidden lg:block">
                 <h4 className="text-[9px] font-bold text-sky-900 uppercase tracking-[0.6em] mb-4 flex items-center gap-3">
                    <span className="w-4 h-px bg-sky-500"></span>
                    Local Intel
                 </h4>
                 <p className="text-[11px] text-sky-800 font-medium leading-[2.2] uppercase tracking-[0.05em] italic opacity-75">
                   "For {resort.name}, the northern villas offer the most pristine reef access. Expect manta activity to peak in the coming season."
                 </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* 5. NARRATIVE FOOTER NAV */}
      <section className="py-24 md:py-40 bg-white border-t border-slate-50 reveal">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
          <Link to="/stays" className="group flex items-center gap-8">
            <div className="w-16 h-16 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-slate-950 group-hover:border-slate-950 transition-all duration-700 shadow-sm">
              <svg className="w-5 h-5 text-slate-950 group-hover:text-white transition-colors rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <div className="flex flex-col gap-1">
               <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">Gallery Back</span>
               <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-slate-900 group-hover:italic transition-all">The Portfolio</span>
            </div>
          </Link>
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
             <p className="text-slate-300 text-[8px] font-bold uppercase tracking-[1em] mb-4">Serenity.</p>
             <p className="text-slate-400 text-[8px] font-bold uppercase tracking-[0.5em] opacity-60">Maldivian Boutique Agency. Defined by Silence.</p>
          </div>
        </div>
      </section>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ResortDetail;