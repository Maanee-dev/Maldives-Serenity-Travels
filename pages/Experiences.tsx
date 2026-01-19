
import React from 'react';
import { EXPERIENCES } from '../constants';
import { Link } from 'react-router-dom';

const Experiences: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold text-slate-900 mb-4">Maldives Experiences</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto italic underline underline-offset-8 decoration-sky-200">Beyond the turquoise horizon lies a world of adventure.</p>
        </div>

        <div className="space-y-32">
          {EXPERIENCES.map((exp, idx) => (
            <div key={exp.id} className={`flex flex-col md:flex-row gap-12 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
               <div className="md:w-1/2 relative h-[500px] w-full rounded-[3rem] overflow-hidden shadow-2xl group">
                  <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10"></div>
               </div>
               <div className="md:w-1/2">
                  <span className="text-sky-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">{exp.category}</span>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight italic">
                    {exp.title}
                  </h2>
                  <p className="text-slate-600 text-lg leading-relaxed mb-8">
                    {exp.description} Explore the vibrant marine life, the untouched sandbanks, and the rhythmic local culture that makes the Maldives a unique destination for every traveler.
                  </p>
                  <div className="space-y-4 mb-10">
                    <div className="flex items-center gap-3 text-slate-800 font-bold">
                       <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                       Private & Group Tours Available
                    </div>
                    <div className="flex items-center gap-3 text-slate-800 font-bold">
                       <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                       Certified Local Guides
                    </div>
                  </div>
                  <Link to="/plan" className="bg-slate-900 text-white font-bold px-12 py-5 rounded-full hover:bg-slate-800 transition-all shadow-xl inline-block uppercase tracking-widest text-sm">
                    Inquire About This Experience
                  </Link>
               </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Experience CTA */}
      <section className="mt-32 py-20 bg-sky-50 border-t border-sky-100">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <h3 className="text-3xl font-serif font-bold text-sky-900 mb-6">Don't see what you're looking for?</h3>
            <p className="text-sky-700 text-lg mb-10">From underwater marriage proposals to private jet island hopping—if it's in the Maldives, we can arrange it.</p>
            <Link to="/plan" className="border-2 border-sky-600 text-sky-600 font-bold px-12 py-4 rounded-full hover:bg-sky-600 hover:text-white transition-all uppercase tracking-widest">
               CUSTOM REQUEST
            </Link>
         </div>
      </section>
    </div>
  );
};

export default Experiences;
