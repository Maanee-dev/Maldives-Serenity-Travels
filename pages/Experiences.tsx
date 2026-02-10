import React, { useEffect, useState, useMemo } from 'react';
import { supabase, mapExperience } from '../lib/supabase';
import { Experience } from '../types';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

/**
 * Experiences Page: Showcases curated luxury activities across the Maldives with resort filtering.
 */
const Experiences: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedResort, setSelectedResort] = useState<string>('All');

  useEffect(() => {
    const fetchExperiences = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('experiences')
          .select('*, resorts(name, slug)')
          .order('title', { ascending: true });
        
        if (data) {
          setExperiences(data.map(mapExperience));
        }
      } catch (err) {
        console.error('Experience fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(experiences.map(e => e.category));
    return ['All', ...Array.from(set)].sort();
  }, [experiences]);

  const resorts = useMemo(() => {
    const set = new Set(experiences.map(e => e.resortName).filter(Boolean));
    return ['All', ...Array.from(set)].sort();
  }, [experiences]);

  const filteredExperiences = useMemo(() => {
    return experiences.filter(exp => {
      const matchesCat = activeCategory === 'All' || exp.category === activeCategory;
      const matchesResort = selectedResort === 'All' || exp.resortName === selectedResort;
      return matchesCat && matchesResort;
    });
  }, [experiences, activeCategory, selectedResort]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [filteredExperiences]);

  return (
    <div className="bg-[#FCFAF7] min-h-screen selection:bg-sky-100">
      <SEO 
        title="Curated Maldives Experiences | Adventure, Wellness & Culture" 
        description="Explore curated Maldivian experiences. From whale shark safaris and deep-sea diving to private sandbank soirées and chartered seaplane arrivals."
      />

      {/* Hero Header */}
      <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover opacity-60" 
            alt="Adventure in Maldives"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        </div>
        <div className="relative z-10 text-center px-6 reveal active">
          <span className="text-[10px] font-black text-sky-400 mb-12 block tracking-[1em] uppercase">The Perspective</span>
          <h1 className="text-6xl md:text-9xl font-serif font-bold text-white tracking-tighter italic leading-none">Curated Living.</h1>
          <div className="h-px w-24 bg-amber-400 mx-auto mt-12 mb-12"></div>
        </div>
      </section>

      {/* Filter Architecture */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 md:-mt-24 mb-20 relative z-20">
        <div className="bg-white/95 backdrop-blur-xl border border-slate-100 rounded-[3rem] p-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            <div className="flex-1 w-full">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-4 ml-4">By Destination</span>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {resorts.map(r => (
                  <button 
                    key={r}
                    onClick={() => setSelectedResort(r)}
                    className={`px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${selectedResort === r ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400 hover:text-slate-900'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-px h-12 bg-slate-100 hidden lg:block"></div>

            <div className="flex-1 w-full">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-4 ml-4">By Modality</span>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-sky-500 text-white' : 'bg-slate-50 text-slate-400 hover:text-slate-900'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Gallery */}
      <section className="max-w-7xl mx-auto px-6 pb-48">
        {loading ? (
          <div className="py-64 text-center">
             <div className="w-10 h-10 border-2 border-slate-100 border-t-sky-500 rounded-full animate-spin mx-auto"></div>
          </div>
        ) : filteredExperiences.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {filteredExperiences.map((exp, idx) => (
              <div key={exp.id} className="group reveal flex flex-col h-full bg-white rounded-[3rem] p-8 border border-slate-50 hover:shadow-2xl transition-all duration-700">
                <div className="relative aspect-[16/11] rounded-[2.2rem] overflow-hidden mb-8 shadow-sm">
                  <img src={exp.image} className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-110" alt={exp.title} />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest text-slate-900">{exp.category}</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-serif font-bold text-slate-950 mb-4 group-hover:italic transition-all">{exp.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 opacity-80 font-medium line-clamp-3">
                  {exp.description}
                </p>

                <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">Available at</span>
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{exp.resortName || 'Regional Discovery'}</span>
                  </div>
                  <Link to="/plan" className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all">
                    &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-64 text-center">
            <h3 className="text-3xl font-serif font-bold italic mb-6">No curated moments match.</h3>
            <button onClick={() => { setActiveCategory('All'); setSelectedResort('All'); }} className="text-sky-500 font-black uppercase tracking-widest text-[9px] border-b border-sky-100 pb-2">Reset Coordinates</button>
          </div>
        )}
      </section>

      {/* Logistics Section */}
      <section className="py-48 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="reveal">
            <span className="text-sky-400 font-black uppercase tracking-[1em] text-[10px] mb-12 block">Private Transit</span>
            <h3 className="text-5xl md:text-7xl font-serif font-bold italic mb-12 leading-tight">Elevated Arrivals.</h3>
            <p className="text-slate-400 text-lg leading-[2.2] mb-16 opacity-80">
              From chartered seaplanes to luxury yacht transfers and private jet handling at Velana International. We manage the mechanics of your arrival so you can remain in the moment.
            </p>
            <Link to="/plan" className="inline-block border border-white/20 px-12 py-5 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all">Consult Logistics</Link>
          </div>
          <div className="reveal delay-300 aspect-[16/10] rounded-[4rem] overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200" alt="Private Jet" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Experiences;