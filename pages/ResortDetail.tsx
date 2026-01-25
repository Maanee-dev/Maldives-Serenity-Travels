
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { RESORTS } from '../constants';
import { Accommodation, AccommodationType, TransferType, MealPlan } from '../types';

const ResortDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [resort, setResort] = useState<Accommodation | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Quote Form State
  const [formStep, setFormStep] = useState(1);
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
              name: r.name,
              description: r.description,
              highlights: parseHighlights(r.highlights),
              image: r.image,
              size: r.size,
              capacity: r.capacity
            })),
            diningVenues: rawDining.map((d: any) => ({
              name: d.name,
              cuisine: d.cuisine,
              description: d.description,
              highlights: parseHighlights(d.highlights),
              image: d.image,
              vibe: d.vibe
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

      {/* Quote Engine - Refined Minimalist Dark UI */}
      <section className="py-24 md:py-40 lg:py-64 bg-slate-950 relative overflow-hidden" id="booking">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          {isSubmitted ? (
            <div className="text-center py-24 reveal active">
               <h3 className="text-5xl font-serif font-bold text-white mb-12 italic tracking-tight">Vision Received.</h3>
               <p className="text-sky-400 text-[12px] font-black uppercase tracking-[1em] leading-[2.5] max-w-sm mx-auto mb-16">
                 Our specialists will refine your bespoke portfolio for {resort.name} and reach out within 24 hours.
               </p>
               <button onClick={() => { setIsSubmitted(false); setFormStep(1); }} className="text-[11px] font-black text-white uppercase tracking-[0.5em] border-b-[1px] border-white/40 pb-2 hover:border-white transition-all">Submit Another Request</button>
            </div>
          ) : (
            <>
              <div className="text-center mb-16 md:mb-24 reveal">
                <span className="text-[12px] font-black text-sky-400 uppercase tracking-[1em] mb-12 block">BESPOKE QUOTE ENGINE</span>
                <h3 className="text-3xl md:text-7xl font-serif font-bold text-white italic mb-12 tracking-tighter">Initiate Journey.</h3>
                
                <div className="flex justify-center items-center gap-12 mb-16">
                   {[1, 2, 3, 4].map(i => (
                     <div key={i} className="flex flex-col items-center gap-4 group">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-black transition-all duration-700 border-[1px] ${formStep === i ? 'bg-white border-white text-slate-950 shadow-[0_0_20px_rgba(255,255,255,0.15)]' : formStep > i ? 'bg-sky-500 border-sky-500 text-white' : 'bg-transparent border-white/20 text-white/40'}`}>
                          {i}
                        </div>
                        <span className={`text-[8px] font-black uppercase tracking-widest transition-all ${formStep === i ? 'text-white' : 'text-white/20'}`}>
                          {['Dates', 'Residence', 'Dining', 'Identity'][i-1]}
                        </span>
                     </div>
                   ))}
                </div>
              </div>

              <div className="max-w-3xl mx-auto">
                {formStep === 1 && (
                  <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                       <div className="space-y-4 border-b-[1px] border-white/10 focus-within:border-white transition-all pb-4">
                          <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Arrival Date</label>
                          <input type="date" value={quoteData.checkIn} onChange={(e) => setQuoteData(prev => ({ ...prev, checkIn: e.target.value }))} className="w-full bg-transparent text-white font-serif italic text-2xl outline-none" />
                       </div>
                       <div className="space-y-4 border-b-[1px] border-white/10 focus-within:border-white transition-all pb-4">
                          <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Departure Date</label>
                          <input type="date" value={quoteData.checkOut} onChange={(e) => setQuoteData(prev => ({ ...prev, checkOut: e.target.value }))} className="w-full bg-transparent text-white font-serif italic text-2xl outline-none" />
                       </div>
                    </div>
                    <button onClick={() => setFormStep(2)} disabled={!quoteData.checkIn || !quoteData.checkOut} className="w-full bg-white text-slate-950 font-black py-7 rounded-full text-[12px] uppercase tracking-[0.6em] hover:bg-sky-500 hover:text-white transition-all duration-700 disabled:opacity-20 shadow-xl">Define Residence →</button>
                  </div>
                )}

                {/* Simplified dynamic content for steps 2-4 */}
                {formStep === 2 && (
                   <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {resort.roomTypes?.slice(0, 4).map((room, i) => (
                          <button key={i} onClick={() => { setQuoteData(prev => ({ ...prev, roomType: room.name })); setFormStep(3); }} className={`group relative aspect-[16/10] rounded-3xl overflow-hidden border-[1px] transition-all duration-700 ${quoteData.roomType === room.name ? 'border-white scale-[0.98]' : 'border-white/10 hover:border-white/40'}`}>
                             <img src={room.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" alt={room.name} />
                             <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                             <div className="absolute bottom-6 left-6 text-left">
                                <p className="text-[12px] font-black text-white uppercase tracking-widest">{room.name}</p>
                             </div>
                          </button>
                        ))}
                     </div>
                     <button onClick={() => setFormStep(1)} className="w-full text-[10px] font-black text-white/40 uppercase tracking-[0.5em] hover:text-white transition-colors">← Back to Calendar</button>
                   </div>
                )}

                {formStep === 3 && (
                   <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {resort.mealPlans.map((plan) => (
                          <button key={plan} onClick={() => { setQuoteData(prev => ({ ...prev, mealPlan: plan })); setFormStep(4); }} className={`p-10 rounded-3xl border-[1px] text-left transition-all duration-500 ${quoteData.mealPlan === plan ? 'bg-white text-slate-950 border-white' : 'bg-transparent border-white/10 text-white/50 hover:border-white/30'}`}>
                             <span className="text-[12px] font-black uppercase tracking-[0.4em]">{plan.replace(/_/g, ' ')}</span>
                          </button>
                        ))}
                     </div>
                     <button onClick={() => setFormStep(2)} className="w-full text-[10px] font-black text-white/40 uppercase tracking-[0.5em] hover:text-white transition-colors">← Back to Residence</button>
                   </div>
                )}

                {formStep === 4 && (
                   <form onSubmit={handleQuoteSubmit} className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                     <div className="space-y-10">
                        <div className="border-b-[1px] border-white/10 py-4 focus-within:border-white transition-all">
                           <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-4">Identity Name</label>
                           <input type="text" required value={quoteData.customerName} onChange={(e) => setQuoteData(prev => ({ ...prev, customerName: e.target.value }))} className="w-full bg-transparent text-white font-serif italic text-2xl md:text-3xl outline-none" placeholder="..." />
                        </div>
                        <div className="border-b-[1px] border-white/10 py-4 focus-within:border-white transition-all">
                           <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-4">Digital Signature Email</label>
                           <input type="email" required value={quoteData.customerEmail} onChange={(e) => setQuoteData(prev => ({ ...prev, customerEmail: e.target.value }))} className="w-full bg-transparent text-white font-serif italic text-2xl md:text-3xl outline-none" placeholder="..." />
                        </div>
                     </div>
                     <button type="submit" disabled={isSubmitting} className="w-full bg-white text-slate-950 font-black py-8 rounded-full text-[13px] uppercase tracking-[0.8em] hover:bg-sky-500 hover:text-white transition-all duration-700 shadow-2xl disabled:opacity-50">{isSubmitting ? 'Consulting Servers...' : 'Request Bespoke Portfolio'}</button>
                   </form>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default ResortDetail;
