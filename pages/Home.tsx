import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Accommodation, AccommodationType, TransferType, MealPlan, BlogPost } from '../types';
import { BLOG_POSTS } from '../constants';
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
      // Fetch Resorts
      const { data: resortsData } = await supabase
        .from('resorts')
        .select('*')
        .limit(6);
      
      if (resortsData) {
        const mappedResorts: Accommodation[] = resortsData.map(item => ({
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
          isFeatured: item.is_featured,
          roomTypes: item.room_types || [],
          diningVenues: item.dining_venues || []
        }));
        setFeaturedResorts(mappedResorts);
      }

      // Fetch Stories
      const { data: storiesData } = await supabase
        .from('stories')
        .select('*')
        .order('date', { ascending: false })
        .limit(3);

      if (storiesData && storiesData.length > 0) {
        setRecentStories(storiesData as BlogPost[]);
      } else {
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
      {/* HERO SECTION - KEPT AS IS */}
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

      {/* ENHANCED PHILOSOPHY SECTION */}
      <section className="py-20 sm:py-32 md:py-48 bg-white relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <div className="lg:col-span-7 reveal">
              <div className="flex items-center gap-6 mb-12">
                <div className="w-12 h-[1px] bg-sky-500"></div>
                <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[1em]">The Agency</span>
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-[7.5rem] font-serif font-bold text-slate-950 leading-[0.95] mb-12 tracking-tighter">
                Luxury is <br className="hidden md:block" /> 
                <span className="italic text-sky-500">No Longer</span> <br className="hidden md:block" /> 
                Optional.
              </h2>
              <div className="max-w-2xl">
                <p className="text-slate-500 text-lg md:text-2xl leading-[1.8] mb-12 font-medium opacity-90">
                  We are a bespoke boutique agency crafting unrivaled journeys across the Maldivian atolls. Defined by geography and refined by hand, we curate the silence that modern living lacks.
                </p>
                <Link to="/stories" className="inline-flex items-center gap-4 text-[10px] font-bold text-slate-900 uppercase tracking-[0.4em] group transition-all">
                  <span className="border-b border-slate-200 pb-1 group-hover:border-sky-500 transition-colors">Explore Our Philosophy</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 reveal relative">
              <div className="aspect-[4/5] rounded-[3.5rem] md:rounded-[5rem] overflow-hidden shadow-2xl group relative bg-slate-100">
                <img src="https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-110" alt="Local Life" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -bottom-12 -left-8 md:-left-12 bg-[#FCFAF7] p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl max-w-[280px] md:max-w-[340px] border border-slate-50 reveal delay-300">
                <p className="text-slate-900 font-serif italic text-xl md:text-2xl leading-snug">"The most profound experiences happen in the gaps between the tides."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENHANCED ATOLLS SECTION */}
      <section className="py-20 sm:py-32 md:py-40 bg-[#FCFAF7] border-y border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 reveal">
            <div className="max-w-xl">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[1em] mb-8 block">Regional Mastery</span>
              <h3 className="text-4xl md:text-7xl font-serif font-bold italic leading-tight text-slate-900 tracking-tighter">Signature Atolls.</h3>
            </div>
            <Link to="/stays" className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.5em] border-b border-sky-500 pb-1 mb-4 hover:text-slate-900 hover:border-slate-900 transition-colors">Explore Geography</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 reveal">
            {signatureAtolls.map((atoll, i) => (
              <Link key={i} to={`/stays?q=${atoll.name}`} className={`group relative overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-1000 aspect-[3/4]`}>
                <img src={atoll.image} className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-110 grayscale-[10%] group-hover:grayscale-0" alt={atoll.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 flex flex-col items-start translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                  <span className="text-sky-400 text-[8px] font-bold uppercase tracking-[0.4em] mb-2">{atoll.count}</span>
                  <h4 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight group-hover:italic transition-all">{atoll.name}</h4>
                  <p className="text-[8px] text-white/50 uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">{atoll.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ENHANCED COLLECTION SECTION */}
      <section className="py-20 sm:py-32 md:py-48 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
          <div className="mb-20 reveal">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[1em] mb-8 block">Exclusive Portfolio</span>
            <h3 className="text-4xl md:text-8xl font-serif font-bold text-slate-900 tracking-tighter italic leading-none">The Collection.</h3>
          </div>
          <div className="reveal no-scrollbar overflow-x-auto flex gap-10 md:gap-16 pb-12 snap-x snap-mandatory">
            {featuredResorts.length > 0 ? featuredResorts.map((resort) => (
              <div key={resort.id} className="flex-shrink-0 w-[85vw] sm:w-[50vw] lg:w-[35vw] snap-start">
                <ResortCard resort={resort} />
              </div>
            )) : (
              <div className="py-20 text-center w-full">
                <p className="text-slate-500 uppercase tracking-widest text-[10px] animate-pulse">Consulting the archives...</p>
              </div>
            )}
          </div>
          <div className="mt-12 flex justify-between items-center reveal">
            <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-slate-950"></div>
              <div className="w-2 h-2 rounded-full bg-slate-100"></div>
              <div className="w-2 h-2 rounded-full bg-slate-100"></div>
            </div>
            <Link to="/stays" className="group relative flex items-center gap-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-950 border-b border-slate-200 group-hover:border-sky-500 transition-all pb-1">View Full Portfolio</span>
              <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-950 transition-all duration-700 shadow-sm">
                <svg className="w-4 h-4 text-slate-950 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ENHANCED EDITORIAL DISPATCHES SECTION */}
      <section className="py-20 sm:py-32 md:py-40 bg-[#FCFAF7] border-t border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 reveal">
            <div className="max-w-2xl">
              <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[1em] mb-8 block">Editorial Archive</span>
              <h3 className="text-4xl md:text-8xl font-serif font-bold text-slate-900 italic tracking-tighter leading-none">The Journal.</h3>
            </div>
            <Link to="/stories" className="text-[10px] font-bold text-slate-950 uppercase tracking-[0.5em] border-b border-slate-950 pb-2 mb-4 hover:text-sky-500 hover:border-sky-500 transition-all">View All Dispatches</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {recentStories.map((post, idx) => (
              <Link 
                key={post.id} 
                to={`/stories/${post.slug}`} 
                className="group reveal bg-white rounded-[3rem] p-6 shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-700"
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-8 bg-slate-50">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-slate-950/5 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/95 backdrop-blur px-5 py-2 rounded-full text-[8px] font-bold text-slate-900 uppercase tracking-[0.3em] shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="px-2">
                  <span className="text-slate-500 font-bold text-[8px] uppercase tracking-[0.5em] mb-3 block">
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <h4 className="text-2xl font-serif font-bold text-slate-900 mb-6 group-hover:italic group-hover:text-sky-600 transition-all duration-500 leading-tight">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-4 group">
                     <div className="w-8 h-[1px] bg-slate-200 group-hover:w-12 group-hover:bg-sky-500 transition-all duration-700"></div>
                     <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.4em] group-hover:text-slate-900 transition-colors">Read Narrative</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;