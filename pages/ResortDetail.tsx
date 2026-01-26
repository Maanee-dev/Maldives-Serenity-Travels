import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { RESORTS } from '../constants';
import { Accommodation, AccommodationType, TransferType, MealPlan } from '../types';
import ResortCard from '../components/ResortCard';

const ResortDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [resort, setResort] = useState<Accommodation | null>(null);
  const [allResorts, setAllResorts] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Quote Form State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteData, setQuoteData] = useState({
    checkIn: '',
    checkOut: '',
    roomType: '',
    mealPlan: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    notes: ''
  });

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
        return item.split(',').map(s => s.trim().replace(/^["\[]+|["\]]+$/g, '')).filter(Boolean);
      }
      return [];
    }
  };

  // Logic for Smart Similar Stays
  const similarStays = useMemo(() => {
    if (!resort || allResorts.length === 0) return [];
    
    const brandName = resort.name.split(' ')[0];
    let matches = allResorts.filter(r => r.slug !== slug && r.name.toLowerCase().includes(brandName.toLowerCase()));
    
    if (matches.length < 2) {
      const atollMatches = allResorts.filter(r => r.slug !== slug && r.atoll === resort.atoll && !matches.find(m => m.id === r.id));
      matches = [...matches, ...atollMatches];
    }
    
    if (matches.length < 3) {
      const typeMatches = allResorts.filter(r => r.slug !== slug && r.type === resort.type && !matches.find(m => m.id === r.id));
      matches = [...matches, ...typeMatches];
    }

    return matches.slice(0, 6);
  }, [resort, allResorts, slug]);

  useEffect(() => {
    const fetchFullDetails = async () => {
      setLoading(true);
      try {
        const { data: allData } = await supabase.from('resorts').select('*');
        if (allData) {
           const mapped = allData.map(item => ({ 
             ...item, 
             priceRange: item.price_range,
             transfers: item.transfers || [],
             mealPlans: item.meal_plans || [],
             roomTypes: item.room_types || [],
             diningVenues: item.dining_venues || [],
             images: item.images || []
           })) as unknown as Accommodation[];
           setAllResorts(mapped.length > 0 ? mapped : RESORTS);
        } else {
           setAllResorts(RESORTS);
        }

        const localBackup = RESORTS.find(r => r.slug === slug);
        const { data: resData } = await supabase.from('resorts').select('*').eq('slug', slug).maybeSingle();

        if (resData) {
          const rawRooms = (resData.room_types && resData.room_types.length > 0) ? resData.room_types : (localBackup?.roomTypes || []);
          const rawDining = (resData.dining_venues && resData.dining_venues.length > 0) ? resData.dining_venues : (localBackup?.diningVenues || []);

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
            roomTypes: rawRooms.map((r: any) => ({
              ...r,
              highlights: parseHighlights(r.highlights)
            })),
            diningVenues: rawDining.map((d: any) => ({
              ...d,
              highlights: parseHighlights(d.highlights)
            }))
          };
          setResort(mappedResort);
        } else if (localBackup) {
          setResort(localBackup);
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
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      }, { threshold: 0.1 });
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
      return () => observer.disconnect();
    }
  }, [loading, resort]);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resort) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('inquiries').insert({
        resort_id: resort.id,
        resort_name: resort.name,
        check_in: quoteData.checkIn,
        check_out: quoteData.checkOut,
        room_type: quoteData.roomType,
        meal_plan: quoteData.mealPlan,
        customer_name: quoteData.customerName,
        customer_email: quoteData.customerEmail,
        customer_phone: quoteData.customerPhone,
        notes: quoteData.notes
      });
      if (error) throw error;
      setIsSubmitted(true);
    } catch (err) {
      alert('We encountered an error processing your request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#FCFAF7] flex flex-col items-center justify-center">
       <div className="w-8 h-8 border-[1px] border-slate-200 border-t-sky-500 rounded-full animate-spin mb-8"></div>
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Consulting the Atolls...</p>
    </div>
  );

  if (!resort) return (
    <div className="min-h-screen bg-[#FCFAF7] flex flex-col items-center justify-center px-6 text-center">
      <h2 className="text-3xl font-serif font-bold italic mb-6 text-slate-900 tracking-tighter">Sanctuary not found.</h2>
      <Link to="/stays" className="text-sky-600 font-black uppercase tracking-[0.5em] text-[11px] underline underline-offset-8">Return to Portfolio</Link>
    </div>
  );

  return (
    <div className="bg-[#FCFAF7] min-h-screen selection:bg-sky-100 selection:text-sky-900 pb-20 overflow-x-hidden">
      
      {/* Cinematic Hero */}
      <section className="relative w-full pt-20 md:pt-28 lg:pt-32 px-4 md:px-6 reveal active">
        <div className="relative aspect-[4/5] md:aspect-[16/9] lg:aspect-[21/9] w-full rounded-[2rem] md:rounded-[3.5rem] lg:rounded-[4.5rem] overflow-hidden shadow-2xl bg-slate-200">
          <img src={resort.images[0]} alt={resort.name} className="w-full h-full object-cover transition-transform duration-[15s] ease-out hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-12">
             <span className="text-[11px] font-black text-sky-400 uppercase tracking-[0.8em] mb-4 md:mb-8 block reveal">{resort.atoll}</span>
             <h1 className="text-4xl md:text-7xl lg:text-9xl font-serif font-bold text-white tracking-tighter italic leading-[1.1] drop-shadow-2xl reveal active delay-300">{resort.name}</h1>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-20 md:py-32 lg:py-48 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 lg:gap-32 items-start">
          <div className="lg:col-span-7 reveal">
            <div className="flex items-center gap-6 mb-8 md:mb-12">
              <div className="w-10 h-px bg-sky-500"></div>
              <span className="text-[11px] font-black text-sky-600 uppercase tracking-[0.8em] block">The Manifesto</span>
            </div>
            <p className="text-2xl md:text-5xl lg:text-6xl font-serif font-bold italic text-slate-900 leading-[1.2] tracking-tight mb-12 md:mb-16">
              "{resort.uvp}"
            </p>
            <div className="text-slate-800 text-base md:text-xl leading-[2] md:leading-[2.2] font-semibold space-y-6 md:space-y-8 max-w-3xl">
              <p>{resort.description}</p>
            </div>
          </div>
          <div className="lg:col-span-5 reveal active delay-500">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border-[1px] border-slate-100">
              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-950 mb-8 md:mb-12 border-b-[1px] border-slate-50 pb-4 md:pb-6">Essential Amenities</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
                {resort.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-4 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover:scale-[1.5] transition-transform flex-shrink-0"></div>
                    <span className="text-[11px] md:text-[12px] font-black text-slate-900 uppercase tracking-[0.2em]">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-12 md:mt-16 pt-12 border-t-[1px] border-slate-50 grid grid-cols-2 gap-6 md:gap-8">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Arrival</span>
                  <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest leading-relaxed">
                    {resort.transfers.map(t => t.replace(/_/g, ' ')).join(' • ')}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Meal Plan</span>
                  <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest leading-relaxed">
                    {resort.mealPlans.map(m => m.replace(/_/g, ' ')).join(' • ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Residences Horizontal Scroller */}
      {resort.roomTypes && resort.roomTypes.length > 0 && (
        <section className="py-24 bg-white border-y-[1px] border-slate-50 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
             <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8 reveal">
                <div>
                   <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.8em] mb-4 block">Accommodation</span>
                   <h3 className="text-3xl md:text-5xl font-serif font-bold italic text-slate-950 tracking-tighter">The Residences.</h3>
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Explore the collection</p>
             </div>
             <div className="flex gap-8 overflow-x-auto no-scrollbar pb-8 snap-x snap-mandatory">
                {resort.roomTypes.map((room, i) => (
                  <div key={i} className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[35vw] snap-start reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                    <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 group">
                       <img src={room.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={room.name} />
                       <div className="absolute top-6 left-6 flex gap-2">
                          {room.size && <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-900 shadow-sm">{room.size}</span>}
                          {room.capacity && <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-900 shadow-sm">{room.capacity}</span>}
                       </div>
                    </div>
                    <h4 className="text-2xl font-serif font-bold text-slate-900 mb-4">{room.name}</h4>
                    <p className="text-slate-500 text-[13px] leading-relaxed mb-6 font-medium line-clamp-2">{room.description}</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-3">
                       {room.highlights.map((h, j) => (
                         <div key={j} className="flex items-center gap-2">
                           <div className="w-1 h-1 bg-sky-500 rounded-full"></div>
                           <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{h}</span>
                         </div>
                       ))}
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </section>
      )}

      {/* Gastronomy Section */}
      {resort.diningVenues && resort.diningVenues.length > 0 && (
        <section className="py-32 md:py-48 px-6 lg:px-12 bg-[#FCFAF7]">
           <div className="max-w-[1440px] mx-auto">
              <div className="text-center mb-24 reveal">
                 <span className="text-[11px] font-black text-sky-500 uppercase tracking-[1em] mb-6 block">Gastronomy</span>
                 <h3 className="text-4xl md:text-7xl font-serif font-bold italic text-slate-900 tracking-tighter leading-none">The Atoll Table.</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                 {resort.diningVenues.map((venue, i) => (
                    <div key={i} className={`flex flex-col reveal ${i % 2 !== 0 ? 'md:mt-32' : ''}`} style={{ transitionDelay: `${i * 150}ms` }}>
                       <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden mb-12 shadow-xl group">
                          <img src={venue.image} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-105" alt={venue.name} />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                          <div className="absolute bottom-10 left-10">
                             <span className="text-white text-[10px] font-black uppercase tracking-[0.5em]">{venue.cuisine}</span>
                          </div>
                       </div>
                       <div className="px-4">
                          <div className="flex items-center gap-4 mb-4">
                             <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full">{venue.vibe}</span>
                          </div>
                          <h4 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">{venue.name}</h4>
                          <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-8 font-medium italic opacity-85">{venue.description}</p>
                          <div className="space-y-3">
                             {venue.highlights.map((h, j) => (
                               <div key={j} className="flex items-center gap-4">
                                 <div className="w-6 h-px bg-slate-200"></div>
                                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{h}</span>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </section>
      )}

      {/* Inquiry Form Section */}
      <section className="py-32 md:py-48 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
          <h2 className="text-[30vw] font-serif italic whitespace-nowrap -rotate-12">Serenity</h2>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
           <div className="reveal">
              <span className="text-[11px] font-black text-sky-400 uppercase tracking-[1em] mb-12 block">Secure Your Stay</span>
              <h3 className="text-5xl md:text-8xl font-serif font-bold italic mb-12 tracking-tighter leading-tight">Initiate Inquiry.</h3>
              <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-16 opacity-80 uppercase tracking-widest font-medium">
                Our bespoke planning team will curate a tailored itinerary for your Maldivian journey. Expect a dispatch within 24 hours.
              </p>
           </div>
           
           <div className="reveal delay-300">
             {isSubmitted ? (
               <div className="bg-white text-slate-950 p-12 md:p-20 rounded-[3.5rem] text-center shadow-2xl animate-in zoom-in-95 duration-700">
                  <span className="text-[10px] font-black text-sky-500 uppercase tracking-[0.8em] mb-10 block">Success</span>
                  <h4 className="text-4xl font-serif font-bold italic mb-8">Dispatch Received</h4>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] leading-[2.5] mb-12">We are currently consulting the atolls for your request.</p>
                  <button onClick={() => setIsSubmitted(false)} className="text-[10px] font-black text-slate-950 uppercase tracking-[0.6em] border-b-[1px] border-slate-950 pb-2 hover:text-sky-600 hover:border-sky-600 transition-colors">Submit Another</button>
               </div>
             ) : (
               <form onSubmit={handleQuoteSubmit} className="space-y-6 md:space-y-8 bg-white/5 backdrop-blur-3xl p-8 md:p-16 rounded-[3.5rem] border border-white/10 shadow-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                     <div className="space-y-3">
                        <label className="text-[9px] font-black text-white/40 uppercase tracking-widest ml-4">Full Identity</label>
                        <input type="text" required placeholder="NAME" className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all text-white placeholder:text-white/20" value={quoteData.customerName} onChange={e => setQuoteData({...quoteData, customerName: e.target.value})} />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[9px] font-black text-white/40 uppercase tracking-widest ml-4">Digital Signature</label>
                        <input type="email" required placeholder="EMAIL" className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all text-white placeholder:text-white/20" value={quoteData.customerEmail} onChange={e => setQuoteData({...quoteData, customerEmail: e.target.value})} />
                     </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                     <div className="space-y-3">
                        <label className="text-[9px] font-black text-white/40 uppercase tracking-widest ml-4">Check-In</label>
                        <input type="date" required className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all text-white" value={quoteData.checkIn} onChange={e => setQuoteData({...quoteData, checkIn: e.target.value})} />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[9px] font-black text-white/40 uppercase tracking-widest ml-4">Check-Out</label>
                        <input type="date" required className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all text-white" value={quoteData.checkOut} onChange={e => setQuoteData({...quoteData, checkOut: e.target.value})} />
                     </div>
                  </div>
                  <div className="space-y-3">
                     <label className="text-[9px] font-black text-white/40 uppercase tracking-widest ml-4">Vision & Requests</label>
                     <textarea rows={4} placeholder="SHARE YOUR UNIQUE PERSPECTIVE..." className="w-full bg-white/5 border border-white/10 rounded-[2.5rem] px-8 py-6 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all text-white placeholder:text-white/20 resize-none" value={quoteData.notes} onChange={e => setQuoteData({...quoteData, notes: e.target.value})}></textarea>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full bg-white text-slate-950 font-black py-7 rounded-full text-[11px] uppercase tracking-[0.8em] hover:bg-sky-400 hover:text-white transition-all duration-700 shadow-2xl active:scale-[0.98] disabled:opacity-50">
                    {isSubmitting ? 'INITIATING...' : 'REQUEST QUOTATION'}
                  </button>
               </form>
             )}
           </div>
        </div>
      </section>

      {/* Similar Sanctuaries Horizontal Scroller */}
      {similarStays.length > 0 && (
        <section className="py-24 md:py-48 bg-[#FCFAF7] border-t-[1px] border-slate-50">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="mb-16 md:mb-24 reveal">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.8em] mb-4 block">Refined Selection</span>
              <h3 className="text-3xl md:text-5xl lg:text-7xl font-serif font-bold italic text-slate-950 tracking-tighter">Similar Sanctuaries.</h3>
            </div>
            
            <div className="flex gap-8 overflow-x-auto no-scrollbar pb-12 snap-x snap-mandatory">
              {similarStays.map((s, idx) => (
                <div key={s.id} className="flex-shrink-0 w-[80vw] md:w-[45vw] lg:w-[30vw] snap-start reveal" style={{ transitionDelay: `${idx * 100}ms` }}>
                  <ResortCard resort={s} />
                </div>
              ))}
              {/* Final Explore All Card */}
              <div className="flex-shrink-0 w-[80vw] md:w-[45vw] lg:w-[30vw] snap-start reveal flex items-center justify-center" style={{ transitionDelay: `${similarStays.length * 100}ms` }}>
                <Link to="/stays" className="group w-full aspect-[4/5] rounded-[3rem] bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-12 text-center hover:bg-slate-950 transition-all duration-1000">
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-sky-400 uppercase tracking-[1em] mb-8 block">Explore All</span>
                  <h4 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 group-hover:text-white leading-tight italic">Find your <br /> sanctuary.</h4>
                  <div className="mt-10 w-16 h-16 rounded-full border border-slate-200 group-hover:border-sky-500 flex items-center justify-center transition-all duration-700">
                    <svg className="w-6 h-6 text-slate-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Breadcrumb / Return Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-50 flex justify-between items-center reveal">
         <Link to="/stays" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.6em] hover:text-slate-950 transition-colors flex items-center gap-4">
           <span className="text-lg">←</span> Return to Portfolio
         </Link>
         <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Defined by Perspective • 2026</span>
      </div>

    </div>
  );
};

export default ResortDetail;