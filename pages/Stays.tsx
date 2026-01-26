import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { RESORTS, OFFERS } from '../constants';
import { AccommodationType, TransferType, Accommodation, MealPlan, Offer } from '../types';
import ResortCard from '../components/ResortCard';

const Stays: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || '';
  
  const [resorts, setResorts] = useState<Accommodation[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterQuery, setFilterQuery] = useState(initialQuery);
  const [stayType, setStayType] = useState<AccommodationType>(AccommodationType.RESORT);
  const [selectedAtoll, setSelectedAtoll] = useState<string>('All');
  const [selectedTransfer, setSelectedTransfer] = useState<string>('All');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: resortsData } = await supabase.from('resorts').select('*').order('name', { ascending: true });
        const { data: offersData } = await supabase.from('offers').select('*');

        let finalResorts: Accommodation[] = [];
        if (resortsData && resortsData.length > 0) {
          finalResorts = resortsData.map(item => ({
            id: item.id,
            name: item.name,
            slug: item.slug,
            type: (item.type || 'RESORT') as AccommodationType,
            atoll: item.atoll || 'Unknown',
            priceRange: item.price_range || '$$$$',
            rating: item.rating || 5,
            description: item.description || '',
            shortDescription: item.short_description || '',
            images: item.images || [],
            features: item.features || [],
            transfers: (item.transfers || []) as TransferType[],
            mealPlans: (item.meal_plans || []) as MealPlan[],
            uvp: item.uvp || 'Defined by perspective.',
            isFeatured: item.is_featured || false,
            roomTypes: item.room_types || [],
            diningVenues: item.dining_venues || []
          }));
        }

        const dbSlugs = new Set(finalResorts.map(r => r.slug));
        const localFallbacks = RESORTS.filter(r => !dbSlugs.has(r.slug));
        setResorts([...finalResorts, ...localFallbacks]);
        
        if (offersData && offersData.length > 0) {
          const mappedOffers: Offer[] = offersData.map(o => ({
            id: o.id,
            resortId: o.resort_id,
            title: o.title,
            discount: o.discount,
            resortName: o.resort_name,
            expiryDate: o.expiry_date,
            image: o.image,
            category: o.category
          }));
          setOffers(mappedOffers);
        } else {
          setOffers(OFFERS);
        }

      } catch (err) {
        setResorts(RESORTS);
        setOffers(OFFERS);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const atolls = useMemo(() => {
    const set = new Set(resorts.filter(r => r.type === stayType).map(r => r.atoll));
    return ['All', ...Array.from(set)].sort();
  }, [stayType, resorts]);

  const filteredStays = useMemo(() => {
    return resorts.filter(stay => {
      const matchesType = stay.type === stayType;
      const matchesSearch = stay.name.toLowerCase().includes(filterQuery.toLowerCase()) || 
                            stay.atoll.toLowerCase().includes(filterQuery.toLowerCase());
      const matchesAtoll = selectedAtoll === 'All' || stay.atoll === selectedAtoll;
      const matchesTransfer = selectedTransfer === 'All' || (stay.transfers && stay.transfers.includes(selectedTransfer as TransferType));
      
      return matchesType && matchesSearch && matchesAtoll && matchesTransfer;
    });
  }, [stayType, filterQuery, selectedAtoll, selectedTransfer, resorts]);

  const totalPages = Math.ceil(filteredStays.length / itemsPerPage);
  const currentStays = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStays.slice(start, start + itemsPerPage);
  }, [filteredStays, currentPage]);

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
  }, [currentStays, loading]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FCFAF7] min-h-screen">
      <section className="pt-56 pb-24 md:pb-40 px-6 text-center reveal active">
        <div className="max-w-7xl mx-auto">
          <span className="text-[12px] uppercase tracking-[1em] font-black mb-10 block text-sky-600">The Portfolio</span>
          <h1 className="text-6xl md:text-9xl font-serif font-bold mb-12 text-slate-900 tracking-tighter italic leading-none">
            {stayType === AccommodationType.RESORT ? 'Iconic Stays' : 'Island Life'}
          </h1>
          <div className="h-px w-24 bg-amber-400 mx-auto mb-16"></div>
          <p className="text-slate-900 text-[13px] font-black uppercase tracking-[0.5em] max-w-2xl mx-auto leading-loose opacity-100">
            Defining the luxury of space and the art of silence <br className="hidden md:block"/> across the turquoise archipelago.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-24 reveal active">
        <div className="relative group max-w-4xl mx-auto">
          <span className="absolute left-0 -top-6 text-[11px] font-black uppercase tracking-[0.8em] text-slate-900 group-focus-within:text-sky-600 transition-colors">
            Search Sanctuaries
          </span>
          <div className="relative border-b-[1px] border-slate-200 group-focus-within:border-slate-900 transition-all duration-500">
            <input 
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="PROPERTY OR REGION..."
              className="w-full bg-transparent pt-8 pb-6 text-xl md:text-3xl font-serif italic text-slate-950 outline-none placeholder:text-slate-300"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-48">
        <div className="flex flex-col gap-24">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 border-b-[1px] border-slate-100 pb-16 reveal active">
            <div className="flex gap-1 p-1 bg-slate-100/50 rounded-full">
              <button onClick={() => setStayType(AccommodationType.RESORT)} className={`px-8 md:px-12 py-3 rounded-full text-[11px] font-black transition-all duration-500 uppercase tracking-[0.3em] ${stayType === AccommodationType.RESORT ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-950'}`}>Resorts</button>
              <button onClick={() => setStayType(AccommodationType.GUEST_HOUSE)} className={`px-8 md:px-12 py-3 rounded-full text-[11px] font-black transition-all duration-500 uppercase tracking-[0.3em] ${stayType === AccommodationType.GUEST_HOUSE ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-950'}`}>Local Islands</button>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-10 md:gap-16 items-center">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Region</span>
                <select value={selectedAtoll} onChange={(e) => setSelectedAtoll(e.target.value)} className="bg-transparent text-[11px] font-black uppercase tracking-widest text-slate-950 outline-none cursor-pointer border-b-[1px] border-transparent hover:border-slate-300 transition-all pb-1">
                  {atolls.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Arrival</span>
                <select value={selectedTransfer} onChange={(e) => setSelectedTransfer(e.target.value)} className="bg-transparent text-[11px] font-black uppercase tracking-widest text-slate-950 outline-none cursor-pointer border-b-[1px] border-transparent hover:border-slate-300 transition-all pb-1">
                  <option value="All">All Transfers</option>
                  {Object.values(TransferType).map(t => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 min-h-[400px]">
            {loading ? (
              <div className="col-span-full py-40 text-center">
                <div className="w-8 h-8 border-[1px] border-slate-200 border-t-sky-600 rounded-full animate-spin mx-auto mb-8"></div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Accessing records...</p>
              </div>
            ) : currentStays.length > 0 ? (
              currentStays.map(stay => (
                <ResortCard 
                  key={stay.id} 
                  resort={stay} 
                  hasOffer={offers.some(o => o.resortId === stay.id)} 
                />
              ))
            ) : (
              <div className="col-span-full py-40 text-center border-2 border-dashed border-slate-100 rounded-[4rem]">
                <h3 className="text-4xl font-serif font-bold italic text-slate-900 mb-6">No Sanctuaries Found.</h3>
                <button onClick={() => {setFilterQuery(''); setSelectedAtoll('All'); setSelectedTransfer('All');}} className="text-sky-500 font-black uppercase tracking-widest text-[11px] border-b border-sky-200">Reset Search</button>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-12 pt-20 reveal">
               <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="text-[11px] font-black uppercase tracking-widest text-slate-950 disabled:opacity-20 flex items-center gap-4">← Previous</button>
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{currentPage} of {totalPages}</span>
               <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="text-[11px] font-black uppercase tracking-widest text-slate-950 disabled:opacity-20 flex items-center gap-4">Next →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stays;