import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase, mapResort } from '../lib/supabase';
import { Accommodation, BlogPost } from '../types';
import { BLOG_POSTS, RESORTS } from '../constants';
import ResortCard from '../components/ResortCard';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [heroIndex, setHeroIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [typedPlaceholder, setTypedPlaceholder] = useState("");
  const [featuredResorts, setFeaturedResorts] = useState<Accommodation[]>([]);
  const [recentStories, setRecentStories] = useState<BlogPost[]>([]);
  const [activeVibe, setActiveVibe] = useState<'Adventure' | 'Silence' | 'Family' | 'Romance'>('Silence');

  const typingIdx = useRef(0);
  const charIdx = useRef(0);
  const isDeleting = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: resortsData, error: resortError } = await supabase
          .from('resorts')
          .select('*')
          .limit(6);
        
        if (resortError) throw resortError;
        if (resortsData && resortsData.length > 0) {
          setFeaturedResorts(resortsData.map(mapResort));
        } else {
          setFeaturedResorts(RESORTS.slice(0, 6));
        }

        const { data: storiesData, error: storyError } = await supabase
          .from('stories')
          .select('*')
          .order('date', { ascending: false })
          .limit(3);

        if (storyError) throw storyError;
        if (storiesData && storiesData.length > 0) {
          setRecentStories(storiesData as BlogPost[]);
        } else {
          setRecentStories(BLOG_POSTS.slice(0, 3) as BlogPost[]);
        }
      } catch (err) {
        console.error("Supabase connection error:", err);
        setFeaturedResorts(RESORTS.slice(0, 6));
        setRecentStories(BLOG_POSTS.slice(0, 3) as BlogPost[]);
      }
    };
    fetchData();
  }, []);

  const heroSlides = [
    {
      type: 'video',
      src: 'https://maldives-serenitytravels.com/images/Villa Resorts - Brand Video - Reel 2 - 1080 x 1920.mp4',
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

  const searchKeywords = ["Soneva Jani...", "Private Atolls...", "Underwater Dining...", "North Male...", "Bespoke Escapes..."];

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
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const vibes = [
    { name: 'Silence', desc: 'Minimalist retreats where the only sound is the tide.', color: 'bg-sky-50', icon: '🌊' },
    { name: 'Adventure', desc: 'Dive into the deep blue or chase the perfect wave.', color: 'bg-amber-50', icon: '🐋' },
    { name: 'Family', desc: 'Generous spaces designed for intergenerational bonding.', color: 'bg-emerald-50', icon: '👨‍👩‍👧‍👦' },
    { name: 'Romance', desc: 'Intimate sanctuaries for unscripted love stories.', color: 'bg-rose-50', icon: '🌅' }
  ];

  return (
    <div className="bg-[#FCFAF7] selection:bg-sky-100 selection:text-sky-900 overflow-x-hidden">
      <SEO 
        title="Maldives Serenity Travels | Luxury Travel Agency" 
        description="Maldives Serenity Travels is a premier boutique travel agency curating bespoke luxury journeys across the Maldivian archipelago. Discover private island sanctuaries and exclusive overwater villas."
        isOrganization={true}
        keywords={[
          'Maldives Serenity Travels', 'Maldives luxury travel', 'private island resorts Maldives', 
          'overwater villas Maldives', 'Maldives honeymoon packages', 'bespoke Maldives travel'
        ]}
      />

      {/* Hero Section */}
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
            <div className="mb-16 reveal active">
               <h1 className="sr-only">Maldives Serenity Travels</h1>
               <div className="flex flex-col">
                <span className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-serif font-bold text-white leading-none tracking-tighter">{heroSlides[heroIndex].title}</span>
                <span className="text-6xl sm:text-8xl md:text-9xl lg:text-[13rem] font-serif font-bold text-white italic leading-[0.8] tracking-tighter opacity-90">{heroSlides[heroIndex].titleAlt}<span className="not-italic text-sky-500">.</span></span>
               </div>
            </div>
            <form onSubmit={handleSearch} className="w-full max-w-xl reveal active delay-500">
              <div className="relative group">
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={typedPlaceholder} className="w-full bg-white/5 backdrop-blur-3xl border border-white/20 rounded-full pl-10 pr-24 py-6 text-white text-[11px] font-bold uppercase tracking-[0.4em] outline-none focus:bg-white focus:text-slate-950 placeholder:text-white/30 shadow-2xl transition-all" />
                <button type="submit" className="absolute right-2 top-2 bottom-2 bg-slate-950 text-white w-16 rounded-full flex items-center justify-center hover:bg-sky-500 transition-all shadow-xl"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 md:py-48 bg-white relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-center">
            <div className="lg:w-1/2 relative order-2 lg:order-1 reveal">
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl z-10 group bg-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=1200" 
                  className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-110" 
                  alt="Maldives Perspective" 
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="absolute -bottom-10 -right-4 md:-bottom-16 md:-right-16 bg-[#FCFAF7] p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl z-20 max-w-[280px] md:max-w-[380px] border border-slate-50 reveal delay-500">
                <p className="text-slate-900 font-serif italic text-xl md:text-3xl leading-[1.4]">"The profound happens in the gaps between the tides."</p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-8 h-px bg-sky-500"></div>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Maldivian Wisdom</span>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 order-1 lg:order-2 reveal">
              <div className="flex items-center gap-6 mb-12">
                <div className="w-12 h-[1px] bg-sky-500"></div>
                <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[1.2em]">The Agency</span>
              </div>
              <h2 className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold text-slate-950 leading-[0.95] mb-12 tracking-tighter">
                Luxury is <br /> 
                <span className="italic text-sky-500 font-normal">No Longer</span> <br /> 
                Optional.
              </h2>
              <div className="max-w-xl">
                <p className="text-slate-600 text-lg md:text-2xl leading-[1.7] mb-12 font-medium opacity-90 italic">
                  Defined by geography and refined by hand, we curate the silence that modern living lacks.
                </p>
                <p className="text-slate-500 text-base md:text-lg leading-[1.8] mb-12">
                  Maldives Serenity Travels is a boutique agency born from the southern frontier of Addu City. Our philosophy is rooted in the belief that true luxury isn't found in the generic, but in the specific—the perfect seaplane arrival, the hidden sandbank, and the unscripted silence of a private atoll.
                </p>
                <Link to="/about" className="inline-flex items-center gap-6 text-[10px] font-bold text-slate-950 uppercase tracking-[0.5em] group transition-all">
                  <span className="border-b-2 border-slate-100 pb-1 group-hover:border-sky-500 transition-colors">Our Full Narrative</span>
                  <div className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-950 transition-all duration-700">
                    <svg className="w-5 h-5 text-slate-950 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIBE FINDER SECTION */}
      <section className="py-24 md:py-48 bg-[#fcfaf7]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 text-center mb-24 reveal">
           <span className="text-sky-500 font-black uppercase tracking-[1em] text-[10px] mb-8 block">Dream Finder</span>
           <h2 className="text-4xl md:text-7xl font-serif font-bold text-slate-950 italic tracking-tighter">Find Your Pulse.</h2>
        </div>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20 reveal">
          {vibes.map((v) => (
            <button 
              key={v.name}
              onClick={() => setActiveVibe(v.name as any)}
              className={`p-10 rounded-[3rem] text-center transition-all duration-700 border-2 ${activeVibe === v.name ? 'bg-white border-sky-500 shadow-2xl scale-105' : 'bg-slate-50 border-transparent hover:border-slate-200'}`}
            >
              <div className="text-4xl mb-6">{v.icon}</div>
              <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-900 mb-4">{v.name}</h3>
              <p className={`text-[10px] font-bold uppercase tracking-widest leading-loose ${activeVibe === v.name ? 'text-slate-600' : 'text-slate-400'}`}>
                {v.desc}
              </p>
            </button>
          ))}
        </div>
        <div className="text-center reveal">
           <Link to={`/search?q=${activeVibe}`} className="bg-slate-950 text-white font-bold px-16 py-7 rounded-full text-[11px] uppercase tracking-[0.8em] hover:bg-sky-500 transition-all duration-700 shadow-2xl">
             Explore {activeVibe}
           </Link>
        </div>
      </section>

      {/* THE COLLECTION */}
      <section className="py-24 md:py-48 bg-white overflow-hidden border-b border-slate-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="mb-20 md:mb-32 reveal flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="max-w-xl text-left">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[1.2em] mb-8 block">The Portfolio</span>
              <h3 className="text-4xl md:text-8xl font-serif font-bold text-slate-900 tracking-tighter italic leading-none">The Collection.</h3>
              <p className="mt-12 text-slate-400 text-[10px] uppercase font-bold tracking-[0.4em] leading-loose">
                 Curated for the discerning eye. Our portfolio only accepts resorts that meet the Serenity standard of privacy, architectural integrity, and service.
              </p>
            </div>
            <div className="w-24 h-[1px] bg-amber-400 mb-4 hidden md:block"></div>
          </div>
          <div className="reveal no-scrollbar overflow-x-auto flex gap-8 md:gap-16 pb-12 snap-x snap-mandatory">
            {featuredResorts.map((resort) => (
              <div key={resort.id} className="flex-shrink-0 w-[85vw] sm:w-[55vw] lg:w-[35vw] snap-start">
                <ResortCard resort={resort} />
              </div>
            ))}
            <div className="flex-shrink-0 w-[85vw] sm:w-[55vw] lg:w-[35vw] snap-start flex items-center justify-center">
              <Link to="/stays" className="group w-full aspect-[4/5] rounded-[3rem] bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-12 text-center hover:bg-slate-950 transition-all duration-1000">
                <span className="text-[10px] font-bold text-slate-400 group-hover:text-sky-400 uppercase tracking-[1em] mb-8 block">Explore All</span>
                <h4 className="text-2xl md:text-4xl font-serif font-bold text-slate-900 group-hover:text-white leading-tight italic">Find your <br /> sanctuary.</h4>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* THE JOURNAL - LATEST STORIES */}
      <section className="py-24 md:py-48 bg-[#FCFAF7]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-24 reveal">
            <span className="text-sky-500 font-black uppercase tracking-[1em] text-[10px] mb-8 block">The Journal</span>
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-slate-950 italic tracking-tighter">Editorial Dispatches.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 mb-24">
            {recentStories.map((post) => (
              <Link key={post.id} to={`/stories/${post.slug}`} className="group reveal">
                <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-10 shadow-sm transition-all duration-1000 group-hover:shadow-2xl group-hover:-translate-y-2 bg-slate-100">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-105" />
                  <div className="absolute top-8 left-8">
                    <span className="bg-white/95 backdrop-blur-md px-5 py-2 rounded-full text-[9px] font-black text-slate-900 uppercase tracking-[0.4em] shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="px-4">
                  <span className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.4em] mb-4 block">
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-slate-900 mb-6 group-hover:text-sky-600 transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <div className="h-px w-12 bg-slate-200 group-hover:w-full group-hover:bg-sky-500 transition-all duration-1000"></div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center reveal">
            <Link to="/stories" className="inline-flex items-center gap-6 text-[10px] font-bold text-slate-950 uppercase tracking-[0.5em] group transition-all">
              <span className="border-b-2 border-slate-100 pb-1 group-hover:border-sky-500 transition-colors">Access the Archives</span>
              <div className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-950 transition-all duration-700">
                <svg className="w-5 h-5 text-slate-950 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 md:py-48 bg-slate-950 relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 opacity-[0.05] flex items-center justify-center pointer-events-none">
          <h2 className="text-[35vw] font-serif italic whitespace-nowrap -rotate-12 translate-y-1/2">Serenity</h2>
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 reveal">
          <span className="text-[10px] font-bold text-sky-400 uppercase tracking-[1.5em] mb-12 block">Ready for Perspective?</span>
          <h3 className="text-5xl md:text-9xl font-serif font-bold mb-16 italic tracking-tighter">Your Journey <br /> Starts Here.</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <Link to="/plan" className="w-full md:w-auto bg-white text-slate-950 font-bold px-16 py-7 rounded-full hover:bg-sky-400 hover:text-white transition-all duration-700 uppercase tracking-[0.5em] text-[11px] shadow-2xl">
              Initiate Inquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;