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
      
      {/* 1. CINEMATIC MOSAIC HEADER - Responsive Refined Grid */}
      <section className="p-3 md:p-4 pt-24 md:pt-32 reveal active">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-3 md:gap-4 h-[85vh] md:h-[70vh] lg:h-[85vh]">
          {/* Main Large Frame */}
          <div className="md:col-span-2 lg:col-span-7 relative overflow-hidden rounded-[2.5rem] md:rounded-[4rem] group shadow-2xl h-full">
            <img 
              src={getGalleryImage(0)} 
              alt={resort.name} 
              className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16">
              <span className="inline-block bg-sky-500/90 backdrop-blur-md text-white px-5 py-2 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-[0.5em] mb-4 shadow-xl">
                {resort.atoll}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-9xl font-serif font-bold text-white tracking-tighter italic leading-none drop-shadow-2xl">
                {resort.name}
              </h1>
            </div>
          </div>

          {/* Secondary Stack */}
          <div className="hidden md:flex md:col-span-2 lg:col-span-3 flex-col gap-3 md:gap-4 h-full">
            <div className="flex-1 overflow-hidden relative rounded-[2rem] md:rounded-[3rem] group shadow-lg">
              <img src={getGalleryImage(1)} alt="Lifestyle" className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-110" />
            </div>
            <div className="flex-1 overflow-hidden relative rounded-[2rem] md:rounded-[3rem] group shadow-lg">
              <img src={getGalleryImage(2)} alt="Detail" className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-110" />
            </div>
          </div>

          {/* Tertiary Accent Frame */}
          <div className="hidden lg:block lg:col-span-2 overflow-hidden relative rounded-[3rem] md:rounded-[4rem] group shadow-lg h-full">
            <img src={getGalleryImage(3)} alt="Aerial" className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-110" />
          </div>
        </div>
      </section>

      {/* 2. CORE DETAILS AREA */}
      <div className="max-w-7xl mx-auto px-5 py-16 md:py-32 lg:py-48 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 xl:gap-32 items-start">
          
          {/* LEFT: EDITORIAL CONTENT */}
          <div className="w-full lg:flex-grow reveal">
            <nav className="flex items-center text-slate-300 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.5em] gap-6 mb-12 md:mb-20">
              <Link to="/stays" className="hover:text-sky-500 transition-colors">Portfolio</Link>
              <span className="text-amber-400 opacity-50">/</span>
              <span className="text-slate-900 truncate">{resort.name}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-6 md:gap-12 mb-16 md:mb-24 pb-12 md:pb-16 border-b border-slate-100">
               <div className="flex gap-1.5">
                 {[...Array(resort.rating)].map((_, i) => (
                   <div key={i} className="w-2 h-2 rounded-full bg-amber-400"></div>
                 ))}
               </div>
               <span className="text-[9px] md:text-[10px] font-bold text-sky-500 uppercase tracking-[0.6em] md:border-l md:border-slate-200 md:pl-12">
                 {resort.atoll}
               </span>
               <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.6em] md:border-l md:border-slate-200 md:pl-12">
                 {resort.priceRange} Luxury
               </span>
            </div>

            <div className="prose prose-slate max-w-none">
              <p className="text-2xl md:text-5xl font-serif font-bold text-slate-900 leading-[1.2] mb-16 md:mb-24 italic border-l-2 border-amber-400 pl-8 md:pl-12 py-2">
                "{resort.uvp}"
              </p>
              <div className="text-slate-500 leading-[2] md:leading-[2.2] text-base md:text-xl mb-24 md:mb-32 font-medium opacity-90 max-w-3xl">
                {resort.description}
              </div>

              {/* FEATURES GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-16 mb-24 md:mb-48">
                {resort.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-6 md:gap-8 group">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-slate-200 flex-shrink-0 flex items-center justify-center group-hover:bg-slate-950 group-hover:border-slate-950 transition-all duration-700">
                      <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-sky-500 group-hover:bg-white"></div>
                    </div>
                    <div>
                      <h4 className="text-[10px] md:text-[11px] font-bold text-slate-900 uppercase tracking-[0.3em] mb-2">{feature}</h4>
                      <p className="text-[8px] md:text-[9px] text-slate-300 font-bold uppercase tracking-[0.2em]">Curated Standard</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 3. THE SANCTUARIES - Refined Horizontal Scroll */}
              <div className="mb-32 md:mb-48 reveal">
                <div className="flex justify-between items-end mb-12 md:mb-16">
                  <h3 className="text-3xl md:text-6xl lg:text-7xl font-serif font-bold text-slate-900 italic tracking-tighter">The Sanctuaries.</h3>
                  <div className="hidden sm:flex flex-col items-end gap-2 pr-4">
                    <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-slate-300">Horizontal Scroll</span>
                    <div className="w-16 md:w-24 h-[1px] bg-slate-100 relative overflow-hidden">
                       <div className="absolute inset-0 bg-sky-500 origin-left animate-[loadingBar_4s_infinite]"></div>
                    </div>
                  </div>
                </div>
                
                <div className="no-scrollbar overflow-x-auto flex gap-6 md:gap-10 pb-12 snap-x snap-mandatory cursor-grab active:cursor-grabbing -mx-5 px-5 lg:mx-0 lg:px-0">
                  {resort.roomTypes?.map((room, idx) => (
                    <div key={idx} className="flex-shrink-0 w-[82vw] sm:w-[50vw] md:w-[60%] lg:w-[48%] snap-start group">
                      <div className="relative aspect-[16/10] rounded-[2rem] md:rounded-[3rem] overflow-hidden mb-8 shadow-md transition-all duration-1000 group-hover:shadow-2xl">
                        <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent"></div>
                        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                           <span className="bg-white/95 backdrop-blur-xl px-5 py-2.5 rounded-full text-[8px] md:text-[9px] font-bold text-slate-950 uppercase tracking-[0.3em] shadow-xl">
                              {room.size} — {room.capacity}
                           </span>
                        </div>
                      </div>
                      <div className="px-2">
                        <h4 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-3 group-hover:italic transition-all tracking-tight">{room.name}</h4>
                        <p className="text-slate-500 text-sm md:text-base leading-relaxed line-clamp-2 font-medium opacity-80 mb-6">{room.description}</p>
                        <div className="w-8 h-[1px] bg-slate-200 group-hover:w-full group-hover:bg-sky-500 transition-all duration-1000"></div>
                      </div>
                    </div>
                  ))}
                  {/* End padding for mobile scroll */}
                  <div className="flex-shrink-0 w-1 lg:hidden"></div>
                </div>
              </div>

              {/* 4. GASTRONOMY - Refined Horizontal Scroll */}
              <div className="mb-24 reveal">
                <div className="flex justify-between items-end mb-12 md:mb-16">
                  <h3 className="text-3xl md:text-6xl lg:text-7xl font-serif font-bold text-slate-900 italic tracking-tighter">Gastronomy.</h3>
                  <div className="hidden sm:flex flex-col items-end gap-2 pr-4">
                    <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-slate-300">The Collection</span>
                    <div className="w-16 md:w-24 h-[1px] bg-slate-100 relative overflow-hidden">
                       <div className="absolute inset-0 bg-sky-500 origin-left animate-[loadingBar_4s_infinite_1s]"></div>
                    </div>
                  </div>
                </div>
                
                <div className="no-scrollbar overflow-x-auto flex gap-6 md:gap-10 pb-12 snap-x snap-mandatory cursor-grab active:cursor-grabbing -mx-5 px-5 lg:mx-0 lg:px-0">
                  {resort.diningVenues?.map((venue, idx) => (
                    <div key={idx} className="flex-shrink-0 w-[82vw] sm:w-[50vw] md:w-[60%] lg:w-[48%] snap-start group">
                      <div className="relative aspect-[16/10] rounded-[2rem] md:rounded-[3rem] overflow-hidden mb-8 shadow-md transition-all duration-1000 group-hover:shadow-2xl">
                        <img src={venue.image} alt={venue.name} className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-105" />
                        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                           <span className="bg-sky-500 text-white px-5 py-2.5 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-[0.3em] shadow-xl">
                              {venue.vibe}
                           </span>
                        </div>
                      </div>
                      <div className="px-2">
                        <h4 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-2 group-hover:italic transition-all tracking-tight">{venue.name}</h4>
                        <p className="text-sky-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4">{venue.cuisine}</p>
                        <p className="text-slate-500 text-sm md:text-base leading-relaxed line-clamp-2 font-medium opacity-80 mb-6">{venue.description}</p>
                        <div className="w-8 h-[1px] bg-slate-200 group-hover:w-full group-hover:bg-sky-500 transition-all duration-1000"></div>
                      </div>
                    </div>
                  ))}
                  <div className="flex-shrink-0 w-1 lg:hidden"></div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: STICKY SIDEBAR INQUIRY */}
          <aside className="w-full lg:w-[380px] xl:w-[440px] flex-shrink-0 lg:sticky lg:top-36 z-20">
            <div className="bg-white rounded-[3rem] md:rounded-[4rem] p-10 md:p-14 lg:p-16 shadow-[0_50px_100px_-25px_rgba(0,0,0,0.08)] border border-slate-50 reveal transition-all duration-1000 delay-300 relative overflow-hidden group">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-sky-50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000"></div>
              
              {isSubmitted ? (
                <div className="text-center py-16 md:py-24 relative z-10">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
                    <svg className="w-8 h-8 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h4 className="text-2xl md:text-3xl font-serif font-bold italic mb-6">Request Received.</h4>
                  <p className="text-slate-400 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.5em] leading-[2.5] max-w-xs mx-auto">A concierge specialist will reach out shortly.</p>
                </div>
              ) : (
                <div className="relative z-10">
                  <span className="text-[9px] md:text-[10px] font-bold text-sky-500 uppercase tracking-[0.8em] mb-10 block">Bespoke Inquiry</span>
                  <h3 className="text-3xl md:text-4xl xl:text-5xl font-serif font-bold text-slate-900 mb-8 italic leading-tight tracking-tighter">Consult with Our Specialists.</h3>
                  <p className="text-slate-400 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] leading-relaxed mb-12 opacity-70">
                    Negotiated rates, private transfers, and tailored Maldivian journeys.
                  </p>

                  <form onSubmit={handleFormSubmit} className="space-y-10">
                    <div className="border-b border-slate-100 pb-4 group-focus-within:border-slate-900 transition-colors">
                      <label className="block text-[8px] font-bold text-slate-300 uppercase tracking-[0.6em] mb-3">Identity</label>
                      <input type="text" placeholder="FULL NAME" required className="w-full bg-transparent text-[10px] md:text-[11px] font-bold uppercase tracking-widest outline-none placeholder:text-slate-200" />
                    </div>
                    <div className="border-b border-slate-100 pb-4 group-focus-within:border-slate-900 transition-colors">
                      <label className="block text-[8px] font-bold text-slate-300 uppercase tracking-[0.6em] mb-3">Protocol</label>
                      <input type="email" placeholder="EMAIL ADDRESS" required className="w-full bg-transparent text-[10px] md:text-[11px] font-bold uppercase tracking-widest outline-none placeholder:text-slate-200" />
                    </div>
                    <div className="border-b border-slate-100 pb-4 group-focus-within:border-slate-900 transition-colors">
                      <label className="block text-[8px] font-bold text-slate-300 uppercase tracking-[0.6em] mb-3">Travel Date</label>
                      <input type="text" placeholder="E.G. DECEMBER 2024" className="w-full bg-transparent text-[10px] md:text-[11px] font-bold uppercase tracking-widest outline-none placeholder:text-slate-200" />
                    </div>
                    
                    <button type="submit" className="w-full bg-slate-950 text-white font-bold py-6 md:py-7 rounded-full text-[9px] md:text-[10px] uppercase tracking-[0.5em] hover:bg-sky-500 transition-all duration-700 shadow-xl mt-8">
                      Initiate Consultation
                    </button>
                  </form>
                  
                  <div className="mt-12 flex items-center justify-center gap-5 opacity-40">
                    <div className="w-1 h-1 rounded-full bg-amber-400 animate-pulse"></div>
                    <span className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.8em]">Available via WhatsApp 24/7</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 p-10 md:p-12 bg-sky-50 rounded-[3rem] border border-sky-100 reveal transition-all duration-1000 delay-500 shadow-sm hidden lg:block">
               <h4 className="text-[9px] font-bold text-sky-900 uppercase tracking-[0.6em] mb-6 flex items-center gap-3">
                  <span className="w-6 h-px bg-sky-500"></span>
                  Local Intelligence
               </h4>
               <p className="text-[11px] xl:text-[12px] text-sky-800 font-medium leading-[2.2] uppercase tracking-[0.1em] italic opacity-80">
                 "For the most serene experience in {resort.atoll}, we recommend seaplane arrival. Expect manta ray visibility to peak from late July through October."
               </p>
            </div>
          </aside>
        </div>
      </div>

      {/* 5. NARRATIVE FOOTER NAV */}
      <section className="py-24 md:py-48 bg-white border-t border-slate-50 reveal">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-12 md:gap-16">
          <Link to="/stays" className="group flex items-center gap-8">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-slate-950 group-hover:border-slate-950 transition-all duration-700 shadow-sm">
              <svg className="w-5 h-5 text-slate-950 group-hover:text-white transition-colors rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <div className="flex flex-col gap-1 md:gap-2">
               <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">Back to Gallery</span>
               <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.6em] text-slate-900 group-hover:italic transition-all">The Portfolio</span>
            </div>
          </Link>
          <div className="flex flex-col items-center md:items-end text-center md:text-right max-w-xs">
             <p className="text-slate-300 text-[8px] md:text-[9px] font-bold uppercase tracking-[1em] mb-4">Perspective.</p>
             <p className="text-slate-400 text-[8px] font-bold uppercase tracking-[0.5em] opacity-60">Curating Silence & Space Since MMXII. Maldives Boutique Agency.</p>
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
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ResortDetail;