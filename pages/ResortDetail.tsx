
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

  /**
   * ROBUST HIGHLIGHT PARSING
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
          const rawRooms = (resData.room_types && resData.room_types.length > 0) 
            ? resData.room_types 
            : (localBackup?.roomTypes || []);

          const rawDining = (resData.dining_venues && resData.dining_venues.length > 0)
            ? resData.dining_venues
            : (localBackup?.diningVenues || []);

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
      console.error('Quote submission error:', err);
      alert('We encountered an error processing your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#FCFAF7] flex flex-col items-center justify-center">
       <div className="w-10 h-10 border-2 border-slate-100 border-t-sky-500 rounded-full animate-spin mb-8"></div>
       <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] animate-pulse">Consulting the Atolls...</p>
    </div>
  );

  if (!resort) return (
    <div className="min-h-screen bg-[#FCFAF7] flex flex-col items-center justify-center px-6 text-center">
      <h2 className="text-3xl md:text-5xl font-serif font-bold italic mb-6 text-slate-900 tracking-tighter">Sanctuary not found.</h2>
      <Link to="/stays" className="text-sky-600 font-black uppercase tracking-[0.5em] text-[11px] underline decoration-sky-100 underline-offset-8">Return to Portfolio</Link>
    </div>
  );

  return (
    <div className="bg-[#FCFAF7] min-h-screen selection:bg-sky-100 selection:text-sky-900 pb-20 overflow-x-hidden">
      
      {/* Cinematic Hero */}
      <section className="relative w-full pt-20 md:pt-28 lg:pt-32 px-4 md:px-6 reveal active">
        <div className="relative aspect-[4/5] md:aspect-[16/9] lg:aspect-[21/9] w-full rounded-[2rem] md:rounded-[3.5rem] lg:rounded-[4.5rem] overflow-hidden shadow-2xl bg-slate-200">
          <img 
            src={resort.images[0] || 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200'} 
            alt={resort.name} 
            className="w-full h-full object-cover transition-transform duration-[15s] ease-out hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-12">
             <span className="text-[10px] md:text-[11px] font-black text-sky-400 uppercase tracking-[0.8em] mb-4 md:mb-8 block reveal">{resort.atoll}</span>
             <h1 className="text-4xl md:text-7xl lg:text-9xl font-serif font-bold text-white tracking-tighter italic leading-[1.1] drop-shadow-2xl reveal active delay-300">{resort.name}</h1>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-20 md:py-32 lg:py-48 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 lg:gap-32 items-start">
          <div className="lg:col-span-7 reveal">
            <div className="flex items-center gap-6 mb-8 md:mb-12">
              <div className="w-10 h-1 bg-sky-500"></div>
              <span className="text-[11px] font-black text-sky-600 uppercase tracking-[0.8em] block">The Manifesto</span>
            </div>
            <p className="text-2xl md:text-5xl lg:text-6xl font-serif font-bold italic text-slate-900 leading-[1.2] tracking-tight mb-12 md:mb-16 underline underline-offset-[1rem] md:underline-offset-[1.5rem] decoration-slate-100">
              "{resort.uvp}"
            </p>
            <div className="text-slate-800 text-base md:text-xl leading-[2] md:leading-[2.2] font-semibold space-y-6 md:space-y-8 max-w-3xl">
              <p>{resort.description}</p>
            </div>
          </div>
          <div className="lg:col-span-5 reveal active delay-500">
            <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 lg:p-16 shadow-xl border-2 border-slate-100">
              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-950 mb-8 md:mb-12 border-b-2 border-slate-100 pb-4 md:pb-6">Essential Amenities</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
                {resort.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-4 group">
                    <div className="w-2 h-2 rounded-full bg-amber-500 group-hover:scale-[1.5] transition-transform flex-shrink-0"></div>
                    <span className="text-[11px] md:text-[12px] font-black text-slate-900 uppercase tracking-[0.2em]">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-12 md:mt-16 pt-12 md:pt-16 border-t-2 border-slate-100 grid grid-cols-2 gap-6 md:gap-8">
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

      {/* The Residences Section */}
      {resort.roomTypes && resort.roomTypes.length > 0 && (
        <section className="py-20 md:py-32 bg-white border-y-2 border-slate-50 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 reveal">
              <div>
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.8em] mb-6 md:mb-8 block">Accommodations</span>
                <h3 className="text-3xl md:text-5xl lg:text-7xl font-serif font-bold text-slate-900 italic tracking-tighter">The Residences.</h3>
              </div>
              <p className="text-slate-900 text-[11px] font-black uppercase tracking-[0.3em] mb-2">Private Island Sanctuaries</p>
            </div>
            
            <div className="flex gap-8 md:gap-12 overflow-x-auto no-scrollbar pb-12 snap-x snap-mandatory">
              {resort.roomTypes.map((room, idx) => (
                <div key={idx} className="reveal flex-shrink-0 w-[82vw] sm:w-[50vw] md:w-[45vw] lg:w-[35vw] snap-start group" style={{ transitionDelay: `${idx * 150}ms` }}>
                  <div className="relative aspect-[16/11] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-md mb-8 bg-slate-100 border-2 border-slate-100">
                    <img 
                      src={room.image || 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=800'} 
                      alt={room.name} 
                      className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-110" 
                    />
                    <div className="absolute top-6 right-6 flex flex-col gap-2">
                      {room.size && <span className="bg-white/95 backdrop-blur px-4 py-2 rounded-full text-[10px] font-black text-slate-950 uppercase tracking-widest shadow-xl text-center border border-slate-100">{room.size}</span>}
                    </div>
                  </div>
                  <h4 className="text-xl md:text-2xl font-serif font-bold text-slate-900 mb-3 group-hover:italic group-hover:text-sky-600 transition-all">{room.name}</h4>
                  <p className="text-slate-900 text-sm leading-relaxed font-semibold line-clamp-2 opacity-80 mb-6">{room.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Culinary Portfolio */}
      {resort.diningVenues && resort.diningVenues.length > 0 && (
        <section className="py-20 md:py-32 lg:py-48 px-6 lg:px-12 bg-[#FCFAF7] overflow-hidden">
          <div className="max-w-[1440px] mx-auto">
             <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 reveal">
                <div>
                  <span className="text-[11px] font-black text-sky-600 uppercase tracking-[0.8em] mb-6 md:mb-8 block">Gastronomy</span>
                  <h3 className="text-3xl md:text-6xl lg:text-8xl font-serif font-bold text-slate-900 italic tracking-tighter">Culinary Portfolio.</h3>
                </div>
                <p className="text-slate-900 text-[11px] font-black uppercase tracking-[0.3em] mb-2">Refined Island Flavours</p>
             </div>
             
             <div className="flex gap-8 md:gap-16 lg:gap-24 overflow-x-auto no-scrollbar pb-12 snap-x snap-mandatory">
                {resort.diningVenues.map((venue, idx) => (
                  <div key={idx} className="reveal flex-shrink-0 w-[82vw] sm:w-[50vw] md:w-[45vw] lg:w-[32vw] snap-start group">
                    <div className="relative aspect-[3/4] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden mb-10 shadow-2xl border-2 border-white">
                       <img src={venue.image} alt={venue.name} className="w-full h-full object-cover transition-transform duration-[12s] group-hover:scale-110" />
                       <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-all duration-700"></div>
                       <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12">
                          <span className="text-[10px] font-black text-sky-400 uppercase tracking-[0.4em] mb-3 block opacity-100">{venue.cuisine}</span>
                          <h4 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-none italic group-hover:tracking-wider transition-all duration-700">{venue.name}</h4>
                       </div>
                    </div>
                    <div className="max-w-md px-2">
                       <p className="text-slate-950 text-base md:text-lg leading-relaxed mb-8 italic font-bold">"{venue.description}"</p>
                       <div className="flex items-center gap-6">
                          <div className="w-12 h-0.5 bg-slate-300"></div>
                          <span className="text-[11px] font-black text-slate-950 uppercase tracking-[0.4em]">{venue.vibe}</span>
                       </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </section>
      )}

      {/* BESPOKE QUOTE ENGINE SECTION - IMPROVED VISIBILITY */}
      <section className="py-24 md:py-40 lg:py-64 bg-slate-950 relative overflow-hidden" id="booking">
        <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
           <h2 className="text-[40vw] font-serif italic whitespace-nowrap leading-none">Inquiry</h2>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          {isSubmitted ? (
            <div className="text-center py-24 reveal active">
               <h3 className="text-5xl md:text-8xl font-serif font-bold text-white mb-12 italic tracking-tight">Vision Received.</h3>
               <p className="text-sky-400 text-[12px] font-black uppercase tracking-[1em] leading-[2.5] max-w-sm mx-auto mb-16">
                 Our specialists will refine your bespoke portfolio for {resort.name} and reach out within 24 hours.
               </p>
               <button 
                 onClick={() => { setIsSubmitted(false); setFormStep(1); }}
                 className="text-[11px] font-black text-white uppercase tracking-[0.5em] border-b-2 border-white pb-2 hover:text-sky-400 hover:border-sky-400 transition-all"
               >
                 Submit Another Request
               </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-16 md:mb-24 reveal">
                <span className="text-[12px] font-black text-sky-400 uppercase tracking-[1em] mb-12 block">BESPOKE QUOTE ENGINE</span>
                <h3 className="text-3xl md:text-7xl font-serif font-bold text-white italic mb-12 tracking-tighter">Initiate Journey.</h3>
                
                {/* Step Indicator with higher contrast */}
                <div className="flex justify-center items-center gap-6 mb-16">
                   {[1, 2, 3, 4].map(i => (
                     <div 
                      key={i} 
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-[12px] font-black transition-all duration-700 border-2 ${formStep === i ? 'bg-sky-500 border-sky-400 text-white shadow-[0_0_20px_rgba(14,165,233,0.6)] scale-110' : formStep > i ? 'bg-white border-white text-slate-950' : 'bg-transparent border-white/40 text-white/40'}`}
                     >
                       {i}
                     </div>
                   ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-3xl border-2 border-white/20 rounded-[3rem] p-8 md:p-16 shadow-2xl">
                
                {/* STEP 1: CALENDAR */}
                {formStep === 1 && (
                  <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex items-center gap-4">
                       <span className="text-[11px] font-black text-sky-400 uppercase tracking-widest">PHASE A</span>
                       <h4 className="text-2xl font-serif text-white italic">When will you arrive?</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       <div className="space-y-4">
                          <label className="text-[10px] font-black text-white/80 uppercase tracking-widest">Check In Date</label>
                          <input 
                            type="date" 
                            required
                            value={quoteData.checkIn}
                            onChange={(e) => setQuoteData(prev => ({ ...prev, checkIn: e.target.value }))}
                            className="w-full bg-white/10 border-2 border-white/20 rounded-2xl px-6 py-6 text-white font-serif italic text-xl outline-none focus:border-sky-500 transition-all cursor-pointer" 
                          />
                       </div>
                       <div className="space-y-4">
                          <label className="text-[10px] font-black text-white/80 uppercase tracking-widest">Check Out Date</label>
                          <input 
                            type="date" 
                            required
                            value={quoteData.checkOut}
                            onChange={(e) => setQuoteData(prev => ({ ...prev, checkOut: e.target.value }))}
                            className="w-full bg-white/10 border-2 border-white/20 rounded-2xl px-6 py-6 text-white font-serif italic text-xl outline-none focus:border-sky-500 transition-all cursor-pointer" 
                          />
                       </div>
                    </div>
                    <button 
                      onClick={() => quoteData.checkIn && quoteData.checkOut && setFormStep(2)}
                      disabled={!quoteData.checkIn || !quoteData.checkOut}
                      className="w-full bg-white text-slate-950 font-black py-8 rounded-full text-[12px] uppercase tracking-[0.6em] hover:bg-sky-500 hover:text-white transition-all duration-700 disabled:opacity-20 shadow-xl"
                    >
                      Define Residence →
                    </button>
                  </div>
                )}

                {/* STEP 2: RESIDENCE */}
                {formStep === 2 && (
                  <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <span className="text-[11px] font-black text-sky-400 uppercase tracking-widest">PHASE B</span>
                          <h4 className="text-2xl font-serif text-white italic">Preferred Residence</h4>
                       </div>
                       <button 
                        onClick={() => { setQuoteData(prev => ({ ...prev, roomType: 'Specialist Consultation' })); setFormStep(3); }}
                        className="text-[10px] font-black text-white/70 uppercase tracking-[0.2em] hover:text-sky-400 transition-colors underline decoration-white/20 underline-offset-4"
                       >
                         Not sure? Consult a Specialist
                       </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[450px] overflow-y-auto no-scrollbar pr-2">
                       {resort.roomTypes?.map((room, i) => (
                         <button 
                           key={i}
                           onClick={() => { setQuoteData(prev => ({ ...prev, roomType: room.name })); setFormStep(3); }}
                           className={`group relative aspect-[16/10] rounded-[2rem] overflow-hidden border-4 transition-all duration-700 ${quoteData.roomType === room.name ? 'border-sky-500 scale-[0.98]' : 'border-white/10 hover:border-white/40'}`}
                         >
                            <img src={room.image} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700" alt={room.name} />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-left">
                               <p className="text-[12px] font-black text-white uppercase tracking-widest">{room.name}</p>
                            </div>
                            {quoteData.roomType === room.name && (
                               <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center shadow-lg">
                                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={5}><path d="M5 13l4 4L19 7" /></svg>
                               </div>
                            )}
                         </button>
                       ))}
                    </div>

                    <button 
                      onClick={() => setFormStep(1)}
                      className="w-full text-[10px] font-black text-white/60 uppercase tracking-[0.5em] hover:text-white transition-colors"
                    >
                      ← Back to Calendar
                    </button>
                  </div>
                )}

                {/* STEP 3: GASTRONOMY */}
                {formStep === 3 && (
                  <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex items-center gap-4">
                       <span className="text-[11px] font-black text-sky-400 uppercase tracking-widest">PHASE C</span>
                       <h4 className="text-2xl font-serif text-white italic">Gastronomy Preferences</h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                       {resort.mealPlans.map((plan) => (
                         <button
                           key={plan}
                           onClick={() => { setQuoteData(prev => ({ ...prev, mealPlan: plan })); setFormStep(4); }}
                           className={`p-10 rounded-[2rem] border-4 text-left transition-all duration-500 ${quoteData.mealPlan === plan ? 'bg-sky-500 border-sky-400 text-white shadow-2xl scale-[1.02]' : 'bg-white/5 border-white/10 text-white/50 hover:border-white/30 hover:bg-white/10'}`}
                         >
                            <span className="text-[12px] font-black uppercase tracking-[0.4em]">{plan.replace(/_/g, ' ')}</span>
                         </button>
                       ))}
                    </div>

                    <button 
                      onClick={() => setFormStep(2)}
                      className="w-full text-[10px] font-black text-white/60 uppercase tracking-[0.5em] hover:text-white transition-colors"
                    >
                      ← Back to Residence
                    </button>
                  </div>
                )}

                {/* STEP 4: IDENTITY */}
                {formStep === 4 && (
                  <form onSubmit={handleQuoteSubmit} className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex items-center gap-4">
                       <span className="text-[11px] font-black text-sky-400 uppercase tracking-widest">PHASE D</span>
                       <h4 className="text-2xl font-serif text-white italic">Final Identity</h4>
                    </div>

                    <div className="space-y-10">
                       <div className="border-b-2 border-white/20 py-4 focus-within:border-sky-500 transition-all">
                          <label className="block text-[10px] font-black text-white/70 uppercase tracking-[0.4em] mb-4">Your Name</label>
                          <input 
                            type="text" 
                            required 
                            value={quoteData.customerName}
                            onChange={(e) => setQuoteData(prev => ({ ...prev, customerName: e.target.value }))}
                            className="w-full bg-transparent text-white font-serif italic text-2xl md:text-3xl outline-none placeholder:text-white/20" 
                            placeholder="Identity Name" 
                          />
                       </div>
                       <div className="border-b-2 border-white/20 py-4 focus-within:border-sky-500 transition-all">
                          <label className="block text-[10px] font-black text-white/70 uppercase tracking-[0.4em] mb-4">Email Address</label>
                          <input 
                            type="email" 
                            required 
                            value={quoteData.customerEmail}
                            onChange={(e) => setQuoteData(prev => ({ ...prev, customerEmail: e.target.value }))}
                            className="w-full bg-transparent text-white font-serif italic text-2xl md:text-3xl outline-none placeholder:text-white/20" 
                            placeholder="Digital Signature Email" 
                          />
                       </div>
                       <div className="border-b-2 border-white/20 py-4 focus-within:border-sky-500 transition-all">
                          <label className="block text-[10px] font-black text-white/70 uppercase tracking-[0.4em] mb-4">Phone Number</label>
                          <input 
                            type="tel" 
                            required 
                            value={quoteData.customerPhone}
                            onChange={(e) => setQuoteData(prev => ({ ...prev, customerPhone: e.target.value }))}
                            className="w-full bg-transparent text-white font-serif italic text-2xl md:text-3xl outline-none placeholder:text-white/20" 
                            placeholder="+44 0000 000000" 
                          />
                       </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-white text-slate-950 font-black py-8 rounded-full text-[13px] uppercase tracking-[0.8em] hover:bg-sky-500 hover:text-white transition-all duration-700 shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)] active:scale-95 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Consulting Servers...' : 'Request Bespoke Portfolio'}
                    </button>

                    <button 
                      type="button"
                      onClick={() => setFormStep(3)}
                      className="w-full text-[10px] font-black text-white/60 uppercase tracking-[0.5em] hover:text-white transition-colors"
                    >
                      ← Back to Gastronomy
                    </button>
                  </form>
                )}

              </div>
            </>
          )}
        </div>
      </section>

      {/* Suggested Stays */}
      <section className="py-20 md:py-32 px-6 lg:px-12 bg-white overflow-hidden border-t-2 border-slate-50">
         <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 reveal gap-8">
               <div>
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.8em] mb-6 block">Similar Sanctuaries</span>
                  <h3 className="text-3xl md:text-5xl font-serif font-bold italic text-slate-900 tracking-tighter">The Atoll Collective.</h3>
               </div>
               <Link to="/stays" className="text-[11px] font-black text-sky-600 uppercase tracking-[0.5em] border-b-2 border-sky-500 pb-2 hover:text-slate-950 hover:border-slate-950 transition-all">View Full Portfolio</Link>
            </div>
            
            <div className="flex gap-8 md:gap-12 overflow-x-auto no-scrollbar pb-12 snap-x snap-mandatory">
               {RESORTS.filter(r => r.slug !== slug).slice(0, 5).map((r, i) => (
                 <div key={i} className="reveal flex-shrink-0 w-[70vw] sm:w-[45vw] md:w-[35vw] lg:w-[22vw] snap-start">
                   <Link to={`/stays/${r.slug}`} className="group block">
                      <div className="relative aspect-[3/4] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden mb-6 shadow-md border-2 border-slate-50 group-hover:shadow-2xl transition-all duration-1000 bg-slate-100">
                         <img src={r.images[0]} className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-105" alt={r.name} />
                         <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-all duration-1000"></div>
                      </div>
                      <h5 className="text-[12px] font-black text-slate-950 uppercase tracking-[0.2em] group-hover:text-sky-600 transition-colors mb-2">{r.name}</h5>
                      <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">{r.atoll}</span>
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
