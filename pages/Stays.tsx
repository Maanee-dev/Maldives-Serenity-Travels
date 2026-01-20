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

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setFilterQuery(q);
  }, [location.search]);

  // Reveal Animation Trigger
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [stayType, selectedAtoll, selectedTransfer, filterQuery]);

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

  return (
    <div className="bg-[#FCFAF7] min-h-screen">
      {/* Editorial Cinematic Header */}
      <section className="pt-56 pb-40 px-6 text-center reveal">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] uppercase tracking-[1em] font-bold mb-10 block text-sky-500">The Portfolio</span>
          <h1 className="text-6xl md:text-9xl font-serif font-bold mb-12 text-slate-900 tracking-tighter italic leading-none">
            {stayType === AccommodationType.RESORT ? 'Iconic Stays' : 'Island Life'}
          </h1>
          <div className="h-px w-24 bg-amber-400 mx-auto mb-16"></div>
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.5em] max-w-xl mx-auto leading-loose opacity-80">
            Curating the finest Maldivian sanctuaries <br className="hidden md:block"/> defined by silence, space, and perspective.
          </p>
        </div>
      </section>

      {/* Boutique Switcher & Filters */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-48">
        <div className="flex flex-col gap-24">
          
          {/* Top Filter Bar - Minimalist */}
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

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {filteredStays.length > 0 ? (
              filteredStays.map((stay, idx) => (
                <div key={stay.id} className="reveal" style={{ transitionDelay: `${idx * 100}ms` }}>
                  <ResortCard resort={stay} />
                </div>
              ))
            ) : (
              <div className="col-span-full py-40 text-center reveal">
                <h3 className="text-4xl font-serif font-bold italic text-slate-900 mb-6">No results found.</h3>
                <p className="text-slate-400 uppercase tracking-widest text-[10px]">Adjust your boutique filters to continue your journey.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stays;