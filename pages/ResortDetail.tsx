import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Accommodation, AccommodationType, TransferType, RoomType, DiningVenue, MealPlan } from '../types';

const ResortDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [resort, setResort] = useState<Accommodation | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchFullDetails = async () => {
      setLoading(true);
      try {
        const { data: resData, error: resErr } = await supabase
          .from('resorts')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();
        
        if (resErr) throw resErr;

        if (resData) {
          const { data: roomData } = await supabase
            .from('rooms')
            .select('*')
            .eq('resort_id', resData.id);

          const { data: diningData } = await supabase
            .from('dining')
            .select('*')
            .eq('resort_id', resData.id);

          const mappedResort: Accommodation = {
            id: resData.id,
            name: resData.name,
            slug: resData.slug,
            type: (resData.type || 'RESORT') as AccommodationType,
            atoll: resData.atoll || 'Unknown Atoll',
            priceRange: resData.price_range || '$$$$',
            rating: resData.rating || 5,
            description: resData.description || '',
            shortDescription: resData.short_description || '',
            images: resData.images || [],
            features: resData.features || [],
            transfers: (resData.transfers || []) as TransferType[],
            mealPlans: (resData.meal_plans || []) as MealPlan[],
            uvp: resData.uvp || 'A sanctuary defined by perspective.',
            isFeatured: resData.is_featured || false,
            roomTypes: (roomData || []) as RoomType[],
            diningVenues: (diningData || []) as DiningVenue[]
          };

          setResort(mappedResort);
          
          // SEO Metadata
          document.title = `${mappedResort.name} | Serenity Maldives Portfolio`;
          
          // Structured Data (JSON-LD)
          const scriptId = 'resort-jsonld';
          let script = document.getElementById(scriptId) as HTMLScriptElement;
          if (!script) {
            script = document.createElement('script');
            script.type = 'application/ld+json';
            script.id = scriptId;
            document.head.appendChild(script);
          }
          script.innerHTML = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Hotel",
            "name": mappedResort.name,
            "description": mappedResort.shortDescription,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": mappedResort.atoll,
              "addressCountry": "Maldives"
            },
            "starRating": {
              "@type": "Rating",
              "ratingValue": mappedResort.rating
            },
            "image": mappedResort.images
          });
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFullDetails();
    window.scrollTo(0, 0);

    return () => {
      const script = document.getElementById('resort-jsonld');
      if (script && document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [slug]);

  useEffect(() => {
    if (!loading && resort) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
      return () => observer.disconnect();
    }
  }, [loading, resort]);

  if (loading) return (
    <div className="min-h-screen bg-[#FCFAF7] flex flex-col items-center justify-center">
       <div className="w-12 h-12 border-4 border-slate-100 border-t-sky-500 rounded-full animate-spin mb-8"></div>
       <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.5em] animate-pulse">Navigating the Atolls...</p>
    </div>
  );

  if (!resort) return (
    <div className="min-h-screen bg-[#FCFAF7] flex flex-col items-center justify-center px-6 text-center">
      <h2 className="text-4xl md:text-6xl font-serif font-bold italic mb-6 text-slate-900 tracking-tighter text-sky-500">Sanctuary not found.</h2>
      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.6em] mb-12">The island you seek has faded into the blue.</p>
      <Link to="/stays" className="bg-slate-950 text-white px-12 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-sky-500 transition-all duration-700 shadow-xl">Return to Portfolio</Link>
    </div>
  );

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="bg-[#FCFAF7] min-h-screen selection:bg-sky-100 selection:text-sky-900 pb-32 overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative w-full pt-20 md:pt-32 px-4 md:px-6 reveal active">
        <div className="relative aspect-[4/5] md:aspect-[21/9] w-full rounded-[2.5rem] md:rounded-[4.5rem] overflow-hidden shadow-2xl bg-slate-200">
          <img 
            src={resort.images[0] || 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200'} 
            alt={resort.name} 
            className="w-full h-full object-cover scale-100 transition-transform duration-[30s] hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
          <div className="absolute bottom-10 left-8 md:bottom-20 md:left-20 max-w-5xl">
            <span className="inline-block bg-sky-500 text-white px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.6em] mb-6 shadow-xl">
              {resort.atoll}
            </span>
            <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-serif font-bold text-white tracking-tighter italic leading-[0.85] drop-shadow-2xl">
              {resort.name}
            </h1>
          </div>
        </div>
      </section>

      {/* 2. INTRO SECTION */}
      <section className="max-w-[1440px] mx-auto px-6 pt-20 md:pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
          <div className="lg:col-span-8 space-y-24 reveal">
            <nav className="flex items-center text-slate-300 text-[9px] font-bold uppercase tracking-[0.6em] gap-5 mb-10">
              <Link to="/stays" className="hover:text-sky-500 transition-colors">Portfolio</Link>
              <span className="text-amber-400 opacity-50">/</span>
              <span className="text-slate-900 truncate max-w-[150px] md:max-w-none">{resort.name}</span>
            </nav>
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-slate-900 leading-[1.1] italic tracking-tight">
              "{resort.uvp}"
            </h2>
            <p className="text-slate-500 leading-[2.2] text-lg md:text-2xl font-medium opacity-90 max-w-4xl">
              {resort.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-10">
              {resort.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-slate-200 flex-shrink-0 flex items-center justify-center group-hover:bg-slate-950 group-hover:border-slate-950 transition-all duration-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-500 group-hover:bg-white"></div>
                  </div>
                  <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.4em]">{feature}</h4>
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4 relative">
            <div className="lg:sticky lg:top-32">
              <div className="bg-white rounded-[3.5rem] p-10 md:p-14 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.08)] border border-slate-50 reveal">
                {isSubmitted ? (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-10">
                       <svg className="w-8 h-8 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h4 className="text-2xl font-serif font-bold italic mb-4">Vision Received.</h4>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-loose">A curator will be in touch shortly.</p>
                  </div>
                ) : (
                  <div>
                    <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.6em] mb-10 block">Consultation</span>
                    <h3 className="text-3xl font-serif font-bold text-slate-900 mb-8 italic text-sky-500">Define the Journey.</h3>
                    <form onSubmit={handleFormSubmit} className="space-y-8">
                      <div className="border-b border-slate-100 pb-4 focus-within:border-slate-950 transition-colors">
                        <label className="block text-[8px] font-bold text-slate-300 uppercase tracking-[0.5em] mb-2">Identity</label>
                        <input type="text" required placeholder="NAME" className="w-full bg-transparent text-[11px] font-bold uppercase tracking-widest outline-none placeholder:text-slate-100" />
                      </div>
                      <div className="border-b border-slate-100 pb-4 focus-within:border-slate-950 transition-colors">
                        <label className="block text-[8px] font-bold text-slate-300 uppercase tracking-[0.5em] mb-2">Contact</label>
                        <input type="email" required placeholder="EMAIL" className="w-full bg-transparent text-[11px] font-bold uppercase tracking-widest outline-none placeholder:text-slate-100" />
                      </div>
                      <button type="submit" className="w-full bg-slate-950 text-white font-bold py-6 rounded-full text-[10px] uppercase tracking-[0.6em] hover:bg-sky-500 transition-all duration-700 shadow-xl">
                        Request Availability
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 3. THE RESIDENCES */}
      {resort.roomTypes && resort.roomTypes.length > 0 && (
        <section className="mt-40 md:mt-64 bg-white py-32 md:py-48 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6">
            <div className="text-center mb-24 reveal">
              <span className="text-[9px] font-bold text-sky-500 uppercase tracking-[1em] mb-6 block">Private Sanctuaries</span>
              <h3 className="text-5xl md:text-8xl font-serif font-bold text-slate-900 italic tracking-tighter mb-10">The Residences.</h3>
              <div className="h-px w-24 bg-amber-400 mx-auto"></div>
            </div>
            
            <div className="no-scrollbar overflow-x-auto flex gap-8 md:gap-12 pb-12 snap-x snap-mandatory px-4">
              {resort.roomTypes.map((room, idx) => (
                <div key={idx} className="flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] snap-center group">
                  <div className="relative aspect-[4/5] md:aspect-[16/10] rounded-[3.5rem] overflow-hidden mb-10 shadow-2xl">
                    <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-[12s] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/10"></div>
                  </div>
                  <div className="max-w-2xl px-4">
                    <h4 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6 group-hover:italic transition-all duration-500">{room.name}</h4>
                    <p className="text-slate-500 text-lg leading-relaxed mb-8 opacity-90 font-medium">{room.description}</p>
                    <div className="flex gap-3 flex-wrap">
                       {room.highlights && room.highlights.map(h => (
                         <span key={h} className="text-[9px] font-bold text-sky-500 uppercase tracking-widest border border-sky-100 px-4 py-2 rounded-full">{h}</span>
                       ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. CULINARY PORTFOLIO */}
      {resort.diningVenues && resort.diningVenues.length > 0 && (
        <section className="mt-40 md:mt-64 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6">
            <div className="text-center mb-24 reveal">
              <span className="text-[9px] font-bold text-sky-500 uppercase tracking-[1em] mb-6 block">Gastronomic Rituals</span>
              <h3 className="text-5xl md:text-8xl font-serif font-bold text-slate-900 italic tracking-tighter mb-10">Culinary Portfolio.</h3>
              <div className="h-px w-24 bg-amber-400 mx-auto"></div>
            </div>

            <div className="no-scrollbar overflow-x-auto flex gap-8 md:gap-16 pb-12 snap-x snap-mandatory px-4">
              {resort.diningVenues.map((venue, idx) => (
                <div key={idx} className="flex-shrink-0 w-[80vw] md:w-[45vw] lg:w-[32vw] snap-center group">
                  <div className="relative aspect-[3/4] rounded-[4rem] overflow-hidden mb-10 shadow-2xl">
                    <img src={venue.image} alt={venue.name} className="w-full h-full object-cover transition-transform duration-[15s] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
                    <div className="absolute bottom-12 left-10 right-10">
                       <span className="text-sky-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">{venue.cuisine}</span>
                       <h4 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 group-hover:italic transition-all duration-500 leading-tight">
                         {venue.name}
                       </h4>
                       <p className="text-white/60 text-[10px] uppercase font-bold tracking-[0.3em]">{venue.vibe}</p>
                    </div>
                  </div>
                  <div className="px-4">
                    <p className="text-slate-500 text-base leading-relaxed mb-8 font-medium opacity-90 italic">
                      "{venue.description}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. WELLNESS SECTION */}
      <section className="max-w-[1440px] mx-auto px-6 mt-40 md:mt-64 reveal">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          <div className="lg:col-span-7">
            <span className="text-sky-500 text-[10px] font-bold uppercase tracking-[1em] mb-12 block">The Sanctuary</span>
            <h3 className="text-5xl md:text-8xl font-serif font-bold text-slate-900 italic mb-10 leading-[0.9]">Sacred <br className="hidden md:block"/> Spaces.</h3>
            <p className="text-slate-500 text-lg md:text-2xl leading-[2] mb-16 opacity-90 font-medium">
              A vessel of tranquility where traditional botanical wisdom converges with modern hydrothermal excellence. We curate silence as the ultimate luxury.
            </p>
            <div className="flex flex-col sm:flex-row gap-12 sm:items-center">
              <button className="text-[10px] font-bold text-slate-950 uppercase tracking-[0.6em] border-b-2 border-slate-950 pb-3 hover:text-sky-500 hover:border-sky-500 transition-all w-fit">
                Explore Wellness Menu
              </button>
              <div className="hidden sm:block h-px w-24 bg-slate-100"></div>
              <span className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.4em]">Service Daily: 09:00 — 21:00</span>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl relative group">
              <img 
                src="https://images.unsplash.com/photo-1544161515-436cefd54c37?auto=format&fit=crop&q=80&w=800" 
                alt="Spa" 
                className="w-full h-full object-cover scale-100 transition-transform duration-[15s] group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. SUSTAINABILITY SECTION */}
      <section className="mt-40 md:mt-64 relative overflow-hidden group min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80&w=1200" 
             alt="Conservation" 
             className="w-full h-full object-cover brightness-[0.4] transition-transform duration-[20s] group-hover:scale-110"
           />
        </div>
        <div className="max-w-[1440px] mx-auto px-6 relative z-10 w-full text-center lg:text-left">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-6 reveal">
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-[1em] mb-12 block">Conservation Manifesto</span>
                <h3 className="text-6xl md:text-[8rem] font-serif font-bold text-white italic leading-none mb-10 tracking-tighter">Infinite <br/> Legacy.</h3>
                <p className="text-slate-300 text-lg md:text-xl leading-[2] mb-16 opacity-90 max-w-xl mx-auto lg:mx-0">
                  Operating with a zero-waste mandate and total solar dependency, we are dedicated to the preservation of the Indian Ocean's delicate equilibrium.
                </p>
                <Link to="/plan" className="inline-block bg-white text-slate-950 font-bold px-12 py-6 rounded-full text-[10px] uppercase tracking-[0.6em] hover:bg-sky-500 hover:text-white transition-all duration-700">
                  Our Sustainability Blueprint
                </Link>
              </div>
           </div>
        </div>
      </section>

    </div>
  );
};

export default ResortDetail;