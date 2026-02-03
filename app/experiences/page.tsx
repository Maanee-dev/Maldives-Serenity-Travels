
import React from 'react';
import { Metadata } from 'next';
import { EXPERIENCES } from '@/constants';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Experiences & Adventures | Serenity Maldives",
  description: "Curated luxury activities, from whale shark safaris to private island dining.",
};

export default function ExperiencesPage() {
  return (
    <div className="bg-[#FCFAF7] min-h-screen">
      <section className="pt-64 pb-48 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-[10px] font-bold text-sky-500 mb-12 block tracking-[1em] uppercase">The Perspective</span>
          <h1 className="text-6xl md:text-9xl lg:text-[11rem] font-serif font-bold mb-16 text-slate-950 tracking-tighter italic leading-none">Curated Living</h1>
          <div className="h-px w-24 bg-amber-400 mx-auto mb-16"></div>
          <p className="text-slate-500 text-[11px] font-bold max-w-xl mx-auto uppercase tracking-[0.5em] leading-[2.8] opacity-80">
            Beyond the turquoise horizon lies a world <br className="hidden md:block"/> defined by movement, silence, and adventure.
          </p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-24 pb-64">
        <div className="flex flex-col gap-48 md:gap-80">
          {EXPERIENCES.map((exp, idx) => (
            <div key={exp.id} className={`flex flex-col lg:flex-row gap-24 lg:gap-48 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
               <div className="lg:w-1/2 relative aspect-[1/1] w-full rounded-[4rem] md:rounded-[6.5rem] overflow-hidden shadow-2xl group">
                  <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-slate-950/15 group-hover:bg-transparent transition-all duration-1000"></div>
                  <div className={`absolute bottom-16 ${idx % 2 !== 0 ? 'right-16' : 'left-16'} hidden md:block`}>
                    <span className="text-[15vw] font-serif italic text-white/20 pointer-events-none select-none">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
               </div>
               <div className="lg:w-1/2">
                  <div className="max-w-xl">
                    <span className="text-sky-500 font-bold uppercase tracking-[1em] text-[10px] mb-12 block">{exp.category}</span>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-slate-950 mb-12 leading-[0.95] italic tracking-tight">{exp.title}</h2>
                    <p className="text-slate-500 text-lg md:text-xl leading-[2.2] mb-16 font-medium opacity-85">{exp.description} Discover the Maldives through private expeditions, castaway retreats, and rhythmic local culture.</p>
                    <Link href="/plan" className="inline-flex items-center gap-10 group">
                       <div className="w-24 h-24 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-950 group-hover:border-slate-950 transition-all duration-700">
                          <svg className="w-8 h-8 text-slate-950 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                       </div>
                       <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-slate-950 group-hover:text-sky-500 transition-colors">Initiate Request</span>
                    </Link>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
