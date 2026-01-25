import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Accommodation, AccommodationType, TransferType, MealPlan } from '../types';
import { BLOG_POSTS, RESORTS } from '../constants';
import ResortCard from '../components/ResortCard';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [heroIndex, setHeroIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [typedPlaceholder, setTypedPlaceholder] = useState("");
  const [featuredResorts, setFeaturedResorts] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);

  const typingIdx = useRef(0);
  const charIdx = useRef(0);
  const isDeleting = useRef(false);
  const typingPhrases = ["Private Island", "Seaplane Transfer", "South Ari Atoll", "Luxury Overwater Villa"];

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=2000",
      title: "Nature Embraces Luxury",
      subtitle: "The Perspective of Silence"
    },
    {
      image: "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=2000",
      title: "Defined by Blue",
      subtitle: "Bespoke Maldivian Journeys"
    },
    {
      image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=2000",
      title: "Island Rituals",
      subtitle: "Curated Sanctuary Experiences"
    }
  ];

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('resorts')
          .select('*')
          .eq('is_featured', true)
          .limit(3);
        
        if (data && data.length > 0) {
          const mapped: Accommodation[] = data.map(item => ({
            id: item.id,
            name: item.name,
            slug: item.slug,
            type: (item.type || 'RESORT') as AccommodationType,
            atoll: item.atoll || 'Unknown',
            priceRange: item.price_range || '$$$$',
            rating: item.rating || 5,
            description: item.description || '',
            shortDescription: item.short_description || '',
            images: item.images || [],
            features: item.features || [],
            transfers: (item.transfers || []) as TransferType[],
            mealPlans: (item.meal_plans || []) as MealPlan[],
            uvp: item.uvp || 'Defined by perspective.',
            isFeatured: item.is_featured || false,
          }));
          setFeaturedResorts(mapped);
        } else {
          setFeaturedResorts(RESORTS.slice(0, 3));
        }
      } catch (err) {
        console.error("Supabase fetch failed:", err);
        setFeaturedResorts(RESORTS.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
    
    const heroTimer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(heroTimer);
  }, []);

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = typingPhrases[typingIdx.current];
      
      if (isDeleting.current) {
        setTypedPlaceholder(currentPhrase.substring(0, charIdx.current - 1));
        charIdx.current--;
      } else {
        setTypedPlaceholder(currentPhrase.substring(0, charIdx.current + 1));
        charIdx.current++;
      }

      if (!isDeleting.current && charIdx.current === currentPhrase.length) {
        setTimeout(() => { isDeleting.current = true; }, 2000);
      } else if (isDeleting.current && charIdx.current === 0) {
        isDeleting.current = false;
        typingIdx.current = (typingIdx.current + 1) % typingPhrases.length;
      }
    };

    const typingTimer = setTimeout(handleTyping, isDeleting.current ? 50 : 150);
    return () => clearTimeout(typingTimer);
  }, [typedPlaceholder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/stays?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  return (
    <div className="bg-[#FCFAF7] min-h-screen">
      {/* Dynamic Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {heroSlides.map((slide, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 transition-all duration-[2.5s] cubic-bezier(0.16, 1, 0.3, 1) ${idx === heroIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}
          >
            <img src={slide.image} className="w-full h-full object-cover" alt={slide.title} />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/60"></div>
          </div>
        ))}

        <div className="absolute inset-0 flex flex-col justify-center items-center px-6 text-center z-10">
          <div className="max-w-7xl mx-auto reveal active">
            <span className="text-white text-[10px] md:text-[12px] font-bold uppercase tracking-[1em] mb-12 block drop-shadow-lg transition-all duration-1000">
              {heroSlides[heroIndex].subtitle}
            </span>
            <h1 className="text-white text-6xl md:text-9xl lg:text-[11rem] font-serif font-bold italic leading-none tracking-tighter mb-16 drop-shadow-2xl transition-all duration-1000">
              {heroSlides[heroIndex].title}
            </h1>
            
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto group">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={typedPlaceholder}
                className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-10 py-6 md:py-8 text-white text-lg md:text-xl font-serif italic focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all placeholder:text-white/50 shadow-2xl"
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-slate-950 p-4 rounded-full hover:bg-sky-500 hover:text-white transition-all shadow-xl">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </form>
          </div>
        </div>

        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-4 z-10">
          {heroSlides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setHeroIndex(i)}
              className={`h-1 transition-all duration-1000 ${i === heroIndex ? 'w-12 bg-white' : 'w-4 bg-white/30'}`}
            />
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-40 md:py-64 px-6 reveal">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-sky-500 text-[10px] font-bold uppercase tracking-[1em] mb-12 block">The Philosophy</span>
          <p className="text-3xl md:text-6xl font-serif font-bold text-slate-900 leading-[1.3] italic mb-12">
            "We believe luxury isn't found in excess, but in the silence of a receding tide and the perspective of an endless blue."
          </p>
          <div className="h-px w-24 bg-amber-400 mx-auto"></div>
        </div>
      </section>

      {/* Featured Sanctuaries */}
      <section className="py-48 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12 reveal">
            <div className="max-w-2xl">
              <span className="text-sky-500 text-[10px] font-bold uppercase tracking-[0.8em] mb-6 block">The Portfolio</span>
              <h2 className="text-5xl md:text-8xl font-serif font-bold text-slate-900 leading-[0.9] italic tracking-tighter">Featured <br/> Sanctuaries.</h2>
            </div>
            <Link to="/stays" className="group flex items-center gap-6 pb-2 border-b-2 border-slate-950">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-950 group-hover:text-sky-500 transition-colors">Explore Collection</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse space-y-8">
                  <div className="aspect-[3/4] bg-slate-100 rounded-[3rem]"></div>
                  <div className="h-8 bg-slate-50 w-2/3 rounded-full"></div>
                </div>
              ))
            ) : (
              featuredResorts.map((resort, idx) => (
                <div key={resort.id} className="reveal" style={{ transitionDelay: `${idx * 150}ms` }}>
                  <ResortCard resort={resort} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Journal Snippet */}
      <section className="py-48 bg-[#FCFAF7]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <div className="lg:col-span-7 reveal">
            <div className="relative aspect-[16/10] rounded-[4rem] overflow-hidden shadow-2xl group">
               <img src={BLOG_POSTS[0]?.image || "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200"} className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-105" alt="Journal" />
            </div>
          </div>
          <div className="lg:col-span-5 reveal">
            <span className="text-sky-500 text-[10px] font-bold uppercase tracking-[1em] mb-12 block">The Journal</span>
            <h3 className="text-4xl md:text-6xl font-serif font-bold text-slate-950 italic mb-10 leading-tight">Industry <br/> Dispatches.</h3>
            <p className="text-slate-500 text-lg md:text-xl leading-loose mb-16 opacity-85 font-medium">
              Explore our latest thoughts on sustainable architecture, atoll biodiversity, and the shifting landscape of high-end travel.
            </p>
            <Link to="/stories" className="text-[11px] font-bold text-slate-950 uppercase tracking-[0.6em] border-b-2 border-slate-950 pb-3 hover:text-sky-500 hover:border-sky-500 transition-all w-fit block">
              Read Dispatches
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-64 bg-slate-950 text-white text-center overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
           <h2 className="text-[50vw] font-serif italic select-none">Serenity</h2>
        </div>
        <div className="max-w-4xl mx-auto px-6 reveal relative z-10">
          <span className="text-sky-400 text-[10px] font-bold uppercase tracking-[1em] mb-12 block">The Collective</span>
          <h3 className="text-6xl md:text-9xl font-serif font-bold italic mb-16 leading-none">Unrivaled <br/> Access.</h3>
          <p className="text-slate-400 text-sm md:text-lg uppercase tracking-[0.4em] mb-24 opacity-80 max-w-2xl mx-auto leading-loose">
            Join our private circle for unlisted sanctuary rates <br className="hidden md:block"/> and atoll news curated for the aesthetic soul.
          </p>
          <form className="flex flex-col md:flex-row gap-6 max-w-2xl mx-auto">
            <input type="email" placeholder="EMAIL ADDRESS" className="flex-grow bg-white/5 border border-white/10 rounded-full px-10 py-5 text-[10px] uppercase tracking-widest focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all text-white placeholder:text-slate-600" />
            <button className="bg-white text-slate-950 font-bold px-12 py-5 rounded-full text-[10px] uppercase tracking-[0.5em] hover:bg-sky-400 hover:text-white transition-all duration-700 shadow-xl">Join Us</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;