
import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { AccommodationType, TransferType, Accommodation, MealPlan } from '../types';
import ResortCard from '../components/ResortCard';

const Stays: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || '';
  
  const [resorts, setResorts] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterQuery, setFilterQuery] = useState(initialQuery);
  const [stayType, setStayType] = useState<AccommodationType>(AccommodationType.RESORT);
  const [selectedAtoll, setSelectedAtoll] = useState<string>('All');
  const [selectedTransfer, setSelectedTransfer] = useState<string>('All');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchResorts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('resorts')
        .select('*')
        .order('name', { ascending: true });
      
      if (error) {
        console.error('Supabase fetch error:', error);
      } else if (data) {
        const mappedData: Accommodation[] = data.map(item => ({
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
          isFeatured: item.is_featured || false
        }));
        setResorts(mappedData);
      }
      setLoading(false);
    };

    fetchResorts();
  }, []);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setFilterQuery(q);
  }, [location.search]);

  useEffect(() => {
    const title = stayType === AccommodationType.RESORT 
      ? 'Ultra-Luxury Resorts | Maldives Serenity Stays' 
      : 'Boutique Guest Houses | Maldivian Island Life';
    document.title = title;
  }, [stayType]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterQuery, stayType, selectedAtoll, selectedTransfer]);

  // Derive atolls, filteredStays, totalPages, and currentStays before they are used in useEffect
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
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
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
          <span className="text-[10px] uppercase tracking-[1em] font-bold mb-10 block text-sky-500">The Portfolio</span>
          <h1 className="text-6xl md:text-9xl font-serif font-bold mb-12 text-slate-900 tracking-tighter italic leading-none">
            {stayType === AccommodationType.RESORT ? 'Iconic Stays' : 'Island Life'}
          </h1>
          <div className="h-px w-24 bg-amber-400 mx-auto mb-16"></div>
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.5em] max-w-xl mx-auto leading-loose opacity-80">
            Defining the luxury of space and the art of silence <br className="hidden md:block"/> across the turquoise archipelago.
          </p>
        </div>
      </section>

      <div id="results-anchor" className="scroll-mt-32"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-24 reveal active">
        <div className="relative group max-w-4xl mx-auto">
          <span className="absolute left-0 top-0 text-[8px] font-bold uppercase tracking-[0.8em] text-slate-300 group-focus-within:text-sky-500 transition-colors">
            Search Sanctuaries
          </span>
          <input 
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="PROPERTY OR REGION..."
            className="w-full bg-transparent border-b border-slate-200 pt-10 pb-6 text-xl md:text-3xl font-serif italic text-slate-900 outline-none transition-all focus:border-slate-950 placeholder:text-slate-100"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-48">
        <div className="flex flex-col gap-24">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 border-b border-slate-100 pb-16 reveal active">
            <div className="flex gap-4 p-1.5 bg-slate-100/30 backdrop-blur-sm rounded-full border border-slate-200/50">
              <button 
                onClick={() => setStayType(AccommodationType.RESORT)}
                className={`px-6 md:px-10 py-3 rounded-full text-[9px] font-bold transition-all duration-500 uppercase tracking-[0.3em] ${stayType === AccommodationType.RESORT ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Resorts
              </button>
              <button 
                onClick={() => setStayType(AccommodationType.GUEST_HOUSE)}
                className={`px-6 md:px-10 py-3 rounded-full text-[9px] font-bold transition-all duration-500 uppercase tracking-[0.3em] ${stayType === AccommodationType.GUEST_HOUSE ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Local Islands
              </button>
            </div>

            <div className="flex flex-wrap justify-center md:justify-end gap-10 md:gap-16 items-center">
              <div className="flex items-center gap-6">
                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Region</span>
                <select 
                  value={selectedAtoll}
                  onChange={(e) => setSelectedAtoll(e.target.value)}
                  className="bg-transparent text-[11px] font-bold uppercase tracking-widest text-slate-900 outline-none cursor-pointer border-b border-transparent hover:border-sky-500 transition-all pb-1"
                >
                  {atolls.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>

              <div className="flex items-center gap-6">
                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Arrival</span>
                <select 
                  value={selectedTransfer}
                  onChange={(e) => setSelectedTransfer(e.target.value)}
                  className="bg-transparent text-[11px] font-bold uppercase tracking-widest text-slate-900 outline-none cursor-pointer border-b border-transparent hover:border-sky-500 transition-all pb-1"
                >
                  <option value="All">All Transfers</option>
                  {Object.values(TransferType).map(t => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 min-h-[400px]">
            {loading ? (
              <div className="col-span-full py-40 text-center">
                <div className="w-12 h-12 border-4 border-slate-100 border-t-sky-500 rounded-full animate-spin mx-auto mb-8"></div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.6em]">Consulting the archives...</p>
              </div>
            ) : currentStays.length > 0 ? (
              currentStays.map((stay, idx) => (
                <div key={stay.id} className="reveal active" style={{ transitionDelay: `${idx * 50}ms` }}>
                  <ResortCard resort={stay} />
                </div>
              ))
            ) : (
              <div className="col-span-full py-40 text-center reveal active">
                <h3 className="text-4xl font-serif font-bold italic text-slate-900 mb-6">No Sanctuaries Found.</h3>
                <p className="text-slate-400 uppercase tracking-widest text-[10px]">Adjust your boutique filters to continue the journey.</p>
              </div>
            )}
          </div>

          {!loading && totalPages > 1 && (
            <div className="mt-12 flex flex-col items-center gap-10 reveal active border-t border-slate-100 pt-16">
              <div className="flex items-center justify-between w-full max-w-sm md:max-w-none md:gap-16">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.4em] transition-all duration-500 ${currentPage === 1 ? 'opacity-20 cursor-not-allowed' : 'text-slate-950 hover:text-sky-500'}`}
                >
                  <span className="text-lg">←</span>
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <div className="hidden md:flex items-center gap-4 md:gap-6">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`text-[10px] font-bold uppercase tracking-widest w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${currentPage === page ? 'bg-slate-950 text-white shadow-xl' : 'text-slate-300 hover:text-slate-950'}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <div className="md:hidden flex flex-col items-center">
                  <span className="text-[10px] font-bold text-slate-950 uppercase tracking-widest">
                    {currentPage} / {totalPages}
                  </span>
                </div>

                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.4em] transition-all duration-500 ${currentPage === totalPages ? 'opacity-20 cursor-not-allowed' : 'text-slate-950 hover:text-sky-500'}`}
                >
                  <span className="hidden sm:inline">Next</span>
                  <span className="text-lg">→</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stays;
