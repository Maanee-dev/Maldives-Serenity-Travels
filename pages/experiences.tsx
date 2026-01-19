import React from 'react';
import { EXPERIENCES } from '../constants';
import Link from 'next/link';

export default function Experiences() {
  return (
    <div className="bg-white min-h-screen pt-32">
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-40">
        {EXPERIENCES.map((exp, idx) => (
          <div key={exp.id} className={`flex flex-col md:flex-row gap-20 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
             <div className="md:w-1/2 h-[500px] w-full rounded-[3rem] overflow-hidden shadow-2xl">
               <img src={exp.image} className="w-full h-full object-cover" alt={exp.title} />
             </div>
             <div className="md:w-1/2">
                <span className="text-sky-500 font-bold uppercase tracking-[0.4em] text-xs mb-4 block">{exp.category}</span>
                <h2 className="text-5xl font-serif font-bold italic mb-6 leading-tight">{exp.title}</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-10">{exp.description}</p>
                <Link href="/plan" className="bg-slate-900 text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs">Inquire Now</Link>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}