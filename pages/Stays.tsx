
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
  const [stayType, setStayType] = useState<AccommodationType>(AccommodationType.RESORT);
  const [selectedAtoll, setSelectedAtoll] = useState<string>('All');
  const [selectedTransfer, setSelectedTransfer] = useState<string>('All');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: resortsData, error: resortError } = await supabase.from('resorts').select('*').order('name', { ascending: true });
        const { data: offersData, error: offerError } = await supabase.from('offers').select('*');

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
    <div className="bg-[#FCFAF7] min-h-screen">
      <SEO 
        title="Iconic Sanctuaries & Private Islands" 
        description="Explore our curated portfolio of Maldivian luxury resorts and boutique local guest houses. Defined by perspective."
        path="/stays"
      />
      
      <section className="pt-56 pb-24 md:pb-40 px-6 text-center reveal active">
        <div className="max-w-7xl mx-auto">
          <span className="text-[12px] uppercase tracking-[1em] font-black text-sky-500 block mb-8">The Portfolio</span>
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif font-bold text-slate-950 tracking-tighter italic leading-none mb-16">The Stays.</h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-32">
        {/* Filter Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-24 reveal">
          <div className="flex flex-wrap justify-center gap-4">
            {atolls.map(atoll => (
              <button 
                key={atoll} 
                onClick={() => { setSelectedAtoll(atoll); setCurrentPage(1); }}
                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${selectedAtoll === atoll ? 'bg-slate-950 text-white shadow-xl' : 'bg-white border border-slate-100 text-slate-400 hover:border-slate-300'}`}
              >
                {atoll}
              </button>
            ))}
          </div>
          
          <div className="relative w-full lg:w-80">
            <input 
              type="text" 
              placeholder="SEARCH PROPERTY..." 
              value={filterQuery}
              onChange={(e) => { setFilterQuery(e.target.value); setCurrentPage(1); }}
              className="w-full bg-white border border-slate-100 rounded-full px-8 py-4 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-sky-500 transition-all outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Results Architecture */}
        {loading ? (
          <div className="py-32 text-center">
            <div className="w-10 h-10 border-2 border-slate-100 border-t-sky-500 rounded-full animate-spin mx-auto mb-8"></div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Consulting archives...</p>
          </div>
        ) : currentStays.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
              {currentStays.map(resort => (
                <ResortCard key={resort.id} resort={resort} />
              ))}
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-32 flex justify-center items-center gap-4">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all disabled:opacity-20">&larr;</button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button key={i} onClick={() => handlePageChange(i + 1)} className={`w-12 h-12 rounded-full text-[10px] font-black transition-all ${currentPage === i + 1 ? 'bg-slate-950 text-white' : 'bg-white border border-slate-100 text-slate-400 hover:border-slate-300'}`}>{i + 1}</button>
                  ))}
                </div>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all disabled:opacity-20">&rarr;</button>
              </div>
            )}
          </>
        ) : (
          <div className="py-32 text-center">
            <h3 className="text-2xl font-serif font-bold italic text-slate-950 mb-6">No stays match your current filters.</h3>
            <button onClick={() => { setFilterQuery(''); setSelectedAtoll('All'); setSelectedTransfer('All'); }} className="text-sky-500 font-black uppercase tracking-widest text-[10px] border-b-2 border-sky-100 pb-2">Reset Discovery</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Stays;
