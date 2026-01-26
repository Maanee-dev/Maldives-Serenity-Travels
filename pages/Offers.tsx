import React, { useEffect, useState, useMemo } from 'react';
import { supabase, mapOffer } from '../lib/supabase';
import { OFFERS } from '../constants';
import { Link } from 'react-router-dom';
import { Offer } from '../types';

/**
 * Offers Page: Displays curated Maldivian luxury deals and seasonal privileges.
 */
const Offers: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNights, setSelectedNights] = useState<number | 'All'>('All');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      try {
        // Updated query to join with resorts to get the slug
        const { data: offersData } = await supabase
          .from('offers')
          .select('*, resorts(slug)')
          .order('created_at', { ascending: false });

        if (offersData && offersData.length > 0) {
          const mapped = offersData.map(o => mapOffer(o));
          setOffers(mapped);
        } else {
          setOffers(OFFERS);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setOffers(OFFERS);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  const categories = ['All', 'Honeymoon', 'Early Bird', 'Last Minute'];
  const nightOptions = ['All', 3, 5, 7, 10, 14];

  const filteredOffers = useMemo(() => {
    return offers.filter(offer => {
      const matchesSearch = offer.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            offer.resortName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesNights = selectedNights === 'All' || offer.nights === selectedNights;
      const matchesCategory = activeCategory === 'All' || offer.category === activeCategory;
      return matchesSearch && matchesNights && matchesCategory;
    });
  }, [offers, searchQuery, selectedNights, activeCategory]);

  const totalPages = Math.ceil(filteredOffers.length / itemsPerPage);
  const paginatedOffers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOffers.slice(start, start + itemsPerPage);
  }, [filteredOffers, currentPage]);

  const handlePageChange = (p: number) => {
    setCurrentPage(p);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const StarRating = ({ count }: { count: number }) => (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg 
          key={i} 
          className={`w-4 h-4 ${i < count ? 'text-amber-400 fill-current' : 'text-slate-200 fill-current'}`} 
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      ))}
    </div>
  );

  return (
    <div className="bg-[#FCFAF7] min-h-screen selection:bg-sky-100 selection:text-sky-900 pb-32">
       
       {/* Editorial Header */}
       <section className="pt-48 pb-16 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="text-[10px] font-black text-sky-500 uppercase tracking-[1em] mb-8 block">Exclusive Archives</span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-slate-950 tracking-tighter leading-none mb-12">
              Bespoke <br /> 
              <span className="italic text-slate-400 font-normal">Privileges.</span>
            </h1>
          </div>
       </section>

       {/* Intelligence Filter Bar */}
       <section className="max-w-7xl mx-auto px-6 mb-20 sticky top-24 z-50">
          <div className="bg-white/80 backdrop-blur-xl border border-slate-100 rounded-[3rem] p-4 md:p-6 shadow-2xl flex flex-col lg:flex-row gap-6 items-center">
            
            {/* Search Input */}
            <div className="flex-1 w-full relative">
              <input 
                type="text" 
                placeholder="SEARCH RESORT OR OFFER..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-full px-8 py-4 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-sky-500 transition-all placeholder:text-slate-300"
              />
            </div>

            {/* Duration Selector */}
            <div className="flex items-center gap-4 px-4 border-l border-slate-100 hidden lg:flex">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">How many days?</span>
              <div className="flex gap-2">
                {nightOptions.map(n => (
                  <button 
                    key={n}
                    onClick={() => { setSelectedNights(n as any); setCurrentPage(1); }}
                    className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${selectedNights === n ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                  >
                    {n === 'All' ? 'Any' : `${n} Days`}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-4 px-4 border-l border-slate-100 hidden lg:flex">
               {categories.map(cat => (
                 <button 
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                  className={`text-[9px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'text-sky-500' : 'text-slate-400 hover:text-slate-900'}`}
                 >
                   {cat}
                 </button>
               ))}
            </div>
          </div>
       </section>

       {/* Offers Grid */}
       <section className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="py-64 text-center">
               <div className="w-10 h-10 border-2 border-slate-100 border-t-sky-500 rounded-full animate-spin mx-auto mb-8"></div>
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Accessing records...</p>
            </div>
          ) : paginatedOffers.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {paginatedOffers.map((offer) => (
                  <div key={offer.id} className="group flex flex-col h-full reveal active">
                    
                    {/* Image Container */}
                    <div className="relative aspect-[3.5/4] rounded-[2.5rem] overflow-hidden mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-1000 bg-slate-100">
                       <img 
                         src={offer.image} 
                         alt={offer.title} 
                         className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-105" 
                       />
                       
                       {/* Floating Badge */}
                       <div className="absolute top-6 left-6">
                          <div className="bg-amber-400 text-slate-950 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                             <span className="text-[10px] font-black uppercase tracking-widest">{offer.nights} NIGHTS</span>
                          </div>
                       </div>
                    </div>

                    {/* Content Architecture */}
                    <div className="px-2 flex flex-col h-full">
                       <StarRating count={offer.rating} />
                       
                       <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.3em] mb-4 leading-relaxed">
                          {offer.resortName} • {offer.roomCategory}
                       </p>
                       
                       <h3 className="text-2xl font-serif font-bold text-slate-950 mb-6 leading-[1.2] group-hover:text-sky-500 transition-colors">
                          {offer.title}
                       </h3>
                       
                       <div className="mt-auto pt-6 flex flex-col gap-1">
                          <div className="flex items-baseline gap-2">
                             <span className="text-2xl font-black text-slate-950">US$ {offer.price.toLocaleString()}</span>
                             <span className="text-slate-400 text-[10px] font-bold">/ {offer.priceSubtext}</span>
                          </div>
                          
                          <Link 
                            to={`/stays/${offer.resortSlug}`} 
                            className="mt-6 inline-flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.5em] text-slate-900 group/btn transition-all"
                          >
                             <span className="border-b border-transparent group-hover/btn:border-slate-900 pb-1 transition-all">Refine Discovery</span>
                             <svg className="w-4 h-4 transform group-hover/btn:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                             </svg>
                          </Link>
                       </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Architecture */}
              {totalPages > 1 && (
                <div className="mt-32 flex justify-center items-center gap-4">
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all disabled:opacity-20"
                  >
                    &larr;
                  </button>
                  
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`w-12 h-12 rounded-full text-[10px] font-black transition-all ${currentPage === i + 1 ? 'bg-slate-950 text-white' : 'bg-white border border-slate-100 text-slate-400 hover:border-slate-300'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all disabled:opacity-20"
                  >
                    &rarr;
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="py-64 text-center">
               <h3 className="text-3xl font-serif font-bold italic text-slate-900 mb-6 tracking-tighter">No seasonal dispatches match your vision.</h3>
               <button 
                onClick={() => { setSearchQuery(''); setSelectedNights('All'); setActiveCategory('All'); setCurrentPage(1); }}
                className="text-sky-500 font-black uppercase tracking-widest text-[10px] border-b border-sky-100 pb-2"
               >
                 Reset Discovery Filters
               </button>
            </div>
          )}
       </section>

    </div>
  );
};

export default Offers;