import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, mapOffer } from '../lib/supabase';
import { RESORTS, OFFERS, EXPERIENCES } from '../constants';
import { Accommodation, AccommodationType, TransferType, MealPlan, Offer, Experience } from '../types';
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

/**
 * ResortDetail Component: Displays a specific resort's identity, features, 
 * and exclusive offers with a bespoke inquiry interface.
 */
const ResortDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [resort, setResort] = useState<Accommodation | null>(null);
  const [allResorts, setAllResorts] = useState<Accommodation[]>([]);
  const [resortOffers, setResortOffers] = useState<Offer[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [quoteData, setQuoteData] = useState({
    customerName: '',
    customerEmail: '',
    country: 'United Kingdom',
    countryCode: '+44',
    customerPhone: '',
    notes: ''
  });

  // Restore draft from local storage on mount
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

  // Persist draft to local storage on state change
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

  // Load resort data from Supabase or constants fallback
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: resortsData } = await supabase.from('resorts').select('*');
        if (resortsData) {
          setAllResorts(resortsData.map(item => ({
            id: item.id,
            name: item.name,
            slug: item.slug,
            type: item.type as AccommodationType,
            atoll: item.atoll,
            priceRange: item.price_range,
            rating: item.rating,
            description: item.description,
            shortDescription: item.short_description,
            images: item.images || [],
            features: item.features || [],
            transfers: item.transfers || [],
            mealPlans: item.meal_plans || [],
            uvp: item.uvp
          })));
        }

        const { data: resortData } = await supabase.from('resorts').select('*').eq('slug', slug).maybeSingle();
        if (resortData) {
            setResort({
                id: resortData.id,
                name: resortData.name,
                slug: resortData.slug,
                type: resortData.type as AccommodationType,
                atoll: resortData.atoll,
                priceRange: resortData.price_range,
                rating: resortData.rating,
                description: resortData.description,
                shortDescription: resortData.short_description,
                images: resortData.images || [],
                features: resortData.features || [],
                transfers: resortData.transfers || [],
                mealPlans: resortData.meal_plans || [],
                uvp: resortData.uvp
            });
            const { data: offersData } = await supabase.from('offers').select('*').eq('resort_id', resortData.id);
            if (offersData) setResortOffers(offersData.map(mapOffer));
        } else {
            const local = RESORTS.find(r => r.slug === slug);
            if (local) setResort(local);
            setResortOffers(OFFERS.filter(o => o.resortSlug === slug));
        }
        
        setExperiences(EXPERIENCES);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  // Logic to find similar resorts
  const similarStays = useMemo(() => {
    if (!resort || allResorts.length === 0) return [];
    const brandName = resort.name.split(' ')[0];
    let matches = allResorts.filter(r => r.slug !== slug && r.name.toLowerCase().includes(brandName.toLowerCase()));
    if (matches.length < 2) {
      const atollMatches = allResorts.filter(r => r.slug !== slug && r.atoll === resort.atoll && !matches.find(m => m.id === r.id));
      matches = [...matches, ...atollMatches];
    }
    if (matches.length < 3) {
      const moreMatches = allResorts.filter(r => r.slug !== slug && !matches.find(m => m.id === r.id));
      matches = [...matches, ...moreMatches];
    }
    return matches.slice(0, 3);
  }, [resort, allResorts, slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCFAF7]">
       <div className="w-10 h-10 border-2 border-slate-100 border-t-sky-500 rounded-full animate-spin"></div>
    </div>
  );

  if (!resort) return (
    <div className="p-40 text-center bg-[#FCFAF7] min-h-screen">
      <h1 className="text-4xl font-serif italic mb-8 text-slate-900">Resort not found.</h1>
      <Link to="/stays" className="text-sky-500 font-bold uppercase tracking-widest text-[10px] border-b border-sky-100">Return to Portfolio</Link>
    </div>
  );

  return (
    <div className="bg-white min-h-screen selection:bg-sky-100">
      <SEO title={`${resort.name} | Serenity Maldives`} description={resort.shortDescription} />
      
      {/* Cinematic Hero */}
      <section className="h-[70vh] relative overflow-hidden">
        <img src={resort.images[0] || 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200'} className="w-full h-full object-cover" alt={resort.name} />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-12 left-12 text-white">
           <span className="text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block text-sky-400">{resort.atoll}</span>
           <h1 className="text-6xl font-serif font-bold italic">{resort.name}</h1>
        </div>
      </section>

      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto px-6 py-24">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
            <div className="lg:col-span-2 space-y-16">
               <p className="text-3xl font-serif font-bold italic border-l-8 border-sky-500 pl-12 py-4 text-slate-900">
                 "{resort.uvp}"
               </p>
               <div className="text-slate-600 text-xl leading-relaxed">
                 {resort.description}
               </div>
               
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-slate-50">
                  {resort.features.map(f => (
                    <div key={f} className="flex flex-col gap-4 items-center text-center">
                       <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                       <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">{f}</span>
                    </div>
                  ))}
               </div>

               {resortOffers.length > 0 && (
                 <div className="py-12">
                   <h3 className="text-3xl font-serif font-bold italic mb-12">Exclusive Privileges</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {resortOffers.map(offer => (
                        <div key={offer.id} className="bg-amber-50 p-10 rounded-[2.5rem] border border-amber-100">
                           <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest mb-4 block">{offer.discount}</span>
                           <h4 className="text-2xl font-serif font-bold mb-4">{offer.title}</h4>
                           <p className="text-slate-500 text-sm mb-8">{offer.roomCategory} • {offer.nights} Nights</p>
                           <Link to="/plan" className="text-slate-900 font-bold text-[10px] uppercase tracking-widest border-b border-slate-900 pb-1">Claim Offer</Link>
                        </div>
                      ))}
                   </div>
                 </div>
               )}
            </div>

            <div className="lg:col-span-1">
               <div className="bg-slate-950 text-white p-12 rounded-[3rem] sticky top-32 shadow-2xl">
                  <h3 className="text-2xl font-serif font-bold italic mb-8">Initiate Inquiry</h3>
                  <div className="space-y-6">
                     <div className="space-y-3">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-white/40">Full Identity</label>
                        <input type="text" value={quoteData.customerName} onChange={e => setQuoteData(p => ({...p, customerName: e.target.value}))} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-xs font-bold uppercase tracking-widest outline-none focus:border-sky-500" placeholder="NAME" />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-white/40">Digital Signature</label>
                        <input type="email" value={quoteData.customerEmail} onChange={e => setQuoteData(p => ({...p, customerEmail: e.target.value}))} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-xs font-bold uppercase tracking-widest outline-none focus:border-sky-500" placeholder="EMAIL" />
                     </div>
                     <button className="w-full bg-sky-600 text-white py-6 rounded-2xl font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-sky-500 transition-all shadow-xl mt-8">
                        Request Quote
                     </button>
                  </div>
               </div>
            </div>
         </div>

         {similarStays.length > 0 && (
           <div className="mt-48">
              <div className="flex justify-between items-end mb-24 reveal active">
                 <div>
                   <span className="text-sky-500 font-bold uppercase tracking-[1em] text-[10px] mb-8 block">Similar Sanctuaries</span>
                   <h3 className="text-5xl font-serif font-bold italic">Explore Further.</h3>
                 </div>
                 <Link to="/stays" className="text-[10px] font-bold text-slate-900 uppercase tracking-widest border-b border-slate-900 pb-2">View Portfolio</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                 {similarStays.map(s => (
                   <ResortCard key={s.id} resort={s} />
                 ))}
              </div>
           </div>
         )}
      </div>
    </div>
  );
};

export default ResortDetail;