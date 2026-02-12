
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, mapResort } from '../lib/supabase';
import { Accommodation } from '../types';
import { RESORTS } from '../constants';
import ResortCard from '../components/ResortCard';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const [featuredResorts, setFeaturedResorts] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: resortsData } = await supabase
          .from('resorts')
          .select('*')
          .eq('is_featured', true)
          .limit(3);
        
        if (resortsData && resortsData.length > 0) {
          setFeaturedResorts(resortsData.map(mapResort));
        } else {
          setFeaturedResorts(RESORTS.slice(0, 3));
        }
      } catch (err) {
        console.error("Home data fetch error:", err);
        setFeaturedResorts(RESORTS.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [featuredResorts]);

  return (
    <div className="bg-parchment dark:bg-slate-950 transition-colors duration-700 selection:bg-sky-100 selection:text-sky-900 overflow-x-hidden">
      <SEO title="Maldives Serenity Travels | Where Nature Embraces Luxury" description="A boutique travel portal for the Maldives featuring luxury resorts and bespoke experiences, defined by perspective." />

      {/* Hero Section */}
      <section className="pt-48 pb-32 px-4">
        <div className="max-w-7xl mx-auto text-center reveal active">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400 dark:text-slate-500 mb-8 block">Discover a Serene Escape</span>
          <h1 className="text-5xl md:text-8xl lg:text-[7.5rem] font-serif font-bold text-slate-900 dark:text-white mb-12 leading-[1.05] tracking-tighter italic">
            Where Nature <br /> <span className="not-italic">Embraces Luxury</span>
          </h1>
          <div className="flex flex-col items-center mt-16">
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-900 dark:text-white mb-6">Select Your Stay</span>
            <div className="w-px h-20 bg-slate-900 dark:bg-white/20"></div>
          </div>
        </div>

        {/* Asymmetric Image Grid */}
        <div className="max-w-[1400px] mx-auto mt-32 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 px-6 lg:px-12">
          <div className="md:col-span-4 h-[500px] lg:h-[750px] reveal transition-all duration-1000 overflow-hidden rounded-[3rem] shadow-2xl bg-slate-100 dark:bg-slate-900">
            <img 
              src="https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-[3s]" 
              alt="Luxury Sanctuary" 
            />
          </div>
          <div className="md:col-span-5 h-[600px] lg:h-[850px] md:-mt-16 reveal transition-all duration-1000 delay-200 overflow-hidden rounded-[3rem] shadow-2xl bg-slate-100 dark:bg-slate-900">
            <img 
              src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-[3s]" 
              alt="Coastal Serenity" 
            />
          </div>
          <div className="md:col-span-3 h-[400px] lg:h-[650px] md:mt-24 reveal transition-all duration-1000 delay-500 overflow-hidden rounded-[3rem] shadow-2xl bg-slate-100 dark:bg-slate-900">
            <img 
              src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-[3s]" 
              alt="Private Island" 
            />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-48 px-6 max-w-5xl mx-auto text-center reveal">
        <p className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-[1.4] mb-4 transition-colors">Serenity is a tranquil hotel</p>
        <p className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-[1.4] mb-4 transition-colors">nestled amidst the Maldives' majestic</p>
        <p className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-[1.4] transition-colors italic">atolls, offering a harmonious blend of minimalist luxury and nature.</p>
      </section>

      {/* Featured Stays */}
      <section className="py-48 bg-white dark:bg-slate-900/30 border-t border-slate-100 dark:border-white/5 transition-colors">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12 reveal">
            <div className="max-w-2xl">
              <span className="text-[10px] font-black text-sky-500 uppercase tracking-[1em] mb-6 block">Collection 01</span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-slate-900 dark:text-white mb-8 leading-tight tracking-tighter italic">Comfort & Space.</h2>
              <p className="text-slate-400 dark:text-slate-500 text-sm md:text-lg font-medium tracking-wide leading-relaxed max-w-lg transition-colors italic">Relish the charm of our spacious residences and private sanctuary houses.</p>
            </div>
            <Link to="/stays" className="group flex items-center gap-6 pb-2 border-b border-slate-900 dark:border-white transition-all hover:border-sky-500">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors">View Portfolio</span>
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-[3/4] bg-slate-100 dark:bg-slate-800 rounded-[3rem] animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {featuredResorts.map(resort => (
                <ResortCard key={resort.id} resort={resort} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
