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
    <div className="bg-[#FCFAF7] min-h-screen">
      {/* High-End Mosaic Header */}
      <section className="grid grid-cols-1 md:grid-cols-4 h-[70vh] md:h-[90vh] gap-2 p-2 pt-24 md:pt-32 reveal active">
        <div className="md:col-span-2 overflow-hidden relative rounded-[2rem] md:rounded-[4rem] group">
          <img src={getGalleryImage(0)} alt={resort.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4s] ease-out" />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700"></div>
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
          {/* Main Content Editorial Area */}
          <div className="flex-grow reveal">
            <nav className="flex items-center text-slate-300 text-[9px] font-bold uppercase tracking-[0.5em] gap-8 mb-16">
              <Link to="/stays" className="hover:text-sky-500 transition-colors">Portfolio</Link>
              <span className="text-amber-400">/</span>
              <span className="text-slate-900 truncate">{resort.name}</span>
            </nav>

            <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-serif font-bold text-slate-900 mb-16 tracking-tighter italic leading-[0.85]">
              {resort.name}
            </h1>

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

              {/* Unique Features Section */}
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

              {/* Accommodation Previews */}
              <div className="mb-40">
                <h3 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-20 italic">The Sanctuaries</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {resort.roomTypes?.map((room, idx) => (
                    <div key={idx} className="group">
                      <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-8 shadow-sm transition-all duration-700 group-hover:shadow-2xl">
                        <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-105" />
                      </div>
                      <h4 className="text-2xl font-serif font-bold text-slate-900 mb-2 group-hover:italic transition-all">{room.name}</h4>
                      <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.4em] mb-4">{room.size} — {room.capacity}</p>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{room.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dining Previews */}
              <div className="mb-24">
                <h3 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-20 italic">Culinary Perspective</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {resort.diningVenues?.map((venue, idx) => (
                    <div key={idx} className="group">
                      <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-8 shadow-sm transition-all duration-700 group-hover:shadow-2xl">
                        <img src={venue.image} alt={venue.name} className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-105" />
                      </div>
                      <h4 className="text-2xl font-serif font-bold text-slate-900 mb-2 group-hover:italic transition-all">{venue.name}</h4>
                      <p className="text-[9px] font-bold text-sky-500 uppercase tracking-[0.4em] mb-4">{venue.cuisine} — {venue.vibe}</p>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{venue.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Area: Inquire & Concierge */}
          <aside className="lg:w-[400px] flex-shrink-0">
            <div className="sticky top-40 bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl border border-slate-50 reveal transition-all duration-1000 delay-300">
              {isSubmitted ? (
                <div className="text-center py-20">
                  <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg className="w-8 h-8 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h4 className="text-2xl font-serif font-bold italic mb-6">Vision Received</h4>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em] leading-loose">Our concierge specialists are reviewing your request.</p>
                </div>
              ) : (
                <>
                  <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.6em] mb-10 block">Private Concierge</span>
                  <h3 className="text-3xl font-serif font-bold text-slate-900 mb-8 italic">Define Your Stay</h3>
                  <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.3em] leading-relaxed mb-12 opacity-80">
                    Bespoke transfers, unlisted villas, and curated atoll journeys.
                  </p>

                  <form onSubmit={handleFormSubmit} className="space-y-8">
                    <div className="border-b border-slate-100 pb-4">
                      <label className="block text-[8px] font-bold text-slate-300 uppercase tracking-[0.5em] mb-3">Your Identity</label>
                      <input type="text" placeholder="FULL NAME" required className="w-full bg-transparent text-[10px] font-bold uppercase tracking-widest outline-none placeholder:text-slate-100" />
                    </div>
                    <div className="border-b border-slate-100 pb-4">
                      <label className="block text-[8px] font-bold text-slate-300 uppercase tracking-[0.5em] mb-3">Email Protocol</label>
                      <input type="email" placeholder="ADDRESS@DOMAIN.COM" required className="w-full bg-transparent text-[10px] font-bold uppercase tracking-widest outline-none placeholder:text-slate-100" />
                    </div>
                    <div className="border-b border-slate-100 pb-4">
                      <label className="block text-[8px] font-bold text-slate-300 uppercase tracking-[0.5em] mb-3">Travel Window</label>
                      <input type="text" placeholder="E.G. OCTOBER 2024" className="w-full bg-transparent text-[10px] font-bold uppercase tracking-widest outline-none placeholder:text-slate-100" />
                    </div>
                    
                    <button type="submit" className="w-full bg-slate-950 text-white font-bold py-6 rounded-full text-[10px] uppercase tracking-[0.5em] hover:bg-sky-500 transition-all duration-700 shadow-xl">
                      Consult Specialist
                    </button>
                  </form>
                  
                  <div className="mt-12 flex items-center justify-center gap-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>
                    <span className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.5em]">Direct line available 24/7</span>
                  </div>
                </>
              )}
            </div>

            <div className="mt-12 p-12 bg-sky-50 rounded-[3rem] border border-sky-100 reveal transition-all duration-1000 delay-500">
               <h4 className="text-[10px] font-bold text-sky-900 uppercase tracking-[0.5em] mb-6 underline underline-offset-8 decoration-sky-200">Regional Mastery</h4>
               <p className="text-[11px] text-sky-800 font-medium leading-loose uppercase tracking-[0.1em] italic">
                 "Expect unparalleled visibility for marine excursions in {resort.atoll} during the dry season. We recommend seaplane arrival for the ultimate visual narrative."
               </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Narrative Transition Footer */}
      <section className="py-32 bg-white border-t border-slate-50 reveal">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
          <Link to="/stays" className="group flex items-center gap-8">
            <div className="w-16 h-16 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-slate-950 group-hover:border-slate-950 transition-all duration-700">
              <svg className="w-4 h-4 text-slate-900 group-hover:text-white transition-colors rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-slate-950 group-hover:italic transition-all">Full Portfolio</span>
          </Link>
          <p className="text-slate-300 text-[8px] font-bold uppercase tracking-[0.8em]">Defined by Perspective. Serenity Maldives Travels.</p>
        </div>
      </section>
    </div>
  );
};

export default ResortDetail;
