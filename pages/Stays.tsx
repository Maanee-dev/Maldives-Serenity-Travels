import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase, mapResort, mapOffer } from '../lib/supabase';
import { RESORTS, OFFERS } from '../constants';
import { AccommodationType, TransferType, Accommodation, Offer } from '../types';
import ResortCard from '../components/ResortCard';
import SEO from '../components/SEO';

const Stays: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || '';
  
  const [resorts, setResorts] = useState<Accommodation[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterQuery, setFilterQuery] = useState(initialQuery);
  
  // Using 'RESORT' as initial but accommodating the user's addition of 'LIVEABOARD'
  const [stayType, setStayType] = useState<AccommodationType>(AccommodationType.RESORT);
  const [selectedAtoll, setSelectedAtoll] = useState<string>('All');
  const [selectedTransfer, setSelectedTransfer] = useState<string>('All');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Optimized for 3-column grid

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: resortsData, error: resortError } = await supabase.from('resorts').select('*').order('name', { ascending: true });
        const { data: offersData } = await supabase.from('offers').select('*');

        if (resortError) throw resortError;

        let finalResorts: Accommodation[] = [];
        if (resortsData && resortsData.length > 0) {
          finalResorts = resortsData.map(mapResort);
        }

        const dbSlugs = new Set(finalResorts.map(r => r.slug));
        const localFallbacks = RESORTS.filter(r => !dbSlugs.has(r.slug));
        setResorts([...finalResorts, ...localFallbacks]);
        
        if (offersData && offersData.length > 0) {
          setOffers(offersData.map(mapOffer));
        } else {
          setOffers(OFFERS);
        }

      } catch (err) {
        console.error("Critical Fetch Error:", err);
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
    <div className="bg-[#FCFAF7] min-h-screen selection:bg-sky-100 selection:text-sky-900">
      <SEO 
        title="Luxury Resorts & Overwater Villas Portfolio" 
        description="Discover our curated portfolio of the finest luxury resorts and overwater villas in the Maldives. From private island sanctuaries to local island guest houses and liveaboards."
        keywords={['Maldives luxury resorts', 'overwater villas Maldives', 'best resorts in Maldives', 'Baa Atoll resorts', 'North Male Atoll luxury', 'seaplane transfers Maldives', 'Maldives guest houses', 'Maldives liveaboards']}
        image="https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200"
      />

      {/* Hero Section */}
      <section className="pt-40 md:pt-56 lg:pt-64 pb-16 md:pb-24 px-6 text-center reveal active">
        <div className="max-w-[1440px] mx-auto">
          <span className="text-[10px] md:text-[11px] uppercase tracking-[1em] font-black mb-6 md:mb-10 block text-sky-500">The Portfolio</span>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold mb-10 md:mb-12 text-slate-900 tracking-tighter italic leading-none">
            {stayType === AccommodationType.RESORT ? 'Iconic Stays.' : stayType === AccommodationType.GUEST_HOUSE ? 'Island Life.' : 'Atoll Voyagers.'}
          </h1>
          <div className="h-px w-24 bg-amber-400 mx-auto mb-10 md:mb-16"></div>
          <p className="text-slate-500 text-[10px] md:text-[13px] font-bold uppercase tracking-[0.5em] max-w-2xl mx-auto leading-loose px-4 opacity-80">
            Defining the luxury of space and the art of silence <br className="hidden md:block"/> across the turquoise archipelago.
          </p>
        </div>
      </section>

      {/* Search Bar Architecture */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 mb-20 md:mb-32 reveal active">
        <div className="relative group max-w-4xl mx-auto">
          <span className="absolute left-0 -top-6 text-[10px] font-black uppercase tracking-[0.6em] text-slate-900 group-focus-within:text-sky-500 transition-colors">
            Search Sanctuaries
          </span>
          <div className="relative border-b-[1px] border-slate-200 group-focus-within:border-slate-950 transition-all duration-500">
            <input 
              type="text"
              value={filterQuery}
              onChange={(e) => { setFilterQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Soneva Jani, Baa Atoll..."
              className="w-full bg-transparent pt-8 pb-6 text-2xl md:text-4xl lg:text-5xl font-serif italic text-slate-950 outline-none placeholder:text-slate-100"
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pb-48">
        <div className="flex flex-col gap-16 md:gap-24">
          
          {/* Controls Bar */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12 border-b-[1px] border-slate-100 pb-16 reveal active">
            
            {/* Horizontal Scrolling Tabs for Mobile */}
            <div className="w-full lg:w-auto overflow-x-auto no-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0">
              <div className="flex gap-1 p-1 bg-slate-100/50 rounded-full w-max mx-auto lg:mx-0">
                <button 
                  onClick={() => { setStayType(AccommodationType.RESORT); setCurrentPage(1); }} 
                  className={`px-8 md:px-10 py-3.5 rounded-full text-[10px] md:text-[11px] font-black transition-all duration-500 uppercase tracking-[0.3em] whitespace-nowrap ${stayType === AccommodationType.RESORT ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-950'}`}
                >
                  Resorts
                </button>
                <button 
                  onClick={() => { setStayType(AccommodationType.GUEST_HOUSE); setCurrentPage(1); }} 
                  className={`px-8 md:px-10 py-3.5 rounded-full text-[10px] md:text-[11px] font-black transition-all duration-500 uppercase tracking-[0.3em] whitespace-nowrap ${stayType === AccommodationType.GUEST_HOUSE ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-950'}`}
                >
                  Guest Houses
                </button>
                <button 
                  onClick={() => { setStayType('LIVEABOARD' as any); setCurrentPage(1); }} 
                  className={`px-8 md:px-10 py-3.5 rounded-full text-[10px] md:text-[11px] font-black transition-all duration-500 uppercase tracking-[0.3em] whitespace-nowrap ${stayType === ('LIVEABOARD' as any) ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-950'}`}
                >
                  Liveaboards
                </button>
              </div>
            </div>

            {/* Selectors */}
            <div className="flex flex-row justify-center lg:justify-end gap-12 md:gap-16 items-center w-full lg:w-auto">
              <div className="flex flex-col gap-3">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Atoll Registry</span>
                <select 
                  value={selectedAtoll} 
                  onChange={(e) => { setSelectedAtoll(e.target.value); setCurrentPage(1); }} 
                  className="bg-transparent text-[11px] font-black uppercase tracking-widest text-slate-950 outline-none cursor-pointer border-b-[1px] border-transparent hover:border-slate-300 transition-all pb-1 min-w-[120px]"
                >
                  {atolls.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Arrival Method</span>
                <select 
                  value={selectedTransfer} 
                  onChange={(e) => { setSelectedTransfer(e.target.value); setCurrentPage(1); }} 
                  className="bg-transparent text-[11px] font-black uppercase tracking-widest text-slate-950 outline-none cursor-pointer border-b-[1px] border-transparent hover:border-slate-300 transition-all pb-1 min-w-[140px]"
                >
                  <option value="All">All Transfers</option>
                  {Object.values(TransferType).map(t => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Stays Grid */}
          {loading ? (
            <div className="py-48 text-center flex flex-col items-center justify-center">
              <div className="w-10 h-10 border-[1px] border-slate-200 border-t-sky-500 rounded-full animate-spin mb-8"></div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Scanning Atolls...</p>
            </div>
          ) : currentStays.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 lg:gap-x-16 lg:gap-y-32">
                {currentStays.map((stay) => (
                  <ResortCard key={stay.id} resort={stay} hasOffer={offers.some(o => o.resortId === stay.id)} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-40 flex justify-center items-center gap-10">
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] disabled:opacity-20 transition-all"
                  >
                    <span className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-950 group-hover:text-white transition-all">&larr;</span>
                    <span className="hidden md:inline">Previous</span>
                  </button>
                  
                  <div className="flex gap-4">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`w-10 h-10 rounded-full text-[10px] font-black transition-all ${currentPage === i + 1 ? 'bg-slate-950 text-white scale-110 shadow-xl' : 'text-slate-400 hover:text-slate-900'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] disabled:opacity-20 transition-all"
                  >
                    <span className="hidden md:inline">Next</span>
                    <span className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-950 group-hover:text-white transition-all">&rarr;</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="py-48 text-center max-w-lg mx-auto">
              <h3 className="text-3xl font-serif font-bold italic mb-6 text-slate-900">Sanctuary not found.</h3>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mb-12 leading-loose">
                Your specific parameters didn't reveal a match in our current registry. Adjust your coordinates or search terms.
              </p>
              <button 
                onClick={() => { setFilterQuery(''); setSelectedAtoll('All'); setSelectedTransfer('All'); setCurrentPage(1); }}
                className="text-[10px] font-black text-sky-500 uppercase tracking-[0.6em] border-b border-sky-100 pb-2 hover:border-sky-500 transition-all"
              >
                Reset Parameters
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer Signature */}
      <section className="py-32 bg-white border-t border-slate-50 text-center">
        <div className="max-w-4xl mx-auto px-6 reveal">
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-[1.5em] mb-12 block">Need Bespoke Advice?</span>
           <h2 className="text-4xl md:text-7xl font-serif font-bold italic mb-12 text-slate-900 tracking-tighter">Your Maldivian Perspective.</h2>
           <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.5em] mb-20 leading-loose">
              Our travel specialists curate itineraries that <br className="hidden md:block"/> transcend the standard holiday.
           </p>
           <a href="/plan" className="inline-block bg-slate-950 text-white font-black px-16 py-7 rounded-full hover:bg-sky-500 transition-all duration-700 shadow-2xl uppercase tracking-[0.8em] text-[10px]">
              Initiate Discovery
           </a>
        </div>
      </section>
    </div>
  );
};

export default Stays;
