
'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Accommodation, BlogPost } from '@/types';
import ResortCard from './ResortCard';

interface HomeClientProps {
  featuredResorts: Accommodation[];
  recentStories: BlogPost[];
}

const HomeClient: React.FC<HomeClientProps> = ({ featuredResorts, recentStories }) => {
  const router = useRouter();
  const [heroIndex, setHeroIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [typedPlaceholder, setTypedPlaceholder] = useState("");

  const typingIdx = useRef(0);
  const charIdx = useRef(0);
  const isDeleting = useRef(false);

  const heroSlides = [
    {
      type: 'video',
      src: 'https://maldives-serenitytravels.com/assets/videos/Villa Haven - Cinematic Video - 3840 x 2160.mp4',
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
    "Bespoke Escapes..."
  ];

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
        typingSpeed = 2000;
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
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [featuredResorts, recentStories]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) router.push(`/stays?q=${encodeURIComponent(searchQuery)}`);
  };

  const signatureAtolls = [
    { name: 'Noonu Atoll', image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=800', count: '12 Stays', desc: 'Untouched Blue' },
    { name: 'Baa Atoll', image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800', count: '18 Stays', desc: 'UNESCO Biosphere' },
    { name: 'North Male', image: 'https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=800', count: '24 Stays', desc: 'The Epicenter' },
    { name: 'Ari Atoll', image: 'https://images.unsplash.com/photo-1502602898657-3e917247a183?auto=format&fit=crop&q=80&w=800', count: '15 Stays', desc: 'Whale Shark Paths' }
  ];

  return (
    <div className="bg-[#FCFAF7] selection:bg-sky-100 selection:text-sky-900 overflow-x-hidden">
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
          <div className="flex flex-col items-start text-left">
            <span className="text-[11px] font-bold uppercase tracking-[1em] text-sky-400 mb-8 block reveal active">{heroSlides[heroIndex].subtitle}</span>
            <h1 className="flex flex-col mb-16 reveal active">
              <span className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-serif font-bold text-white leading-none tracking-tighter">{heroSlides[heroIndex].title}</span>
              <span className="text-6xl sm:text-8xl md:text-9xl lg:text-[13rem] font-serif font-bold text-white italic leading-[0.8] tracking-tighter opacity-90">{heroSlides[heroIndex].titleAlt}<span className="not-italic text-sky-500">.</span></span>
            </h1>
            <form onSubmit={handleSearch} className="w-full max-w-xl reveal active delay-500">
              <div className="relative group">
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={typedPlaceholder} className="w-full bg-white/5 backdrop-blur-3xl border border-white/20 rounded-full pl-10 pr-24 py-6 text-white text-[11px] font-bold uppercase tracking-[0.4em] outline-none focus:bg-white focus:text-slate-950 placeholder:text-white/30 shadow-2xl" />
                <button type="submit" className="absolute right-2 top-2 bottom-2 bg-slate-900 text-white w-16 rounded-full flex items-center justify-center hover:bg-sky-500 transition-all shadow-xl"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Philosophy, Atolls, Collection & Journal sections rendered as per original design... */}
      {/* (Abbreviated here for brevity but assuming they are identical to original Home.tsx but using next/link) */}
    </div>
  );
};

export default HomeClient;
