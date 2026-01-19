
import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { RESORTS } from '../constants';
import { AccommodationType } from '../types';
import ResortCard from '../components/ResortCard';

const Stays: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || '';
  
  const [filterQuery, setFilterQuery] = useState(initialQuery);
  const [stayType, setStayType] = useState<AccommodationType>(AccommodationType.RESORT);
  const [selectedAtoll, setSelectedAtoll] = useState<string>('All');

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setFilterQuery(q);
  }, [location.search]);

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
      
      return matchesType && matchesSearch && matchesAtoll;
    });
  }, [stayType, filterQuery, selectedAtoll]);

  const headerContent = stayType === AccommodationType.RESORT 
    ? { title: "Luxury Resorts", desc: "World-class overwater villas and private island sanctuaries." }
    : { title: "Authentic Guest Houses", desc: "Local island stays for an immersive and budget-friendly Maldivian experience." };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className={`transition-colors duration-500 py-20 px-4 text-white text-center ${stayType === AccommodationType.RESORT ? 'bg-sky-900' : 'bg-teal-700'}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">{headerContent.title}</h1>
          <p className="text-sky-100/80 text-lg font-medium max-w-2xl mx-auto">{headerContent.desc}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-16">
          <div className="bg-white p-1.5 rounded-2xl shadow-lg border border-slate-100 flex gap-2">
            <button 
              onClick={() => { setStayType(AccommodationType.RESORT); setSelectedAtoll('All'); }}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all uppercase tracking-widest ${stayType === AccommodationType.RESORT ? 'bg-sky-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Luxury Resorts
            </button>
            <button 
              onClick={() => { setStayType(AccommodationType.GUEST_HOUSE); setSelectedAtoll('All'); }}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all uppercase tracking-widest ${stayType === AccommodationType.GUEST_HOUSE ? 'bg-teal-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Guest Houses
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-64 flex-shrink-0 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-widest text-xs">Search</h3>
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
              />
            </div>
          </aside>

          <div className="flex-grow">
            {filteredStays.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredStays.map(stay => (
                  <ResortCard key={stay.id} resort={stay} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">No stays found matching your criteria.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stays;
