import React, { useEffect } from 'react';
import { EXPERIENCES } from '../constants';
import { Link } from 'react-router-dom';

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
      {/* Editorial Header */}
      <section className="pt-64 pb-48 px-6 text-center reveal">
        <div className="max-w-4xl mx-auto">
          <span className="text-[10px] font-bold text-sky-500 mb-12 block tracking-[0.8em] uppercase">The Perspective</span>
          <h1 className="text-6xl md:text-9xl font-serif font-bold mb-16 text-slate-900 tracking-tighter italic leading-none">Curated Living</h1>
          <div className="h-px w-24 bg-amber-400 mx-auto mb-16"></div>
          <p className="text-slate-400 text-[11px] font-bold max-w-xl mx-auto uppercase tracking-[0.5em] leading-[2.5] opacity-80">
            Beyond the turquoise horizon lies a world <br className="hidden md:block"/> defined by movement, silence, and adventure.
          </p>
        </div>
      </section>

      {/* Alternating Story Blocks */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-24 pb-64">
        <div className="flex flex-col gap-48 md:gap-80">
          {EXPERIENCES.map((exp, idx) => (
            <div key={exp.id} className={`flex flex-col lg:flex-row gap-24 lg:gap-48 items-center reveal ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
               <div className="lg:w-1/2 relative aspect-[1/1] w-full rounded-[4rem] md:rounded-[6rem] overflow-hidden shadow-2xl group">
                  <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transition-transform duration-[8s] ease-out group-hover:scale-110" />
                  <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-colors duration-1000"></div>
                  {/* Decorative Label */}
                  <div className={`absolute top-16 ${idx % 2 !== 0 ? 'right-16' : 'left-16'} hidden md:block`}>
                    <span className="text-[10vw] font-serif italic text-white/20 pointer-events-none select-none">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
               </div>
               
               <div className="lg:w-1/2">
                  <div className="max-w-xl">
                    <span className="text-sky-500 font-bold uppercase tracking-[1em] text-[10px] mb-12 block">{exp.category}</span>
                    <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-12 leading-[1.1] italic tracking-tight">
                      {exp.title}
                    </h2>
                    <p className="text-slate-500 text-lg md:text-xl leading-[2.2] mb-16 font-medium opacity-80">
                      {exp.description} Discover Maldivian biodiversity through private expeditions, castaway retreats, and rhythmic local culture designed for your unique perspective.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-20">
                      <div className="flex items-center gap-6 group">
                         <div className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-[2] transition-transform duration-500"></div>
                         <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Private Itinerary</span>
                      </div>
                      <div className="flex items-center gap-6 group">
                         <div className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-[2] transition-transform duration-500"></div>
                         <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Certified Guides</span>
                      </div>
                    </div>

                    <Link to="/plan" className="inline-flex items-center gap-10 group">
                       <div className="w-20 h-20 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-950 group-hover:border-slate-950 transition-all duration-700">
                          <svg className="w-6 h-6 text-slate-950 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                       </div>
                       <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-slate-900 group-hover:text-sky-500 transition-colors">Request Private Tour</span>
                    </Link>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Experience CTA */}
      <section className="py-48 bg-slate-950 text-white overflow-hidden relative">
         <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
            <h2 className="text-[40vw] font-serif italic whitespace-nowrap">Bespoke</h2>
         </div>
         <div className="max-w-4xl mx-auto px-6 text-center reveal relative z-10">
            <span className="text-[10px] font-bold text-sky-400 uppercase tracking-[1em] mb-12 block">Custom Requests</span>
            <h3 className="text-5xl md:text-8xl font-serif font-bold mb-12 italic leading-tight">Define Your Journey</h3>
            <p className="text-slate-400 text-sm md:text-lg font-medium leading-loose mb-20 opacity-80 uppercase tracking-widest">
               From underwater proposals to private island hopping— <br className="hidden md:block"/> if it exists in the Maldives, we curate it.
            </p>
            <Link to="/plan" className="inline-block bg-white text-slate-950 font-bold px-16 py-6 rounded-full hover:bg-sky-400 hover:text-white transition-all duration-700 uppercase tracking-[0.5em] text-[10px] shadow-2xl">
               Consult An Expert
            </Link>
         </div>
      </section>
    </div>
  );
};

export default Experiences;