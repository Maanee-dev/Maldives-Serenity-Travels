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

  const signatureAtolls = [
    { name: 'Noonu Atoll', image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=800', count: '12 Stays', desc: 'Untouched Blue' },
    { name: 'Baa Atoll', image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800', count: '18 Stays', desc: 'UNESCO Biosphere' },
    { name: 'North Male', image: 'https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=800', count: '24 Stays', desc: 'The Epicenter' },
    { name: 'Ari Atoll', image: 'https://images.unsplash.com/photo-1502602898657-3e917247a183?auto=format&fit=crop&q=80&w=800', count: '15 Stays', desc: 'Whale Shark Paths' }
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
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={typedPlaceholder} className="w-full bg-white/5 backdrop-blur-3xl border border-white/20 rounded-full pl-10 pr-24 py-6 text-white text-[11px] font-bold uppercase tracking-[0.4em] outline-none focus:bg-white focus:text-slate-950 placeholder:text-white/30 shadow-2xl" />
                <button type="submit" className="absolute right-2 top-2 bottom-2 bg-slate-900 text-white w-16 rounded-full flex items-center justify-center hover:bg-sky-500 transition-all shadow-xl"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></button>
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
                  alt="Maldives Serenity Travels logo" 
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

      {/* BESPOKE SERVICES GRID */}
      <section className="py-24 md:py-48 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 text-center mb-24 reveal">
           <span className="text-sky-500 font-black uppercase tracking-[1em] text-[10px] mb-8 block">The Serenity Standard</span>
           <h2 className="text-4xl md:text-7xl font-serif font-bold text-slate-950 italic tracking-tighter">Bespoke Handling.</h2>
        </div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
           {[
             { title: 'VIP Arrivals', desc: 'Fast-track handling from touchdown to seaplane departure.' },
             { title: 'Atoll Portfolios', desc: 'Curated selection of properties aligned with your aesthetic.' },
             { title: 'Direct Access', desc: 'Pre-negotiated privileges and upgrades via human experts.' }
           ].map((service, i) => (
             <div key={i} className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 reveal" style={{ transitionDelay: `${i * 100}ms` }}>
               <h3 className="text-2xl font-serif font-bold mb-6 italic">{service.title}</h3>
               <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] leading-loose">{service.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* Signature Stays */}
      <section className="py-24 md:py-48 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="flex justify-between items-end mb-24 reveal">
            <div>
              <span className="text-sky-500 font-black uppercase tracking-[1em] text-[10px] mb-8 block">The Portfolio</span>
              <h2 className="text-4xl md:text-7xl font-serif font-bold text-slate-950 italic tracking-tighter">Signature Stays.</h2>
            </div>
            <Link to="/stays" className="text-[10px] font-black uppercase tracking-[0.5em] border-b border-slate-950 pb-2 hover:text-sky-500 hover:border-sky-500 transition-all">Explore All Stays</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {featuredResorts.map(resort => (
              <ResortCard key={resort.id} resort={resort} />
            ))}
          </div>
        </div>
      </section>

      {/* Atoll Navigation */}
      <section className="py-24 md:py-48 bg-[#FCFAF7]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="mb-24 reveal text-center">
            <span className="text-sky-500 font-black uppercase tracking-[1em] text-[10px] mb-8 block">Regional Intelligence</span>
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-slate-950 italic tracking-tighter">Iconic Atolls.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {signatureAtolls.map((atoll, i) => (
              <Link to={`/stays?q=${atoll.name}`} key={i} className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden reveal shadow-xl" style={{ transitionDelay: `${i * 100}ms` }}>
                <img src={atoll.image} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110" alt={atoll.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute bottom-10 left-10 right-10">
                  <span className="text-sky-400 font-black text-[8px] uppercase tracking-widest mb-3 block">{atoll.desc}</span>
                  <h3 className="text-2xl font-serif font-bold text-white mb-1 group-hover:italic transition-all">{atoll.name}</h3>
                  <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest">{atoll.count}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The Journal */}
      <section className="py-24 md:py-48 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 reveal">
            <div className="max-w-2xl">
              <span className="text-sky-500 font-black uppercase tracking-[1em] text-[10px] mb-8 block">The Journal</span>
              <h2 className="text-4xl md:text-7xl font-serif font-bold text-slate-950 italic tracking-tighter">Island Dispatches.</h2>
            </div>
            <Link to="/stories" className="text-[10px] font-black uppercase tracking-[0.5em] border-b border-slate-950 pb-2 hover:text-sky-500 hover:border-sky-500 transition-all">Access Archives</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            {recentStories.map((post, i) => (
              <Link to={`/stories/${post.slug}`} key={post.id} className="group reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-10 shadow-sm group-hover:shadow-2xl transition-all duration-700 bg-slate-100">
                  <img src={post.image} className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" alt={post.title} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 block">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                <h3 className="text-2xl font-serif font-bold text-slate-950 mb-6 group-hover:text-sky-600 transition-colors leading-tight italic">{post.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 opacity-80">{post.excerpt}</p>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-950 border-b border-slate-100 pb-1 group-hover:border-slate-950 transition-all">Read Narrative</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Global CTA */}
      <section className="py-48 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
          <h2 className="text-[40vw] font-serif italic -rotate-12 translate-y-1/2 select-none">Atoll</h2>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 reveal">
          <span className="text-sky-400 font-black uppercase tracking-[1em] text-[10px] mb-12 block">Your Maldivian Perspective</span>
          <h3 className="text-4xl md:text-7xl lg:text-9xl font-serif font-bold italic mb-12 tracking-tighter leading-tight">Begin The Journey.</h3>
          <p className="text-slate-400 text-sm md:text-lg font-medium leading-loose mb-24 opacity-80 uppercase tracking-[0.4em]">
             Our travel specialists are available <br className="hidden md:block"/> for bespoke consultations and itinerary refinement.
          </p>
          <Link to="/plan" className="inline-block bg-white text-slate-950 font-black px-16 py-7 rounded-full hover:bg-sky-400 hover:text-white transition-all duration-700 uppercase tracking-[0.8em] text-[10px] shadow-2xl">
             Initiate Discovery
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;