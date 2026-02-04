
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
          const mappedResorts = resortsData.map(mapResort);
          setFeaturedResorts(mappedResorts);
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
          setRecentStories(BLOG_POSTS.slice(0, 3));
        }
      } catch (err) {
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
    }
  ];

  const searchKeywords = ["Soneva Jani...", "Private Atolls...", "Underwater Dining..."];

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

  return (
    <div className="bg-[#FCFAF7] selection:bg-sky-100 selection:text-sky-900 overflow-x-hidden">
      <SEO 
        title="Defined by Perspective" 
        description="A bespoke boutique agency crafting unrivaled journeys across the Maldivian atolls. Curated luxury for the discerning traveler."
        path="/"
      />
      
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
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 bg-sky-500 text-white px-8 py-3 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-sky-400 transition-all">Explore</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Resorts */}
      <section className="py-32 md:py-48 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12 reveal">
            <div className="max-w-2xl">
              <span className="text-[11px] font-black text-sky-500 uppercase tracking-[0.8em] mb-6 block">Collection</span>
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-8 leading-tight tracking-tighter">Bespoke Sanctuaries.</h2>
              <p className="text-slate-500 text-lg leading-relaxed font-medium">Curated luxury across the Maldivian atolls, defined by perspective and silence.</p>
            </div>
            <Link to="/stays" className="group flex items-center gap-6 pb-2 border-b-2 border-slate-900">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-900">Explore Portfolio</span>
              <span className="text-xl group-hover:translate-x-2 transition-transform">&rarr;</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
            {featuredResorts.map(resort => (
              <ResortCard key={resort.id} resort={resort} />
            ))}
          </div>
        </div>
      </section>

      {/* Journal Section */}
      <section className="py-32 md:py-48 px-6 lg:px-12 bg-[#FCFAF7] border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32 reveal">
            <span className="text-[11px] font-black text-sky-500 uppercase tracking-[1em] mb-6 block">The Journal</span>
            <h2 className="text-6xl md:text-8xl font-serif font-bold italic text-slate-900 tracking-tighter">Editorial Dispatches.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
            {recentStories.map(post => (
              <Link key={post.id} to={`/stories/${post.slug}`} className="group block reveal">
                <div className="aspect-[4/5] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden mb-10 shadow-sm group-hover:shadow-2xl transition-all duration-1000 bg-slate-100">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105" />
                </div>
                <span className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-4 block">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                <h3 className="text-2xl font-serif font-bold text-slate-950 mb-6 group-hover:text-sky-600 transition-colors leading-tight italic">{post.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium line-clamp-2">{post.excerpt}</p>
              </Link>
            ))}
          </div>
          <div className="mt-32 text-center reveal">
            <Link to="/stories" className="text-[10px] font-black text-slate-950 uppercase tracking-[0.8em] border-b-2 border-slate-950 pb-2 hover:text-sky-600 hover:border-sky-600 transition-all">View All Stories</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
