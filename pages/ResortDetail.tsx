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
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
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

  return (
    <div className="bg-[#FCFAF7] min-h-screen selection:bg-sky-100 selection:text-sky-900">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative w-full pt-20 md:pt-32 px-4 md:px-6 reveal active">
        <div className="relative aspect-[16/10] md:aspect-[21/9] w-full rounded-[2.5rem] md:rounded-[4.5rem] overflow-hidden shadow-2xl bg-slate-200">
          <img 
            src={resort.images[0]} 
            alt={resort.name} 
            className="w-full h-full object-cover scale-100 transition-transform duration-[20s] hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
          <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20 max-w-5xl">
            <span className="inline-block bg-sky-500 text-white px-5 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.5em] mb-6 shadow-xl">
              {resort.atoll}
            </span>
            <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-serif font-bold text-white tracking-tighter italic leading-[0.85] drop-shadow-2xl">
              {resort.name}
            </h1>
          </div>
        </div>
      </section>

      {/* 2. CORE LAYOUT GRID */}
      <div className="max-w-[1440px] mx-auto px-6 py-20 md:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
          
          {/* LEFT COLUMN: EDITORIAL FLOW (8 of 12) */}
          <div className="lg:col-span-8 space-y-32 md:space-y-64">
            
            {/* The Essence */}
            <div className="reveal">
              <nav className="flex items-center text-slate-300 text-[9px] font-bold uppercase tracking-[0.6em] gap-5 mb-16">
                <Link to="/stays" className="hover:text-sky-500 transition-colors">Portfolio</Link>
                <span className="text-amber-400 opacity-50">/</span>
                <span className="text-slate-900 truncate">{resort.name}</span>
              </nav>
              <h2 className="text-4xl md:text-7xl font-serif font-bold text-slate-900 leading-[1.1] mb-16 italic tracking-tight">
                "{resort.uvp}"
              </h2>
              <p className="text-slate-500 leading-[2.2] text-lg md:text-2xl font-medium opacity-90 max-w-4xl">
                {resort.description}
              </p>
            </div>

            {/* Feature Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 reveal">
              {resort.features.map((feature, idx) => (
                <div key={idx} className="flex gap-8 group">
                  <div className="w-16 h-16 rounded-full border border-slate-200 flex-shrink-0 flex items-center justify-center group-hover:bg-slate-950 group-hover:border-slate-950 transition-all duration-700">
                    <div className="w-2 h-2 rounded-full bg-sky-500 group-hover:bg-white"></div>
                  </div>
                  <div>
                    <h4 className="text-[12px] font-bold text-slate-900 uppercase tracking-[0.4em] mb-2">{feature}</h4>
                    <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em]">Signature Standard</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Accommodations (The Residences) */}
            <div className="reveal">
              <div className="flex justify-between items-end mb-16">
                <h3 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 italic tracking-tighter">The Residences.</h3>
                <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-slate-300 hidden md:block">Gallery Index</span>
              </div>
              <div className="no-scrollbar overflow-x-auto flex gap-8 pb-12 -mx-6 px-6 lg:mx-0 lg:px-0 snap-x">
                {resort.roomTypes?.map((room, idx) => (
                  <div key={idx} className="flex-shrink-0 w-[85vw] md:w-[65%] lg:w-[48%] snap-start group">
                    <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden mb-8 shadow-xl">
                      <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" />
                      <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-all"></div>
                      <div className="absolute bottom-8 left-8">
                         <span className="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full text-[9px] font-bold text-slate-900 uppercase tracking-[0.3em]">
                            {room.size} — {room.capacity}
                         </span>
                      </div>
                    </div>
                    <h4 className="text-2xl font-serif font-bold text-slate-900 mb-4 group-hover:italic transition-all">{room.name}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 opacity-80">{room.description}</p>
                    <div className="flex gap-3 flex-wrap">
                       {room.highlights.map(h => (
                         <span key={h} className="text-[8px] font-bold text-sky-500 uppercase tracking-widest border border-sky-100 px-3 py-1.5 rounded-full">{h}</span>
                       ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Culinary Perspective - Card Slider Section */}
            <div className="reveal">
              <div className="flex justify-between items-end mb-16">
                <h3 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 italic tracking-tighter">Culinary Perspective.</h3>
                <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-slate-300 hidden md:block">Dining Portfolio</span>
              </div>
              <div className="no-scrollbar overflow-x-auto flex gap-8 pb-12 -mx-6 px-6 lg:mx-0 lg:px-0 snap-x">
                {resort.diningVenues?.map((venue, idx) => (
                  <div key={idx} className="flex-shrink-0 w-[85vw] md:w-[60%] lg:w-[48%] snap-start group">
                    <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden mb-8 shadow-xl">
                      <img src={venue.image} alt={venue.name} className="w-full h-full object-cover transition-transform duration-[12s] group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-all duration-1000"></div>
                      <div className="absolute bottom-12 left-10 right-10">
                         <span className="text-sky-400 font-bold text-[9px] uppercase tracking-[0.4em] mb-4 block">{venue.cuisine}</span>
                         <h4 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 group-hover:italic transition-all leading-tight">
                           {venue.name}
                         </h4>
                         <p className="text-white/80 text-[10px] uppercase font-bold tracking-[0.2em]">{venue.vibe}</p>
                      </div>
                    </div>
                    <div className="px-2">
                      <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6 opacity-90 font-medium">
                        {venue.description}
                      </p>
                      <div className="flex gap-3 flex-wrap">
                        {venue.highlights.map(h => (
                          <span key={h} className="text-[8px] font-bold text-amber-500 uppercase tracking-widest border border-amber-100 px-3 py-1.5 rounded-full">{h}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wellness (Rituals) */}
            <div className="reveal bg-white rounded-[4rem] p-12 md:p-24 shadow-sm border border-slate-50 relative overflow-hidden">
               <div className="absolute right-0 top-0 w-80 h-80 bg-amber-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
               <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                  <div>
                     <span className="text-sky-500 text-[10px] font-bold uppercase tracking-[0.8em] mb-12 block">The Rituals</span>
                     <h3 className="text-4xl md:text-7xl font-serif font-bold text-slate-900 italic mb-10 leading-none">Sacred Space.</h3>
                     <p className="text-slate-500 text-lg leading-[2.2] mb-12 opacity-90 font-medium">
                        Experience an overwater sanctuary where traditional Maldivian healing meets modern science. From sea-salt hydrotherapy to sound-bath meditation under the stars.
                     </p>
                     <button className="text-[10px] font-bold text-slate-950 uppercase tracking-[0.4em] border-b border-slate-950 pb-2 hover:text-sky-500 hover:border-sky-500 transition-all">Explore Wellness</button>
                  </div>
                  <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl scale-95 hover:scale-100 transition-transform duration-1000">
                     <img src="https://images.unsplash.com/photo-1544161515-4ae6ce6ca8b8?auto=format&fit=crop&q=80&w=800" alt="Wellness" className="w-full h-full object-cover" />
                  </div>
               </div>
            </div>

            {/* Sustainable Legacy */}
            <div className="bg-slate-900 rounded-[4rem] p-12 md:p-24 text-white reveal relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 transition-opacity group-hover:opacity-100 opacity-50"></div>
               <div className="relative z-10">
                  <span className="text-[10px] font-bold text-sky-400 uppercase tracking-[0.8em] mb-12 block">Environmental Legacy</span>
                  <h3 className="text-4xl md:text-7xl font-serif font-bold mb-12 italic leading-none">Harmonious Living.</h3>
                  <p className="text-slate-400 text-lg md:text-xl leading-[2.4] mb-16 max-w-2xl opacity-90">
                    Constructed with zero-waste principles and powered by 100% solar energy, this sanctuary exists in absolute synergy with the surrounding Baa Atoll Biosphere.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                     {['Solar Grid', 'Ocean Lab', 'Zero Plastic', 'Coral Grafting'].map(item => (
                       <div key={item} className="flex flex-col items-center gap-6 group">
                          <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center transition-all group-hover:bg-sky-500 group-hover:border-sky-500">
                             <div className="w-1 h-1 bg-white rounded-full"></div>
                          </div>
                          <span className="text-[9px] font-bold uppercase tracking-widest opacity-60 text-center">{item}</span>
                       </div>
                     ))}
                  </div>
               </div>
            </div>

          </div>

          {/* RIGHT COLUMN: STICKY SIDEBAR (4 of 12) */}
          <aside className="lg:col-span-4 relative">
            <div className="lg:sticky lg:top-32 space-y-12">
              
              {/* Inquiry Card */}
              <div className="bg-white rounded-[3.5rem] p-10 md:p-14 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.08)] border border-slate-50 reveal">
                {isSubmitted ? (
                  <div className="text-center py-20">
                    <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-10">
                       <svg className="w-8 h-8 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h4 className="text-3xl font-serif font-bold italic mb-6">Confirmed.</h4>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em] leading-loose">A specialist will reach out within the hour.</p>
                  </div>
                ) : (
                  <div>
                    <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.6em] mb-10 block">Studio Consultation</span>
                    <h3 className="text-4xl font-serif font-bold text-slate-900 mb-8 italic tracking-tighter">Plan the Vision.</h3>
                    <form onSubmit={handleFormSubmit} className="space-y-10">
                      <div className="border-b border-slate-100 pb-4 focus-within:border-slate-950 transition-colors">
                        <label className="block text-[8px] font-bold text-slate-300 uppercase tracking-[0.5em] mb-3">Identity</label>
                        <input type="text" required placeholder="FULL NAME" className="w-full bg-transparent text-[11px] font-bold uppercase tracking-widest outline-none placeholder:text-slate-100" />
                      </div>
                      <div className="border-b border-slate-100 pb-4 focus-within:border-slate-950 transition-colors">
                        <label className="block text-[8px] font-bold text-slate-300 uppercase tracking-[0.5em] mb-3">Signal</label>
                        <input type="email" required placeholder="EMAIL ADDRESS" className="w-full bg-transparent text-[11px] font-bold uppercase tracking-widest outline-none placeholder:text-slate-100" />
                      </div>
                      <div className="border-b border-slate-100 pb-4 focus-within:border-slate-950 transition-colors">
                        <label className="block text-[8px] font-bold text-slate-300 uppercase tracking-[0.5em] mb-3">Journey Window</label>
                        <input type="text" placeholder="E.G. AUTUMN 2024" className="w-full bg-transparent text-[11px] font-bold uppercase tracking-widest outline-none placeholder:text-slate-100" />
                      </div>
                      <button type="submit" className="w-full bg-slate-950 text-white font-bold py-6 rounded-full text-[10px] uppercase tracking-[0.6em] hover:bg-sky-500 transition-all duration-700 shadow-2xl">
                        Request Availability
                      </button>
                    </form>
                    <div className="mt-10 flex justify-center gap-4 opacity-30">
                       <div className="w-1 h-1 bg-amber-400 rounded-full animate-pulse"></div>
                       <span className="text-[8px] font-bold uppercase tracking-widest">Encrypted Protocol Active</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Local Tip */}
              <div className="bg-sky-50 rounded-[3rem] p-12 border border-sky-100 reveal delay-300">
                 <h4 className="text-[10px] font-bold text-sky-900 uppercase tracking-[0.6em] mb-6 flex items-center gap-4">
                    <span className="w-6 h-px bg-sky-500"></span>
                    Local Studio Note
                 </h4>
                 <p className="text-[12px] text-sky-800 font-medium leading-[2.2] uppercase tracking-[0.05em] italic opacity-85">
                   "We highly recommend the north-facing residences at {resort.name} for those prioritizing sunrise meditation and the most vibrant shore-side marine sightings."
                 </p>
              </div>

              {/* Direct Link */}
              <div className="p-8 text-center opacity-40">
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Portfolio Reference: {resort.id}</p>
              </div>

            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ResortDetail;