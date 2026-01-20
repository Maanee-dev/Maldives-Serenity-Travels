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
    <div className="bg-[#FCFAF7] min-h-screen selection:bg-sky-100 selection:text-sky-900">
      {/* 1. CINEMATIC MOSAIC HEADER */}
      <section className="grid grid-cols-1 md:grid-cols-4 h-[70svh] md:h-[90svh] gap-2 p-2 pt-24 md:pt-32 reveal active">
        <div className="md:col-span-2 overflow-hidden relative rounded-[2rem] md:rounded-[4rem] group shadow-2xl">
          <img src={getGalleryImage(0)} alt={resort.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[6s] ease-out" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000"></div>
          <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20">
             <span className="inline-block bg-sky-500/90 backdrop-blur-md text-white px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.5em] mb-6 shadow-xl">
                {resort.atoll}
             </span>
             <h1 className="text-4xl md:text-8xl lg:text-[10rem] font-serif font-bold text-white tracking-tighter italic leading-none drop-shadow-2xl">
                {resort.name}
             </h1>
          </div>
        </div>
        <div className="hidden md:flex flex-col gap-2 h-full">
          <div className="h-1/2 overflow-hidden relative rounded-[2rem] md:rounded-[4rem] group">
             <img src={getGalleryImage(1)} alt={resort.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4s] ease-out" />
             <div className="absolute inset-0 bg-black/10"></div>
          </div>
          <div className="h-1/2 overflow-hidden relative rounded-[2rem] md:rounded-[4rem] group">
             <img src={getGalleryImage(2)} alt="Detail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4s] ease-out" />
             <div className="absolute inset-0 bg-black/10"></div>
          </div>
        </div>
        <div className="hidden md:block overflow-hidden relative rounded-[2rem] md:rounded-[4rem] group">
          <img src={getGalleryImage(3)} alt="Aerial" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4s] ease-out" />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24 md:py-48 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">
          
          {/* 2. MAIN EDITORIAL CONTENT */}
          <div className="flex-grow reveal">
            <nav className="flex items-center text-slate-300 text-[9px] font-bold uppercase tracking-[0.5em] gap-8 mb-16">
              <Link to="/stays" className="hover:text-sky-500 transition-colors">Portfolio</Link>
              <span className="text-amber-400">/</span>
              <span className="text-slate-900 truncate">{resort.name}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-12 mb-24 pb-16 border-b border-slate-100">
               <div className="flex gap-2">
                 {[...Array(resort.rating)].map((_, i) => (
                   <div key={i} className="w-2 h-2 rounded-full bg-amber-400"></div>
                 ))}
               </div>
               <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.6em] border-l border-slate-200 pl-12">
                 {resort.atoll}
               </span>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.6em] border-l border-slate-200 pl-12">
                 {resort.priceRange} Luxury
               </span>
            </div>

            <div className="prose prose-slate max-w-none">
              <p className="text-2xl md:text-5xl font-serif font-bold text-slate-900 leading-[1.2] mb-24 italic border-l-2 border-amber-400 pl-12 py-4">
                "{resort.uvp}"
              </p>
              <div className="text-slate-500 leading-[2.2] text-lg md:text-xl mb-32 font-medium opacity-90 max-w-3xl">
                {resort.description}
              </div>

              {/* 3. SIGNATURE FEATURES */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-40">
                {resort.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-8 group">
                    <div className="w-14 h-14 rounded-full border border-slate-200 flex-shrink-0 flex items-center justify-center group-hover:bg-slate-950 group-hover:border-slate-950 transition-all duration-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-500 group-hover:bg-white"></div>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.3em] mb-3">{feature}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] opacity-60">Signature Amenity</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 4. THE SANCTUARIES (HORIZONTAL SLIDER) */}
              <div className="mb-48 overflow-hidden reveal">
                <div className="flex justify-between items-end mb-16 pr-4">
                  <h3 className="text-4xl md:text-7xl font-serif font-bold text-slate-900 italic tracking-tighter">The Sanctuaries.</h3>
                  <div className="hidden md:flex flex-col items-end gap-2">
                    <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-slate-400">Swipe to Explore</span>
                    <div className="w-24 h-px bg-slate-100 relative overflow-hidden">
                       <div className="absolute inset-0 bg-sky-500 origin-left animate-[loadingBar_3s_infinite]"></div>
                    </div>
                  </div>
                </div>
                <div className="no-scrollbar overflow-x-auto flex gap-8 md:gap-12 pb-16 snap-x snap-mandatory cursor-grab active:cursor-grabbing -mx-4 px-4 md:-mx-0 md:px-0">
                  {resort.roomTypes?.map((room, idx) => (
                    <div key={idx} className="flex-shrink-0 w-[85vw] md:w-[65%] lg:w-[48%] snap-start group">
                      <div className="relative aspect-[16/10] md:aspect-[4/3] rounded-[3rem] overflow-hidden mb-10 shadow-lg transition-all duration-1000 group-hover:shadow-2xl">
                        <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
                        <div className="absolute bottom-8 left-8">
                           <span className="bg-white/95 backdrop-blur-xl px-6 py-2.5 rounded-full text-[9px] font-bold text-slate-950 uppercase tracking-[0.3em] shadow-2xl">
                              {room.size} — {room.capacity}
                           </span>
                        </div>
                      </div>
                      <div className="px-4">
                        <h4 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4 group-hover:italic transition-all duration-500 tracking-tight">{room.name}</h4>
                        <p className="text-slate-500 text-base md:text-lg leading-relaxed line-clamp-2 font-medium opacity-80 mb-6">{room.description}</p>
                        <div className="w-12 h-[1px] bg-slate-200 group-hover:w-full group-hover:bg-sky-500 transition-all duration-1000"></div>
                      </div>
                    </div>
                  ))}
                  <div className="flex-shrink-0 w-8 md:hidden"></div>
                </div>
              </div>

              {/* 5. CULINARY PERSPECTIVE (HORIZONTAL SLIDER) */}
              <div className="mb-24 overflow-hidden reveal">
                <div className="flex justify-between items-end mb-16 pr-4">
                  <h3 className="text-4xl md:text-7xl font-serif font-bold text-slate-900 italic tracking-tighter">Gastronomy.</h3>
                  <div className="hidden md:flex flex-col items-end gap-2">
                    <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-slate-400">Discover Venues</span>
                    <div className="w-24 h-px bg-slate-100 relative overflow-hidden">
                       <div className="absolute inset-0 bg-sky-500 origin-left animate-[loadingBar_3s_infinite_0.5s]"></div>
                    </div>
                  </div>
                </div>
                <div className="no-scrollbar overflow-x-auto flex gap-8 md:gap-12 pb-16 snap-x snap-mandatory cursor-grab active:cursor-grabbing -mx-4 px-4 md:-mx-0 md:px-0">
                  {resort.diningVenues?.map((venue, idx) => (
                    <div key={idx} className="flex-shrink-0 w-[85vw] md:w-[65%] lg:w-[48%] snap-start group">
                      <div className="relative aspect-[16/10] md:aspect-[4/3] rounded-[3rem] overflow-hidden mb-10 shadow-lg transition-all duration-1000 group-hover:shadow-2xl">
                        <img src={venue.image} alt={venue.name} className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
                        <div className="absolute bottom-8 left-8">
                           <span className="bg-sky-500 text-white px-6 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] shadow-2xl">
                              {venue.vibe}
                           </span>
                        </div>
                      </div>
                      <div className="px-4">
                        <h4 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-3 group-hover:italic transition-all duration-500 tracking-tight">{venue.name}</h4>
                        <p className="text-sky-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-6">{venue.cuisine}</p>
                        <p className="text-slate-500 text-base md:text-lg leading-relaxed line-clamp-2 font-medium opacity-80 mb-6">{venue.description}</p>
                        <div className="w-12 h-[1px] bg-slate-200 group-hover:w-full group-hover:bg-sky-500 transition-all duration-1000"></div>
                      </div>
                    </div>
                  ))}
                  <div className="flex-shrink-0 w-8 md:hidden"></div>
                </div>
              </div>
            </div>
          </div>

          {/* 6. BOUTIQUE SIDEBAR (INQUIRE) */}
          <aside className="lg:w-[420px] flex-shrink-0">
            <div className="sticky top-40 bg-white rounded-[3.5rem] p-10 md:p-16 shadow-[0_60px_100px_-25px_rgba(0,0,0,0.12)] border border-slate-50 reveal transition-all duration-1000 delay-300 overflow-hidden relative group">
              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
              
              {isSubmitted ? (
                <div className="text-center py-20 relative z-10">
                  <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
                    <svg className="w-10 h-10 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h4 className="text-3xl font-serif font-bold italic mb-8 tracking-tight">Vision Received.</h4>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.5em] leading-[2.5] max-w-xs mx-auto opacity-80">Our specialized concierge is reviewing your perspective.</p>
                </div>
              ) : (
                <div className="relative z-10">
                  <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.8em] mb-12 block">Private Inquiry</span>
                  <h3 className="text-4xl font-serif font-bold text-slate-900 mb-10 italic leading-none tracking-tighter">Define Your <br/> Perspective.</h3>
                  <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.3em] leading-relaxed mb-16 opacity-70">
                    From unlisted villas to private atoll charters—exclusive access starts here.
                  </p>

                  <form onSubmit={handleFormSubmit} className="space-y-12">
                    <div className="border-b border-slate-100 pb-4 group-focus-within:border-slate-900 transition-colors">
                      <label className="block text-[8px] font-bold text-slate-300 uppercase tracking-[0.6em] mb-4">Identity</label>
                      <input type="text" placeholder="FULL NAME" required className="w-full bg-transparent text-[11px] font-bold uppercase tracking-widest outline-none placeholder:text-slate-200" />
                    </div>
                    <div className="border-b border-slate-100 pb-4 group-focus-within:border-slate-900 transition-colors">
                      <label className="block text-[8px] font-bold text-slate-300 uppercase tracking-[0.6em] mb-4">Protocol</label>
                      <input type="email" placeholder="EMAIL ADDRESS" required className="w-full bg-transparent text-[11px] font-bold uppercase tracking-widest outline-none placeholder:text-slate-200" />
                    </div>
                    <div className="border-b border-slate-100 pb-4 group-focus-within:border-slate-900 transition-colors">
                      <label className="block text-[8px] font-bold text-slate-300 uppercase tracking-[0.6em] mb-4">Timeline</label>
                      <input type="text" placeholder="E.G. AUTUMN 2024" className="w-full bg-transparent text-[11px] font-bold uppercase tracking-widest outline-none placeholder:text-slate-200" />
                    </div>
                    
                    <button type="submit" className="w-full bg-slate-950 text-white font-bold py-7 rounded-full text-[10px] uppercase tracking-[0.5em] hover:bg-sky-500 transition-all duration-700 shadow-2xl mt-12">
                      Consult Specialist
                    </button>
                  </form>
                  
                  <div className="mt-16 flex items-center justify-center gap-6 opacity-40">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>
                    <span className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.8em]">Direct Concierge 24/7</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-12 p-12 bg-sky-50 rounded-[3.5rem] border border-sky-100 reveal transition-all duration-1000 delay-500 shadow-sm">
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-8 h-px bg-sky-500"></div>
                  <h4 className="text-[10px] font-bold text-sky-900 uppercase tracking-[0.6em]">Regional Mastery</h4>
               </div>
               <p className="text-[12px] text-sky-800 font-medium leading-[2] uppercase tracking-[0.1em] italic opacity-80">
                 "Expect unrivaled visibility for manta ray excursions in {resort.atoll} from August. We recommend seaplane arrival for the ultimate visual narrative."
               </p>
            </div>
          </aside>
        </div>
      </div>

      {/* 7. TRANSITION FOOTER */}
      <section className="py-40 bg-white border-t border-slate-50 reveal">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-16">
          <Link to="/stays" className="group flex items-center gap-8">
            <div className="w-20 h-20 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-slate-950 group-hover:border-slate-950 transition-all duration-700 shadow-sm">
              <svg className="w-6 h-6 text-slate-950 group-hover:text-white transition-colors rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <div className="flex flex-col gap-2">
               <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">Back to Gallery</span>
               <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-slate-900 group-hover:italic transition-all">The Portfolio</span>
            </div>
          </Link>
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
             <p className="text-slate-300 text-[9px] font-bold uppercase tracking-[1em] mb-4">Perspective.</p>
             <p className="text-slate-400 text-[8px] font-bold uppercase tracking-[0.5em] max-w-xs">Bespoke Boutique Agency Curating Silence & Space Since MMXII.</p>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes loadingBar {
          0% { transform: scaleX(0); transform-origin: left; }
          50% { transform: scaleX(1); transform-origin: left; }
          51% { transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: right; }
        }
      `}</style>
    </div>
  );
};

export default ResortDetail;
