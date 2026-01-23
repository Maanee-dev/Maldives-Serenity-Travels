import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { RESORTS } from '../constants';
import { AccommodationType, TransferType } from '../types';
import ResortCard from '../components/ResortCard';

const Stays: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || '';
  
  const [filterQuery, setFilterQuery] = useState(initialQuery);
  const [stayType, setStayType] = useState<AccommodationType>(AccommodationType.RESORT);
  const [selectedAtoll, setSelectedAtoll] = useState<string>('All');
  const [selectedTransfer, setSelectedTransfer] = useState<string>('All');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setFilterQuery(q);
  }, [location.search]);

  // SEO and Meta Management - Ensuring "The Dream" is sold via search visibility
  useEffect(() => {
    const title = stayType === AccommodationType.RESORT 
      ? 'Ultra-Luxury Resorts | Maldives Serenity Stays' 
      : 'Boutique Guest Houses | Maldivian Island Life';
    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      (metaDesc as HTMLMetaElement).name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', `Discover the most ${stayType === AccommodationType.RESORT ? 'exclusive private island resorts' : 'authentic local island stays'} in the Maldives. Curated for the discerning traveler.`);
  }, [stayType]);

  // Reset page to 1 whenever any filter or stay type changes to prevent empty page states
  useEffect(() => {
    setCurrentPage(1);
  }, [filterQuery, stayType, selectedAtoll, selectedTransfer]);

  // Smooth entry animations for new results
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [stayType, selectedAtoll, selectedTransfer, filterQuery, currentPage]);

  const atolls = useMemo(() => {
    const set = new Set(RESORTS.filter(r => r.type === stayType).map(r => r.atoll));
    return ['All', ...Array.from(set)];
  }, [stayType]);

  const filteredStays = useMemo(() => {
    return RESORTS.filter(stay => {
      const matchesType = stay.type === stayType;
      const matchesSearch = stay.name.toLowerCase().includes(filterQuery.toLowerCase()) || 
                            stay.atoll.toLowerCase().includes(filterQuery.toLowerCase());
      const matchesAtoll = selectedAtoll === 'All' || stay.atoll === selectedAtoll;
      const matchesTransfer = selectedTransfer === 'All' || stay.transfers.includes(selectedTransfer as TransferType);
      
      return matchesType && matchesSearch && matchesAtoll && matchesTransfer;
    });
  }, [stayType, filterQuery, selectedAtoll, selectedTransfer]);

  // Calculate Paginated Results
  const totalPages = Math.ceil(filteredStays.length / itemsPerPage);
  const currentStays = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStays.slice(start, start + itemsPerPage);
  }, [filteredStays, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to results area for better UX
    const element = document.getElementById('results-anchor');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#FCFAF7] min-h-screen">
      {/* Editorial Header - Atmospheric & Minimal */}
      <section className="pt-56 pb-40 px-6 text-center reveal">
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

      {/* Results Anchor for smooth navigation pagination scroll */}
      <div id="results-anchor" className="scroll-mt-32"></div>

      {/* Boutique Filters & Results Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-48">
        <div className="flex flex-col gap-24">
          
          {/* Refined Filter Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 border-b border-slate-100 pb-16 reveal">
            <div className="flex gap-4 p-1.5 bg-slate-100/30 backdrop-blur-sm rounded-full border border-slate-200/50">
              <button 
                onClick={() => setStayType(AccommodationType.RESORT)}
                className={`px-10 py-3 rounded-full text-[9px] font-bold transition-all duration-500 uppercase tracking-[0.3em] ${stayType === AccommodationType.RESORT ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Resorts
              </button>
              <button 
                onClick={() => setStayType(AccommodationType.GUEST_HOUSE)}
                className={`px-10 py-3 rounded-full text-[9px] font-bold transition-all duration-500 uppercase tracking-[0.3em] ${stayType === AccommodationType.GUEST_HOUSE ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Local Islands
              </button>
            </div>

            <div className="flex flex-wrap justify-center md:justify-end gap-16 items-center">
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

          {/* Luxury Listing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 min-h-[600px]">
            {currentStays.length > 0 ? (
              currentStays.map((stay, idx) => (
                <div key={stay.id} className="reveal" style={{ transitionDelay: `${idx * 50}ms` }}>
                  <ResortCard resort={stay} />
                </div>
              ))
            ) : (
              <div className="col-span-full py-40 text-center reveal">
                <h3 className="text-4xl font-serif font-bold italic text-slate-900 mb-6">No Sanctuaries Found.</h3>
                <p className="text-slate-400 uppercase tracking-widest text-[10px]">Adjust your boutique filters to continue the journey.</p>
              </div>
            )}
          </div>

          {/* Minimalist Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-col items-center gap-10 reveal border-t border-slate-100 pt-16">
              <div className="flex items-center gap-10 md:gap-16">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.4em] transition-all duration-500 ${currentPage === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-950 hover:text-sky-500'}`}
                  aria-label="Previous Page"
                >
                  <span className="text-lg">←</span>
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <div className="flex items-center gap-4 md:gap-6">
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

                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.4em] transition-all duration-500 ${currentPage === totalPages ? 'opacity-0 pointer-events-none' : 'text-slate-950 hover:text-sky-500'}`}
                  aria-label="Next Page"
                >
                  <span className="hidden sm:inline">Next</span>
                  <span className="text-lg">→</span>
                </button>
              </div>

              <div className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.6em]">
                Page {currentPage} of {totalPages} — Curating {filteredStays.length} Options
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stays;