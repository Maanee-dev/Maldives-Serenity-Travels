
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { RESORTS } from '../constants';
import { Accommodation, AccommodationType, TransferType, MealPlan, RoomType, DiningVenue } from '../types';

const ResortDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [resort, setResort] = useState<Accommodation | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /**
   * ROBUST HIGHLIGHT PARSING
   * Handles native arrays, JSON strings, and CSV-escaped stringified arrays
   */
  const parseHighlights = (item: any): string[] => {
    if (Array.isArray(item)) return item;
    if (!item || item === '[]') return [];
    
    try {
      let cleaned = typeof item === 'string' ? item.trim() : item;
      if (typeof cleaned === 'string' && cleaned.startsWith('"') && cleaned.endsWith('"')) {
        cleaned = cleaned.slice(1, -1);
      }
      cleaned = typeof cleaned === 'string' ? cleaned.replace(/""/g, '"') : cleaned;
      const parsed = JSON.parse(cleaned);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      if (typeof item === 'string') {
        return item
          .split(',')
          .map(s => s.trim().replace(/^["\[]+|["\]]+$/g, ''))
          .filter(Boolean);
      }
      return [];
    }
  };

  useEffect(() => {
    const fetchFullDetails = async () => {
      setLoading(true);
      try {
        const localBackup = RESORTS.find(r => r.slug === slug);
        const { data: resData, error: resErr } = await supabase
          .from('resorts')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();
        
        if (resErr) console.warn('Supabase resort fetch error:', resErr);

        if (resData) {
          const [roomsResponse, diningResponse] = await Promise.all([
            supabase
              .from('room_types')
              .select('*')
              .eq('resort_id', resData.slug || slug),
            supabase
              .from('dining_venues')
              .select('*')
              .eq('resort_id', resData.slug || slug)
          ]);

          const mappedResort: Accommodation = {
            id: resData.id,
            name: resData.name,
            slug: resData.slug,
            type: (resData.type || localBackup?.type || 'RESORT') as AccommodationType,
            atoll: resData.atoll || localBackup?.atoll || 'Unknown Atoll',
            priceRange: resData.price_range || localBackup?.priceRange || '$$$$',
            rating: resData.rating || localBackup?.rating || 5,
            description: resData.description || localBackup?.description || '',
            shortDescription: resData.short_description || localBackup?.shortDescription || '',
            images: (resData.images && resData.images.length > 0) ? resData.images : (localBackup?.images || []),
            features: (resData.features && resData.features.length > 0) ? resData.features : (localBackup?.features || []),
            transfers: (resData.transfers || localBackup?.transfers || []) as TransferType[],
            mealPlans: (resData.meal_plans || localBackup?.mealPlans || []) as MealPlan[],
            uvp: resData.uvp || localBackup?.uvp || 'A sanctuary defined by perspective.',
            isFeatured: resData.is_featured || false,
            roomTypes: (roomsResponse.data && roomsResponse.data.length > 0)
              ? roomsResponse.data.map(r => ({
                  name: r.name,
                  description: r.description,
                  highlights: parseHighlights(r.highlights),
                  image: r.image,
                  size: r.size,
                  capacity: r.capacity
                }))
              : (localBackup?.roomTypes || []),
            diningVenues: (diningResponse.data && diningResponse.data.length > 0)
              ? diningResponse.data.map(d => ({
                  name: d.name,
                  cuisine: d.cuisine,
                  description: d.description,
                  highlights: parseHighlights(d.highlights),
                  image: d.image,
                  vibe: d.vibe
                }))
              : (localBackup?.diningVenues || [])
          };
          
          setResort(mappedResort);
          document.title = `${mappedResort.name} | Serenity Maldives`;
        } else if (localBackup) {
          setResort(localBackup);
          document.title = `${localBackup.name} | Serenity Maldives`;
        }
      } catch (error) {
        console.error('Data acquisition error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFullDetails();
    window.scrollTo(0, 0);
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
       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em] animate-pulse">Navigating the Atolls...</p>
    </div>
  );

  if (!resort) return (
    <div className="min-h-screen bg-[#FCFAF7] flex flex-col items-center justify-center px-6 text-center">
      <h2 className="text-4xl md:text-6xl font-serif font-bold italic mb-6 text-slate-900 tracking-tighter">Sanctuary not found.</h2>
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
      
      {/* Cinematic Hero */}
      <section className="relative w-full pt-20 md:pt-32 px-4 md:px-6 reveal active">
        <div className="relative aspect-[4/5] md:aspect-[21/9] w-full rounded-[2.5rem] md:rounded-[4.5rem] overflow-hidden shadow-2xl bg-slate-200">
          <img 
            src={resort.images[0] || 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200'} 
            alt={resort.name} 
            className="w-full h-full object-cover transition-transform duration-[10s] hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
             <span className="text-[10px] font-bold text-sky-400 uppercase tracking-[1em] mb-8 block">{resort.atoll}</span>
             <h1 className="text-5xl md:text-9xl font-serif font-bold text-white tracking-tighter italic leading-none drop-shadow-2xl">{resort.name}</h1>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-24 md:py-48 px-6">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-start">
          <div className="lg:col-span-7 reveal">
            <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[1em] mb-12 block">The Manifesto</span>
            <p className="text-3xl md:text-6xl font-serif font-bold italic text-slate-900 leading-[1.2] tracking-tight mb-16 underline underline-offset-[1.5rem] decoration-slate-100">
              "{resort.uvp}"
            </p>
            <div className="text-slate-500 text-lg md:text-xl leading-[2.2] font-medium opacity-90 space-y-8">
              <p>{resort.description}</p>
            </div>
          </div>
          <div className="lg:col-span-5 reveal">
            <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-xl border border-slate-50">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-900 mb-12 border-b border-slate-100 pb-6">Key Amenities</h3>
              <ul className="grid grid-cols-1 gap-6">
                {resort.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-6 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-[2] transition-transform"></div>
                    <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-16 pt-16 border-t border-slate-100 grid grid-cols-2 gap-8">
                <div>
                  <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest mb-2 block">Arrival</span>
                  <p className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">
                    {resort.transfers.map(t => t.replace('_', ' ')).join(' • ')}
                  </p>
                </div>
                <div>
                  <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest mb-2 block">Meal Plan</span>
                  <p className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">
                    {resort.mealPlans.map(m => m.replace('_', ' ')).join(' • ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Residences Carousel */}
      {resort.roomTypes && resort.roomTypes.length > 0 && (
        <section className="py-24 bg-white overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6">
            <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12 reveal">
              <div>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[1em] mb-8 block">Accommodations</span>
                <h3 className="text-4xl md:text-7xl font-serif font-bold text-slate-900 italic">The Residences.</h3>
              </div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-2">Private Island Sanctuaries</p>
            </div>
            
            <div className="flex gap-12 overflow-x-auto no-scrollbar pb-12 snap-x snap-mandatory">
              {resort.roomTypes.map((room, idx) => (
                <div key={idx} className="reveal flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[35vw] snap-start group" style={{ transitionDelay: `${idx * 150}ms` }}>
                  <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden shadow-sm mb-10 bg-slate-100">
                    <img 
                      src={room.image || 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=800'} 
                      alt={room.name} 
                      className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-110" 
                    />
                    <div className="absolute top-8 right-8 flex gap-4">
                      {room.size && <span className="bg-white/90 backdrop-blur px-5 py-2 rounded-full text-[8px] font-bold text-slate-900 uppercase tracking-widest shadow-sm">{room.size}</span>}
                    </div>
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-slate-900 mb-4 group-hover:italic transition-all">{room.name}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 opacity-80 mb-8">{room.description}</p>
                  <div className="flex flex-wrap gap-4">
                    {room.highlights && room.highlights.slice(0, 3).map((h, i) => (
                      <span key={i} className="text-[8px] font-bold text-slate-400 uppercase tracking-widest border border-slate-100 px-3 py-1 rounded-full">{h}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Culinary Portfolio - Horizontal Scroller */}
      {resort.diningVenues && resort.diningVenues.length > 0 && (
        <section className="py-24 md:py-48 px-6 bg-[#FCFAF7] overflow-hidden">
          <div className="max-w-[1440px] mx-auto">
             <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12 reveal">
                <div>
                  <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[1em] mb-8 block">Gastronomy</span>
                  <h3 className="text-4xl md:text-8xl font-serif font-bold text-slate-900 italic tracking-tighter">Culinary Portfolio.</h3>
                </div>
                <div className="flex gap-4 mb-4">
                   <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                   <div className="w-2 h-2 rounded-full bg-slate-900"></div>
                   <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                </div>
             </div>
             
             <div className="flex gap-16 md:gap-24 overflow-x-auto no-scrollbar pb-16 snap-x snap-mandatory">
                {resort.diningVenues.map((venue, idx) => (
                  <div key={idx} className="reveal flex-shrink-0 w-[80vw] md:w-[45vw] lg:w-[35vw] snap-start group">
                    <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden mb-12 shadow-2xl">
                       <img src={venue.image} alt={venue.name} className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" />
                       <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-all duration-700"></div>
                       <div className="absolute bottom-12 left-12 right-12">
                          <span className="text-[8px] font-bold text-white uppercase tracking-[0.6em] mb-4 block opacity-80">{venue.cuisine}</span>
                          <h4 className="text-3xl md:text-5xl font-serif font-bold text-white leading-none italic">{venue.name}</h4>
                       </div>
                    </div>
                    <div className="max-w-md px-4">
                       <p className="text-slate-500 text-lg leading-relaxed mb-10 italic">"{venue.description}"</p>
                       <div className="flex items-center gap-6">
                          <div className="w-12 h-px bg-slate-200"></div>
                          <span className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.4em]">{venue.vibe} Vibe</span>
                       </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </section>
      )}

      {/* Booking Concierge Form */}
      <section className="py-32 md:py-64 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
           <h2 className="text-[40vw] font-serif italic whitespace-nowrap leading-none">Inquiry</h2>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          {isSubmitted ? (
            <div className="text-center py-20 reveal active">
               <h3 className="text-5xl md:text-8xl font-serif font-bold text-white mb-12 italic">Your request is floating to us.</h3>
               <p className="text-sky-400 text-[10px] font-bold uppercase tracking-[0.5em] leading-loose">One of our sanctuary experts will reach out <br/> to refine your perspective within 24 hours.</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-24 reveal">
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-[1em] mb-12 block">Private Inquiries</span>
                <h3 className="text-4xl md:text-8xl font-serif font-bold text-white italic mb-12">The Gateway.</h3>
                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.4em] max-w-sm mx-auto leading-loose opacity-70">Define your dates and desires. We manage the rest.</p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-16 reveal">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="border-b border-white/10 py-4 focus-within:border-sky-500 transition-all">
                    <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-[0.5em] mb-4">Your Name</label>
                    <input type="text" required className="w-full bg-transparent text-white font-serif italic text-2xl outline-none placeholder:text-white/5" placeholder="Name" />
                  </div>
                  <div className="border-b border-white/10 py-4 focus-within:border-sky-500 transition-all">
                    <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-[0.5em] mb-4">Email Signature</label>
                    <input type="email" required className="w-full bg-transparent text-white font-serif italic text-2xl outline-none placeholder:text-white/5" placeholder="Email" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="border-b border-white/10 py-4 focus-within:border-sky-500 transition-all">
                    <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-[0.5em] mb-4">Travel Period</label>
                    <input type="text" className="w-full bg-transparent text-white font-serif italic text-2xl outline-none placeholder:text-white/5" placeholder="Dates" />
                  </div>
                  <div className="border-b border-white/10 py-4 focus-within:border-sky-500 transition-all">
                    <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-[0.5em] mb-4">Party Size</label>
                    <select className="w-full bg-transparent text-white font-serif italic text-2xl outline-none cursor-pointer">
                      <option className="bg-slate-950">Solo Escape</option>
                      <option className="bg-slate-950">Intimate Couple</option>
                      <option className="bg-slate-950">Family Ensemble</option>
                      <option className="bg-slate-950">Private Collective (6+)</option>
                    </select>
                  </div>
                </div>

                <div className="border-b border-white/10 py-4 focus-within:border-sky-500 transition-all">
                  <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-[0.5em] mb-4">The Vision</label>
                  <textarea rows={3} className="w-full bg-transparent text-white font-serif italic text-2xl outline-none placeholder:text-white/5 leading-relaxed" placeholder="Specific requirements or preferences..."></textarea>
                </div>

                <button type="submit" className="w-full bg-white text-slate-950 font-bold py-8 rounded-full text-[10px] uppercase tracking-[0.8em] hover:bg-sky-500 hover:text-white transition-all duration-700 shadow-2xl">
                  Initiate Request
                </button>
              </form>
            </>
          )}
        </div>
      </section>

      {/* Suggested Stays - Horizontal Scroller */}
      <section className="py-32 px-6 bg-white overflow-hidden">
         <div className="max-w-[1440px] mx-auto">
            <div className="flex justify-between items-end mb-24 reveal">
               <div>
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[1em] mb-8 block">Similar Sanctuaries</span>
                  <h3 className="text-4xl font-serif font-bold italic text-slate-900">The Atoll Collective.</h3>
               </div>
               <Link to="/stays" className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.5em] border-b border-sky-500 pb-1">View Full Portfolio</Link>
            </div>
            
            <div className="flex gap-12 overflow-x-auto no-scrollbar pb-12 snap-x snap-mandatory">
               {RESORTS.filter(r => r.slug !== slug).map((r, i) => (
                 <div key={i} className="reveal flex-shrink-0 w-[70vw] md:w-[35vw] lg:w-[22vw] snap-start">
                   <Link to={`/stays/${r.slug}`} className="group block">
                      <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-8 shadow-sm group-hover:shadow-xl transition-all duration-1000 bg-slate-100">
                         <img src={r.images[0]} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-105" alt={r.name} />
                         <div className="absolute inset-0 bg-slate-950/10"></div>
                      </div>
                      <h5 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest group-hover:text-sky-500 transition-colors">{r.name}</h5>
                      <span className="text-[8px] text-slate-400 font-bold uppercase tracking-[0.3em]">{r.atoll}</span>
                   </Link>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

export default ResortDetail;
