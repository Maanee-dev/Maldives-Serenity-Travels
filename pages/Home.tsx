
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Accommodation, AccommodationType, TransferType, MealPlan } from '../types';
import { BLOG_POSTS } from '../constants';
import ResortCard from '../components/ResortCard';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [heroIndex, setHeroIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [typedPlaceholder, setTypedPlaceholder] = useState("");
  const [featuredResorts, setFeaturedResorts] = useState<Accommodation[]>([]);

  const typingIdx = useRef(0);
  const charIdx = useRef(0);
  const isDeleting = useRef(false);

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data, error } = await supabase
        .from('resorts')
        .select('*')
        .limit(6);
      
      if (data) {
        const mapped: Accommodation[] = data.map(item => ({
          id: item.id,
          name: item.name,
          slug: item.slug,
          type: item.type as AccommodationType,
          atoll: item.atoll,
          priceRange: item.price_range,
          rating: item.rating,
          description: item.description,
          shortDescription: item.short_description,
          images: item.images || [],
          features: item.features || [],
          transfers: item.transfers as TransferType[],
          mealPlans: item.meal_plans as MealPlan[],
          uvp: item.uvp,
          isFeatured: item.is_featured
        }));
        setFeaturedResorts(mapped);
      }
    };
    fetchFeatured();
  }, []);

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
  }, [featuredResorts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/stays?q=${encodeURIComponent(searchQuery)}`);
  };

  const signatureAtolls = [
    { name: 'Noonu Atoll', image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=600', count: '12 Stays', desc: 'Untouched Blue' },
    { name: 'Baa Atoll', image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=600', count: '18 Stays', desc: 'UNESCO Biosphere' },
    { name: 'North Male', image: 'https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=600', count: '24 Stays', desc: 'The Epicenter' },
    { name: 'Ari Atoll', image: 'https://images.unsplash.com/photo-1502602898657-3e917247a183?auto=format&fit=crop&q=80&w=600', count: '15 Stays', desc: 'Whale Shark Paths' }
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

      <section className="py-24 sm:py-32 md:py-48 lg:py-64 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
            <div className="lg:col-span-7 reveal">
               <div className="flex items-center gap-6 mb-12"><div className="w-12 h-[1px] bg-sky-500"></div><span className="text-[10px] font-bold text-sky-500 uppercase tracking-[1em]">The Agency</span></div>
               <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-[7.5rem] font-serif font-bold text-slate-950 leading-[0.95] mb-16 tracking-tighter">Luxury is <br className="hidden md:block"/> No Longer <br className="hidden md:block"/> <span className="italic text-sky-500 underline decoration-sky-100 underline-offset-[1.5rem]">Optional</span>.</h2>
               <p className="text-slate-500 text-lg md:text-2xl leading-[2] mb-16 font-medium opacity-90">We are a bespoke boutique agency crafting unrivaled journeys across the Maldivian atolls. Defined by geography and refined by hand, we curate the silence that modern living lacks.</p>
            </div>
            <div className="lg:col-span-5 relative mt-16 lg:mt-0 reveal">
               <div className="aspect-[4/5] rounded-[4rem] lg:rounded-[5rem] overflow-hidden shadow-2xl group"><img src="https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-110" alt="Local Life" /></div>
               <div className="absolute -bottom-16 -right-8 bg-[#FCFAF7] p-12 rounded-[3rem] shadow-2xl max-w-[320px] border border-slate-100 reveal"><p className="text-slate-900 font-serif italic text-2xl">"The most profound experiences happen in the gaps between the tides."</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 md:py-48 bg-[#FCFAF7] border-y border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32 reveal">
            <div className="max-w-xl"><span className="text-[10px] font-bold text-slate-300 uppercase tracking-[1em] mb-8 block">Regional Mastery</span><h3 className="text-4xl md:text-7xl font-serif font-bold italic leading-tight text-slate-900">Signature Atolls.</h3></div>
            <Link to="/stays" className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.5em] border-b border-sky-500 pb-1 mb-4">Explore Geography</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 reveal">
            {signatureAtolls.map((atoll, i) => (
              <Link key={i} to={`/stays?q=${atoll.name}`} className={`group relative overflow-hidden rounded-[2.5rem] md:rounded-[4rem] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-1000 ${i % 2 !== 0 ? 'mt-0' : 'mb-0'} ${i % 2 === 0 ? 'aspect-[3/5] md:aspect-[3/4]' : 'aspect-[3/4]'}`}>
                <img src={atoll.image} className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0" alt={atoll.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10 flex flex-col items-start"><span className="text-sky-400 text-[8px] font-bold uppercase tracking-[0.4em] mb-2">{atoll.count}</span><h4 className="text-lg md:text-3xl font-serif font-bold group-hover:italic transition-all leading-tight text-white">{atoll.name}</h4></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 md:py-56 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
          <div className="mb-24 reveal"><span className="text-[10px] font-bold text-slate-300 uppercase tracking-[1em] mb-8 block">Exclusive Portfolio</span><h3 className="text-4xl md:text-8xl font-serif font-bold text-slate-900 tracking-tighter italic">The Collection.</h3></div>
          <div className="reveal no-scrollbar overflow-x-auto flex gap-12 pb-12 snap-x snap-mandatory">
            {featuredResorts.length > 0 ? featuredResorts.map((resort) => (
              <div key={resort.id} className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[35vw] snap-start"><ResortCard resort={resort} /></div>
            )) : <div className="py-20 text-center w-full"><p className="text-slate-400 uppercase tracking-widest text-[10px]">Loading the sanctuaries...</p></div>}
          </div>
          <div className="mt-12 flex justify-between items-center reveal">
            <div className="flex gap-4"><div className="w-2 h-2 rounded-full bg-slate-950"></div><div className="w-2 h-2 rounded-full bg-slate-100"></div><div className="w-2 h-2 rounded-full bg-slate-100"></div></div>
            <Link to="/stays" className="group relative flex items-center gap-8"><span className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-950 border-b border-slate-200 group-hover:border-sky-500 transition-all pb-1">View Full Portfolio</span><div className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-950 transition-all duration-700 shadow-sm"><svg className="w-5 h-5 text-slate-950 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></div></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
