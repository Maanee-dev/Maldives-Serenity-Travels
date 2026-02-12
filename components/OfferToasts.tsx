import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { OFFERS } from '../constants';
import { supabase, mapOffer } from '../lib/supabase';
import { Offer } from '../types';

const OfferToasts: React.FC = () => {
  const [currentOffer, setCurrentOffer] = useState<Offer | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [offerList, setOfferList] = useState<Offer[]>(OFFERS);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchFreshOffers = async () => {
      const { data } = await supabase.from('offers').select('*').limit(10);
      if (data && data.length > 0) {
        setOfferList(data.map(mapOffer));
      }
    };
    fetchFreshOffers();
  }, []);

  const showNextOffer = useCallback(() => {
    setIsVisible(false);
    
    // Smooth exit then entry
    setTimeout(() => {
      const nextIdx = (currentIndex + 1) % offerList.length;
      setCurrentIndex(nextIdx);
      setCurrentOffer(offerList[nextIdx]);
      setIsVisible(true);

      // Auto-hide after 10 seconds to reduce screen noise
      setTimeout(() => {
        setIsVisible(false);
      }, 10000);
    }, 1200);
  }, [currentIndex, offerList]);

  useEffect(() => {
    // Reveal first offer after initial page load delay
    const initialTimer = setTimeout(() => {
      setCurrentOffer(offerList[0]);
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 10000);
    }, 10000);

    // Cycle every 35 seconds
    const interval = setInterval(showNextOffer, 35000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [showNextOffer, offerList]);

  if (!currentOffer) return null;

  return (
    <div className={`fixed bottom-32 right-6 md:right-10 z-[90] transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-4 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.3)] flex flex-col gap-4 max-w-[280px] group overflow-hidden">
        
        {/* Visual Teaser */}
        <div className="relative aspect-[4/3] rounded-[1.8rem] overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-sm">
           <img src={currentOffer.image} alt="" className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-110" />
           <div className="absolute top-3 left-3">
              <span className="bg-amber-400 text-slate-900 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-xl">
                {currentOffer.category}
              </span>
           </div>
           <button 
             onClick={() => setIsVisible(false)} 
             className="absolute top-3 right-3 w-6 h-6 rounded-full bg-black/20 backdrop-blur-md text-white flex items-center justify-center text-xs hover:bg-black/40 transition-colors"
           >
             &times;
           </button>
        </div>

        {/* Dispatch Content */}
        <div className="px-1 pb-1">
           <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
              <span className="text-sky-500 dark:text-sky-400 font-black text-[7px] uppercase tracking-[0.3em]">Latest Privilege</span>
           </div>
           <h4 className="text-[13px] font-serif font-bold text-slate-950 dark:text-white italic leading-tight mb-3">
             {currentOffer.resortName}
           </h4>
           <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-black text-slate-950 dark:text-sky-300 uppercase tracking-tighter">US$ {currentOffer.price?.toLocaleString()}</span>
              <div className="h-px flex-1 bg-slate-100 dark:bg-white/5"></div>
              <span className="text-[8px] font-bold text-amber-500 uppercase tracking-widest">{currentOffer.discount}</span>
           </div>
           <Link 
             to={`/stays/${currentOffer.resortSlug}`} 
             className="w-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-center py-4 rounded-full text-[8px] font-black uppercase tracking-[0.4em] hover:bg-sky-500 dark:hover:bg-sky-400 transition-all shadow-lg block"
           >
             Refine Discovery
           </Link>
        </div>
      </div>
    </div>
  );
};

export default OfferToasts;