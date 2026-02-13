import React, { useEffect, useState, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { Experience } from '../types';
import { EXPERIENCES } from '../constants';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

/**
 * Experiences Page: Refactored for scalability with a filterable editorial grid and individual pagination.
 */
const Experiences: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState(6);

  const categories = ['All', 'Adventure', 'Wellness', 'Water Sports', 'Relaxation', 'Culture', 'Culinary'];

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
          setExperiences(EXPERIENCES);
        }
      } catch (err) {
        console.error('Experience fetch error:', err);
        setExperiences(EXPERIENCES);
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
  }, [loading, experiences, activeCategory, visibleCount]);

  const filteredExperiences = useMemo(() => {
    if (activeCategory === 'All') return experiences;
    return experiences.filter(exp => exp.category === activeCategory);
  }, [experiences, activeCategory]);

  const displayedExperiences = useMemo(() => {
    return filteredExperiences.slice(0, visibleCount);
  }, [filteredExperiences, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <div className="bg-parchment dark:bg-slate-950 min-h-screen selection:bg-sky-100 selection:text-sky-900 transition-colors duration-700">
      <SEO 
        title="Curated Maldives Experiences | Bespoke Adventures & Journeys" 
        description="Browse our collection of curated Maldivian experiences. From deep-sea diving and whale shark safaris to private island wellness retreats, discover the archipelago's unique perspective."
        keywords={['Maldives adventures', 'luxury excursions Maldives', 'whale shark safari', 'Maldives surfing', 'bespoke travel Maldives']}
        image="https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&q=80&w=1200"
      />

      {/* Cinematic Header */}
      <section className="relative h-[50vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover" 
            alt="Maldives Adventures"
          />
          <div className="absolute inset-0 bg-slate-950/40" />
        </div>
        <div className="relative z-10 text-center px-6 reveal active">
          <span className="text-[10px] font-bold text-sky-400 mb-8 block tracking-[1em] uppercase">The Perspective</span>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif font-bold text-white tracking-tighter italic leading-none">Curated Living</h1>
          <div className="h-px w-20 bg-amber-400 mx-auto mt-10 mb-10"></div>
          <p className="text-white text-[10px] font-bold max-w-xl mx-auto uppercase tracking-[0.5em] leading-loose opacity-80">
            A registry of movement, silence, and discovery.
          </p>
        </div>
      </section>

      {/* Category Navigation */}
      <nav className="sticky top-20 md:top-24 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-100 dark:border-white/5 overflow-x-auto no-scrollbar transition-all duration-700">
         <div className="max-w-7xl mx-auto px-6 py-6 md:py-8 flex justify-start md:justify-center items-center gap-8 md:gap-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setVisibleCount(6); }}
                className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] transition-all whitespace-nowrap pb-2 border-b-2 ${activeCategory === cat ? 'border-sky-500 text-slate-950 dark:text-white' : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
              >
                {cat}
              </button>
            ))}
         </div>
      </nav>

      <main className="max-w-[1440px] mx-auto px-6 lg:px-12 py-24 md:py-32">
        {loading ? (
          <div className="py-40 text-center flex flex-col items-center">
            <div className="w-8 h-8 border-2 border-slate-100 dark:border-white/5 border-t-sky-500 rounded-full animate-spin mb-8"></div>
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em]">Consulting the Archive...</p>
          </div>
        ) : displayedExperiences.length > 0 ? (
          <div className="space-y-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20">
              {displayedExperiences.map((exp, idx) => (
                <div key={exp.id} className="reveal group" style={{ transitionDelay: `${(idx % 3) * 100}ms` }}>
                  <div className="relative aspect-[1/1] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden mb-10 shadow-sm transition-all duration-1000 group-hover:shadow-2xl bg-slate-100 dark:bg-slate-900">
                    <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-colors"></div>
                    
                    {exp.resortName && (
                      <div className="absolute top-6 left-6">
                         <Link to={`/stays/${exp.resortSlug}`} className="bg-white/95 dark:bg-slate-900/95 backdrop-blur px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest text-slate-900 dark:text-white shadow-sm border border-white/20 dark:border-white/5 hover:bg-sky-500 dark:hover:bg-sky-400 hover:text-white transition-all">
                            {exp.resortName}
                         </Link>
                      </div>
                    )}
                  </div>
                  
                  <div className="px-4">
                     <span className="text-[8px] font-black text-sky-500 uppercase tracking-widest block mb-4">{exp.category}</span>
                     <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-950 dark:text-white mb-6 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors tracking-tight italic leading-tight">
                       {exp.title}
                     </h3>
                     <p className="text-slate-500 dark:text-slate-400 text-[12px] leading-[1.8] mb-10 opacity-80 line-clamp-3 transition-colors">
                       {exp.description}
                     </p>
                     <div className="h-px w-10 bg-slate-200 dark:bg-white/10 group-hover:w-full group-hover:bg-sky-500 transition-all duration-1000"></div>
                     <div className="mt-6 flex justify-between items-center">
                        <Link to="/plan" className="text-[9px] font-black text-slate-900 dark:text-white uppercase tracking-widest border-b border-transparent hover:border-slate-900 dark:hover:border-white pb-1 transition-all">
                          Book Experience
                        </Link>
                        {exp.resortSlug && (
                          <Link to={`/stays/${exp.resortSlug}`} className="text-[8px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest hover:text-slate-950 dark:hover:text-white transition-colors">
                            View Sanctuary
                          </Link>
                        )}
                     </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Pagination */}
            {visibleCount < filteredExperiences.length && (
              <div className="flex flex-col items-center pt-24 reveal">
                <div className="w-24 h-px bg-slate-100 dark:bg-slate-900 mb-8"></div>
                <button 
                  onClick={handleLoadMore}
                  className="bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black px-12 py-5 rounded-full text-[10px] uppercase tracking-[0.5em] hover:bg-sky-500 dark:hover:bg-sky-400 hover:text-white transition-all shadow-xl"
                >
                  Load More Experiences
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="py-40 text-center reveal active">
             <h3 className="text-3xl font-serif font-bold italic text-slate-900 dark:text-white mb-6 transition-colors">No archives found.</h3>
             <button onClick={() => { setActiveCategory('All'); setVisibleCount(6); }} className="text-sky-500 dark:text-sky-400 font-black uppercase tracking-[0.4em] text-[10px] border-b border-sky-100 dark:border-sky-900 pb-2">Reset Filter</button>
          </div>
        )}
      </main>

      {/* CTA Footer */}
      <section className="py-48 bg-slate-950 text-white relative overflow-hidden text-center">
         <div className="absolute inset-0 opacity-[0.05] flex items-center justify-center pointer-events-none">
            <h2 className="text-[40vw] font-serif italic whitespace-nowrap">Vision</h2>
         </div>
         <div className="max-w-4xl mx-auto px-6 relative z-10 reveal">
            <span className="text-[10px] font-bold text-sky-400 uppercase tracking-[1em] mb-12 block">Bespoke Curation</span>
            <h3 className="text-6xl md:text-9xl font-serif font-bold mb-16 italic tracking-tighter">Your Journey <br /> Starts Here.</h3>
            <Link to="/plan" className="inline-block bg-white text-slate-950 font-black px-16 py-7 rounded-full hover:bg-sky-400 hover:text-white transition-all duration-700 uppercase tracking-[0.5em] text-[10px] shadow-2xl">
               Consult An Expert
            </Link>
         </div>
      </section>
    </div>
  );
};

export default Experiences;