import React, { useEffect, useState, useMemo } from 'react';
import { supabase, mapOffer, mapResort } from '../lib/supabase';
import { OFFERS, RESORTS } from '../constants';
import { Link, useNavigate } from 'react-router-dom';
import { Offer, Accommodation } from '../types';

const Offers: React.FC = () => {
  const navigate = useNavigate();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [resorts, setResorts] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedResortId, setSelectedResortId] = useState<string | null>(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: offersData } = await supabase.from('offers').select('*').order('created_at', { ascending: false });
        const { data: resortsData } = await supabase.from('resorts').select('*');

        const mappedOffers = offersData && offersData.length > 0 ? offersData.map(mapOffer) : OFFERS;
        const mappedResorts = resortsData && resortsData.length > 0 ? resortsData.map(mapResort) : RESORTS;
        
        setOffers(mappedOffers);
        setResorts(mappedResorts);
      } catch (error) {
        console.error("Failed to fetch offers archive:", error);
        setOffers(OFFERS);
        setResorts(RESORTS);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 150);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [loading, activeCategory, selectedResortId, currentPage]);

  const categories = ['All', 'Honeymoon', 'Early Bird', 'Last Minute'];

  // Identify resorts that currently have live negotiated rates
  const resortsWithOffers = useMemo(() => {
    const offerResortIds = new Set(offers.map(o => o.resortId));
    return resorts.filter(r => offerResortIds.has(r.id));
  }, [offers, resorts]);

  const filteredOffers = useMemo(() => {
    let filtered = offers;
    if (activeCategory !== 'All') {
      filtered = filtered.filter(offer => offer.category === activeCategory);
    }
    if (selectedResortId) {
      filtered = filtered.filter(offer => offer.resortId === selectedResortId);
    }
    return filtered;
  }, [offers, activeCategory, selectedResortId]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredOffers.length / itemsPerPage);
  const currentOffers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOffers.slice(start, start + itemsPerPage);
  }, [filteredOffers, currentPage]);

  const handleResortSelect = (id: string | null) => {
    setSelectedResortId(id);
    setCurrentPage(1);
    const grid = document.getElementById('offers-grid');
    if (grid) grid.scrollIntoView({ behavior: 'smooth' });
  };

  const getResortSlug = (id: string) => {
    return resorts.find(r => r.id === id)?.slug || resorts.find(r => r.name === id)?.slug || id;
  };

  return (
    <div className="bg-[#FCFAF7] min-h-screen selection:bg-sky-100 selection:text-sky-900 pb-32 overflow-hidden">
       
       {/* 1. IMMERSIVE EDITORIAL HEADER */}
       <section className="pt-64 pb-24 md:pb-32 px-6 text-center reveal active">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center items-center gap-6 mb-12">
               <div className="w-16 h-px bg-slate-200"></div>
               <span className="text-[10px] font-black text-sky-500 uppercase tracking-[1.5em] ml-[1.5em]">
                 The Curated Archive
               </span>
               <div className="w-16 h-px bg-slate-200"></div>
            </div>
            
            <h1 className="text-7xl md:text-[10rem] font-serif font-bold text-slate-950 tracking-tighter leading-[0.85] mb-16">
              Bespoke <br /> 
              <span className="italic text-sky-500 font-normal">Privileges.</span>
            </h1>
            
            <p className="text-slate-500 text-[12px] font-bold max-w-2xl mx-auto uppercase tracking-[0.6em] leading-[2.5] opacity-80 mb-24">
              A collection of negotiated rates and seasonal <br className="hidden md:block"/> dispatches, curated for the modern minimalist.
            </p>

            {/* Category Filter Navigation */}
            <div className="inline-flex flex-wrap justify-center items-center gap-x-12 gap-y-8 px-12 py-8 rounded-full border border-slate-100 bg-white/50 backdrop-blur-sm shadow-sm transition-all duration-1000">
               {categories.map(cat => (
                 <button
                   key={cat}
                   onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                   className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-700 relative group ${activeCategory === cat ? 'text-slate-950' : 'text-slate-300 hover:text-slate-500'}`}
                 >
                   {cat}
                   <span className={`absolute -bottom-2 left-0 h-0.5 bg-sky-500 transition-all duration-700 ${activeCategory === cat ? 'w-full' : 'w-0 group-hover:w-4'}`}></span>
                 </button>
               ))}
            </div>
          </div>
       </section>

       {/* 2. CHOOSE A RESORT SECTION (Horizontal Gallery) */}
       {resortsWithOffers.length > 0 && (
         <section className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-32 reveal">
            <div className="mb-12 flex flex-col md:flex-row items-baseline justify-between gap-6 border-b border-slate-100 pb-10">
               <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Resorts with Active Dispatches</span>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold italic text-slate-950">Partners in Perspective.</h2>
               </div>
               {selectedResortId && (
                 <button 
                  onClick={() => handleResortSelect(null)}
                  className="text-[10px] font-black text-sky-500 uppercase tracking-widest hover:text-slate-950 transition-colors border-b border-sky-500/30 pb-1"
                 >
                   Reset Gallery &times;
                 </button>
               )}
            </div>
            
            <div className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-8">
               {resortsWithOffers.map(resort => (
                 <button
                   key={resort.id}
                   onClick={() => handleResortSelect(resort.id)}
                   className={`flex-shrink-0 w-72 md:w-96 snap-start group transition-all duration-1000 ${selectedResortId && selectedResortId !== resort.id ? 'opacity-30 scale-95' : 'opacity-100'}`}
                 >
                    <div className={`relative aspect-[16/10] rounded-[3.5rem] overflow-hidden mb-6 border-2 transition-all duration-1000 ${selectedResortId === resort.id ? 'border-sky-500 shadow-2xl' : 'border-transparent shadow-sm hover:border-slate-200'}`}>
                       <img src={resort.images[0]} className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-110" alt={resort.name} />
                       <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors duration-1000"></div>
                       {selectedResortId === resort.id && (
                         <div className="absolute inset-0 flex items-center justify-center bg-sky-500/10 backdrop-blur-[2px]">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xl">
                               <svg className="w-6 h-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                            </div>
                         </div>
                       )}
                    </div>
                    <span className="text-[11px] font-black text-slate-950 uppercase tracking-[0.4em] block text-center truncate px-4">
                      {resort.name}
                    </span>
                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest block text-center mt-2">
                      {resort.atoll}
                    </span>
                 </button>
               ))}
            </div>
         </section>
       )}

       {/* 3. PAGINATED OFFERS GRID */}
       <section id="offers-grid" className="max-w-[1440px] mx-auto px-6 lg:px-12 mt-12 min-h-[600px]">
          {loading ? (
            <div className="py-64 text-center">
              <div className="w-12 h-12 border-[1px] border-slate-200 border-t-sky-500 rounded-full animate-spin mx-auto mb-12"></div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Consulting the Atolls...</p>
            </div>
          ) : currentOffers.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-x-16 lg:gap-y-24">
                {currentOffers.map((offer, idx) => (
                  <div key={offer.id} className="reveal" style={{ transitionDelay: `${idx * 150}ms` }}>
                    <div className="group flex flex-col h-full bg-white rounded-[4.5rem] overflow-hidden shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-1000 border border-slate-50">
                      
                      {/* Cinematic Image Container */}
                      <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                         <img 
                           src={offer.image} 
                           alt={offer.title} 
                           className="w-full h-full object-cover grayscale-[30%] brightness-[0.95] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-[4s] ease-out" 
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
                         
                         {/* Floating Privilege Badges */}
                         <div className="absolute top-12 left-12 flex flex-col gap-3 items-start">
                            <div className="bg-slate-950 text-white px-7 py-3 rounded-full shadow-2xl border border-white/10 backdrop-blur-md">
                               <span className="text-[12px] font-black uppercase tracking-[0.3em]">{offer.discount}</span>
                            </div>
                            <span className="bg-white/95 backdrop-blur-md px-6 py-2 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] shadow-sm">
                               {offer.category}
                            </span>
                         </div>

                         {/* Urgency Overlay */}
                         <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                            <div className="flex flex-col gap-1">
                              <span className="text-[8px] font-black text-white/50 uppercase tracking-widest">Limited Engagement</span>
                              <span className="text-white text-[10px] font-black uppercase tracking-[0.4em] drop-shadow-lg">Subject to Availability</span>
                            </div>
                         </div>
                      </div>

                      {/* Content Architecture */}
                      <div className="p-12 md:p-16 flex-grow flex flex-col">
                         <h3 className="text-3xl font-serif font-bold text-slate-950 mb-8 leading-[1.1] group-hover:italic group-hover:text-sky-500 transition-all duration-1000">
                            {offer.title}
                         </h3>
                         
                         <div className="flex items-center gap-4 mb-16">
                            <div className="w-8 h-px bg-amber-400"></div>
                            <p className="text-slate-400 font-black text-[9px] uppercase tracking-[0.5em]">
                               {offer.resortName}
                            </p>
                         </div>
                         
                         <div className="mt-auto pt-10 border-t border-slate-50 flex items-center justify-between">
                            <div className="flex flex-col gap-2">
                              <span className="text-[9px] text-slate-300 font-bold uppercase tracking-widest text-center">Final Dispatch</span>
                              <span className="text-slate-900 font-black text-[11px] uppercase tracking-widest">
                                {new Date(offer.expiryDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                              </span>
                            </div>
                            
                            <Link 
                              to={`/stays/${getResortSlug(offer.resortId)}`} 
                              className="group/btn flex items-center gap-5 text-[10px] font-black uppercase tracking-[0.5em] text-slate-950 transition-all"
                            >
                              <span className="border-b-2 border-slate-100 group-hover/btn:border-sky-500 transition-colors pb-1">Refine</span>
                              <div className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center group-hover/btn:bg-slate-950 group-hover/btn:text-white group-hover/btn:border-slate-950 transition-all duration-700 shadow-sm">
                                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                 </svg>
                              </div>
                            </Link>
                         </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-32 flex justify-center items-center gap-16 reveal">
                   <button 
                    onClick={() => { handlePageChange(currentPage - 1); }}
                    disabled={currentPage === 1}
                    className="group flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.5em] text-slate-950 disabled:opacity-20 transition-all"
                   >
                     <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-950 group-hover:text-white transition-all">
                       &larr;
                     </div>
                     <span>Previous</span>
                   </button>
                   
                   <div className="flex items-center gap-8">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`text-[11px] font-black transition-all ${currentPage === page ? 'text-sky-500 scale-125' : 'text-slate-300 hover:text-slate-500'}`}
                        >
                          {page.toString().padStart(2, '0')}
                        </button>
                      ))}
                   </div>

                   <button 
                    onClick={() => { handlePageChange(currentPage + 1); }}
                    disabled={currentPage === totalPages}
                    className="group flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.5em] text-slate-950 disabled:opacity-20 transition-all"
                   >
                     <span>Next</span>
                     <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-950 group-hover:text-white transition-all">
                       &rarr;
                     </div>
                   </button>
                </div>
              )}
            </>
          ) : (
            <div className="py-64 text-center reveal active">
               <h3 className="text-4xl font-serif font-bold italic text-slate-900 mb-8 tracking-tighter">No seasonal dispatches found.</h3>
               <button 
                onClick={() => { setActiveCategory('All'); setSelectedResortId(null); setCurrentPage(1); }}
                className="text-sky-500 font-black uppercase tracking-[0.5em] text-[10px] border-b border-sky-200 pb-2"
               >
                 Reset Search Criteria
               </button>
            </div>
          )}
       </section>

       {/* Serenity Circle Section */}
       <section className="mt-48 max-w-[1440px] mx-auto px-6 lg:px-12 reveal">
          <div className="bg-slate-950 text-white rounded-[4.5rem] p-16 md:p-32 flex flex-col justify-center items-center text-center shadow-2xl relative overflow-hidden group border border-white/5">
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:scale-110 group-hover:opacity-[0.06] transition-all duration-[20s] ease-linear">
                <h2 className="text-[40vw] font-serif italic whitespace-nowrap -rotate-12 translate-y-1/2">Collective</h2>
             </div>
             <div className="relative z-10 w-full max-w-xl">
               <span className="text-[10px] font-bold text-sky-400 uppercase tracking-[1em] mb-12 block">Exclusive Dispatch</span>
               <h3 className="text-5xl md:text-7xl font-serif font-bold mb-12 italic tracking-tighter">Serenity Circle.</h3>
               <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.4em] leading-loose mb-20 opacity-80">
                  Receive unlisted boutique escapes, private atoll updates, <br className="hidden md:block"/> and negotiated privileges.
               </p>
               <form className="w-full space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="relative">
                     <input 
                       type="email" 
                       placeholder="IDENTITY (EMAIL)" 
                       className="w-full bg-white/5 border border-white/10 rounded-full px-12 py-7 text-[10px] font-black uppercase tracking-[0.4em] focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all text-white placeholder:text-slate-600" 
                     />
                  </div>
                  <button className="w-full bg-white text-slate-950 font-black py-7 rounded-full text-[12px] uppercase tracking-[0.8em] hover:bg-sky-400 hover:text-white transition-all duration-700 shadow-xl active:scale-[0.98]">
                     Initiate Access
                  </button>
               </form>
               <p className="mt-16 text-[8px] text-slate-600 font-black uppercase tracking-[0.4em]">Defined by Perspective • MMXVI</p>
             </div>
          </div>
       </section>
    </div>
  );

  function handlePageChange(page: number) {
    setCurrentPage(page);
    const grid = document.getElementById('offers-grid');
    if (grid) grid.scrollIntoView({ behavior: 'smooth' });
  }
};

export default Offers;