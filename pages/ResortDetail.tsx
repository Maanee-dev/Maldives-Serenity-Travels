
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, mapOffer, mapResort } from '../lib/supabase';
import { RESORTS } from '../constants';
import { Accommodation, Offer, MealPlan, RoomType } from '../types';
import ResortCard from '../components/ResortCard';

const INQUIRY_STORAGE_KEY = 'serenity_inquiry_draft';

// Sophisticated country data
const COUNTRIES = [
  { name: 'United Kingdom', code: 'GB', dial: '+44', flag: '🇬🇧' },
  { name: 'United States', code: 'US', dial: '+1', flag: '🇺🇸' },
  { name: 'United Arab Emirates', code: 'AE', dial: '+971', flag: '🇦🇪' },
  { name: 'Germany', code: 'DE', dial: '+49', flag: '🇩🇪' },
  { name: 'France', code: 'FR', dial: '+33', flag: '🇫🇷' },
  { name: 'Italy', code: 'IT', dial: '+39', flag: '🇮🇹' },
  { name: 'Russia', code: 'RU', dial: '+7', flag: '🇷🇺' },
  { name: 'China', code: 'CN', dial: '+86', flag: '🇨🇳' },
  { name: 'India', code: 'IN', dial: '+91', flag: '🇮🇳' },
  { name: 'Maldives', code: 'MV', dial: '+960', flag: '🇲🇻' },
  { name: 'Switzerland', code: 'CH', dial: '+41', flag: '🇨🇭' },
  { name: 'Australia', code: 'AU', dial: '+61', flag: '🇦🇺' },
  { name: 'Singapore', code: 'SG', dial: '+65', flag: '🇸🇬' },
  { name: 'Saudi Arabia', code: 'SA', dial: '+966', flag: '🇸🇦' },
  { name: 'Qatar', code: 'QA', dial: '+974', flag: '🇶🇦' },
].sort((a, b) => a.name.localeCompare(b.name));

const ResortDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [resort, setResort] = useState<Accommodation | null>(null);
  const [relatedResorts, setRelatedResorts] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Inquiry Flow State
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    roomType: '',
    mealPlan: '',
    adults: 2,
    children: 0,
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    country: 'United Kingdom',
    countryCode: '+44',
    countryFlag: '🇬🇧',
    notes: ''
  });

  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('resorts')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        let activeResort: Accommodation | null = null;
        if (data) {
          activeResort = mapResort(data);
        } else {
          activeResort = RESORTS.find(r => r.slug === slug) || null;
        }
        setResort(activeResort);

        // Fetch related
        const { data: relatedData } = await supabase
          .from('resorts')
          .select('*')
          .neq('slug', slug)
          .limit(3);
        
        if (relatedData) {
          setRelatedResorts(relatedData.map(mapResort));
        } else {
          setRelatedResorts(RESORTS.filter(r => r.slug !== slug).slice(0, 3));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  // Handle outside click for country dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const nextStep = () => setCurrentStep(s => Math.min(s + 1, 5));
  const prevStep = () => setCurrentStep(s => Math.max(s - 1, 1));

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    localStorage.removeItem(INQUIRY_STORAGE_KEY);
  };

  const filteredCountries = COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    c.dial.includes(countrySearch)
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCFAF7]">
       <div className="w-12 h-12 border-2 border-slate-100 border-t-sky-500 rounded-full animate-spin"></div>
    </div>
  );

  if (!resort) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FCFAF7] p-12 text-center">
       <h1 className="text-4xl font-serif font-bold italic text-slate-900 mb-8">Sanctuary not found.</h1>
       <Link to="/stays" className="text-[10px] font-bold uppercase tracking-[0.5em] text-sky-500 border-b border-sky-200 pb-2">Return to Portfolio</Link>
    </div>
  );

  return (
    <div className="bg-[#FCFAF7] min-h-screen">
      {/* Editorial Hero */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <img src={resort.images[0]} className="w-full h-full object-cover transition-transform duration-[10s] hover:scale-105" alt={resort.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-20 max-w-7xl mx-auto text-white reveal active">
          <Link to="/stays" className="text-white/60 font-bold text-[9px] uppercase tracking-[0.6em] mb-12 inline-block hover:text-white transition-colors">← The Collection</Link>
          <div className="flex items-center gap-6 mb-8">
            <span className="bg-sky-500 text-white px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.4em] shadow-xl">{resort.atoll}</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] opacity-80">{resort.priceRange} Luxury</span>
          </div>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif font-bold leading-none tracking-tighter italic mb-8 drop-shadow-2xl">{resort.name}</h1>
          <p className="text-white/80 text-xl font-serif italic max-w-2xl">{resort.uvp}</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-32 md:py-48 grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-32">
        <div className="lg:col-span-7 space-y-24">
          <div className="reveal active">
            <span className="text-sky-500 font-bold text-[10px] uppercase tracking-[1em] mb-12 block">Philosophy</span>
            <p className="text-2xl md:text-4xl font-serif text-slate-800 italic leading-[1.6] mb-16 pl-12 border-l-4 border-amber-400">
              {resort.description}
            </p>
            <div className="grid grid-cols-2 gap-12">
              {resort.features.map(f => (
                <div key={f} className="flex items-center gap-6 group">
                  <div className="w-2 h-2 rounded-full bg-sky-500 group-hover:scale-[2] transition-all" />
                  <span className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Sections (Optional Additions Like Dining/Rooms) */}
          <div className="pt-24 border-t border-slate-100 reveal">
             <h3 className="text-4xl font-serif font-bold italic mb-16">The Sanctuary Portfolio</h3>
             <div className="space-y-16">
                {(resort.roomTypes && resort.roomTypes.length > 0 ? resort.roomTypes : [
                  { name: 'Overwater Villa', image: resort.images[0], description: 'A seamless blend of ocean and luxury.' },
                  { name: 'Beach Sanctuary', image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200', description: 'Hidden amidst tropical gardens.' }
                ]).map((room, i) => (
                  <div key={i} className="group grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
                    <div className="md:col-span-2 aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl bg-slate-100">
                       <img src={room.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={room.name} />
                    </div>
                    <div className="md:col-span-3">
                       <h4 className="text-2xl font-serif font-bold mb-4 italic">{room.name}</h4>
                       <p className="text-slate-500 text-sm leading-relaxed mb-6">{room.description}</p>
                       <div className="h-px w-12 bg-slate-200 group-hover:w-full group-hover:bg-sky-500 transition-all duration-700" />
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Floating Interactive Inquiry Form */}
        <aside className="lg:col-span-5 relative">
          <div className="sticky top-32">
            <div className="bg-white rounded-[3.5rem] shadow-2xl border border-slate-50 overflow-hidden reveal active">
              {/* Form Header / Progress */}
              <div className="bg-slate-950 p-10 text-white">
                {!isSubmitted && (
                  <>
                    <div className="flex justify-between items-end mb-6">
                      <h3 className="text-2xl font-serif italic">Inquiry Concierge</h3>
                      <span className="text-[9px] font-bold uppercase tracking-widest opacity-50">Step {currentStep} of 5</span>
                    </div>
                    <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-sky-500 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(14,165,233,0.5)]" 
                        style={{ width: `${(currentStep / 5) * 100}%` }}
                      />
                    </div>
                  </>
                )}
                {isSubmitted && <h3 className="text-2xl font-serif italic text-center">Bespoke Inquiry Received</h3>}
              </div>

              <div className="p-10 md:p-14">
                {isSubmitted ? (
                  <div className="text-center space-y-8 animate-in zoom-in-95 duration-700">
                    <div className="w-20 h-20 rounded-full bg-sky-50 flex items-center justify-center mx-auto text-sky-500">
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h4 className="text-2xl font-serif italic font-bold text-slate-900">Your vision is in motion.</h4>
                    <p className="text-slate-400 text-[10px] uppercase tracking-[0.4em] leading-loose">
                      A dedicated specialist will curate your Maldivian experience and contact you within 12 hours.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)} 
                      className="text-[9px] font-bold uppercase tracking-[0.5em] text-sky-500 border-b border-sky-200 pb-2"
                    >
                      Refine Details
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-10">
                    
                    {/* STEP 1: DATES */}
                    {currentStep === 1 && (
                      <div className="space-y-10 animate-in slide-in-from-right-8 duration-500">
                        <div className="space-y-8">
                          <div className="flex flex-col gap-4">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Check-In</label>
                            <input 
                              type="date" 
                              required
                              value={formData.checkIn}
                              onChange={e => updateFormData({ checkIn: e.target.value })}
                              className="w-full bg-slate-50 border-none rounded-2xl px-8 py-5 text-[11px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-sky-500 transition-all outline-none"
                            />
                          </div>
                          <div className="flex flex-col gap-4">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Check-Out</label>
                            <input 
                              type="date" 
                              required
                              value={formData.checkOut}
                              onChange={e => updateFormData({ checkOut: e.target.value })}
                              className="w-full bg-slate-50 border-none rounded-2xl px-8 py-5 text-[11px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-sky-500 transition-all outline-none"
                            />
                          </div>
                        </div>
                        <button type="button" onClick={nextStep} className="w-full bg-slate-950 text-white font-bold py-6 rounded-full text-[10px] uppercase tracking-[0.6em] hover:bg-sky-500 transition-all shadow-xl">Confirm Dates</button>
                      </div>
                    )}

                    {/* STEP 2: ROOM SELECTION */}
                    {currentStep === 2 && (
                      <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                        <div className="grid grid-cols-1 gap-4">
                          {(resort.roomTypes && resort.roomTypes.length > 0 ? resort.roomTypes : [
                            { name: 'Overwater Villa', image: resort.images[0] },
                            { name: 'Beach Sanctuary', image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200' }
                          ]).map((room) => (
                            <button
                              key={room.name}
                              type="button"
                              onClick={() => updateFormData({ roomType: room.name })}
                              className={`group relative h-32 rounded-3xl overflow-hidden border-2 transition-all ${formData.roomType === room.name ? 'border-sky-500 ring-4 ring-sky-500/10' : 'border-transparent'}`}
                            >
                              <img src={room.image} className="w-full h-full object-cover" alt="" />
                              <div className={`absolute inset-0 flex items-center justify-center transition-colors ${formData.roomType === room.name ? 'bg-sky-500/40' : 'bg-black/30 group-hover:bg-black/10'}`}>
                                <span className="text-white text-[10px] font-bold uppercase tracking-[0.4em] drop-shadow-lg">{room.name}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                        <div className="flex gap-4">
                          <button type="button" onClick={prevStep} className="flex-1 border border-slate-200 text-slate-400 font-bold py-5 rounded-full text-[9px] uppercase tracking-widest hover:border-slate-400 transition-all">Back</button>
                          <button type="button" onClick={nextStep} disabled={!formData.roomType} className="flex-[2] bg-slate-950 text-white font-bold py-5 rounded-full text-[10px] uppercase tracking-[0.6em] hover:bg-sky-500 transition-all disabled:opacity-50">Select Room</button>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: MEAL PLAN */}
                    {currentStep === 3 && (
                      <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                        <div className="space-y-4">
                           {resort.mealPlans.map((plan) => (
                             <button
                               key={plan}
                               type="button"
                               onClick={() => updateFormData({ mealPlan: plan })}
                               className={`w-full flex items-center justify-between px-8 py-5 rounded-2xl border transition-all ${formData.mealPlan === plan ? 'border-slate-950 bg-slate-950 text-white shadow-xl' : 'border-slate-100 bg-slate-50 hover:border-sky-200'}`}
                             >
                               <span className="text-[10px] font-bold uppercase tracking-widest">{plan.replace('_', ' ')}</span>
                               {formData.mealPlan === plan && <div className="w-2 h-2 rounded-full bg-sky-400" />}
                             </button>
                           ))}
                        </div>
                        <div className="flex gap-4">
                          <button type="button" onClick={prevStep} className="flex-1 border border-slate-200 text-slate-400 font-bold py-5 rounded-full text-[9px] uppercase tracking-widest hover:border-slate-400 transition-all">Back</button>
                          <button type="button" onClick={nextStep} disabled={!formData.mealPlan} className="flex-[2] bg-slate-950 text-white font-bold py-5 rounded-full text-[10px] uppercase tracking-[0.6em] hover:bg-sky-500 transition-all disabled:opacity-50">Continue</button>
                        </div>
                      </div>
                    )}

                    {/* STEP 4: GUESTS */}
                    {currentStep === 4 && (
                      <div className="space-y-12 animate-in slide-in-from-right-8 duration-500">
                        <div className="space-y-8">
                           <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl">
                              <div className="flex flex-col">
                                 <span className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">Adults</span>
                                 <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Ages 12+</span>
                              </div>
                              <div className="flex items-center gap-6">
                                 <button type="button" onClick={() => updateFormData({ adults: Math.max(1, formData.adults - 1) })} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center font-bold text-slate-400 hover:border-slate-900 hover:text-slate-900 transition-all">−</button>
                                 <span className="text-sm font-bold w-4 text-center">{formData.adults}</span>
                                 <button type="button" onClick={() => updateFormData({ adults: formData.adults + 1 })} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center font-bold text-slate-400 hover:border-slate-900 hover:text-slate-900 transition-all">+</button>
                              </div>
                           </div>
                           <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl">
                              <div className="flex flex-col">
                                 <span className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">Children</span>
                                 <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Ages 2-11</span>
                              </div>
                              <div className="flex items-center gap-6">
                                 <button type="button" onClick={() => updateFormData({ children: Math.max(0, formData.children - 1) })} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center font-bold text-slate-400 hover:border-slate-900 hover:text-slate-900 transition-all">−</button>
                                 <span className="text-sm font-bold w-4 text-center">{formData.children}</span>
                                 <button type="button" onClick={() => updateFormData({ children: formData.children + 1 })} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center font-bold text-slate-400 hover:border-slate-900 hover:text-slate-900 transition-all">+</button>
                              </div>
                           </div>
                        </div>
                        <div className="flex gap-4">
                          <button type="button" onClick={prevStep} className="flex-1 border border-slate-200 text-slate-400 font-bold py-5 rounded-full text-[9px] uppercase tracking-widest hover:border-slate-400 transition-all">Back</button>
                          <button type="button" onClick={nextStep} className="flex-[2] bg-slate-950 text-white font-bold py-5 rounded-full text-[10px] uppercase tracking-[0.6em] hover:bg-sky-500 transition-all">Almost Done</button>
                        </div>
                      </div>
                    )}

                    {/* STEP 5: FINAL DETAILS */}
                    {currentStep === 5 && (
                      <div className="space-y-10 animate-in slide-in-from-right-8 duration-500">
                        <div className="space-y-6">
                           <input 
                             type="text" 
                             required
                             placeholder="FULL NAME"
                             value={formData.customerName}
                             onChange={e => updateFormData({ customerName: e.target.value })}
                             className="w-full bg-slate-50 border-none rounded-2xl px-8 py-5 text-[10px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-sky-500 transition-all outline-none"
                           />
                           <input 
                             type="email" 
                             required
                             placeholder="EMAIL ADDRESS"
                             value={formData.customerEmail}
                             onChange={e => updateFormData({ customerEmail: e.target.value })}
                             className="w-full bg-slate-50 border-none rounded-2xl px-8 py-5 text-[10px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-sky-500 transition-all outline-none"
                           />
                           
                           {/* Sophisticated Country/Phone Selector */}
                           <div className="relative" ref={countryDropdownRef}>
                              <div className="flex gap-3">
                                <button 
                                  type="button"
                                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                  className="w-28 bg-slate-50 border-none rounded-2xl px-4 py-5 flex items-center justify-center gap-2 hover:bg-slate-100 transition-all"
                                >
                                  <span className="text-xl">{formData.countryFlag}</span>
                                  <span className="text-[10px] font-bold text-slate-900">{formData.countryCode}</span>
                                </button>
                                <input 
                                  type="tel" 
                                  required
                                  placeholder="PHONE NUMBER"
                                  value={formData.customerPhone}
                                  onChange={e => updateFormData({ customerPhone: e.target.value })}
                                  className="flex-1 bg-slate-50 border-none rounded-2xl px-8 py-5 text-[10px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-sky-500 transition-all outline-none"
                                />
                              </div>

                              {showCountryDropdown && (
                                <div className="absolute bottom-full left-0 right-0 mb-4 bg-white rounded-[2rem] shadow-2xl border border-slate-50 p-6 z-[100] animate-in fade-in slide-in-from-bottom-2 duration-300">
                                   <input 
                                     type="text"
                                     placeholder="SEARCH COUNTRY..."
                                     value={countrySearch}
                                     onChange={e => setCountrySearch(e.target.value)}
                                     className="w-full bg-slate-50 border-none rounded-xl px-6 py-4 text-[9px] font-bold uppercase tracking-widest focus:ring-1 focus:ring-sky-500 transition-all outline-none mb-6"
                                   />
                                   <div className="max-h-64 overflow-y-auto no-scrollbar space-y-2">
                                      {filteredCountries.map(c => (
                                        <button
                                          key={c.code}
                                          type="button"
                                          onClick={() => {
                                            updateFormData({ country: c.name, countryCode: c.dial, countryFlag: c.flag });
                                            setShowCountryDropdown(false);
                                            setCountrySearch('');
                                          }}
                                          className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-all group"
                                        >
                                          <div className="flex items-center gap-4">
                                            <span className="text-xl">{c.flag}</span>
                                            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-600 group-hover:text-slate-900">{c.name}</span>
                                          </div>
                                          <span className="text-[9px] font-bold text-slate-300 group-hover:text-sky-500">{c.dial}</span>
                                        </button>
                                      ))}
                                      {filteredCountries.length === 0 && <p className="text-center py-4 text-[9px] font-bold text-slate-300 uppercase tracking-widest italic">No matching regions</p>}
                                   </div>
                                </div>
                              )}
                           </div>
                        </div>

                        <div className="flex flex-col gap-4">
                          <button 
                            type="submit" 
                            disabled={isSubmitting || !formData.customerName || !formData.customerEmail} 
                            className="w-full bg-slate-950 text-white font-bold py-6 rounded-full text-[10px] uppercase tracking-[0.8em] hover:bg-sky-500 transition-all duration-700 shadow-xl disabled:opacity-50 flex items-center justify-center gap-4"
                          >
                            {isSubmitting ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                <span>TRANSMITTING...</span>
                              </>
                            ) : 'Initiate Inquiry'}
                          </button>
                          <button type="button" onClick={prevStep} className="text-slate-300 font-bold uppercase tracking-widest text-[9px] hover:text-slate-950 transition-colors">← Refine Logistics</button>
                        </div>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>

            {/* Support Info */}
            <div className="mt-12 text-center reveal">
               <p className="text-slate-400 text-[9px] font-bold uppercase tracking-[0.4em] mb-4">Concierge Desk</p>
               <p className="text-slate-900 font-serif italic text-lg">+960 777 1234 • info@maldivesserenity.com</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Related Collection */}
      <section className="py-48 bg-white border-t border-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12 reveal">
              <div className="max-w-2xl">
                 <span className="text-sky-500 font-bold text-[10px] uppercase tracking-[1em] mb-10 block">Curated Discovery</span>
                 <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 tracking-tighter italic leading-none">The Related Collection.</h2>
              </div>
              <Link to="/stays" className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-950 border-b border-slate-950 pb-2 hover:text-sky-500 hover:border-sky-500 transition-all">View All Sanctuaries</Link>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-16 reveal">
              {relatedResorts.map(r => (
                <ResortCard key={r.id} resort={r} />
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default ResortDetail;
