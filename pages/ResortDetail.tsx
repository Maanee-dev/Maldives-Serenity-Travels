
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, mapOffer } from '../lib/supabase';
import { RESORTS, OFFERS } from '../constants';
import { Accommodation, AccommodationType, TransferType, MealPlan, Offer, RoomType } from '../types';
import ResortCard from '../components/ResortCard';

const INQUIRY_STORAGE_KEY = 'serenity_inquiry_draft';

// Simple Country Data with Flags
const COUNTRIES = [
  { name: 'United Kingdom', code: 'GB', dial: '+44', flag: '🇬🇧' },
  { name: 'United States', code: 'US', dial: '+1', flag: '🇺🇸' },
  { name: 'United Arab Emirates', code: 'AE', dial: '+971', flag: '🇦🇪' },
  { name: 'Germany', code: 'DE', dial: '+49', flag: '🇩🇪' },
  { name: 'France', code: 'FR', dial: '+33', flag: '🇫🇷' },
  { name: 'Russia', code: 'RU', dial: '+7', flag: '🇷🇺' },
  { name: 'China', code: 'CN', dial: '+86', flag: '🇨🇳' },
  { name: 'India', code: 'IN', dial: '+91', flag: '🇮🇳' },
  { name: 'Italy', code: 'IT', dial: '+39', flag: '🇮🇹' },
  { name: 'Switzerland', code: 'CH', dial: '+41', flag: '🇨🇭' },
  { name: 'Australia', code: 'AU', dial: '+61', flag: '🇦🇺' },
  { name: 'Maldives', code: 'MV', dial: '+960', flag: '🇲🇻' },
  { name: 'Spain', code: 'ES', dial: '+34', flag: '🇪🇸' },
  { name: 'Saudi Arabia', code: 'SA', dial: '+966', flag: '🇸🇦' },
  { name: 'Qatar', code: 'QA', dial: '+974', flag: '🇶🇦' },
  { name: 'Japan', code: 'JP', dial: '+81', flag: '🇯🇵' },
].sort((a, b) => a.name.localeCompare(b.name));

const ResortDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [resort, setResort] = useState<Accommodation | null>(null);
  const [allResorts, setAllResorts] = useState<Accommodation[]>([]);
  const [resortOffers, setResortOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Multi-step Form State
  const [formStep, setFormStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [quoteData, setQuoteData] = useState({
    checkIn: '',
    checkOut: '',
    roomType: null as RoomType | null,
    mealPlan: '',
    adults: 2,
    children: 0,
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerPhoneCode: '+44',
    customerCountry: 'United Kingdom',
    customerCountryFlag: '🇬🇧',
    notes: ''
  });

  const [countrySearch, setCountrySearch] = useState('');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load draft on mount
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
          customerPhoneCode: parsed.customerPhoneCode || '+44',
          customerCountry: parsed.customerCountry || 'United Kingdom',
          customerCountryFlag: parsed.customerCountryFlag || '🇬🇧'
        }));
      } catch (e) {
        console.error("Failed to load inquiry draft:", e);
      }
    }

    // Click outside listener for dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Save identity fields to localStorage
  useEffect(() => {
    const dataToSave = {
      customerName: quoteData.customerName,
      customerEmail: quoteData.customerEmail,
      customerPhone: quoteData.customerPhone,
      customerPhoneCode: quoteData.customerPhoneCode,
      customerCountry: quoteData.customerCountry,
      customerCountryFlag: quoteData.customerCountryFlag
    };
    localStorage.setItem(INQUIRY_STORAGE_KEY, JSON.stringify(dataToSave));
  }, [quoteData.customerName, quoteData.customerEmail, quoteData.customerPhone, quoteData.customerCountry]);

  useEffect(() => {
    const fetchFullDetails = async () => {
      setLoading(true);
      try {
        // Fetch All Resorts for recommendations
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
        }

        // Fetch Current Resort
        const { data: resData } = await supabase.from('resorts').select('*').eq('slug', slug).maybeSingle();
        const localBackup = RESORTS.find(r => r.slug === slug);

        if (resData) {
          const mappedResort: Accommodation = {
            id: resData.id,
            name: resData.name,
            slug: resData.slug,
            type: (resData.type || 'RESORT') as AccommodationType,
            atoll: resData.atoll || 'Maldives',
            priceRange: resData.price_range || '$$$$',
            rating: resData.rating || 5,
            description: resData.description || '',
            shortDescription: resData.short_description || '',
            images: resData.images || [],
            features: resData.features || [],
            transfers: resData.transfers || [],
            mealPlans: resData.meal_plans || [],
            uvp: resData.uvp || 'Defined by perspective.',
            roomTypes: resData.room_types || [],
            diningVenues: resData.dining_venues || []
          };
          setResort(mappedResort);
        } else if (localBackup) {
          setResort(localBackup);
        }

        // Fetch Offers for this resort
        const { data: offersData } = await supabase.from('offers').select('*').eq('resort_name', resData?.name || localBackup?.name);
        if (offersData) {
          setResortOffers(offersData.map(mapOffer));
        } else {
          setResortOffers(OFFERS.filter(o => o.resortSlug === slug));
        }

      } catch (err) {
        console.error("Critical Fetch Error:", err);
        setResort(RESORTS.find(r => r.slug === slug) || null);
      } finally {
        setLoading(false);
      }
    };
    fetchFullDetails();
    window.scrollTo(0, 0);
  }, [slug]);

  const filteredCountries = useMemo(() => {
    return COUNTRIES.filter(c => c.name.toLowerCase().includes(countrySearch.toLowerCase()));
  }, [countrySearch]);

  const handleNext = () => setFormStep(prev => prev + 1);
  const handleBack = () => setFormStep(prev => prev - 1);

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulation of API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCFAF7]">
       <div className="w-10 h-10 border-2 border-slate-100 border-t-sky-500 rounded-full animate-spin"></div>
    </div>
  );

  if (!resort) return (
    <div className="p-40 text-center bg-[#FCFAF7] min-h-screen">
      <h1 className="text-4xl font-serif italic mb-8">Sanctuary not found.</h1>
      <Link to="/stays" className="text-sky-500 font-bold uppercase tracking-widest text-[10px] border-b border-sky-100">Return to Stays</Link>
    </div>
  );

  return (
    <div className="bg-[#FCFAF7] selection:bg-sky-100">
      {/* 1. EDITORIAL HERO */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <img 
          src={resort.images[0] || 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=90&w=1920'} 
          className="w-full h-full object-cover transition-transform duration-[10s] ease-out" 
          alt={resort.name}
        />
        <div className="absolute inset-0 bg-slate-950/20"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-20 max-w-7xl mx-auto text-white">
           <Link to="/stays" className="text-white/60 font-bold text-[9px] uppercase tracking-[0.5em] mb-12 inline-block hover:text-white transition-colors">← The Portfolio</Link>
           <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="bg-sky-500 text-white px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.4em] shadow-xl">{resort.atoll}</span>
              <span className="bg-white/10 backdrop-blur-md text-white px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.4em]">{resort.type}</span>
           </div>
           <h1 className="text-6xl md:text-9xl font-serif font-bold leading-[0.9] tracking-tighter italic drop-shadow-2xl">{resort.name}</h1>
        </div>
      </section>

      {/* 2. THE CORE NARRATIVE */}
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-32">
          
          <div className="lg:col-span-7 space-y-24">
            <div>
              <span className="text-sky-500 font-bold text-[10px] uppercase tracking-[1em] mb-12 block">The Philosophy</span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold italic text-slate-950 leading-tight mb-16 tracking-tighter">
                "{resort.uvp}"
              </h2>
              <div className="prose prose-xl prose-slate max-w-none">
                 <p className="text-slate-600 leading-[2.2] text-xl font-medium opacity-90 mb-12">
                   {resort.description}
                 </p>
              </div>
            </div>

            {/* Room Architecture */}
            {resort.roomTypes && resort.roomTypes.length > 0 && (
              <div>
                <span className="text-slate-400 font-bold text-[10px] uppercase tracking-[1em] mb-16 block text-center">Residences</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {resort.roomTypes.map((room, i) => (
                    <div key={i} className="group cursor-pointer">
                      <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-700 bg-slate-100">
                        <img src={room.image} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt={room.name} />
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-slate-950 mb-3 italic group-hover:text-sky-600 transition-colors">{room.name}</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{room.size || 'Private Sanctuary'}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dining Experience */}
            {resort.diningVenues && resort.diningVenues.length > 0 && (
              <div className="pt-24 border-t border-slate-50">
                <span className="text-amber-500 font-bold text-[10px] uppercase tracking-[1em] mb-16 block text-center">Culinary Canvas</span>
                <div className="space-y-20">
                  {resort.diningVenues.map((dining, i) => (
                    <div key={i} className={`flex flex-col md:flex-row gap-12 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                       <div className="w-full md:w-1/2 aspect-[16/10] rounded-[3rem] overflow-hidden shadow-xl bg-slate-100">
                          <img src={dining.image} className="w-full h-full object-cover" alt={dining.name} />
                       </div>
                       <div className="w-full md:w-1/2">
                          <span className="text-sky-500 font-bold text-[9px] uppercase tracking-widest mb-4 block">{dining.cuisine}</span>
                          <h4 className="text-3xl font-serif font-bold text-slate-950 mb-6 italic">{dining.name}</h4>
                          <p className="text-slate-500 leading-relaxed font-medium text-lg italic opacity-80 mb-8">{dining.description}</p>
                          <div className="flex flex-wrap gap-4">
                             {dining.highlights?.map((h: string, j: number) => (
                               <span key={j} className="text-[8px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">{h}</span>
                             ))}
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. THE CONSULTATION SUITE (MODERN MULTI-STEP FORM) */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32 bg-white rounded-[3.5rem] p-8 md:p-12 shadow-2xl border border-slate-50 overflow-hidden flex flex-col min-h-[700px]">
              
              {!isSubmitted ? (
                <>
                  <div className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.5em]">Consultation Suite</span>
                      <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Step {formStep} of 5</span>
                    </div>
                    <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-950 transition-all duration-700 ease-out" style={{ width: `${(formStep / 5) * 100}%` }}></div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmitInquiry} className="flex-grow flex flex-col">
                    {/* STEP 1: TIMELINE */}
                    {formStep === 1 && (
                      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="text-center">
                          <h3 className="text-3xl font-serif font-bold italic mb-4">When shall you arrive?</h3>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select your desired dates for a bespoke quote</p>
                        </div>
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block px-6">Check-In</label>
                            <input 
                              type="date" 
                              required
                              value={quoteData.checkIn}
                              onChange={(e) => setQuoteData({...quoteData, checkIn: e.target.value})}
                              className="w-full bg-slate-50 border-none rounded-2xl px-8 py-5 text-sm font-bold uppercase tracking-widest focus:ring-2 focus:ring-sky-500 transition-all"
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block px-6">Check-Out</label>
                            <input 
                              type="date" 
                              required
                              value={quoteData.checkOut}
                              onChange={(e) => setQuoteData({...quoteData, checkOut: e.target.value})}
                              className="w-full bg-slate-50 border-none rounded-2xl px-8 py-5 text-sm font-bold uppercase tracking-widest focus:ring-2 focus:ring-sky-500 transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: RESIDENCE */}
                    {formStep === 2 && (
                      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="text-center">
                          <h3 className="text-3xl font-serif font-bold italic mb-4">Select Residence</h3>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Choose your sanctuary on the island</p>
                        </div>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto no-scrollbar pr-2">
                          {resort.roomTypes?.map((room, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setQuoteData({...quoteData, roomType: room})}
                              className={`w-full flex items-center gap-6 p-4 rounded-3xl border transition-all duration-500 ${quoteData.roomType?.name === room.name ? 'border-slate-950 bg-slate-950 text-white shadow-xl' : 'border-slate-100 bg-slate-50/50 hover:border-sky-300'}`}
                            >
                              <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100">
                                <img src={room.image} className="w-full h-full object-cover" alt="" />
                              </div>
                              <div className="text-left">
                                <h4 className="text-[11px] font-bold uppercase tracking-widest mb-1">{room.name}</h4>
                                <p className={`text-[9px] uppercase tracking-widest ${quoteData.roomType?.name === room.name ? 'text-sky-400' : 'text-slate-400'}`}>{room.size || 'Villa'}</p>
                              </div>
                            </button>
                          ))}
                          {(!resort.roomTypes || resort.roomTypes.length === 0) && (
                            <p className="text-center py-10 text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">Standard room rates will apply</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* STEP 3: BOARD */}
                    {formStep === 3 && (
                      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="text-center">
                          <h3 className="text-3xl font-serif font-bold italic mb-4">Meal Plan</h3>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select your culinary preference</p>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          {(resort.mealPlans && resort.mealPlans.length > 0 ? resort.mealPlans : Object.values(MealPlan)).map((plan) => (
                            <button
                              key={plan}
                              type="button"
                              onClick={() => setQuoteData({...quoteData, mealPlan: plan})}
                              className={`w-full p-6 rounded-3xl border transition-all duration-500 text-left flex items-center justify-between ${quoteData.mealPlan === plan ? 'border-slate-950 bg-slate-950 text-white shadow-xl' : 'border-slate-100 bg-slate-50/50 hover:border-sky-300'}`}
                            >
                              <span className="text-[11px] font-bold uppercase tracking-widest">{plan.replace('_', ' ')}</span>
                              {quoteData.mealPlan === plan && <div className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]"></div>}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* STEP 4: PARTY */}
                    {formStep === 4 && (
                      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="text-center">
                          <h3 className="text-3xl font-serif font-bold italic mb-4">Who is coming?</h3>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Define your traveling party</p>
                        </div>
                        <div className="space-y-8">
                          <div className="flex items-center justify-between p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                            <div className="flex flex-col">
                              <span className="text-[11px] font-bold uppercase tracking-widest">Adults</span>
                              <span className="text-[9px] text-slate-400 uppercase tracking-widest">Ages 12+</span>
                            </div>
                            <div className="flex items-center gap-6">
                              <button type="button" onClick={() => setQuoteData({...quoteData, adults: Math.max(1, quoteData.adults - 1)})} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center font-bold hover:bg-slate-900 hover:text-white transition-all">&minus;</button>
                              <span className="text-lg font-bold w-4 text-center">{quoteData.adults}</span>
                              <button type="button" onClick={() => setQuoteData({...quoteData, adults: quoteData.adults + 1})} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center font-bold hover:bg-slate-900 hover:text-white transition-all">+</button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                            <div className="flex flex-col">
                              <span className="text-[11px] font-bold uppercase tracking-widest">Children</span>
                              <span className="text-[9px] text-slate-400 uppercase tracking-widest">Ages 2-11</span>
                            </div>
                            <div className="flex items-center gap-6">
                              <button type="button" onClick={() => setQuoteData({...quoteData, children: Math.max(0, quoteData.children - 1)})} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center font-bold hover:bg-slate-900 hover:text-white transition-all">&minus;</button>
                              <span className="text-lg font-bold w-4 text-center">{quoteData.children}</span>
                              <button type="button" onClick={() => setQuoteData({...quoteData, children: quoteData.children + 1})} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center font-bold hover:bg-slate-900 hover:text-white transition-all">+</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 5: IDENTITY */}
                    {formStep === 5 && (
                      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="text-center">
                          <h3 className="text-3xl font-serif font-bold italic mb-4">Bespoke Details</h3>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Complete your digital signature</p>
                        </div>
                        <div className="space-y-5">
                          <input 
                            type="text" 
                            placeholder="FULL NAME" 
                            required
                            value={quoteData.customerName}
                            onChange={(e) => setQuoteData({...quoteData, customerName: e.target.value})}
                            className="w-full bg-slate-50 border-none rounded-2xl px-8 py-4 text-[10px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-sky-500 transition-all placeholder:text-slate-300" 
                          />
                          <input 
                            type="email" 
                            placeholder="EMAIL ADDRESS" 
                            required
                            value={quoteData.customerEmail}
                            onChange={(e) => setQuoteData({...quoteData, customerEmail: e.target.value})}
                            className="w-full bg-slate-50 border-none rounded-2xl px-8 py-4 text-[10px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-sky-500 transition-all placeholder:text-slate-300" 
                          />
                          
                          {/* Country Selector with Flags */}
                          <div className="relative" ref={dropdownRef}>
                            <button
                              type="button"
                              onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                              className="w-full bg-slate-50 border-none rounded-2xl px-8 py-4 text-[10px] font-bold uppercase tracking-widest flex items-center justify-between transition-all hover:bg-slate-100"
                            >
                              <span className="flex items-center gap-3">
                                <span>{quoteData.customerCountryFlag}</span>
                                <span>{quoteData.customerCountry}</span>
                              </span>
                              <svg className={`w-4 h-4 transition-transform duration-300 ${isCountryDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            {isCountryDropdownOpen && (
                              <div className="absolute z-50 top-full left-0 right-0 mt-3 bg-white border border-slate-100 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                <div className="p-4 border-b border-slate-50">
                                  <input 
                                    type="text" 
                                    placeholder="SEARCH COUNTRY..." 
                                    value={countrySearch}
                                    onChange={(e) => setCountrySearch(e.target.value)}
                                    className="w-full bg-slate-50 border-none rounded-xl px-5 py-3 text-[9px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-sky-500 transition-all"
                                  />
                                </div>
                                <div className="max-h-48 overflow-y-auto no-scrollbar py-2">
                                  {filteredCountries.map(c => (
                                    <button
                                      key={c.code}
                                      type="button"
                                      onClick={() => {
                                        setQuoteData({...quoteData, customerCountry: c.name, customerCountryFlag: c.flag, customerPhoneCode: c.dial});
                                        setIsCountryDropdownOpen(false);
                                      }}
                                      className="w-full px-6 py-3 flex items-center gap-4 hover:bg-slate-50 text-[10px] font-bold uppercase tracking-widest text-left"
                                    >
                                      <span>{c.flag}</span>
                                      <span className="flex-grow">{c.name}</span>
                                      <span className="text-slate-300 text-[8px]">{c.dial}</span>
                                    </button>
                                  ))}
                                  {filteredCountries.length === 0 && (
                                    <div className="px-6 py-8 text-center text-[9px] text-slate-300 font-bold uppercase tracking-widest italic">No match found</div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex gap-4">
                            <div className="w-24 bg-slate-50 border-none rounded-2xl px-4 py-4 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center text-slate-400">
                              {quoteData.customerPhoneCode}
                            </div>
                            <input 
                              type="tel" 
                              placeholder="PHONE NUMBER" 
                              required
                              value={quoteData.customerPhone}
                              onChange={(e) => setQuoteData({...quoteData, customerPhone: e.target.value})}
                              className="flex-grow bg-slate-50 border-none rounded-2xl px-8 py-4 text-[10px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-sky-500 transition-all placeholder:text-slate-300" 
                            />
                          </div>
                          
                          <textarea 
                            placeholder="SPECIAL REQUESTS OR VISION..." 
                            rows={3}
                            value={quoteData.notes}
                            onChange={(e) => setQuoteData({...quoteData, notes: e.target.value})}
                            className="w-full bg-slate-50 border-none rounded-2xl px-8 py-5 text-[10px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-sky-500 transition-all placeholder:text-slate-300 leading-relaxed" 
                          />
                        </div>
                      </div>
                    )}

                    {/* ACTIONS */}
                    <div className="mt-auto pt-10 flex flex-col gap-6">
                      {formStep < 5 ? (
                        <button
                          type="button"
                          onClick={handleNext}
                          disabled={(formStep === 1 && (!quoteData.checkIn || !quoteData.checkOut)) || (formStep === 2 && !quoteData.roomType) || (formStep === 3 && !quoteData.mealPlan)}
                          className="w-full bg-slate-950 text-white font-bold py-6 rounded-full text-[11px] uppercase tracking-[0.6em] hover:bg-sky-500 transition-all duration-700 shadow-xl disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          Continue
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-slate-950 text-white font-bold py-6 rounded-full text-[11px] uppercase tracking-[0.8em] hover:bg-sky-500 transition-all duration-700 shadow-2xl disabled:opacity-50"
                        >
                          {isSubmitting ? 'INITIATING...' : 'SECURE INQUIRY'}
                        </button>
                      )}
                      
                      {formStep > 1 && (
                        <button type="button" onClick={handleBack} className="text-[9px] font-bold text-slate-300 uppercase tracking-widest hover:text-slate-950 transition-colors">← Refine Selection</button>
                      )}
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-1000">
                   <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-12 border border-slate-100 shadow-inner">
                      <svg className="w-10 h-10 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                   </div>
                   <h3 className="text-4xl font-serif font-bold italic text-slate-950 mb-8 leading-none">Perspective <br/> Received.</h3>
                   <div className="h-px w-20 bg-amber-400 mb-12"></div>
                   <p className="text-slate-400 text-[10px] uppercase tracking-[0.4em] leading-[2.5] max-w-[280px]">
                      Your vision for {resort.name} is now being curated by our specialists. Expect a bespoke response within 24 hours.
                   </p>
                   <button onClick={() => {setFormStep(1); setIsSubmitted(false);}} className="mt-16 text-[9px] font-bold text-slate-950 border-b border-slate-950 pb-2 uppercase tracking-widest">Submit Another</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. ACTIVE OFFERS (IF ANY) */}
      {resortOffers.length > 0 && (
        <section className="py-24 bg-amber-50/30 border-y border-amber-100">
           <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-20">
                 <span className="text-amber-600 font-bold text-[10px] uppercase tracking-[1em] mb-8 block">Seasonal Privileges</span>
                 <h3 className="text-4xl md:text-7xl font-serif font-bold italic text-slate-900 tracking-tighter">Limited Collection.</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                 {resortOffers.map(offer => (
                   <div key={offer.id} className="bg-white rounded-[3rem] p-10 shadow-xl border border-white relative group overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
                      <span className="bg-amber-400 text-white text-[8px] font-black uppercase tracking-widest px-4 py-1 rounded-full inline-block mb-8 shadow-sm">{offer.category}</span>
                      <h4 className="text-2xl font-serif font-bold italic text-slate-950 mb-6 group-hover:text-sky-600 transition-colors">{offer.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium italic opacity-80">{offer.roomCategory} • {offer.nights} Nights</p>
                      <div className="flex items-baseline gap-2 mb-10">
                        <span className="text-2xl font-black text-slate-900">US$ {offer.price.toLocaleString()}</span>
                        <span className="text-slate-400 text-[9px] font-bold uppercase tracking-widest italic">/ {offer.priceSubtext}</span>
                      </div>
                      <button 
                        onClick={() => {
                          setFormStep(1);
                          setQuoteData(prev => ({...prev, notes: `INTERESTED IN OFFER: ${offer.title}`}));
                          window.scrollTo({ top: document.querySelector('.ConsultationSuite')?.getBoundingClientRect().top || 800, behavior: 'smooth' });
                        }}
                        className="w-full border-2 border-slate-900 text-slate-900 font-bold py-4 rounded-2xl text-[9px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all duration-500"
                      >
                         Claim Privilege
                      </button>
                   </div>
                 ))}
              </div>
           </div>
        </section>
      )}

      {/* 5. SIMILAR SANCTUARIES */}
      <section className="py-24 md:py-48 bg-[#FCFAF7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-24 reveal active">
            <div className="max-w-xl">
              <span className="text-slate-400 font-bold text-[10px] uppercase tracking-[1em] mb-8 block">Explore More</span>
              <h3 className="text-4xl md:text-7xl font-serif font-bold italic leading-tight text-slate-950 tracking-tighter">Similar Sanctuaries.</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {allResorts
              .filter(r => r.id !== resort.id)
              .slice(0, 3)
              .map(r => (
                <ResortCard key={r.id} resort={r} />
              ))
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResortDetail;
