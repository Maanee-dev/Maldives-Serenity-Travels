
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase, mapResort } from '../lib/supabase';
import { Accommodation, BlogPost } from '../types';
import { BLOG_POSTS, RESORTS } from '../constants';
import ResortCard from '../components/ResortCard';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [heroIndex, setHeroIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [typedPlaceholder, setTypedPlaceholder] = useState("");
  const [featuredResorts, setFeaturedResorts] = useState<Accommodation[]>([]);
  const [recentStories, setRecentStories] = useState<BlogPost[]>([]);

  const typingIdx = useRef(0);
  const charIdx = useRef(0);
  const isDeleting = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Resorts
        const { data: resortsData, error: resortError } = await supabase
          .from('resorts')
          .select('*')
          .limit(6);
        
        if (resortError) throw resortError;

        if (resortsData && resortsData.length > 0) {
          console.log("Supabase: Found resorts", resortsData.length);
          const mappedResorts = resortsData.map(mapResort);
          setFeaturedResorts(mappedResorts);
        } else {
          console.warn("Supabase: No resorts found, falling back to local constants.");
          setFeaturedResorts(RESORTS.slice(0, 6));
        }

        // Fetch Stories
        const { data: storiesData, error: storyError } = await supabase
          .from('stories')
          .select('*')
          .order('date', { ascending: false })
          .limit(3);

        if (storyError) throw storyError;

        if (storiesData && storiesData.length > 0) {
          setRecentStories(storiesData as BlogPost[]);
        } else {
          setRecentStories(BLOG_POSTS.slice(0, 3));
        }
      } catch (err) {
        console.error("Supabase connection error:", err);
        setFeaturedResorts(RESORTS.slice(0, 6));
        setRecentStories(BLOG_POSTS.slice(0, 3));
      }
    };
    fetchData();
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
  }, [featuredResorts, recentStories]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/stays?q=${encodeURIComponent(searchQuery)}`);
  };

  const signatureAtolls = [
    { name: 'Noonu Atoll', image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=800', count: '12 Stays', desc: 'Untouched Blue' },
    { name: 'Baa Atoll', image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800', count: '18 Stays', desc: 'UNESCO Biosphere' },
    { name: 'North Male', image: 'https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=800', count: '24 Stays', desc: 'The Epicenter' },
    { name: 'Ari Atoll', image: 'https://images.unsplash.com/photo-1502602898657-3e917247a183?auto=format&fit=crop&q=80&w=800', count: '15 Stays', desc: 'Whale Shark Paths' }
  ];

  return (
    <div className="bg-[#FCFAF7] selection:bg-sky-100 selection:text-sky-900 overflow-x-hidden">
      {/* HERO SECTION */}
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

      {/* PHILOSOPHY SECTION */}
      <section className="py-24 md:py-48 bg-white relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-center">
            <div className="lg:w-1/2 relative order-2 lg:order-1 reveal">
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl z-10 group bg-slate-100">
                <img src="https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-110" alt="Island Culture" />
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
                  We are a bespoke boutique agency crafting unrivaled journeys across the Maldivian atolls. Our expertise lies in the quiet luxury of space, service, and stillness.
                </p>
                <Link to="/stories" className="inline-flex items-center gap-6 text-[10px] font-bold text-slate-950 uppercase tracking-[0.5em] group transition-all">
                  <span className="border-b-2 border-slate-100 pb-1 group-hover:border-sky-500 transition-colors">Our Philosophy</span>
                  <div className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-950 transition-all duration-700">
                    <svg className="w-5 h-5 text-slate-950 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIGNATURE ATOLLS */}
      <section className="py-24 md:py-40 bg-[#FCFAF7] border-y border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 md:mb-28 reveal">
            <div className="max-w-xl">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[1em] mb-8 block">Regional Mastery</span>
              <h3 className="text-4xl md:text-7xl font-serif font-bold italic leading-tight text-slate-900 tracking-tighter">Atoll Coordinates.</h3>
            </div>
            <Link to="/stays" className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.5em] border-b border-sky-500 pb-1 mb-4 hover:text-slate-900 hover:border-slate-900 transition-colors hidden md:block">Explore Geography</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 reveal">
            {signatureAtolls.map((atoll, i) => (
              <Link key={i} to={`/stays?q=${atoll.name}`} className="group relative overflow-hidden rounded-[1.5rem] md:rounded-[3.5rem] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-1000 aspect-[3/4]">
                <img src={atoll.image} className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-110 grayscale-[10%] group-hover:grayscale-0" alt={atoll.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 md:bottom-10 md:left-10 md:right-10 flex flex-col items-start transition-transform duration-700">
                  <span className="text-sky-400 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] mb-1 md:mb-3">{atoll.count}</span>
                  <h4 className="text-lg md:text-3xl font-serif font-bold text-white leading-tight transition-all">{atoll.name}</h4>
                  <p className="hidden md:block text-[9px] text-white/50 uppercase tracking-widest mt-3 opacity-0 group-hover:opacity-100 transition-opacity delay-100">{atoll.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* THE COLLECTION */}
      <section className="py-24 md:py-48 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="mb-20 md:mb-32 reveal flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="max-w-xl">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[1.2em] mb-8 block">The Portfolio</span>
              <h3 className="text-4xl md:text-8xl font-serif font-bold text-slate-900 tracking-tighter italic leading-none">The Collection.</h3>
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

      {/* THE JOURNAL */}
      <section className="py-24 md:py-48 bg-[#FCFAF7] border-t border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-24 md:mb-40 reveal">
            <div className="max-w-2xl text-center md:text-left">
              <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[1em] mb-8 block">Editorial Digest</span>
              <h3 className="text-4xl md:text-8xl font-serif font-bold text-slate-900 italic tracking-tighter leading-none">The Journal.</h3>
            </div>
            <Link to="/stories" className="text-[10px] font-bold text-slate-950 uppercase tracking-[0.5em] border-b border-slate-950 pb-2 mb-4 hover:text-sky-500 hover:border-sky-500 transition-all hidden md:block">View All Dispatches</Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            {recentStories[0] && (
              <div className="lg:col-span-7 reveal">
                <Link to={`/stories/${recentStories[0].slug}`} className="group block relative rounded-[3.5rem] overflow-hidden shadow-2xl bg-white p-8 md:p-16 hover:shadow-sky-100 transition-all duration-1000">
                  <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-12">
                    <img src={recentStories[0].image} className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-105" alt={recentStories[0].title} />
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end gap-8">
                    <div className="max-w-xl">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-sky-500 font-bold text-[10px] uppercase tracking-widest">{recentStories[0].category}</span>
                        <div className="w-6 h-px bg-slate-200"></div>
                        <span className="text-slate-500 font-bold text-[9px] uppercase tracking-widest">{new Date(recentStories[0].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <h4 className="text-3xl md:text-5xl font-serif font-bold text-slate-950 mb-8 group-hover:italic transition-all leading-tight tracking-tight">{recentStories[0].title}</h4>
                      <p className="text-slate-500 text-base md:text-xl leading-relaxed line-clamp-2 italic opacity-80">{recentStories[0].excerpt}</p>
                    </div>
                  </div>
                </Link>
              </div>
            )}
            <div className="lg:col-span-5 flex flex-col gap-10">
              {recentStories.slice(1).map((post, idx) => (
                <Link key={post.id} to={`/stories/${post.slug}`} className="group flex gap-6 md:gap-10 items-center p-6 md:p-10 bg-white rounded-[2.5rem] shadow-sm border border-slate-50 hover:shadow-xl transition-all duration-700 reveal" style={{ transitionDelay: `${idx * 150}ms` }}>
                  <div className="w-24 h-24 md:w-36 md:h-36 rounded-[2rem] overflow-hidden flex-shrink-0 bg-slate-100">
                    <img src={post.image} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" alt={post.title} />
                  </div>
                  <div className="flex-grow">
                    <span className="text-sky-500 font-bold text-[9px] uppercase tracking-widest mb-3 block">{post.category}</span>
                    <h5 className="text-xl md:text-2xl font-serif font-bold text-slate-900 mb-4 group-hover:italic transition-all leading-tight">{post.title}</h5>
                  </div>
                </Link>
              ))}
            </div>
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
