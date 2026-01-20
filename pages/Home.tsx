import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RESORTS, OFFERS, BLOG_POSTS, EXPERIENCES } from '../constants';
import ResortCard from '../components/ResortCard';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [heroIndex, setHeroIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  
  const heroSlides = [
    {
      type: 'video',
      src: 'https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-luxury-island-resort-in-the-maldives-32551-large.mp4',
      title: 'Perspective',
      subtitle: 'THE ARCHIPELAGO'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=90&w=1920',
      title: 'Serenity',
      subtitle: 'PRIVATE SANCTUARIES'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=90&w=1920',
      title: 'Horizon',
      subtitle: 'INFINITE LUXURY'
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

  return (
    <div className="bg-[#FCFAF7] selection:bg-sky-100 selection:text-sky-900 overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroSlides.map((slide, idx) => (
            <div 
              key={idx}
              className={`absolute inset-0 transition-all duration-[3000ms] ease-out ${heroIndex === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
            >
              {slide.type === 'video' ? (
                <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                  <source src={slide.src} type="video/mp4" />
                </video>
              ) : (
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${slide.src})` }} />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40" />
            </div>
          ))}
        </div>

        <div className="relative z-10 w-full max-w-7xl px-6 text-center">
          <div className="flex flex-col items-center">
             <span className="text-[10px] md:text-[12px] font-bold uppercase tracking-[1em] text-white/70 mb-10 block reveal active">
               {heroSlides[heroIndex].subtitle}
             </span>
             <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-serif font-bold text-white mb-20 leading-[0.8] tracking-tighter italic reveal active">
               {heroSlides[heroIndex].title}<span className="not-italic opacity-40">.</span>
             </h1>
             
             <form onSubmit={handleSearch} className="w-full max-w-xl reveal active transition-all duration-1000 delay-500">
               <div className="relative group">
                 <input 
                   type="text"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="SEARCH YOUR SANCTUARY..."
                   className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-12 py-6 text-white text-[10px] font-bold uppercase tracking-[0.4em] outline-none transition-all group-hover:bg-white/20 group-hover:border-white/40 focus:bg-white focus:text-slate-950 focus:border-white placeholder:text-white/40"
                 />
                 <button type="submit" className="absolute right-3 top-3 bg-white text-slate-950 w-12 h-12 rounded-full flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all duration-500 shadow-xl">
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                 </button>
               </div>
             </form>
          </div>
        </div>

        <div className="absolute bottom-12 flex flex-col items-center gap-4">
           <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-white animate-[scrollDown_2.5s_infinite]"></div>
           </div>
        </div>
      </section>

      {/* 2. THE MANIFESTO */}
      <section className="py-56 md:py-80 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-8 reveal">
               <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[1em] mb-12 block">The Philosophy</span>
               <h2 className="text-5xl md:text-8xl font-serif font-bold text-slate-950 leading-[0.9] mb-16 tracking-tighter">
                 Silence Is The <br/> <span className="italic text-sky-500">Ultimate</span> Luxury.
               </h2>
               <div className="h-px w-24 bg-amber-400 mb-16"></div>
               <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.5em] leading-[2.5] max-w-xl opacity-80">
                 Defined by geography and refined by hand, <br/> we curate destinations where the soul finds rhythm <br/> in the movement of the tides.
               </p>
            </div>
            <div className="lg:col-span-4 reveal transition-all duration-1000 delay-300">
               <div className="relative aspect-[3/4] overflow-hidden rounded-[4rem] shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover hover:scale-110 transition-transform duration-[4s]" alt="Local Life" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SENSORY PALETTE (NEW) */}
      <section className="py-40 bg-[#FCFAF7]">
         <div className="max-w-[1440px] mx-auto px-6 lg:px-24">
            <div className="flex justify-between items-end mb-24 reveal">
               <div>
                  <h3 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 tracking-tight italic">The Palette.</h3>
               </div>
               <span className="hidden md:block text-[9px] font-bold text-slate-300 uppercase tracking-[0.6em]">Textures of the Atolls</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 reveal transition-all duration-1000">
               {[
                 "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=400",
                 "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=400",
                 "https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=400",
                 "https://images.unsplash.com/photo-1502602898657-3e917247a183?auto=format&fit=crop&q=80&w=400",
                 "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&q=80&w=400"
               ].map((src, i) => (
                 <div key={i} className="aspect-square overflow-hidden rounded-3xl grayscale hover:grayscale-0 transition-all duration-700 cursor-crosshair">
                   <img src={src} className="w-full h-full object-cover" alt="Texture" />
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 4. THE PORTFOLIO (MASONRY-STYLE GRID) */}
      <section className="py-64 bg-white border-t border-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12 reveal">
            <div className="max-w-2xl">
               <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.8em] mb-8 block">Accommodations</span>
              <h2 className="text-5xl md:text-8xl font-serif font-bold text-slate-900 mb-10 tracking-tighter leading-none italic">The Portfolio.</h2>
              <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.5em] leading-loose opacity-70">A handpicked selection of sanctuaries defined <br/> by architecture, service, and silence.</p>
            </div>
            <Link to="/stays" className="group flex items-center gap-8 pb-3 border-b border-slate-950 transition-all hover:border-sky-500">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-950 group-hover:text-sky-500 transition-colors">Enter Collection</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20">
            {RESORTS.slice(0, 3).map((resort, idx) => (
              <div key={resort.id} className={`reveal transition-all duration-1000 ${idx === 1 ? 'md:mt-32' : ''}`} style={{ transitionDelay: `${idx * 150}ms` }}>
                <ResortCard resort={resort} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED EXPERIENCE STORYTELLING */}
      <section className="py-64 bg-[#FCFAF7] overflow-hidden relative">
         <div className="absolute left-0 top-0 opacity-[0.03] select-none pointer-events-none -translate-x-1/2 translate-y-1/2">
            <h2 className="text-[30vw] font-serif font-bold italic whitespace-nowrap">Curated.</h2>
         </div>
         <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
               <div className="lg:col-span-6 reveal">
                  <div className="relative rounded-[5rem] overflow-hidden shadow-2xl aspect-[4/5] group">
                     <img src={EXPERIENCES[0].image} className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-110" alt="Experience" />
                     <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors duration-1000"></div>
                  </div>
               </div>
               <div className="lg:col-span-6 reveal transition-all duration-1000 delay-300">
                  <span className="text-sky-500 font-bold text-[10px] uppercase tracking-[1em] mb-12 block">The Journey</span>
                  <h3 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-12 italic leading-tight tracking-tight">Beyond the <br/> Horizon line.</h3>
                  <p className="text-slate-500 text-lg md:text-xl leading-[2.2] mb-16 font-medium opacity-80">
                    Dive into the South Ari Atoll to witness the grace of whale sharks, or retreat to a private sandbank as the sun descends. Every experience is choreographed for your unique perspective.
                  </p>
                  <Link to="/experiences" className="inline-block bg-slate-950 text-white font-bold px-16 py-6 rounded-full hover:bg-sky-500 transition-all duration-700 uppercase tracking-[0.5em] text-[10px] shadow-2xl">
                    View Experiences
                  </Link>
               </div>
            </div>
         </div>
      </section>

      {/* 6. JOURNAL HIGHLIGHTS */}
      <section className="py-64 bg-white border-t border-slate-50">
         <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center reveal">
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[1em] mb-16 block">The Dispatch</span>
            <h2 className="text-6xl md:text-9xl font-serif font-bold text-slate-900 mb-32 tracking-tighter italic">Perspective.</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24 text-left">
               {BLOG_POSTS.slice(0, 2).map((post, idx) => (
                 <Link key={post.id} to={`/stories/${post.slug}`} className="group flex flex-col reveal" style={{ transitionDelay: `${idx * 200}ms` }}>
                   <div className="aspect-[16/10] overflow-hidden rounded-[3rem] mb-12 shadow-sm group-hover:shadow-2xl transition-all duration-1000">
                      <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[4s]" alt={post.title} />
                   </div>
                   <span className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.4em] mb-6">{post.date} — BY {post.author}</span>
                   <h4 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-8 group-hover:italic transition-all duration-500 leading-tight">{post.title}</h4>
                   <p className="text-slate-500 text-sm md:text-base leading-loose opacity-70 mb-10">{post.excerpt}</p>
                   <div className="mt-auto flex items-center gap-6">
                      <div className="h-px w-12 bg-slate-950 group-hover:w-full transition-all duration-1000"></div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] whitespace-nowrap">Read Entry</span>
                   </div>
                 </Link>
               ))}
            </div>
         </div>
      </section>

      {/* 7. PRIVATE CONCIERGE CTA */}
      <section className="py-80 bg-slate-950 text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=90&w=1920')] bg-fixed bg-cover bg-center opacity-20 grayscale"></div>
         <div className="relative z-10 max-w-4xl mx-auto px-6 text-center reveal">
            <span className="text-[10px] font-bold text-sky-400 uppercase tracking-[1em] mb-16 block">Bespoke Inquiry</span>
            <h2 className="text-5xl md:text-9xl font-serif font-bold mb-16 italic tracking-tighter leading-none">Your journey <br/> begins here.</h2>
            <div className="h-px w-24 bg-sky-400 mx-auto mb-20"></div>
            <p className="text-slate-400 text-sm md:text-lg font-medium leading-loose mb-24 opacity-80 uppercase tracking-widest">
               Negotiated rates, private island access, <br className="hidden md:block"/> and unlisted sanctuary entries.
            </p>
            <Link to="/plan" className="inline-block bg-white text-slate-950 font-bold px-20 py-8 rounded-full hover:bg-sky-400 hover:text-white transition-all duration-1000 uppercase tracking-[0.5em] text-[11px] shadow-2xl">
               Start Planning
            </Link>
         </div>
      </section>

      <style>{`
        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};

export default Home;