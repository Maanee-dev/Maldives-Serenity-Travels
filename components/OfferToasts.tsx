
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
    
    // Short delay for exit animation before switching
    setTimeout(() => {
      const nextIdx = (currentIndex + 1) % offerList.length;
      setCurrentIndex(nextIdx);
      setCurrentOffer(offerList[nextIdx]);
      setIsVisible(true);

      // Auto hide after 12 seconds for better absorption
      setTimeout(() => {
        setIsVisible(false);
      }, 12000);
    }, 1000);
  }, [currentIndex, offerList]);

  useEffect(() => {
    // Show first offer after initial delay
    const initialTimer = setTimeout(() => {
      setCurrentOffer(offerList[0]);
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 12000);
    }, 15000);

    // Set up recurring cycle every 35 seconds
    const interval = setInterval(showNextOffer, 35000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [showNextOffer, offerList]);

  if (!currentOffer) return null;

  return (
    <div className={`fixed top-1/2 right-0 z-[200] transition-all duration-1000 transform -translate-y-1/2 ${isVisible ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-full opacity-0 pointer-events-none'}`}>
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-l border-y border-slate-200 dark:border-white/10 rounded-l-[3rem] p-5 shadow-[-20px_0_60px_-15px_rgba(0,0,0,0.2)] flex flex-col gap-5 max-w-[300px] group overflow-hidden">
        
        {/* Decorative Vertical Title */}
        <div className="absolute top-1/2 left-2 -translate-y-1/2 h-full flex items-center pointer-events-none">
           <span className="text-[6px] font-black uppercase tracking-[1em] text-slate-200 dark:text-slate-800 -rotate-90 whitespace-nowrap">SEASONAL DISPATCH</span>
        </div>

        <div className="relative pl-6">
          <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-800 mb-5 shadow-lg">
             <img src={currentOffer.image} alt="" className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-110" />
             <div className="absolute top-4 left-4">
                <span className="bg-amber-400 text-slate-900 px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-xl">
                  {currentOffer.category}
                </span>
             </div>
             <button 
               onClick={() => setIsVisible(false)} 
               className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center text-lg hover:bg-black/50 transition-colors"
             >
               &times;
             </button>
          </div>

          <div className="px-2">
             <h4 className="text-[14px] font-serif font-bold text-slate-900 dark:text-white italic leading-tight mb-2">
               {currentOffer.resortName}
             </h4>
             <div className="flex items-center gap-3 mb-4">
                <span className="text-[12px] font-black text-slate-950 dark:text-sky-400 uppercase tracking-tighter">US$ {currentOffer.price?.toLocaleString()}</span>
                <div className="h-px flex-1 bg-slate-100 dark:bg-white/5"></div>
                <span className="text-[8px] font-bold text-amber-500 uppercase tracking-widest">{currentOffer.discount}</span>
             </div>
             <Link 
               to={`/stays/${currentOffer.resortSlug}`} 
               className="w-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-center py-4 rounded-full text-[8px] font-black uppercase tracking-[0.4em] hover:bg-sky-500 dark:hover:bg-sky-400 transition-all shadow-xl block"
             >
               Explore Sanctuary
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferToasts;
