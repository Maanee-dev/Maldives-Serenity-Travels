
import React, { useEffect } from 'react';
import { EXPERIENCES } from '../constants';
import { Link } from 'react-router-dom';

/**
 * Experiences Page: Showcases curated luxury activities and journeys in the Maldives.
 */
const Experiences: React.FC = () => {
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
      {/* 1. EDITORIAL HEADER */}
      <section className="pt-64 pb-48 px-6 text-center reveal">
        <div className="max-w-4xl mx-auto">
          <span className="text-[10px] font-bold text-sky-500 mb-12 block tracking-[1em] uppercase">The Perspective</span>
          <h1 className="text-6xl md:text-9xl lg:text-[11rem] font-serif font-bold mb-16 text-slate-950 tracking-tighter italic leading-none">Curated Living</h1>
          <div className="h-px w-24 bg-amber-400 mx-auto mb-16"></div>
          <p className="text-slate-500 text-[11px] font-bold max-w-xl mx-auto uppercase tracking-[0.5em] leading-[2.8] opacity-80">
            Beyond the turquoise horizon lies a world <br className="hidden md:block"/> defined by movement, silence, and adventure.
          </p>
        </div>
      </section>

      {/* 2. THE MAIN EXPERIENCES FLOW */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-24 pb-64">
        <div className="flex flex-col gap-48 md:gap-80">
          {EXPERIENCES.map((exp, idx) => (
            <div key={exp.id} className={`flex flex-col lg:flex-row gap-24 lg:gap-48 items-center reveal ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
               <div className="lg:w-1/2 relative aspect-[1/1] w-full rounded-[4rem] md:rounded-[6.5rem] overflow-hidden shadow-2xl group">
                  <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-slate-950/15 group-hover:bg-transparent transition-all duration-1000"></div>
                  <div className={`absolute bottom-16 ${idx % 2 !== 0 ? 'right-16' : 'left-16'} hidden md:block`}>
                    <span className="text-[15vw] font-serif italic text-white/20 pointer-events-none select-none">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
               </div>
               
               <div className="lg:w-1/2">
                  <div className="max-w-xl">
                    <span className="text-sky-500 font-bold uppercase tracking-[1em] text-[10px] mb-12 block">{exp.category}</span>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-slate-950 mb-12 leading-[0.95] italic tracking-tight">
                      {exp.title}
                    </h2>
                    <p className="text-slate-500 text-lg md:text-xl leading-[2.2] mb-16 font-medium opacity-85">
                      {exp.description} Discover the Maldives through private expeditions, castaway retreats, and rhythmic local culture designed for your unique perspective.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-24">
                      <div className="flex items-center gap-6 group">
                         <div className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-[2] transition-all"></div>
                         <span className="text-[10px] font-bold text-slate-950 uppercase tracking-widest">Bespoke Itinerary</span>
                      </div>
                      <div className="flex items-center gap-6 group">
                         <div className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-[2] transition-all"></div>
                         <span className="text-[10px] font-bold text-slate-950 uppercase tracking-widest">Expert Navigators</span>
                      </div>
                    </div>

                    <Link to="/plan" className="inline-flex items-center gap-10 group">
                       <div className="w-24 h-24 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-950 group-hover:border-slate-950 transition-all duration-700 shadow-sm">
                          <svg className="w-8 h-8 text-slate-950 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                       </div>
                       <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-slate-950 group-hover:text-sky-500 transition-colors">Initiate Request</span>
                    </Link>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. THE JET SET - Private Logistics */}
      <section className="py-64 bg-white reveal">
         <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-5">
               <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[1em] mb-12 block">Private Transit</span>
               <h3 className="text-5xl md:text-7xl font-serif font-bold text-slate-950 italic mb-12 leading-tight">Elevated Arrivals.</h3>
               <p className="text-slate-500 text-lg leading-[2.2] mb-16 opacity-90">
                  From chartered seaplanes to luxury yacht transfers and private jet handling at Velana International. We manage the mechanics of your arrival so you can remain in the moment.
               </p>
               <ul className="space-y-6 text-[11px] font-bold uppercase tracking-[0.4em] text-slate-950">
                  <li className="flex items-center gap-4"><span className="w-4 h-px bg-amber-400"></span> Private Jet Handling</li>
                  <li className="flex items-center gap-4"><span className="w-4 h-px bg-amber-400"></span> Luxury Yacht Charter</li>
                  <li className="flex items-center gap-4"><span className="w-4 h-px bg-amber-400"></span> VIP Terminal Access</li>
               </ul>
            </div>
            <div className="lg:col-span-7 aspect-[16/10] rounded-[4rem] overflow-hidden shadow-2xl bg-slate-100">
               <img src="https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200" alt="Private Jet" className="w-full h-full object-cover" />
            </div>
         </div>
      </section>
      
      {/* 4. EXPERIENCE CTA */}
      <section className="py-64 bg-slate-950 text-white overflow-hidden relative">
         <div className="absolute inset-0 opacity-[0.05] flex items-center justify-center pointer-events-none">
            <h2 className="text-[45vw] font-serif italic whitespace-nowrap leading-none">Vision</h2>
         </div>
         <div className="max-w-4xl mx-auto px-6 text-center reveal relative z-10">
            <span className="text-[10px] font-bold text-sky-400 uppercase tracking-[1em] mb-12 block">Custom Itineraries</span>
            <h3 className="text-6xl md:text-9xl font-serif font-bold mb-16 italic leading-tight">Define Your Journey</h3>
            <p className="text-slate-400 text-sm md:text-lg font-medium leading-loose mb-24 opacity-80 uppercase tracking-[0.5em]">
               If it exists in the Maldivian Atolls, we curate it. <br className="hidden md:block"/> From sandbank soirées to deep-sea explorations.
            </p>
            <Link to="/plan" className="inline-block bg-white text-slate-950 font-bold px-16 py-7 rounded-full hover:bg-sky-400 hover:text-white transition-all duration-700 uppercase tracking-[0.5em] text-[10px] shadow-2xl">
               Consult An Expert
            </Link>
         </div>
      </section>
    </div>
  );
};

export default Experiences;
