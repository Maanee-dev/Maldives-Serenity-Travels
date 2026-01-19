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

  const headerContent = stayType === AccommodationType.RESORT 
    ? { title: "Luxury Resorts", desc: "Curated overwater villas and private island sanctuaries across the archipelago." }
    : { title: "Authentic Guest Houses", desc: "Local island stays for an immersive and budget-friendly Maldivian experience." };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className={`transition-all duration-700 py-24 px-4 text-white text-center relative overflow-hidden ${stayType === AccommodationType.RESORT ? 'bg-sky-950' : 'bg-teal-950'}`}>
        <div className="absolute inset-0 opacity-20 pointer-events-none">
           <img src="https://images.unsplash.com/photo-1506929662133-570c13349a7c?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Background" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold mb-4 inline-block text-sky-400">Maldives Serenity Stays</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 italic">{headerContent.title}</h1>
          <p className="text-sky-100/70 text-lg md:text-xl font-medium max-w-2xl mx-auto">{headerContent.desc}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Toggle Switch */}
        <div className="flex justify-center -mt-24 mb-16 relative z-20">
          <div className="bg-white/95 backdrop-blur-xl p-2 rounded-3xl shadow-2xl border border-slate-100 flex gap-2">
            <button 
              onClick={() => { setStayType(AccommodationType.RESORT); resetFilters(); }}
              className={`px-10 py-4 rounded-2xl text-xs font-bold transition-all uppercase tracking-[0.2em] ${stayType === AccommodationType.RESORT ? 'bg-sky-600 text-white shadow-xl' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Private Resorts
            </button>
            <button 
              onClick={() => { setStayType(AccommodationType.GUEST_HOUSE); resetFilters(); }}
              className={`px-10 py-4 rounded-2xl text-xs font-bold transition-all uppercase tracking-[0.2em] ${stayType === AccommodationType.GUEST_HOUSE ? 'bg-teal-600 text-white shadow-xl' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Local Islands
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:w-80 flex-shrink-0 space-y-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-[10px] text-slate-400">Refine Search</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Keyword</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="e.g. Soneva..." 
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                      value={filterQuery}
                      onChange={(e) => setFilterQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Atoll</label>
                  <select 
                    value={selectedAtoll} 
                    onChange={(e) => setSelectedAtoll(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none"
                  >
                    {atolls.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Transfer</label>
                  <select 
                    value={selectedTransfer} 
                    onChange={(e) => setSelectedTransfer(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none"
                  >
                    <option value="All">Any Transfer</option>
                    {Object.values(TransferType).map(t => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Meal Plan</label>
                  <select 
                    value={selectedMealPlan} 
                    onChange={(e) => setSelectedMealPlan(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none"
                  >
                    <option value="All">Any Meal Plan</option>
                    {Object.values(MealPlan).map(m => <option key={m} value={m}>{m.replace('_', ' ')}</option>)}
                  </select>
                </div>

                <button 
                  onClick={resetFilters}
                  className="w-full text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-4 hover:text-sky-600 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            </div>

            <div className="bg-sky-900 text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
               <div className="relative z-10">
                 <h4 className="text-xl font-serif font-bold mb-2 italic">Not sure?</h4>
                 <p className="text-sky-200 text-sm mb-6 leading-relaxed">Our specialists visit these islands every season. Get a custom recommendation.</p>
                 <button className="w-full bg-sky-500 text-white font-bold py-4 rounded-xl text-xs uppercase tracking-widest hover:bg-sky-400 transition-all">
                    Plan With An Expert
                 </button>
               </div>
            </div>
          </aside>

          {/* Listing Grid */}
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-10">
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                Found <span className="text-slate-900">{filteredStays.length}</span> {stayType.toLowerCase()}s
              </p>
              <div className="flex gap-4">
                 {selectedAtoll !== 'All' && <span className="bg-sky-50 text-sky-600 px-3 py-1 rounded-full text-[10px] font-bold border border-sky-100 uppercase">{selectedAtoll}</span>}
              </div>
            </div>

            {filteredStays.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredStays.map(stay => (
                  <ResortCard key={stay.id} resort={stay} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[3rem] p-20 text-center shadow-sm border border-slate-100">
                <span className="text-5xl mb-6 block">🥥</span>
                <h3 className="text-2xl font-serif font-bold text-slate-800 mb-2">No matches found</h3>
                <p className="text-slate-500 max-w-xs mx-auto mb-8">Try broadening your filters or searching for a specific atoll.</p>
                <button 
                  onClick={resetFilters}
                  className="bg-sky-600 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest"
                >
                  Show All {stayType.toLowerCase()}s
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