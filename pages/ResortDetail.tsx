import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, mapOffer } from '../lib/supabase';
import { RESORTS, OFFERS, EXPERIENCES } from '../constants';
import { Accommodation, AccommodationType, TransferType, MealPlan, Offer, Experience } from '../types';
import ResortCard from '../components/ResortCard';
import SEO from '../components/SEO';

const INQUIRY_STORAGE_KEY = 'serenity_inquiry_draft';

const ResortDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [resort, setResort] = useState<Accommodation | null>(null);
  const [allResorts, setAllResorts] = useState<Accommodation[]>([]);
  const [resortOffers, setResortOffers] = useState<Offer[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteData, setQuoteData] = useState({
    checkIn: '',
    checkOut: '',
    roomType: '',
    mealPlan: '',
    customerName: '',
    customerEmail: '',
    country: 'United Kingdom',
    countryCode: '+44',
    customerPhone: '',
    notes: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem(INQUIRY_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setQuoteData(prev => ({
          ...prev,
          customerName: parsed.customerName || '',
          customerEmail: parsed.customerEmail || '',
          customerPhone: parsed.customerPhone || '',
          country: parsed.country || 'United Kingdom',
          countryCode: parsed.countryCode || '+44'
        }));
      } catch (e) {
        console.error("Failed to load inquiry draft:", e);
      }
    }
  }, []);

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

          const { data: offersData } = await supabase.from('offers').select('*').eq('resort_id', resData.id);
          if (offersData && offersData.length > 0) {
            setResortOffers(offersData.map(mapOffer));
          } else {
            const local = OFFERS.filter(o => o.resortId === resData.id || o.resortName === resData.name);
            setResortOffers(local);
          }

          const { data: expData } = await supabase.from('experiences').select('*').eq('resort_id', resData.id);
          if (expData && expData.length > 0) {
            setExperiences(expData as Experience[]);
          } else {
            setExperiences(EXPERIENCES.filter(e => e.resortId === resData.id));
          }
        } else if (localBackup) {
          setResort(localBackup);
          setResortOffers(OFFERS.filter(o => o.resortSlug === slug));
          setExperiences(EXPERIENCES.filter(e => e.resortSlug === slug));
        }
      } catch (err) {
        console.error("Fetch details error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFullDetails();
  }, [slug]);

  const similarStays = useMemo(() => {
    if (!resort) return [];
    return allResorts
      .filter(r => r.slug !== resort.slug && r.atoll === resort.atoll)
      .slice(0, 3);
  }, [resort, allResorts]);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('inquiries').insert({
        resort_id: resort?.id,
        resort_name: resort?.name,
        customer_name: quoteData.customerName,
        customer_email: quoteData.customerEmail,
        customer_phone: `${quoteData.countryCode} ${quoteData.customerPhone}`,
        notes: `Stay at ${resort?.name}. Interest in ${quoteData.roomType}. Meal Plan: ${quoteData.mealPlan}. Dates: ${quoteData.checkIn} to ${quoteData.checkOut}`
      });
      if (error) throw error;
      setIsSubmitted(true);
      localStorage.setItem(INQUIRY_STORAGE_KEY, JSON.stringify({
        customerName: quoteData.customerName,
        customerEmail: quoteData.customerEmail,
        customerPhone: quoteData.customerPhone,
        countryCode: quoteData.countryCode
      }));
    } catch (err) {
      console.error("Inquiry error:", err);
      alert("Failed to send inquiry. Please contact us on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-parchment dark:bg-slate-950">
       <div className="w-10 h-10 border-2 border-slate-100 dark:border-white/5 border-t-sky-500 rounded-full animate-spin"></div>
    </div>
  );

  if (!resort) return (
    <div className="p-40 text-center bg-parchment dark:bg-slate-950 min-h-screen">
      <h1 className="text-4xl font-serif italic mb-8 dark:text-white">Sanctuary missing.</h1>
      <Link to="/stays" className="text-sky-500 font-bold uppercase tracking-widest text-[10px] border-b border-sky-100 dark:border-sky-900">Return to Portfolio</Link>
    </div>
  );

  return (
    <div className="bg-parchment dark:bg-slate-950 transition-colors duration-700 overflow-x-hidden">
      <SEO 
        title={`${resort.name} | Luxury Maldives Resort | Serenity Stays`} 
        description={resort.shortDescription}
        image={resort.images[0]}
      />

      {/* Hero Header */}
      <section className="relative h-[85vh] md:h-screen w-full overflow-hidden">
         <img src={resort.images[0]} className="w-full h-full object-cover scale-105" alt={resort.name} />
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
         <div className="absolute bottom-0 left-0 right-0 p-8 md:p-24 max-w-[1440px] mx-auto text-white">
            <Link to="/stays" className="text-white/60 font-bold text-[10px] uppercase tracking-[0.5em] mb-12 inline-block hover:text-white transition-all transform hover:-translate-x-2">← BACK TO PORTFOLIO</Link>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
               <div>
                  <span className="text-[10px] font-black text-sky-400 uppercase tracking-[1em] mb-8 block">THE SANCTUARY</span>
                  <h1 className="text-6xl md:text-9xl font-serif font-bold italic tracking-tighter leading-[0.9]">{resort.name}</h1>
                  <p className="text-lg md:text-2xl font-serif italic mt-8 opacity-80">{resort.atoll}</p>
               </div>
               <div className="flex items-center gap-8 mb-4">
                  <div className="h-px w-24 bg-white/20 hidden lg:block"></div>
                  <div className="bg-white/10 backdrop-blur-xl px-8 py-4 rounded-full border border-white/10 flex items-center gap-4">
                     <span className="text-[10px] font-black uppercase tracking-widest">Pricing</span>
                     <span className="text-sky-400 font-black">{resort.priceRange}</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Philosophy & Highlights */}
      <section className="py-24 md:py-48 max-w-[1440px] mx-auto px-6 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          <div className="lg:col-span-7">
            <span className="text-sky-500 font-black uppercase tracking-[1em] text-[10px] mb-12 block">Perspective</span>
            <p className="text-3xl md:text-5xl font-serif font-bold italic text-slate-900 dark:text-white leading-[1.3] mb-16 tracking-tight">
              "{resort.uvp}"
            </p>
            <div className="prose prose-xl prose-slate dark:prose-invert max-w-none">
               <p className="text-slate-600 dark:text-slate-400 leading-[2.2] text-lg md:text-xl font-medium opacity-90 mb-12">
                 {resort.description}
               </p>
            </div>
            
            {/* Horizontal Scroller for Experiences */}
            {experiences.length > 0 && (
              <div className="mt-32">
                <div className="flex justify-between items-center mb-12">
                   <h3 className="text-2xl md:text-4xl font-serif font-bold italic dark:text-white">Curated Experiences.</h3>
                   <div className="flex items-center gap-3">
                      <span className="text-[8px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-700 animate-pulse">Swipe to explore</span>
                      <div className="w-12 h-px bg-slate-100 dark:bg-slate-900"></div>
                   </div>
                </div>
                <div className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-8 -mx-6 px-6 lg:mx-0 lg:px-0">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="flex-shrink-0 w-[85vw] md:w-[28vw] snap-start group cursor-pointer">
                      <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 bg-slate-50 dark:bg-slate-900 shadow-sm group-hover:shadow-2xl transition-all duration-1000">
                        <img src={exp.image} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-105" alt={exp.title} />
                      </div>
                      <span className="text-[8px] font-black text-sky-500 uppercase tracking-widest mb-3 block">{exp.category}</span>
                      <h4 className="text-xl font-serif font-bold italic dark:text-white group-hover:text-sky-500 transition-colors">{exp.title}</h4>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 sticky top-32">
            <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-16 shadow-2xl border border-slate-100 dark:border-white/5 transition-colors">
               <h3 className="text-2xl md:text-4xl font-serif font-bold italic mb-6 dark:text-white">Initiate Planning.</h3>
               <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-12">
                 Our specialists are at your disposal for bespoke itinerary refinement.
               </p>
               {isSubmitted ? (
                 <div className="p-8 bg-sky-50 dark:bg-sky-950/20 rounded-3xl border border-sky-100 dark:border-sky-900 text-center animate-in fade-in slide-in-from-bottom-4">
                    <p className="text-sky-700 dark:text-sky-400 font-bold uppercase tracking-widest text-[10px]">Inquiry Dispatched Successfully.</p>
                 </div>
               ) : (
                 <form onSubmit={handleInquirySubmit} className="space-y-6">
                    <input 
                      type="text" 
                      required 
                      value={quoteData.customerName}
                      onChange={e => setQuoteData(prev => ({ ...prev, customerName: e.target.value }))}
                      placeholder="FULL IDENTITY" 
                      className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-full px-8 py-4 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-sky-500 transition-all dark:text-white border-none" 
                    />
                    <input 
                      type="email" 
                      required 
                      value={quoteData.customerEmail}
                      onChange={e => setQuoteData(prev => ({ ...prev, customerEmail: e.target.value }))}
                      placeholder="EMAIL CHANNEL" 
                      className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-full px-8 py-4 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-sky-500 transition-all dark:text-white border-none" 
                    />
                    <div className="grid grid-cols-2 gap-4">
                       <input 
                         type="text" 
                         value={quoteData.checkIn}
                         onChange={e => setQuoteData(prev => ({ ...prev, checkIn: e.target.value }))}
                         placeholder="ARRIVAL" 
                         className="bg-slate-50 dark:bg-slate-800/50 rounded-full px-8 py-4 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-sky-500 transition-all dark:text-white border-none" 
                       />
                       <input 
                         type="text" 
                         value={quoteData.checkOut}
                         onChange={e => setQuoteData(prev => ({ ...prev, checkOut: e.target.value }))}
                         placeholder="DEPARTURE" 
                         className="bg-slate-50 dark:bg-slate-800/50 rounded-full px-8 py-4 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-sky-500 transition-all dark:text-white border-none" 
                       />
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black py-6 rounded-full text-[10px] uppercase tracking-[0.6em] hover:bg-sky-500 dark:hover:bg-sky-400 transition-all duration-700 shadow-xl disabled:opacity-50"
                    >
                      {isSubmitting ? 'DISPATCHING...' : 'Send Inquiry'}
                    </button>
                    <p className="text-[7px] text-center text-slate-300 dark:text-slate-700 uppercase tracking-widest pt-4">Estimated Response: 24 Hours</p>
                 </form>
               )}
            </div>
          </div>
        </div>
      </section>

      {/* Room Types Grid */}
      {resort.roomTypes && resort.roomTypes.length > 0 && (
        <section className="py-24 md:py-48 bg-white dark:bg-slate-900 transition-colors">
           <div className="max-w-[1440px] mx-auto px-6 lg:px-24">
              <div className="text-center mb-32">
                 <span className="text-sky-500 font-black uppercase tracking-[1em] text-[10px] mb-8 block">Living Spaces</span>
                 <h2 className="text-4xl md:text-7xl font-serif font-bold italic dark:text-white tracking-tighter">Iconic Villas.</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                {resort.roomTypes.map((room, i) => (
                  <div key={i} className="group reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                    <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden mb-10 shadow-lg group-hover:shadow-2xl transition-all duration-1000 bg-slate-50 dark:bg-slate-800">
                      <img src={room.image} className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-105" alt={room.name} />
                      <div className="absolute top-8 left-8">
                         <span className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-5 py-2 rounded-full text-[9px] font-black text-slate-950 dark:text-white uppercase tracking-widest border dark:border-white/5">
                           {room.size || 'Iconic'}
                         </span>
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-4xl font-serif font-bold italic dark:text-white group-hover:text-sky-500 transition-colors mb-6">{room.name}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-loose mb-8 opacity-90">{room.description}</p>
                    <ul className="grid grid-cols-2 gap-4">
                      {room.highlights?.map((h, j) => (
                        <li key={j} className="flex items-center gap-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
           </div>
        </section>
      )}

      {/* Similar Stays */}
      {similarStays.length > 0 && (
        <section className="py-32 md:py-64 bg-parchment dark:bg-slate-950 transition-colors">
           <div className="max-w-[1440px] mx-auto px-6 lg:px-24">
              <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
                 <div className="max-w-xl">
                    <span className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.8em] mb-4 block">Neighborhood</span>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold italic dark:text-white tracking-tighter">Adjacent Sanctuaries.</h2>
                 </div>
                 <Link to="/stays" className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-950 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2 hover:border-sky-500 transition-all">Explore Atoll</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                 {similarStays.map(s => <ResortCard key={s.id} resort={s} />)}
              </div>
           </div>
        </section>
      )}
    </div>
  );
};

export default ResortDetail;