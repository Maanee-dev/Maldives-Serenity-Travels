
import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { RESORTS } from '../constants';
import { AccommodationType, TransferType, MealPlan } from '../types';
import ResortCard from '../components/ResortCard';

const Stays: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || '';
  
  const [filterQuery, setFilterQuery] = useState(initialQuery);
  const [stayType, setStayType] = useState<AccommodationType>(AccommodationType.RESORT);
  const [selectedAtoll, setSelectedAtoll] = useState<string>('All');
  const [selectedTransfer, setSelectedTransfer] = useState<string>('All');
  const [selectedMealPlan, setSelectedMealPlan] = useState<string>('All');

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
      const matchesTransfer = selectedTransfer === 'All' || stay.transfers.includes(selectedTransfer as TransferType);
      const matchesMealPlan = selectedMealPlan === 'All' || stay.mealPlans.includes(selectedMealPlan as MealPlan);
      
      return matchesType && matchesSearch && matchesAtoll && matchesTransfer && matchesMealPlan;
    });
  }, [stayType, filterQuery, selectedAtoll, selectedTransfer, selectedMealPlan]);

  const resetFilters = () => {
    setSelectedAtoll('All');
    setSelectedTransfer('All');
    setSelectedMealPlan('All');
    setFilterQuery('');
  };

  return (
    <div className="bg-[#FCFAF7] min-h-screen">
      {/* Editorial Header */}
      <div className={`transition-all duration-1000 pt-48 pb-32 px-6 text-center relative overflow-hidden`}>
        <div className="max-w-7xl mx-auto relative z-10 reveal active">
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold mb-6 block text-slate-400">Curated Collection</span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 text-slate-900 tracking-tight italic">
            {stayType === AccommodationType.RESORT ? 'Bespoke Resorts' : 'Island Sanctuaries'}
          </h1>
          <p className="text-slate-500 text-sm md:text-base font-medium max-w-xl mx-auto uppercase tracking-widest leading-loose opacity-70">
            {stayType === AccommodationType.RESORT 
              ? "Discover the most exclusive overwater villas and private island retreats." 
              : "Authentic local experiences blending heritage with the serenity of the Maldives."}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
        {/* Boutique Switcher */}
        <div className="flex justify-center mb-24 reveal active">
          <div className="inline-flex p-1.5 bg-slate-100 rounded-full border border-slate-200">
            <button 
              onClick={() => { setStayType(AccommodationType.RESORT); resetFilters(); }}
              className={`px-12 py-3.5 rounded-full text-[10px] font-bold transition-all uppercase tracking-[0.3em] ${stayType === AccommodationType.RESORT ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Private Resorts
            </button>
            <button 
              onClick={() => { setStayType(AccommodationType.GUEST_HOUSE); resetFilters(); }}
              className={`px-12 py-3.5 rounded-full text-[10px] font-bold transition-all uppercase tracking-[0.3em] ${stayType === AccommodationType.GUEST_HOUSE ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Local Islands
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-20">
          {/* Minimalist Sidebar */}
          <aside className="lg:w-72 flex-shrink-0 reveal active">
            <div className="sticky top-32 space-y-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-[9px] font-bold text-slate-900 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                    Search <div className="h-px bg-slate-200 flex-grow"></div>
                  </h3>
                  <input 
                    type="text" 
                    placeholder="Resort Name..." 
                    className="w-full bg-transparent border-b border-slate-200 py-3 text-xs focus:outline-none focus:border-slate-900 transition-colors uppercase tracking-widest"
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                  />
                </div>

                <div>
                  <h3 className="text-[9px] font-bold text-slate-900 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                    Atoll Selection <div className="h-px bg-slate-200 flex-grow"></div>
                  </h3>
                  <div className="space-y-3">
                    {atolls.map(a => (
                      <button 
                        key={a}
                        onClick={() => setSelectedAtoll(a)}
                        className={`block text-[10px] uppercase tracking-widest transition-colors ${selectedAtoll === a ? 'text-sky-600 font-bold' : 'text-slate-400 hover:text-slate-900'}`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[9px] font-bold text-slate-900 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                    Transfers <div className="h-px bg-slate-200 flex-grow"></div>
                  </h3>
                  <div className="space-y-3">
                    {['All', ...Object.values(TransferType)].map(t => (
                      <button 
                        key={t}
                        onClick={() => setSelectedTransfer(t)}
                        className={`block text-[10px] uppercase tracking-widest transition-colors ${selectedTransfer === t ? 'text-sky-600 font-bold' : 'text-slate-400 hover:text-slate-900'}`}
                      >
                        {t === 'All' ? 'Any Method' : t.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-loose mb-6">
                  Not finding the perfect sanctuary? Our concierge is available 24/7.
                </p>
                <button className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-900 border-b border-slate-900 pb-1 hover:opacity-50 transition-all">
                  Contact Expert
                </button>
              </div>
            </div>
          </aside>

          {/* Grid View */}
          <div className="flex-grow reveal active">
            <div className="flex justify-between items-center mb-16">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em]">
                Discovering {filteredStays.length} Options
              </span>
              <div className="w-24 h-px bg-slate-100"></div>
            </div>

            {filteredStays.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                {filteredStays.map(stay => (
                  <ResortCard key={stay.id} resort={stay} />
                ))}
              </div>
            ) : (
              <div className="py-40 text-center">
                <h3 className="text-3xl font-serif italic text-slate-900 mb-4">No Sanctuaries Found</h3>
                <button 
                  onClick={resetFilters}
                  className="text-[10px] font-bold uppercase tracking-widest text-sky-600"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stays;
