
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase, mapResort } from '../lib/supabase';
import { Accommodation, Experience } from '../types';
import { RESORTS, EXPERIENCES } from '../constants';
import ResortCard from '../components/ResortCard';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [heroIndex, setHeroIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredResorts, setFeaturedResorts] = useState<Accommodation[]>([]);
  const [homeExperiences, setHomeExperiences] = useState<Experience[]>([]);
  const [activeVibe, setActiveVibe] = useState<'Adventure' | 'Quiet' | 'Family' | 'Romance'>('Quiet');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: resortsData } = await supabase.from('resorts').select('*').limit(6);
        setFeaturedResorts(resortsData ? resortsData.map(mapResort) : RESORTS.slice(0, 6));

        const { data: expData } = await supabase.from('experiences').select('*, resorts(id, name, slug)').limit(4);
        if (expData && expData.length > 0) {
          setHomeExperiences(expData.map(item => ({
            ...item,
            resortName: item.resorts?.name,
            resortSlug: item.resorts?.slug,
            resortId: item.resorts?.id
          })) as Experience[]);
        } else {
          setHomeExperiences(EXPERIENCES.slice(0, 4));
        }
      } catch (err) {
        console.error("Home data fetch error:", err);
        setFeaturedResorts(RESORTS.slice(0, 6));
        setHomeExperiences(EXPERIENCES.slice(0, 4));
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
  }, [featuredResorts, homeExperiences]);

  const heroSlides = [
    { type: 'video', src: 'https://maldives-serenitytravels.com/images/Villa Resorts - Brand Video - Reel 2 - 1080 x 1920.mp4', title: 'Defined by', titleAlt: 'Perspective', subtitle: 'VOL. 01 — THE ARCHIPELAGO JOURNAL' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=90&w=1920', title: 'Silent', titleAlt: 'Sanctuaries', subtitle: 'VOL. 02 — PRIVATE ISLAND ARCHIVES' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=90&w=1920', title: 'Celestial', titleAlt: 'Living', subtitle: 'VOL. 03 — ATOLL GASTRONOMY' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const vibes = [
    { name: 'Quiet', desc: 'The luxury of complete silence.', icon: 'Q', image: 'https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=800' },
    { name: 'Adventure', desc: 'Movement across the blue.', icon: 'A', image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=800' },
    { name: 'Family', desc: 'Bespoke intergenerational play.', icon: 'F', image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800' },
    { name: 'Romance', desc: 'Intimacy on the horizon.', icon: 'R', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800' }
  ];

  return (
    <div className="bg-parchment dark:bg-slate-950 transition-colors duration-700 selection:bg-sky-100 selection:text-sky-900 overflow-x-hidden">
      <SEO title="Maldives Serenity Travels | The Editorial Journal" description="A boutique travel portal for the Maldives featuring luxury resorts and bespoke experiences, defined by perspective." />

      {/* Magazine Hero */}
      <section className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          {heroSlides.map((slide, idx) => (
            <div key={idx} className={`absolute inset-0 transition-all duration-[3000ms] ease-out ${heroIndex === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}>
              {slide.type === 'video' ? (
                <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-60"><source src={slide.src} type="video/mp4" /></video>
              ) : (
                <div className="w-full h-full bg-cover bg-center opacity-60" style={{ backgroundImage: `url(${slide.src})` }} />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
            </div>
          ))}
        </div>
        <div className="relative z-10 w-full max-w-[1600px] px-6 sm:px-12 md:px-20">
          <div className="flex flex-col items-start">
            <span className="text-[11px] font-black uppercase tracking-[1em] text-sky-400 mb-8 block reveal active">{heroSlides[heroIndex].subtitle}</span>
            <div className="mb-16 reveal active">
               <h1 className="flex flex-col">
                <span className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-serif font-bold text-white leading-none tracking-tighter">{heroSlides[heroIndex].title}</span>
                <span className="text-6xl sm:text-8xl md:text-9xl lg:text-[13rem] font-serif font-bold text-white italic leading-[0.8] tracking-tighter opacity-95">{heroSlides[heroIndex].titleAlt}<span className="not-italic text-sky-500">.</span></span>
               </h1>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery)}`); }} className="w-full max-w-xl reveal active delay-500">
              <div className="relative group">
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="DISCOVER ATOLLS..." className="w-full bg-white/5 backdrop-blur-3xl border border-white/20 rounded-full pl-10 pr-24 py-6 text-white text-[11px] font-bold uppercase tracking-[0.4em] outline-none focus:bg-white focus:text-slate-950 shadow-2xl transition-all placeholder:text-white/40" />
                <button type="submit" className="absolute right-2 top-2 bottom-2 bg-slate-950 text-white w-16 rounded-full flex items-center justify-center hover:bg-sky-500 transition-all"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* The Manifesto Section */}
      <section className="py-24 md:py-48 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 reveal">
              <div className="w-12 h-px bg-sky-500 mb-12"></div>
              <h2 className="text-4xl md:text-7xl font-serif font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tighter italic mb-12">Curating the <br/> Unseen.</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg md:text-2xl leading-[1.8] font-medium max-w-xl">
                Luxury is not found in the obvious. It is carved from the silence between atolls, the curve of a wooden dhoni, and the specific depth of Maldivian turquoise.
              </p>
              <div className="mt-16">
                <Link to="/about" className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-950 dark:text-white border-b-2 border-slate-900 dark:border-white pb-3 hover:text-sky-500 hover:border-sky-500 transition-all">Read Our Ethos</Link>
              </div>
            </div>
            <div className="lg:col-span-6 reveal delay-300">
               <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl rotate-2">
                 <img src="https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Editorial" />
                 <div className="absolute inset-0 bg-sky-950/10"></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vibe Strip - Horizontal snap Editorial style */}
      <section className="py-24 bg-parchment dark:bg-slate-950 transition-colors overflow-hidden border-y border-slate-100 dark:border-white/5">
        <div className="px-6 md:px-20 mb-16 reveal">
          <span className="text-[10px] font-black text-sky-500 uppercase tracking-[1em] mb-4 block">Archive Filter</span>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white italic tracking-tighter">Choose Your Perspective.</h3>
        </div>
        
        <div className="flex gap-6 overflow-x-auto no-scrollbar px-6 md:px-20 snap-x snap-mandatory">
          {vibes.map((vibe) => (
            <div 
              key={vibe.name} 
              className={`flex-shrink-0 w-[85vw] md:w-[450px] aspect-[4/5] relative rounded-[3rem] overflow-hidden snap-start transition-all duration-700 group cursor-pointer ${activeVibe === vibe.name ? 'ring-2 ring-sky-500' : ''}`}
              onClick={() => setActiveVibe(vibe.name as any)}
            >
              <img src={vibe.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" alt={vibe.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                 <span className="text-[35rem] font-serif italic text-white leading-none -mt-20">{vibe.icon}</span>
              </div>
              <div className="absolute bottom-12 left-12 right-12">
                 <h4 className="text-4xl font-serif font-bold text-white mb-2 italic">{vibe.name}</h4>
                 <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.4em]">{vibe.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEW Editorial Experience Section */}
      <section className="py-24 md:py-48 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 reveal">
            <div className="max-w-2xl">
              <span className="text-[10px] font-black text-amber-500 uppercase tracking-[1em] mb-4 block">Curated Living</span>
              <h3 className="text-5xl md:text-8xl font-serif font-bold text-slate-900 dark:text-white italic tracking-tighter leading-none">Journeys.</h3>
            </div>
            <Link to="/experiences" className="hidden md:block text-[9px] font-black uppercase tracking-[0.6em] text-slate-400 dark:text-slate-600 hover:text-slate-950 dark:hover:text-white transition-colors">Explore All Dispatch →</Link>
          </div>

          <div className="space-y-32 md:space-y-64">
             {homeExperiences.map((exp, idx) => (
               <div key={exp.id} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-32 items-center reveal`}>
                  <div className="w-full md:w-1/2">
                     <div className="relative group">
                        <div className="aspect-[4/3] md:aspect-[16/10] rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl bg-slate-100 dark:bg-slate-900">
                           <img src={exp.image} className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-105" alt={exp.title} />
                        </div>
                        <div className={`absolute -top-16 ${idx % 2 === 0 ? '-right-16' : '-left-16'} hidden lg:block`}>
                           <span className="text-[15rem] font-serif font-bold italic text-slate-100/80 dark:text-slate-900/50 select-none">0{idx + 1}</span>
                        </div>
                     </div>
                  </div>
                  <div className="w-full md:w-1/2 space-y-10 md:px-12">
                     <span className="text-[10px] font-black text-sky-500 uppercase tracking-[0.8em]">{exp.category}</span>
                     <h4 className="text-4xl md:text-6xl font-serif font-bold text-slate-950 dark:text-white italic leading-tight tracking-tight">{exp.title}</h4>
                     <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-relaxed font-medium opacity-80">{exp.description}</p>
                     <div className="pt-8 flex items-center gap-10">
                        <Link to="/plan" className="inline-block bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-12 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-sky-500 dark:hover:bg-sky-400 transition-all shadow-xl">Secure Voyage</Link>
                        {exp.resortSlug && (
                          <Link to={`/stays/${exp.resortSlug}`} className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors">Host: {exp.resortName}</Link>
                        )}
                     </div>
                  </div>
               </div>
             ))}
          </div>
          
          <div className="mt-24 md:hidden text-center">
            <Link to="/experiences" className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-950 dark:text-white border-b border-slate-900 dark:border-white pb-2">View Experience Archive</Link>
          </div>
        </div>
      </section>

      {/* The Portfolio - Unique Staggered Layout */}
      <section className="py-24 md:py-48 bg-parchment dark:bg-slate-950 transition-colors border-t border-slate-100 dark:border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-20">
          <div className="mb-24 reveal text-center lg:text-left flex flex-col lg:flex-row justify-between items-end gap-10">
            <div>
              <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[1.5em] mb-4 block">The Portfolio</span>
              <h3 className="text-5xl md:text-[8rem] font-serif font-bold text-slate-900 dark:text-white tracking-tighter leading-none italic">The Archive<span className="text-sky-500 not-italic">.</span></h3>
            </div>
            <Link to="/stays" className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors">See all Stays →</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-32 gap-x-12 lg:gap-x-20">
             {featuredResorts.map((resort, idx) => {
               // Editorial classes for a staggered feel
               const gridClasses = [
                 'lg:col-span-8 lg:col-start-1', // 1st: Wide
                 'lg:col-span-4 lg:col-start-9 md:mt-64', // 2nd: Narrow offset deep
                 'lg:col-span-5 lg:col-start-1 md:-mt-32', // 3rd: Narrow overlap
                 'lg:col-span-7 lg:col-start-6', // 4th: Mid
                 'lg:col-span-12 lg:px-24', // 5th: Wide centered
                 'lg:col-span-6' // 6th: Narrow
               ];
               
               return (
                 <div key={resort.id} className={`${gridClasses[idx % gridClasses.length]} reveal`}>
                    <ResortCard resort={resort} />
                 </div>
               );
             })}
          </div>

          <div className="mt-48 flex justify-center reveal">
             <Link to="/stays" className="group flex flex-col items-center gap-8">
                <div className="w-24 h-24 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:bg-slate-950 dark:group-hover:bg-white transition-all duration-1000 group-hover:scale-110">
                   <svg className="w-8 h-8 text-slate-950 dark:text-white group-hover:text-white dark:group-hover:text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
                <span className="text-[10px] font-black uppercase tracking-[1em] text-slate-900 dark:text-white">Expand Collection</span>
             </Link>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-48 bg-slate-950 relative overflow-hidden text-center transition-colors">
         <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
            <h2 className="text-[40vw] font-serif italic whitespace-nowrap">Perspective</h2>
         </div>
         <div className="relative z-10 max-w-4xl mx-auto px-6 reveal">
            <h3 className="text-6xl md:text-9xl font-serif font-bold text-white italic tracking-tighter leading-none mb-12">Begin Your Narrative.</h3>
            <p className="text-white/60 text-[11px] font-bold uppercase tracking-[0.5em] mb-20 leading-loose max-w-md mx-auto">
               Custom Maldivian portfolios, tailored <br className="hidden md:block"/> exclusively to your aesthetic vision.
            </p>
            <Link to="/plan" className="inline-block bg-white text-slate-950 px-16 py-7 rounded-full text-[10px] font-black uppercase tracking-[0.6em] hover:bg-sky-400 hover:text-white transition-all duration-700 shadow-2xl">Consult an Expert</Link>
         </div>
      </section>
    </div>
  );
};

export default Home;
