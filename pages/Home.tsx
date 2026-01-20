
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
                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-sky-500 text-white p-3 md:p-4 rounded-full hover:bg-white hover:text-sky-500 transition-colors">
                      <svg className="w-4 h-4 md:w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </form>
             </div>
          </div>
        </div>
      </section>

      {/* Featured Collection Section */}
      <section className="py-40 px-6 lg:px-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12 reveal">
            <div className="max-w-2xl">
              <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[1em] mb-6 block">The Portfolio</span>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 leading-tight">Featured Sanctuaries</h2>
            </div>
            <Link to="/stays" className="group flex items-center gap-6 pb-2 border-b border-slate-900">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-900">Explore Portfolio</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {featuredResorts.map((resort, idx) => (
              <div key={resort.id} className="reveal" style={{ transitionDelay: `${idx * 150}ms` }}>
                <ResortCard resort={resort} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Added missing default export
export default Home;
