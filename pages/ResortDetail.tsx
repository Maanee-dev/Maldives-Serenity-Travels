
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, mapOffer, mapExperience, mapResort } from '../lib/supabase';
import { RESORTS, OFFERS, EXPERIENCES } from '../constants';
import { Accommodation, Offer, Experience } from '../types';
import ResortCard from '../components/ResortCard';
import SEO from '../components/SEO';

const INQUIRY_STORAGE_KEY = 'serenity_inquiry_draft';

const COUNTRIES = [
  { name: 'United Kingdom', code: '+44' },
  { name: 'United States', code: '+1' },
  { name: 'United Arab Emirates', code: '+971' },
  { name: 'Germany', code: '+49' },
  { name: 'Russia', code: '+7' },
  { name: 'India', code: '+91' },
  { name: 'China', code: '+86' },
  { name: 'Italy', code: '+39' },
  { name: 'France', code: '+33' },
  { name: 'Switzerland', code: '+41' },
  { name: 'Saudi Arabia', code: '+966' },
  { name: 'Australia', code: '+61' },
  { name: 'Maldives', code: '+960' }
].sort((a, b) => a.name.localeCompare(b.name));

const ResortDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [resort, setResort] = useState<Accommodation | null>(null);
  const [allResorts, setAllResorts] = useState<Accommodation[]>([]);
  const [resortOffers, setResortOffers] = useState<Offer[]>([]);
  const [resortExperiences, setResortExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  
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

  useEffect(() => {
    const dataToSave = {
      customerName: quoteData.customerName,
      customerEmail: quoteData.customerEmail,
      customerPhone: quoteData.customerPhone,
      country: quoteData.country,
      countryCode: quoteData.countryCode
    };
    localStorage.setItem(INQUIRY_STORAGE_KEY, JSON.stringify(dataToSave));
  }, [quoteData.customerName, quoteData.customerEmail, quoteData.customerPhone, quoteData.country, quoteData.countryCode]);

  useEffect(() => {
    const fetchFullDetails = async () => {
      setLoading(true);
      try {
        // 1. Fetch Resort Main Data
        const { data: resData } = await supabase
          .from('resorts')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        let currentResort: Accommodation;
        if (resData) {
          currentResort = mapResort(resData);
        } else {
          const local = RESORTS.find(r => r.slug === slug);
          if (!local) throw new Error("Not found");
          currentResort = local;
        }
        setResort(currentResort);

        // 2. Fetch Resort Offers
        const { data: offersData } = await supabase
          .from('offers')
          .select('*')
          .eq('resort_id', currentResort.id);
        
        if (offersData && offersData.length > 0) {
          setResortOffers(offersData.map(mapOffer));
        } else {
          setResortOffers(OFFERS.filter(o => o.resortId === currentResort.id));
        }

        // 3. Fetch Resort Experiences
        const { data: expData } = await supabase
          .from('experiences')
          .select('*')
          .eq('resort_id', currentResort.id);

        if (expData && expData.length > 0) {
          setResortExperiences(expData.map(mapExperience));
        } else {
          // Fallback if no specific resort experiences in DB
          setResortExperiences(EXPERIENCES.slice(0, 3));
        }

        // 4. Fetch All for Similar Stays
        const { data: allData } = await supabase.from('resorts').select('*');
        if (allData) {
          setAllResorts(allData.map(mapResort));
        } else {
          setAllResorts(RESORTS);
        }

      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFullDetails();
  }, [slug]);

  const similarStays = useMemo(() => {
    if (!resort) return [];
    return allResorts.filter(r => r.slug !== slug).slice(0, 3);
  }, [resort, allResorts, slug]);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitted(true);
    setIsSubmitting(false);
    localStorage.removeItem(INQUIRY_STORAGE_KEY);
  };

  useEffect(() => {
    if (!loading) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      }, { threshold: 0.1 });
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
      return () => observer.disconnect();
    }
  }, [loading]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCFAF7]">
       <div className="w-10 h-10 border-2 border-slate-100 border-t-sky-500 rounded-full animate-spin"></div>
    </div>
  );

  if (!resort) return (
    <div className="p-40 text-center bg-[#FCFAF7] min-h-screen">
      <h1 className="text-4xl font-serif italic mb-8">Sanctuary missing.</h1>
      <Link to="/stays" className="text-sky-500 font-bold uppercase tracking-widest text-[10px] border-b border-sky-100">Return to Portfolio</Link>
    </div>
  );

  return (
    <div className="bg-[#FCFAF7] selection:bg-sky-100 selection:text-sky-900 overflow-x-hidden">
      <SEO 
        title={`${resort.name} | ${resort.atoll} | Serenity Maldives`}
        description={resort.shortDescription}
        image={resort.images[0]}
      />

      {/* 1. CINEMATIC HERO */}
      <section className="relative h-[90vh] w-full overflow-hidden bg-slate-900">
         <img src={resort.images[0]} alt={resort.name} className="w-full h-full object-cover scale-105" />
         <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"></div>
         <div className="absolute bottom-0 left-0 right-0 p-8 md:p-20 max-w-7xl mx-auto text-white reveal active">
            <Link to="/stays" className="text-white/60 font-bold text-[9px] uppercase tracking-[0.6em] mb-12 inline-block hover:text-white transition-colors">← The Portfolio</Link>
            <div className="flex items-center gap-6 mb-8">
               <span className="bg-sky-500/90 backdrop-blur-md text-white px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.4em] shadow-xl">{resort.atoll}</span>
               <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-80">{resort.priceRange} Exclusive</span>
            </div>
            <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-serif font-bold leading-none tracking-tighter italic drop-shadow-2xl">{resort.name}<span className="not-italic text-sky-500">.</span></h1>
         </div>
      </section>

      {/* 2. THE SANCTUARY NARRATIVE */}
      <section className="py-24 md:py-48 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-24">
          <div className="lg:col-span-7 reveal">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-12 h-px bg-sky-500"></div>
              <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[1em]">The Sanctuary</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-slate-950 italic mb-12 leading-[1.1] tracking-tighter">"{resort.uvp}"</h2>
            <div className="prose prose-xl prose-slate max-w-none text-slate-600 leading-[2.2] text-lg md:text-xl font-medium space-y-12">
              <p>{resort.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-20">
                {resort.features.map(f => (
                  <div key={f} className="flex items-center gap-6 group">
                     <div className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-150 transition-all"></div>
                     <span className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.3em]">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-12 reveal delay-300">
             <div className="bg-slate-50 p-12 rounded-[3.5rem] border border-slate-100">
                <h3 className="text-2xl font-serif font-bold italic mb-8">Fast Logistics</h3>
                <div className="space-y-6">
                   <div className="flex justify-between items-center py-4 border-b border-slate-100">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Transfers</span>
                      <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">{resort.transfers.join(' & ')}</span>
                   </div>
                   <div className="flex justify-between items-center py-4 border-b border-slate-100">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Meal Plans</span>
                      <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">{resort.mealPlans.join(' • ')}</span>
                   </div>
                   <div className="flex justify-between items-center py-4">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Rating</span>
                      <div className="flex gap-1">
                        {Array.from({length: resort.rating}).map((_, i) => <svg key={i} className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>)}
                      </div>
                   </div>
                </div>
             </div>
             <div className="rounded-[3.5rem] overflow-hidden aspect-[4/5] shadow-2xl relative group">
                <img src={resort.images[1] || resort.images[0]} className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-110" alt="Resort Lifestyle" />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors"></div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. EXPERIENCES AT RESORT - NEW DYNAMIC SECTION */}
      {resortExperiences.length > 0 && (
        <section className="py-24 md:py-48 bg-[#fcfaf7] overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-20 mb-20 md:mb-32 reveal">
            <span className="text-sky-500 font-bold uppercase tracking-[1em] text-[10px] mb-8 block">Island Adventures</span>
            <h2 className="text-4xl md:text-8xl font-serif font-bold text-slate-950 italic tracking-tighter leading-tight">Experiences at <br/> {resort.name}.</h2>
          </div>
          
          <div className="max-w-[1440px] mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {resortExperiences.map((exp, i) => (
              <div key={exp.id} className="group reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-10 shadow-lg bg-slate-100">
                  <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-10 left-10 right-10">
                    <span className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[8px] font-black text-slate-900 uppercase tracking-widest mb-4 inline-block">
                      {exp.category}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-white mb-4 italic leading-tight group-hover:translate-x-2 transition-transform">{exp.title}</h3>
                  </div>
                </div>
                <div className="px-4">
                   <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest leading-loose line-clamp-2">
                     {exp.description}
                   </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. ACCOMMODATION PORTFOLIO */}
      {resort.roomTypes && resort.roomTypes.length > 0 && (
        <section className="py-24 md:py-48 bg-white border-y border-slate-50">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
             <div className="text-center mb-24 reveal">
                <span className="text-amber-500 font-bold uppercase tracking-[1em] text-[10px] mb-8 block">Living Spaces</span>
                <h2 className="text-4xl md:text-7xl font-serif font-bold text-slate-950 italic tracking-tighter">Rooms & Suites.</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
                {resort.roomTypes.map((room, i) => (
                  <div key={i} className="group flex flex-col reveal" style={{ transitionDelay: `${i * 150}ms` }}>
                    <div className="aspect-[16/10] rounded-[3rem] overflow-hidden mb-12 shadow-sm group-hover:shadow-2xl transition-all duration-1000 bg-slate-100">
                       <img src={room.image} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-105" alt={room.name} />
                    </div>
                    <div className="px-6">
                       <h4 className="text-3xl font-serif font-bold text-slate-900 mb-6 group-hover:italic transition-all">{room.name}</h4>
                       <p className="text-slate-500 text-sm leading-relaxed mb-10 font-medium opacity-90">{room.description}</p>
                       <div className="flex flex-wrap gap-4">
                          {room.highlights.map(h => (
                            <span key={h} className="text-[9px] font-bold text-slate-400 uppercase tracking-widest border border-slate-100 px-4 py-2 rounded-full">{h}</span>
                          ))}
                       </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </section>
      )}

      {/* 5. DINING VENUES */}
      {resort.diningVenues && resort.diningVenues.length > 0 && (
        <section className="py-24 md:py-48 bg-[#FCFAF7]">
           <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
              <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24 reveal">
                 <div className="max-w-2xl">
                    <span className="text-sky-500 font-bold uppercase tracking-[1em] text-[10px] mb-8 block">Culinary Journey</span>
                    <h2 className="text-4xl md:text-7xl font-serif font-bold text-slate-950 italic tracking-tighter leading-tight">Gastro-Atolls.</h2>
                 </div>
                 <div className="w-24 h-px bg-slate-200 mb-4 hidden md:block"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                 {resort.diningVenues.map((venue, i) => (
                   <div key={i} className="group reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                      <div className="aspect-square rounded-[3rem] overflow-hidden mb-10 shadow-sm transition-all duration-700 group-hover:shadow-xl bg-slate-100">
                         <img src={venue.image} className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-110" alt={venue.name} />
                      </div>
                      <div className="px-4">
                         <span className="text-amber-500 font-bold text-[9px] uppercase tracking-widest block mb-4">{venue.cuisine} • {venue.vibe}</span>
                         <h4 className="text-2xl font-serif font-bold text-slate-950 mb-6">{venue.name}</h4>
                         <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-loose line-clamp-3">{venue.description}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>
      )}

      {/* 6. BESPOKE OFFERS */}
      {resortOffers.length > 0 && (
        <section className="py-24 md:py-48 bg-slate-950 text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
             <h2 className="text-[40vw] font-serif italic whitespace-nowrap -rotate-12 translate-y-1/2">Privileges</h2>
          </div>
          <div className="max-w-[1440px] mx-auto px-6 lg:px-20 relative z-10">
             <div className="text-center mb-24 reveal">
                <span className="text-sky-400 font-bold uppercase tracking-[1em] text-[10px] mb-8 block">Seasonal Privileges</span>
                <h2 className="text-4xl md:text-7xl font-serif font-bold italic tracking-tighter">Current Offers.</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {resortOffers.map(offer => (
                  <div key={offer.id} className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[3.5rem] flex flex-col h-full reveal">
                    <span className="bg-amber-400 text-slate-950 px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest mb-10 w-fit">{offer.category}</span>
                    <h4 className="text-3xl font-serif font-bold mb-8 italic leading-tight">{offer.title}</h4>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] mb-12 leading-loose">{offer.discount}</p>
                    <div className="mt-auto pt-10 border-t border-white/10 flex justify-between items-center">
                       <span className="text-[9px] font-bold text-sky-400 uppercase tracking-widest">Expires {new Date(offer.expiryDate).toLocaleDateString()}</span>
                       <button onClick={() => setFormStep(1)} className="text-[10px] font-black uppercase tracking-widest border-b border-white/20 pb-1 hover:text-sky-400 transition-colors">Inquire</button>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </section>
      )}

      {/* 7. THE INQUIRY INTERFACE */}
      <section className="py-24 md:py-48 bg-white relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-[#FCFAF7] rounded-[4rem] p-8 md:p-24 shadow-2xl border border-slate-50 reveal">
            {isSubmitted ? (
               <div className="text-center py-20 animate-in fade-in slide-in-from-bottom-6 duration-700">
                  <div className="w-24 h-24 bg-sky-500 rounded-full flex items-center justify-center text-white mx-auto mb-12 shadow-2xl">
                     <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold italic mb-8">Inquiry Dispatched.</h2>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em] leading-loose max-w-sm mx-auto mb-16">
                     Our Maldivian specialists will review your vision for {resort.name} and provide a bespoke curation within 24 hours.
                  </p>
                  <Link to="/stays" className="text-[11px] font-black uppercase tracking-[0.8em] text-slate-950 border-b border-slate-950 pb-3 hover:text-sky-500 hover:border-sky-500 transition-all">Return to Portfolio</Link>
               </div>
            ) : (
              <>
                <div className="text-center mb-20">
                  <span className="text-sky-500 font-bold uppercase tracking-[1em] text-[10px] mb-8 block">Bespoke Curation</span>
                  <h2 className="text-3xl md:text-6xl font-serif font-bold italic text-slate-950 mb-8 tracking-tighter">Initiate Dialogue.</h2>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">Personalized planning for {resort.name}</p>
                </div>

                <form onSubmit={handleInquirySubmit} className="space-y-12">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-4">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Identity</label>
                        <input 
                          type="text" 
                          required 
                          value={quoteData.customerName}
                          onChange={e => setQuoteData(prev => ({...prev, customerName: e.target.value}))}
                          className="w-full bg-white border-none rounded-full px-8 py-5 text-[11px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-sky-500 transition-all placeholder:text-slate-100 shadow-sm" 
                          placeholder="NAME" 
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Channel</label>
                        <input 
                          type="email" 
                          required 
                          value={quoteData.customerEmail}
                          onChange={e => setQuoteData(prev => ({...prev, customerEmail: e.target.value}))}
                          className="w-full bg-white border-none rounded-full px-8 py-5 text-[11px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-sky-500 transition-all placeholder:text-slate-100 shadow-sm" 
                          placeholder="EMAIL" 
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Phone Number</label>
                        <input 
                          type="tel" 
                          required 
                          value={quoteData.customerPhone}
                          onChange={e => setQuoteData(prev => ({...prev, customerPhone: e.target.value}))}
                          className="w-full bg-white border-none rounded-full px-8 py-5 text-[11px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-sky-500 transition-all placeholder:text-slate-100 shadow-sm" 
                          placeholder="07700 900000" 
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Travel Dates</label>
                        <input 
                          type="text" 
                          className="w-full bg-white border-none rounded-full px-8 py-5 text-[11px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-sky-500 transition-all placeholder:text-slate-100 shadow-sm" 
                          placeholder="OCTOBER 2024" 
                        />
                      </div>
                   </div>
                   <div className="space-y-4">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">The Vision</label>
                      <textarea 
                        rows={6} 
                        className="w-full bg-white border-none rounded-[2.5rem] px-8 py-8 text-[11px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-sky-500 transition-all placeholder:text-slate-100 shadow-sm resize-none" 
                        placeholder="DESCRIBE YOUR IDEAL STAY..."
                      ></textarea>
                   </div>
                   <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-slate-950 text-white font-black py-8 rounded-full text-[11px] uppercase tracking-[1em] hover:bg-sky-500 transition-all duration-700 shadow-2xl disabled:opacity-50"
                   >
                     {isSubmitting ? 'DISPATCHING...' : 'Request Curation'}
                   </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 8. SIMILAR STAYS - CURATED RECOMMENDATIONS */}
      <section className="py-24 md:py-48 bg-[#FCFAF7] border-t border-slate-50">
         <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
            <div className="flex justify-between items-end gap-12 mb-24 reveal">
               <div className="max-w-2xl">
                  <span className="text-slate-400 font-bold uppercase tracking-[1em] text-[10px] mb-8 block">Similar Perspectives</span>
                  <h2 className="text-4xl md:text-7xl font-serif font-bold italic text-slate-950 tracking-tighter">You May Also Like.</h2>
               </div>
               <Link to="/stays" className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-900 border-b border-slate-900 pb-2 hidden md:block">View Full Portfolio</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20">
               {similarStays.map(s => (
                 <ResortCard key={s.id} resort={s} />
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

export default ResortDetail;
