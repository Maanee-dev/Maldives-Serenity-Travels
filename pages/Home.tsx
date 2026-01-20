import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RESORTS, OFFERS, BLOG_POSTS } from '../constants';
import ResortCard from '../components/ResortCard';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [heroIndex, setHeroIndex] = useState(0); // 0 = video, 1-3 = images
  const [typingText, setTypingText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  const heroImages = [
    "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=90&w=1920",
    "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=90&w=1920",
    "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=90&w=1920"
  ];
  
  const placeholders = [
    "Soneva Jani Water Villa...",
    "Private Sandbank Picnic...",
    "Baa Atoll Dive Sites...",
    "Underwater Dining Experience...",
    "Ultra-Luxury Honeymoon Stays..."
  ];

  // Typing Animation Logic
  useEffect(() => {
    let currentIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      const currentFullText = placeholders[currentIdx];
      
      if (isDeleting) {
        setTypingText(currentFullText.substring(0, charIdx - 1));
        charIdx--;
        typingSpeed = 50;
      } else {
        setTypingText(currentFullText.substring(0, charIdx + 1));
        charIdx++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIdx === currentFullText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        currentIdx = (currentIdx + 1) % placeholders.length;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    };

    const typingTimeout = setTimeout(type, 1000);
    return () => clearTimeout(typingTimeout);
  }, []);

  // Hero Carousel Logic (8 seconds per slide)
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % (heroImages.length + 1));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Reveal Animation Trigger
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .reveal-left').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/stays?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const featuredResorts = RESORTS.slice(0, 3);

  return (
    <div className="bg-[#FCFAF7] overflow-x-hidden">
      {/* Cinematic Master Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Background Visual Layers */}
        <div className="absolute inset-0 z-0">
          {/* Video Layer (Slide 0) */}
          <div className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${heroIndex === 0 ? 'opacity-100' : 'opacity-0'}`}>
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-luxury-island-resort-in-the-maldives-32551-large.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Image Slides (Slides 1, 2, 3) */}
          {heroImages.map((img, idx) => (
            <div 
              key={idx}
              className={`absolute inset-0 transition-all duration-[3000ms] ease-out ${heroIndex === idx + 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
              style={{ 
                backgroundImage: `url(${img})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center' 
              }}
            />
          ))}
          
          {/* Editorial Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30"></div>
          <div className="absolute inset-0 bg-sky-950/5"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-6xl px-6 text-center reveal active">
          <span className="text-[10px] md:text-[12px] font-bold uppercase tracking-[1em] text-white/80 mb-10 block drop-shadow-sm">
            Bespoke Maldivian Journeys
          </span>
          <h1 className="text-6xl md:text-9xl lg:text-[10rem] font-serif font-bold text-white mb-20 leading-[0.85] tracking-tighter italic drop-shadow-2xl">
            Defined By <br /> 
            <span className="not-italic text-white">Perspective.</span>
          </h1>

          {/* Luxury Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative group">
            <div className="relative overflow-hidden bg-white/10 backdrop-blur-3xl rounded-full border border-white/20 p-2 flex items-center transition-all duration-700 hover:bg-white/20 hover:border-white/40 focus-within:bg-white focus-within:border-white focus-within:shadow-2xl shadow-xl">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={typingText}
                className="flex-grow bg-transparent px-10 py-6 text-white focus:text-slate-950 outline-none text-xs md:text-sm font-bold uppercase tracking-widest placeholder:text-white/40"
              />
              <button 
                type="submit"
                className="bg-slate-950 text-white w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center hover:bg-sky-500 transition-all duration-500 shadow-lg group-hover:scale-105"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            
            {/* Quick Suggestions */}
            <div className="mt-8 flex justify-center gap-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              {['Soneva', 'Private Atoll', 'Underwater'].map(term => (
                <button 
                  key={term}
                  type="button"
                  onClick={() => setSearchQuery(term)}
                  className="text-[9px] font-bold text-white/50 uppercase tracking-[0.3em] hover:text-white transition-colors border-b border-transparent hover:border-white"
                >
                  {term}
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* Cinematic Scroll Indicator */}
        <div className="absolute bottom-16 flex flex-col items-center gap-6 opacity-40">
           <span className="text-[8px] font-bold text-white uppercase tracking-[0.8em] rotate-180 [writing-mode:vertical-lr]">Explore</span>
           <div className="w-[1px] h-20 bg-white/30 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-white animate-[scroll_2s_infinite]"></div>
           </div>
        </div>
      </section>

      {/* Philosophy Section - Generous Padding */}
      <section className="py-40 md:py-64 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-7 reveal">
               <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[1em] mb-12 block">The Ethos</span>
               <h2 className="text-5xl md:text-8xl font-serif font-bold text-slate-950 leading-[1] mb-16 italic tracking-tight">
                 Architecture <br/> In <span className="text-sky-500 not-italic">Dialogue</span> <br/> With Nature.
               </h2>
               <div className="h-[2px] w-24 bg-amber-400 mb-16"></div>
               <p className="text-slate-500 text-lg md:text-xl leading-[2] font-medium opacity-80 max-w-2xl">
                 Serenity is a boutique collection of Maldivian stays where minimalism meets the majestic. We curate experiences for the discerning traveler, ensuring every journey is defined by silence, space, and a unique perspective.
               </p>
            </div>
            <div className="lg:col-span-5 reveal transition-all duration-1000 delay-300">
               <div className="relative aspect-[4/5] overflow-hidden rounded-[4rem] shadow-2xl group">
                 <img 
                   src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=1200" 
                   className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" 
                   alt="Minimalist Luxury"
                 />
                 <div className="absolute inset-0 bg-slate-950/10"></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection Grid */}
      <section className="py-40 md:py-64 bg-[#FCFAF7] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 md:mb-32 gap-12 reveal">
            <div className="max-grow">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.8em] mb-6 block">Our Portfolio</span>
               <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 leading-tight tracking-tighter">Iconic Stays</h2>
            </div>
            <Link to="/stays" className="group flex items-center gap-8 pb-4 border-b-2 border-slate-950 hover:border-sky-500 transition-all">
               <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-900 group-hover:text-sky-500 transition-colors">The Full Collection</span>
               <svg className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
               </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {featuredResorts.map((resort, idx) => (
              <div key={resort.id} className="reveal" style={{ transitionDelay: `${idx * 200}ms` }}>
                <ResortCard resort={resort} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-40 md:py-64 bg-slate-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
             <div className="lg:col-span-5 order-2 lg:order-1 reveal">
                <div className="relative aspect-square overflow-hidden rounded-[5rem] shadow-[0_50px_100px_-20px_rgba(14,165,233,0.3)]">
                   <img src="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Experiences" />
                </div>
             </div>
             <div className="lg:col-span-7 order-1 lg:order-2 reveal active">
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-[1em] mb-12 block">Curated Living</span>
                <h2 className="text-5xl md:text-8xl font-serif font-bold mb-16 italic tracking-tight leading-[0.9]">
                  Beyond <br/> The <span className="text-sky-400 not-italic">Horizon.</span>
                </h2>
                <p className="text-slate-400 text-lg md:text-xl leading-[2] mb-16 opacity-80 max-w-xl">
                  Discover Maldivian culture and biodiversity through private expeditions, underwater gastronomy, and castaway retreats designed specifically for your perspective.
                </p>
                <Link to="/experiences" className="inline-flex items-center gap-10 group">
                   <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-700">
                      <svg className="w-6 h-6 text-white group-hover:text-slate-950 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                   </div>
                   <span className="text-[11px] font-bold uppercase tracking-[0.5em] group-hover:text-sky-400 transition-colors">Start Your Journey</span>
                </Link>
             </div>
          </div>
        </div>
      </section>

      {/* Journal Section */}
      <section className="py-40 md:py-64 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-32 reveal">
           <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.8em] mb-8 block">The Journal</span>
           <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate-950 italic">Travel Stories</h2>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-20">
          {BLOG_POSTS.slice(0, 2).map((post, idx) => (
            <Link key={post.id} to={`/stories/${post.slug}`} className="group reveal" style={{ transitionDelay: `${idx * 300}ms` }}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-[3rem] mb-12">
                 <img src={post.image} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" alt={post.title} />
                 <div className="absolute top-8 left-8 bg-white/90 backdrop-blur px-6 py-2 rounded-full text-[9px] font-bold text-slate-900 uppercase tracking-widest shadow-xl">
                    Travel Guide
                 </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6 group-hover:italic transition-all duration-500 leading-tight">
                {post.title}
              </h3>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest flex items-center gap-6">
                <span>By {post.author}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-40 bg-[#FCFAF7] border-t border-slate-100">
         <div className="max-w-4xl mx-auto px-6 text-center reveal">
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate-950 mb-12 tracking-tight italic">Serenity Circle</h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.4em] mb-20 leading-loose">
              Join our private collective for unrivaled access to <br/> limited engagements and Maldivian heritage news.
            </p>
            <form className="relative max-w-xl mx-auto flex items-center border-b-2 border-slate-200 focus-within:border-slate-950 transition-colors pb-4 group">
               <input 
                 type="email" 
                 placeholder="EMAIL ADDRESS" 
                 className="w-full bg-transparent px-2 py-4 text-[11px] font-bold uppercase tracking-[0.5em] outline-none placeholder:text-slate-300" 
               />
               <button className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-950 hover:text-sky-500 transition-colors">Join</button>
            </form>
         </div>
      </section>
      
      <style>{`
        @keyframes scroll {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};

export default Home;
