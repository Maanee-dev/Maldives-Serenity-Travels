import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RESORTS, BLOG_POSTS } from '../constants';
import ResortCard from '../components/ResortCard';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [heroIndex, setHeroIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [typedPlaceholder, setTypedPlaceholder] = useState("");
  
  const typingIdx = useRef(0);
  const charIdx = useRef(0);
  const isDeleting = useRef(false);

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

  const searchKeywords = [
    "Soneva Jani...",
    "Private Atolls...",
    "Underwater Dining...",
    "North Male...",
    "Bespoke Escapes...",
    "Velaa Private Island..."
  ];

  // Typing Effect Logic
  useEffect(() => {
    let timer: number;
    const handleTyping = () => {
      const currentWord = searchKeywords[typingIdx.current];
      
      if (isDeleting.current) {
        setTypedPlaceholder(currentWord.substring(0, charIdx.current - 1));
        charIdx.current--;
      } else {
        setTypedPlaceholder(currentWord.substring(0, charIdx.current + 1));
        charIdx.current++;
      }

      let typingSpeed = isDeleting.current ? 40 : 120;

      if (!isDeleting.current && charIdx.current === currentWord.length) {
        isDeleting.current = true;
        typingSpeed = 2000; // Pause at end of word
      } else if (isDeleting.current && charIdx.current === 0) {
        isDeleting.current = false;
        typingIdx.current = (typingIdx.current + 1) % searchKeywords.length;
        typingSpeed = 500;
      }

      timer = window.setTimeout(handleTyping, typingSpeed);
    };

    timer = window.setTimeout(handleTyping, 1000);
    return () => clearTimeout(timer);
  }, []);

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
    { name: 'Noonu Atoll', image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=600', count: '12 Stays', desc: 'Untouched Blue' },
    { name: 'Baa Atoll', image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=600', count: '18 Stays', desc: 'UNESCO Biosphere' },
    { name: 'North Male', image: 'https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=600', count: '24 Stays', desc: 'The Epicenter' },
    { name: 'Ari Atoll', image: 'https://images.unsplash.com/photo-1502602898657-3e917247a183?auto=format&fit=crop&q=80&w=600', count: '15 Stays', desc: 'Whale Shark Paths' }
  ];

  const featuredResorts = RESORTS.slice(0, 6);

  return (
    <div className="bg-[#FCFAF7] selection:bg-sky-100 selection:text-sky-900 overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden bg-slate-950">
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

        <div className="relative z-10 w-full max-w-[1600px] px-6 sm:px-12 md:px-20">
          <div className="flex flex-col items-start text-left">
             <span className="text-[8px] md:text-[11px] font-bold uppercase tracking-[1em] text-sky-400 mb-6 md:mb-8 block reveal active transition-all duration-1000">
               {heroSlides[heroIndex].subtitle}
             </span>
             <h1 className="flex flex-col mb-12 md:mb-16 reveal active">
                <span className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-serif font-bold text-white leading-none tracking-tighter transition-all duration-1000">
                  {heroSlides[heroIndex].title}
                </span>
                <span className="text-6xl sm:text-8xl md:text-9xl lg:text-[13rem] font-serif font-bold text-white italic leading-[0.8] tracking-tighter opacity-90 transition-all duration-1000 delay-150">
                  {heroSlides[heroIndex].titleAlt}<span className="not-italic text-sky-500">.</span>
                </span>
             </h1>
             
             <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 w-full reveal active transition-all duration-1000 delay-500">
                <form onSubmit={handleSearch} className="w-full max-w-xl">
                  <div className="relative group">
                    <input 
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={typedPlaceholder}
                      className="w-full bg-white/5 backdrop-blur-3xl border border-white/20 rounded-full pl-8 md:pl-10 pr-20 md:pr-24 py-5 md:py-6 text-white text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] outline-none transition-all group-hover:bg-white/10 group-hover:border-white/40 focus:bg-white focus:text-slate-950 focus:border-white placeholder:text-white/30 shadow-2xl"
                    />
                    <button type="submit" className="absolute right-2 top-2 bottom-2 bg-slate-900 text-white w-14 md:w-16 rounded-full flex items-center justify-center hover:bg-sky-500 hover:scale-95 transition-all duration-700 shadow-xl border border-white/10 group-focus-within:bg-slate-900 group-focus-within:hover:bg-sky-500">
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                  </div>
                </form>
                <div className="hidden lg:flex flex-col gap-2 border-l border-white/20 pl-12">
                   <p className="text-white/40 text-[9px] font-bold uppercase tracking-[0.4em]">Est.</p>
                   <p className="text-white text-xl font-serif italic">MMXII</p>
                </div>
             </div>
          </div>
        </div>

        <div className="absolute bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
           <div className="w-[1px] h-12 md:h-20 bg-white/20 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-sky-500 animate-[scrollLine_2s_infinite]"></div>
           </div>
        </div>
      </section>

      {/* 2. THE EDITORIAL MANIFESTO */}
      <section className="py-24 sm:py-32 md:py-48 lg:py-64 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <div className="lg:col-span-7 reveal">
               <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
                  <div className="w-8 md:w-12 h-[1px] bg-sky-500"></div>
                  <span className="text-[9px] md:text-[10px] font-bold text-sky-500 uppercase tracking-[1em]">The Agency</span>
               </div>
               <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-[7.5rem] font-serif font-bold text-slate-950 leading-[0.95] mb-8 md:mb-16 tracking-tighter">
                 Luxury is <br className="hidden md:block"/> No Longer <br className="hidden md:block"/> <span className="italic text-sky-500 underline decoration-sky-100 underline-offset-[0.6rem] md:underline-offset-[1.5rem]">Optional</span>.
               </h2>
               <p className="text-slate-500 text-base sm:text-lg md:text-2xl leading-[1.7] md:leading-[2] mb-10 md:mb-16 font-medium opacity-90 max-w-2xl">
                 We are a bespoke boutique agency crafting unrivaled journeys across the Maldivian atolls. Defined by geography and refined by hand, we curate the silence that modern living lacks.
               </p>
               <div className="flex flex-row gap-10 md:gap-16">
                  <div className="flex flex-col">
                     <span className="text-[8px] md:text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em] mb-2 md:mb-4">Transfers</span>
                     <p className="text-slate-900 font-bold uppercase tracking-widest text-[9px] md:text-xs">VIP Seaplane</p>
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[8px] md:text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em] mb-2 md:mb-4">Scouting</span>
                     <p className="text-slate-900 font-bold uppercase tracking-widest text-[9px] md:text-xs">Private Atolls</p>
                  </div>
               </div>
            </div>
            <div className="lg:col-span-5 relative mt-16 lg:mt-0 reveal h-full min-h-[500px] lg:min-h-0">
               <div className="aspect-[4/5] rounded-[2rem] sm:rounded-[4rem] lg:rounded-[5rem] overflow-hidden shadow-2xl group relative w-full h-full">
                  <img src="https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-110" alt="Local Life" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent"></div>
               </div>
               <div className="absolute -bottom-8 md:-bottom-16 -right-4 sm:-right-12 bg-[#FCFAF7] p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-2xl max-w-[200px] md:max-w-[320px] border border-slate-100 reveal transition-all duration-1000 delay-500">
                  <p className="text-slate-900 font-serif italic text-base md:text-2xl leading-relaxed">"The most profound experiences happen in the gaps between the tides."</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE ATOLLS */}
      <section className="py-24 sm:py-32 md:py-48 bg-[#FCFAF7] border-y border-slate-100">
         <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-32 reveal">
               <div className="max-w-xl">
                  <span className="text-[9px] md:text-[10px] font-bold text-slate-300 uppercase tracking-[1em] mb-4 md:mb-8 block">Regional Mastery</span>
                  <h3 className="text-4xl md:text-7xl font-serif font-bold text-slate-900 tracking-tighter italic leading-tight text-slate-900">Signature Atolls.</h3>
               </div>
               <Link to="/stays" className="text-[8px] md:text-[10px] font-bold text-sky-500 uppercase tracking-[0.5em] border-b border-sky-500 pb-1 mt-6 md:mb-4 hover:text-slate-950 hover:border-slate-950 transition-all">Explore Geography</Link>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 reveal transition-all duration-1000">
               {signatureAtolls.map((atoll, i) => (
                 <Link 
                   key={i} 
                   to={`/stays?q=${atoll.name}`} 
                   className={`group relative overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem] md:rounded-[4rem] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-1000 
                    ${i % 2 !== 0 ? 'mt-8 md:mt-0' : 'mb-8 md:mb-0'} 
                    ${i % 2 === 0 ? 'aspect-[3/5] md:aspect-[3/4]' : 'aspect-[3/4]'}`}
                 >
                   <img src={atoll.image} className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0" alt={atoll.name} />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent group-hover:via-transparent transition-all duration-1000"></div>
                   <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-4 sm:left-6 md:left-10 right-4 sm:right-6 md:right-10 flex flex-col items-start">
                      <span className="text-sky-400 text-[6px] md:text-[8px] font-bold uppercase tracking-[0.4em] mb-1 md:mb-2">{atoll.count}</span>
                      <h4 className="text-lg md:text-3xl font-serif font-bold group-hover:italic transition-all duration-500 mb-1 leading-tight text-white">{atoll.name}</h4>
                   </div>
                 </Link>
               ))}
            </div>
         </div>
      </section>

      {/* 4. THE COLLECTION (HORIZONTAL SCROLLER) */}
      <section className="py-24 sm:py-32 md:py-56 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
          <div className="mb-12 md:mb-24 reveal">
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[1em] mb-4 md:mb-8 block">Exclusive Portfolio</span>
            <h3 className="text-4xl md:text-8xl font-serif font-bold text-slate-900 tracking-tighter italic">The Collection.</h3>
          </div>
          
          {/* Horizontal Scroller Container */}
          <div className="reveal no-scrollbar overflow-x-auto flex gap-8 md:gap-12 pb-12 snap-x snap-mandatory cursor-grab active:cursor-grabbing">
            {featuredResorts.map((resort, idx) => (
              <div 
                key={resort.id} 
                className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[35vw] snap-start transition-all duration-1000"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <ResortCard resort={resort} />
              </div>
            ))}
            {/* Last block for spacing */}
            <div className="flex-shrink-0 w-12 md:w-20"></div>
          </div>
          
          <div className="mt-12 flex justify-between items-center reveal">
             <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-slate-950"></div>
                <div className="w-2 h-2 rounded-full bg-slate-100"></div>
                <div className="w-2 h-2 rounded-full bg-slate-100"></div>
             </div>
             <Link to="/stays" className="group relative flex items-center gap-6 md:gap-8">
               <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.5em] text-slate-950 border-b border-slate-200 group-hover:border-sky-500 transition-all pb-1">View Full Portfolio</span>
               <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-950 group-hover:border-slate-950 transition-all duration-700 shadow-sm">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-slate-950 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
               </div>
             </Link>
          </div>
        </div>
      </section>

      {/* 5. THE JOURNAL */}
      <section className="py-24 sm:py-32 md:py-48 bg-[#FCFAF7] border-t border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24 items-start mb-16 md:mb-40 reveal">
              <div className="lg:col-span-6">
                 <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[1em] mb-4 md:mb-8 block">The Perspective</span>
                 <h3 className="text-4xl md:text-7xl font-serif font-bold text-slate-900 tracking-tighter italic leading-tight">Digital Journal.</h3>
              </div>
              <div className="lg:col-span-6 md:pt-4">
                 <p className="text-slate-400 text-[10px] md:text-lg font-medium leading-relaxed uppercase tracking-[0.3em] max-w-lg opacity-80">A curated exploration of heritage, luxury, and the art of travel across the atolls.</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 lg:gap-16 reveal transition-all duration-1000 delay-300">
              {BLOG_POSTS.slice(0, 3).map((post, i) => (
                <Link key={post.id} to={`/stories/${post.slug}`} className={`group block ${i === 1 ? 'md:mt-12' : ''}`}>
                   <div className="relative aspect-[4/5] rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[3rem] overflow-hidden mb-6 md:mb-10 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                      <img src={post.image} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0" alt={post.title} />
                      <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-colors duration-700"></div>
                   </div>
                   <div className="px-2">
                    <span className="text-[7px] md:text-[9px] font-bold text-slate-300 uppercase tracking-widest block mb-2 md:mb-4">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                    <h4 className="text-lg md:text-2xl font-serif font-bold text-slate-950 mb-4 md:mb-6 group-hover:italic transition-all duration-500 leading-tight">{post.title}</h4>
                    <div className="w-6 md:w-8 h-[1px] bg-slate-200 group-hover:w-full group-hover:bg-sky-500 transition-all duration-700"></div>
                   </div>
                </Link>
              ))}
           </div>
        </div>
      </section>

      {/* 6. IMMERSIVE FOOTER CTA */}
      <section className="relative py-32 sm:py-48 md:py-64 lg:py-80 bg-slate-950 text-white overflow-hidden text-center">
         <div className="absolute inset-0 opacity-20 pointer-events-none">
            <img src="https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=90&w=1920" className="w-full h-full object-cover grayscale brightness-50" alt="Footer Background" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950" />
         </div>
         <div className="relative z-10 max-w-4xl mx-auto px-6 reveal">
            <span className="text-[8px] md:text-[10px] font-bold text-sky-400 uppercase tracking-[1em] mb-8 md:mb-12 block">Bespoke Inquiries</span>
            <h2 className="text-4xl sm:text-6xl md:text-9xl font-serif font-bold mb-10 md:mb-16 italic leading-none tracking-tighter">Define Your <br/> Journey.</h2>
            <p className="text-slate-400 text-[9px] md:text-lg font-medium leading-relaxed mb-12 md:mb-20 opacity-80 uppercase tracking-[0.4em]">From unlisted sanctuaries to private atoll charters.</p>
            <Link to="/plan" className="inline-block bg-white text-slate-950 font-bold px-10 md:px-16 py-4 md:py-7 rounded-full hover:bg-sky-400 hover:text-white transition-all duration-700 uppercase tracking-[0.5em] text-[8px] md:text-[10px] shadow-2xl">
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
