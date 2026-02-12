
import React, { useEffect, useState, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { Experience } from '../types';
import { EXPERIENCES } from '../constants';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

/**
 * Experiences Page: High-editorial Discovery Hub.
 * Optimized for browsing "Things to Do" across the archipelago.
 */
const Experiences: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All', 
    'Marine', 
    'Wellness', 
    'Adventure', 
    'Culinary', 
    'Relaxation', 
    'Culture'
  ];

  useEffect(() => {
    const fetchExperiences = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('experiences')
          .select('*, resorts(id, name, slug)')
          .order('created_at', { ascending: true });
        
        if (data && data.length > 0) {
          const mapped = data.map(item => ({
            ...item,
            resortName: item.resorts?.name,
            resortSlug: item.resorts?.slug,
            resortId: item.resorts?.id
          })) as Experience[];
          setExperiences(mapped);
        } else {
          // Map local constants to categories for demo purposes if DB is empty
          const fallback = EXPERIENCES.map(ex => ({
            ...ex,
            category: ex.category === 'Water Sports' ? 'Marine' : ex.category
          })) as Experience[];
          setExperiences(fallback);
        }
      } catch (err) {
        console.error('Experience fetch error:', err);
        setExperiences(EXPERIENCES as Experience[]);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [loading, activeCategory]);

  const filteredExperiences = useMemo(() => {
    if (activeCategory === 'All') return experiences;
    return experiences.filter(exp => exp.category === activeCategory);
  }, [experiences, activeCategory]);

  return (
    <div className="bg-[#FCFAF7] min-h-screen selection:bg-sky-100 selection:text-sky-900">
      <SEO 
        title="Things to Do in Maldives | Curated Luxury Experiences" 
        description="Discover the ultimate collection of Maldivian journeys. From whale shark safaris and underwater dining to private island wellness retreats and bespoke adventures."
        keywords={['things to do Maldives', 'Maldives excursions', 'whale shark safari', 'Maldives surfing', 'luxury adventures Maldives']}
        image="https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200"
      />

      {/* 1. Cinematic Hero Header */}
      <section className="relative h-[60vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover" 
            alt="Maldives Adventure Hero"
          />
          <div className="absolute inset-0 bg-slate-950/40" />
        </div>
        <div className="relative z-10 text-center px-6 reveal active">
          <span className="text-[10px] font-bold text-sky-400 mb-8 block tracking-[1em] uppercase">The Collection</span>
          <h1 className="text-6xl md:text-9xl lg:text-[10rem] font-serif font-bold text-white tracking-tighter italic leading-none">Things to Do<span className="text-sky-500 not-italic">.</span></h1>
          <div className="h-px w-24 bg-amber-400 mx-auto mt-12 mb-12"></div>
          <p className="text-white text-[11px] font-bold max-w-xl mx-auto uppercase tracking-[0.5em] leading-[2.5] opacity-80">
            A curated directory of movement, silence, <br /> and discovery across the atolls.
          </p>
        </div>
      </section>

      {/* 2. Vogue-Style Filter Bar */}
      <nav className="sticky top-20 md:top-24 z-50 bg-white/95 backdrop-blur-2xl border-b border-slate-100 shadow-sm overflow-x-auto no-scrollbar">
         <div className="max-w-7xl mx-auto px-6 py-6 md:py-10 flex justify-start md:justify-center items-center gap-10 md:gap-20">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] transition-all whitespace-nowrap pb-2 border-b-2 ${activeCategory === cat ? 'border-sky-500 text-slate-950' : 'border-transparent text-slate-300 hover:text-slate-500'}`}
              >
                {cat}
              </button>
            ))}
         </div>
      </nav>

      <main className="max-w-[1440px] mx-auto px-6 lg:px-12 py-24 md:py-32">
        {loading ? (
          <div className="py-40 text-center flex flex-col items-center">
            <div className="w-8 h-8 border-2 border-slate-100 border-t-sky-500 rounded-full animate-spin mb-8"></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Archiving the Atolls...</p>
          </div>
        ) : filteredExperiences.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 md:gap-y-32">
            {filteredExperiences.map((exp, idx) => (
              <div key={exp.id} className="reveal group" style={{ transitionDelay: `${(idx % 3) * 150}ms` }}>
                
                {/* Image Container with Editorial Zoom */}
                <div className="relative aspect-[1/1] rounded-[3rem] md:rounded-[4.5rem] overflow-hidden mb-10 shadow-lg group-hover:shadow-2xl transition-all duration-1000 bg-slate-100">
                  <img 
                    src={exp.image} 
                    alt={exp.title} 
                    className="w-full h-full object-cover transition-transform duration-[8s] ease-out group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-colors duration-1000"></div>
                  
                  {/* Category Tag */}
                  <div className="absolute top-8 left-8">
                    <span className="bg-white/95 backdrop-blur-md px-5 py-2 rounded-full text-[8px] font-black uppercase tracking-widest text-slate-900 shadow-sm border border-white/20">
                      {exp.category}
                    </span>
                  </div>

                  {/* Host Sanctuary Badge */}
                  {exp.resortName && (
                    <div className="absolute bottom-8 left-8 right-8">
                       <Link 
                        to={`/stays/${exp.resortSlug}`} 
                        className="bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-4 rounded-full flex justify-between items-center w-full group/host hover:bg-white/20 transition-all duration-500"
                       >
                          <div className="flex flex-col">
                             <span className="text-[7px] text-white/60 font-black uppercase tracking-widest">Venue</span>
                             <span className="text-[10px] text-white font-bold uppercase tracking-[0.2em]">{exp.resortName}</span>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover/host:bg-white group-hover/host:text-slate-950 transition-all">
                             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                          </div>
                       </Link>
                    </div>
                  )}
                </div>
                
                {/* Content Architecture */}
                <div className="px-4">
                   <div className="flex items-center gap-6 mb-6">
                      <div className="w-10 h-[1px] bg-sky-500"></div>
                      <span className="text-[9px] font-black text-sky-500 uppercase tracking-[0.4em]">{exp.category} Journey</span>
                   </div>
                   
                   <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-950 mb-8 leading-[1.1] italic tracking-tight group-hover:text-sky-600 transition-colors">
                     {exp.title}
                   </h3>
                   
                   <p className="text-slate-500 text-[13px] md:text-[14px] leading-[1.8] mb-12 opacity-85 line-clamp-3 font-medium">
                     {exp.description} Discover the Maldives through the lens of specific movement and profound silence.
                   </p>
                   
                   <div className="h-px w-12 bg-slate-200 group-hover:w-full group-hover:bg-sky-500 transition-all duration-1000"></div>
                   
                   <div className="mt-8 flex justify-between items-center">
                      <Link to="/plan" className="text-[10px] font-black text-slate-950 uppercase tracking-[0.5em] border-b border-transparent hover:border-slate-950 pb-1 transition-all">
                         Inquire Now
                      </Link>
                      <Link to={`/stays/${exp.resortSlug}`} className="text-[9px] font-bold text-slate-300 hover:text-sky-500 uppercase tracking-widest transition-colors">
                         View Details →
                      </Link>
                   </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-48 text-center reveal active">
             <h3 className="text-3xl md:text-5xl font-serif font-bold italic text-slate-900 mb-8 tracking-tighter">Archives are quiet.</h3>
             <p className="text-slate-400 text-[10px] uppercase font-bold tracking-[0.4em] mb-12">No journeys match this specific perspective.</p>
             <button 
              onClick={() => setActiveCategory('All')} 
              className="bg-slate-950 text-white font-bold px-12 py-6 rounded-full text-[10px] uppercase tracking-[0.5em] hover:bg-sky-500 transition-all shadow-xl"
             >
               Reset Discovery
             </button>
          </div>
        )}
      </main>

      {/* 3. The Bespoke Logic Section */}
      <section className="py-32 md:py-64 bg-white border-y border-slate-50">
         <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-5 reveal">
               <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[1.2em] mb-12 block">Digital Concierge</span>
               <h3 className="text-5xl md:text-7xl font-serif font-bold text-slate-950 italic mb-12 leading-tight">Expertly <br /> Handled.</h3>
               <p className="text-slate-500 text-lg leading-[2.2] mb-16 opacity-90 italic">
                  Beyond the booking, we manage the physics of your arrival. From seaplane synchronization to private yacht charters, your journey is handled with absolute precision.
               </p>
               <ul className="space-y-6 text-[10px] font-black uppercase tracking-[0.4em] text-slate-950">
                  <li className="flex items-center gap-4 group">
                    <span className="w-6 h-[1px] bg-amber-400 transition-all group-hover:w-12"></span> Seaplane Charter
                  </li>
                  <li className="flex items-center gap-4 group">
                    <span className="w-6 h-[1px] bg-amber-400 transition-all group-hover:w-12"></span> Luxury Yacht Concierge
                  </li>
                  <li className="flex items-center gap-4 group">
                    <span className="w-6 h-[1px] bg-amber-400 transition-all group-hover:w-12"></span> Private VIP Terminal
                  </li>
               </ul>
            </div>
            <div className="lg:col-span-7 aspect-[16/10] rounded-[4rem] overflow-hidden shadow-2xl bg-slate-100 reveal delay-300">
               <img 
                src="https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200" 
                alt="Seaplane Experience" 
                className="w-full h-full object-cover transition-transform duration-[10s] hover:scale-105" 
               />
            </div>
         </div>
      </section>

      {/* 4. Grand Finale CTA */}
      <section className="py-48 bg-slate-950 text-white relative overflow-hidden text-center">
         <div className="absolute inset-0 opacity-[0.05] flex items-center justify-center pointer-events-none">
            <h2 className="text-[35vw] font-serif italic whitespace-nowrap">Experience</h2>
         </div>
         <div className="max-w-4xl mx-auto px-6 relative z-10 reveal">
            <span className="text-[10px] font-bold text-sky-400 uppercase tracking-[1em] mb-12 block">Define Your Vision</span>
            <h3 className="text-6xl md:text-9xl font-serif font-bold mb-20 italic tracking-tighter">Start Your <br /> Narrative.</h3>
            <Link to="/plan" className="inline-block bg-white text-slate-950 font-black px-16 py-8 rounded-full hover:bg-sky-400 hover:text-white transition-all duration-700 uppercase tracking-[0.5em] text-[10px] shadow-2xl">
               Consult An Expert
            </Link>
         </div>
      </section>
    </div>
  );
};

export default Experiences;
