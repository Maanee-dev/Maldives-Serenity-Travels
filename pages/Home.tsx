import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RESORTS } from '../constants';
import ResortCard from '../components/ResortCard';

const Home: React.FC = () => {
  const featuredResorts = RESORTS.slice(0, 3);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#FCFAF7] min-h-screen">
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Dynamic Watermark Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
           <h2 className="text-[40vw] font-serif font-bold italic whitespace-nowrap leading-none -rotate-6">Atolls</h2>
        </div>

        <div className="max-w-7xl mx-auto text-center reveal relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-slate-400 mb-12 block">Defined by Perspective</span>
          <h1 className="text-6xl md:text-9xl lg:text-[11rem] font-serif font-bold text-slate-950 mb-16 leading-[0.85] tracking-tighter italic">
            Where Nature <br /> Embraces Silence.
          </h1>
          
          <div className="flex flex-col items-center mt-24">
            <Link to="/stays" className="group relative">
               <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-900 group-hover:text-sky-500 transition-colors">Start the Journey</span>
               <div className="mt-8 w-px h-24 bg-slate-900 group-hover:bg-sky-500 transition-all origin-top scale-y-100 group-hover:scale-y-125"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. THE PHILOSOPHY - Editorial Text Section */}
      <section className="py-64 px-6 reveal">
         <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 leading-[1.3] mb-12 italic tracking-tight">
              "Serenity is not just a destination; it is an architectural dialogue between the soul and the sea."
            </h2>
            <div className="h-px w-24 bg-amber-400 mx-auto mb-16"></div>
            <p className="text-slate-500 text-lg md:text-xl font-medium leading-[2.2] max-w-3xl mx-auto opacity-80">
              We curate Maldivian sanctuaries that define the standard of minimalist luxury. Each portfolio entry is hand-selected for its commitment to sustainability, architectural brilliance, and the art of space.
            </p>
         </div>
      </section>

      {/* 3. THE ATOLL COLLECTION - Region Marquee/Grid */}
      <section className="py-40 border-y border-slate-100 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 mb-24 reveal">
           <span className="text-[9px] font-bold text-sky-500 uppercase tracking-[0.8em] mb-4 block">Regional Index</span>
           <h3 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 italic tracking-tighter">The Atoll Map.</h3>
        </div>
        
        <div className="flex gap-8 px-6 no-scrollbar overflow-x-auto snap-x snap-mandatory pb-12">
           {['Noonu', 'Baa', 'North Male', 'South Ari', 'Dhaalu'].map((atoll, idx) => (
             <div key={atoll} className="flex-shrink-0 w-[80vw] md:w-[400px] aspect-[3/4] rounded-[3rem] overflow-hidden relative group snap-start shadow-xl">
                <img 
                  src={`https://images.unsplash.com/photo-${idx % 2 === 0 ? '1544550581-5f7ceaf7f992' : '1590523277543-a94d2e4eb00b'}?auto=format&fit=crop&q=80&w=800`} 
                  alt={atoll} 
                  className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10">
                   <h4 className="text-4xl font-serif font-bold text-white italic mb-2">{atoll} Atoll</h4>
                   <span className="text-[8px] font-bold text-sky-400 uppercase tracking-widest">Explore Region</span>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* 4. THE PORTFOLIO - Featured Stays */}
      <section className="py-64 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12 reveal">
            <div className="max-w-2xl">
              <span className="text-[9px] font-bold text-sky-500 uppercase tracking-[0.8em] mb-6 block">The Main Collection</span>
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate-950 mb-8 leading-[1] italic tracking-tight">Iconic Living.</h2>
              <p className="text-slate-400 text-sm md:text-base font-bold uppercase tracking-[0.4em] opacity-60">Hand-curated for the global aesthete.</p>
            </div>
            <Link to="/stays" className="group flex items-center gap-12">
              <div className="w-20 h-20 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-slate-950 group-hover:border-slate-950 transition-all duration-700">
                 <svg className="w-6 h-6 text-slate-950 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                 </svg>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-950">View Full Portfolio</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 xl:gap-24">
            {featuredResorts.map((resort, idx) => (
              <div key={resort.id} className="reveal" style={{ transitionDelay: `${idx * 150}ms` }}>
                <ResortCard resort={resort} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CULINARY MOMENTS - Teaser */}
      <section className="py-64 px-6 bg-slate-950 text-white overflow-hidden relative">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-10">
            <div className="reveal">
               <span className="text-[10px] font-bold text-sky-400 uppercase tracking-[1em] mb-12 block">Gastronomy</span>
               <h3 className="text-5xl md:text-8xl font-serif font-bold mb-12 italic leading-tight">Flavor & Fluidity.</h3>
               <p className="text-slate-400 text-lg md:text-xl leading-[2.2] mb-16 opacity-90 max-w-xl">
                  From underwater dining rooms to private sandbank dinners under the stars, our resorts offer the pinnacle of Maldivian culinary art.
               </p>
               <Link to="/experiences" className="text-[10px] font-bold uppercase tracking-[0.5em] border-b border-sky-400 pb-2 hover:text-sky-300 transition-all">Explore Venues</Link>
            </div>
            <div className="grid grid-cols-2 gap-8 reveal delay-500">
               <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl translate-y-20">
                  <img src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800" alt="Dining" className="w-full h-full object-cover" />
               </div>
               <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800" alt="Ocean" className="w-full h-full object-cover" />
               </div>
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

export default Home;