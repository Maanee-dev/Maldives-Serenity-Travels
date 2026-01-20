
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RESORTS, BLOG_POSTS, EXPERIENCES } from '../constants';
import ResortCard from '../components/ResortCard';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [heroIndex, setHeroIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  
  const heroSlides = [
    {
      type: 'video',
      src: 'https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-luxury-island-resort-in-the-maldives-32551-large.mp4',
      title: 'Defined by',
      titleAlt: 'Perspective',
      subtitle: 'VOL. 01 — THE ARCHIPELAGO'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=90&w=1920',
      title: 'Crafting',
      titleAlt: 'Silence',
      subtitle: 'VOL. 02 — PRIVATE SANCTUARIES'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=90&w=1920',
      title: 'Beyond the',
      titleAlt: 'Horizon',
      subtitle: 'VOL. 03 — INFINITE LUXURY'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/stays?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const signatureAtolls = [
    { name: 'Noonu Atoll', image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=600', count: '12 Sanctuaries', desc: 'The Realm of Untouched Blue' },
    { name: 'Baa Atoll', image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=600', count: '18 Sanctuaries', desc: 'UNESCO Biosphere Reserve' },
    { name: 'North Male', image: 'https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=600', count: '24 Sanctuaries', desc: 'The Epicenter of Luxury' },
    { name: 'Ari Atoll', image: 'https://images.unsplash.com/photo-1502602898657-3e917247a183?auto=format&fit=crop&q=80&w=600', count: '15 Sanctuaries', desc: 'Whale Shark Corridors' }
  ];

  const featuredResorts = RESORTS.slice(0, 4);

  return (
    <div className="bg-[#FCFAF7] selection:bg-sky-100 selection:text-sky-900 overflow-x-hidden">
      
      {/* 1. CINEMATIC STAGGERED HERO */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          {heroSlides.map((slide, idx) => (
            <div 
              key={idx}
              className={`absolute inset-0 transition-all duration-[3000ms] ease-out ${heroIndex === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
            >
              {slide.type === 'video' ? (
                <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-60">
                  <source src={slide.src} type="video/mp4" />
                </video>
              ) : (
                <div className="w-full h-full bg-cover bg-center opacity-60" style={{ backgroundImage: `url(${slide.src})` }} />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
            </div>
          ))}
        </div>

        <div className="relative z-10 w-full max-w-[1600px] px-6 md:px-20">
          <div className="flex flex-col items-start text-left">
             <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[1em] text-sky-400 mb-8 block reveal active transition-all duration-1000">
               {heroSlides[heroIndex].subtitle}
             </span>
             <h1 className="flex flex-col mb-16 reveal active">
                <span className="text-5xl md:text-8xl lg:text-[7rem] font-serif font-bold text-white leading-none tracking-tighter transition-all duration-1000">
                  {heroSlides[heroIndex].title}
                </span>
                <span className="text-7xl md:text-9xl lg:text-[13rem] font-serif font-bold text-white italic leading-[0.8] tracking-tighter opacity-90 transition-all duration-1000 delay-150">
                  {heroSlides[heroIndex].titleAlt}<span className="not-italic text-sky-500">.</span>
                </span>
             </h1>
             
             <div className="flex flex-col md:flex-row items-start md:items-center gap-12 w-full reveal active transition-all duration-1000 delay-500">
                <form onSubmit={handleSearch} className="w-full max-w-xl">
                  <div className="relative group">
                    <input 
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="SEARCH DESTINATION OR RESORT..."
                      className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-12 py-7 text-white text-[10px] font-bold uppercase tracking-[0.4em] outline-none transition-all group-hover:bg-white/20 group-hover:border-white/40 focus:bg-white focus:text-slate-950 focus:border-white placeholder:text-white/40 shadow-2xl"
                    />
                    <button type="submit" className="absolute right-4 top-4 bg-sky-500 text-white w-14 h-14 rounded-full flex items-center justify-center hover:bg-slate-950 transition-all duration-700">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                  </div>
                </form>
                <div className="hidden lg:flex flex-col gap-2 border-l border-white/20 pl-12">
                   <p className="text-white/40 text-[9px] font-bold uppercase tracking-[0.4em]">Curated Since</p>
                   <p className="text-white text-xl font-serif italic">MMXII</p>
                </div>
             </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
           <div className="w-[1px] h-20 bg-white/20 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-sky-500 animate-[scrollLine_2s_infinite]"></div>
           </div>
        </div>
      </section>

      {/* 2. THE EDITORIAL MANIFESTO */}
      <section className="py-56 md:py-80 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FCFAF7] to-transparent pointer-events-none"></div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-48 items-start">
            <div className="lg:col-span-7 reveal">
               <div className="flex items-center gap-6 mb-16">
                  <div className="w-12 h-[1px] bg-sky-500"></div>
                  <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[1em]">The Agency</span>
               </div>
               <h2 className="text-5xl md:text-8xl lg:text-[7.5rem] font-serif font-bold text-slate-950 leading-[0.9] mb-16 tracking-tighter">
                 Luxury is <br className="hidden md:block"/> No Longer <br className="hidden md:block"/> <span className="italic text-sky-500 underline decoration-sky-100 underline-offset-[1.5rem]">Optional</span>.
               </h2>
               <p className="text-slate-500 text-lg md:text-2xl leading-[2] mb-16 font-medium opacity-90 max-w-2xl">
                 We are a bespoke boutique agency crafting unrivaled journeys across the Maldivian atolls. Defined by geography and refined by hand, we curate the silence that modern living lacks.
               </p>
               <div className="flex flex-wrap gap-16">
                  <div className="flex flex-col">
                     <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em] mb-4">Transfer Specialists</span>
                     <p className="text-slate-900 font-bold uppercase tracking-widest text-xs">VIP Seaplane Charters</p>
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em] mb-4">Island Scouting</span>
                     <p className="text-slate-900 font-bold uppercase tracking-widest text-xs">Private Atoll Access</p>
                  </div>
               </div>
            </div>
            <div className="lg:col-span-5 relative mt-12 lg:mt-0 reveal transition-all duration-1000 delay-300">
               <div className="aspect-[4/5] rounded-[5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] group relative">
                  <img src="https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-110" alt="Local Life" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 flex items-end p-16">
                     <p className="text-white text-[10px] font-bold uppercase tracking-[0.5em] leading-loose text-center">Authentic Maldivian Heritage — Preserved for the Aesthetic Mind.</p>
                  </div>
               </div>
               {/* Floating Quote */}
               <div className="absolute -bottom-16 -left-16 bg-[#FCFAF7] p-12 rounded-[3rem] shadow-2xl hidden lg:block max-w-[320px] border border-slate-100">
                  <p className="text-slate-900 font-serif italic text-2xl leading-relaxed">"The most profound experiences happen in the gaps between the tides."</p>
                  <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-8 block">Ahmed N. — Lead Curator</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SENSORY PALETTE DISCOVERY */}
      <section className="py-48 bg-[#FCFAF7] border-y border-slate-100">
         <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
            <div className="flex flex-col md:flex-row justify-between items-end mb-32 reveal">
               <div>
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[1em] mb-8 block">Regional Mastery</span>
                  <h3 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 tracking-tighter italic">Signature Atolls.</h3>
               </div>
               <Link to="/stays" className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.5em] border-b border-sky-500 pb-2 mb-4 hover:text-slate-950 hover:border-slate-950 transition-all">Explore Geography</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 reveal transition-all duration-1000">
               {signatureAtolls.map((atoll, i) => (
                 <Link key={i} to={`/stays?q=${atoll.name}`} className="group relative aspect-[3/4] overflow-hidden rounded-[3rem] md:rounded-[4rem] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-1000">
                   <img src={atoll.image} className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0" alt={atoll.name} />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent group-hover:via-transparent transition-all duration-1000"></div>
                   <div className="absolute bottom-10 left-10 right-10 flex flex-col items-start">
                      <span className="text-sky-400 text-[8px] font-bold uppercase tracking-[0.4em] mb-2">{atoll.count}</span>
                      <h4 className="text-white text-3xl font-serif font-bold group-hover:italic transition-all duration-500 mb-3">{atoll.name}</h4>
                      <p className="text-white/40 text-[9px] font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-1000 translate-y-4 group-hover:translate-y-0">{atoll.desc}</p>
                   </div>
                 </Link>
               ))}
            </div>
         </div>
      </section>

      {/* 4. THE COLLECTION (STAGGERED MASONRY) */}
      <section className="py-56 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="mb-32 reveal">
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[1em] mb-8 block">Exclusive Access</span>
            <h3 className="text-5xl md:text-8xl font-serif font-bold text-slate-900 tracking-tighter italic">The Collection.</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {featuredResorts.map((resort, idx) => (
              <div key={resort.id} className={`reveal transition-all duration-1000 ${idx % 2 !== 0 ? 'md:mt-32' : ''}`} style={{ transitionDelay: `${idx * 150}ms` }}>
                <ResortCard resort={resort} />
              </div>
            ))}
          </div>
          
          <div className="mt-40 flex justify-center reveal">
             <Link to="/stays" className="group relative flex items-center gap-10">
               <div className="w-20 h-20 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-950 group-hover:border-slate-950 transition-all duration-700">
                  <svg className="w-6 h-6 text-slate-950 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
               </div>
               <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-slate-950">View Full Portfolio</span>
             </Link>
          </div>
        </div>
      </section>

      {/* 5. THE JOURNAL (EDITORIAL) */}
      <section className="py-56 bg-[#FCFAF7] border-t border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center mb-40 reveal">
              <div className="lg:col-span-6">
                 <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[1em] mb-8 block">The Perspective</span>
                 <h3 className="text-5xl md:text-7xl font-serif font-bold text-slate-950 tracking-tighter italic leading-tight">Digital Journal.</h3>
              </div>
              <div className="lg:col-span-6">
                 <p className="text-slate-400 text-sm md:text-lg font-medium leading-loose uppercase tracking-widest max-w-lg">A curated exploration of heritage, luxury, and the art of travel across the archipelago.</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 reveal transition-all duration-1000 delay-300">
              {BLOG_POSTS.slice(0, 3).map((post, i) => (
                <Link key={post.id} to={`/stories/${post.slug}`} className="group block">
                   <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden mb-10 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                      <img src={post.image} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110" alt={post.title} />
                      <div className="absolute inset-0 bg-slate-950/5 group-hover:bg-transparent transition-colors duration-700"></div>
                   </div>
                   <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest block mb-4">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                   <h4 className="text-2xl font-serif font-bold text-slate-950 mb-6 group-hover:italic transition-all duration-500">{post.title}</h4>
                   <div className="w-8 h-px bg-slate-200 group-hover:w-full group-hover:bg-sky-500 transition-all duration-700"></div>
                </Link>
              ))}
           </div>
        </div>
      </section>

      {/* 6. IMMERSIVE FOOTER CTA */}
      <section className="relative py-80 bg-slate-950 text-white overflow-hidden text-center">
         <div className="absolute inset-0 opacity-20 pointer-events-none">
            <img src="https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=90&w=1920" className="w-full h-full object-cover" alt="Footer Background" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950" />
         </div>
         <div className="relative z-10 max-w-4xl mx-auto px-6 reveal">
            <span className="text-[10px] font-bold text-sky-400 uppercase tracking-[1em] mb-12 block">Bespoke Inquiries</span>
            <h2 className="text-6xl md:text-9xl font-serif font-bold mb-16 italic leading-none tracking-tighter">Define Your <br/> Journey.</h2>
            <p className="text-slate-400 text-sm md:text-lg font-medium leading-loose mb-20 opacity-80 uppercase tracking-[0.4em]">From unlisted sanctuaries to private atoll charters.</p>
            <Link to="/plan" className="inline-block bg-white text-slate-950 font-bold px-16 py-7 rounded-full hover:bg-sky-400 hover:text-white transition-all duration-700 uppercase tracking-[0.5em] text-[10px] shadow-2xl">
               Start Planning
            </Link>
         </div>
      </section>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};

export default Home;
