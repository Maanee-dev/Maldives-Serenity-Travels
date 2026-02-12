
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

      // Auto hide after 8 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 8000);
    }, 1000);
  }, [currentIndex, offerList]);

  useEffect(() => {
    // Show first offer after initial delay
    const initialTimer = setTimeout(() => {
      setCurrentOffer(offerList[0]);
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 8000);
    }, 10000);

    // Set up recurring cycle every 25 seconds
    const interval = setInterval(showNextOffer, 25000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [showNextOffer, offerList]);

  if (!currentOffer) return null;

  return (
    <div className={`fixed bottom-8 right-32 z-[100] transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-[2rem] p-3 shadow-2xl flex items-center gap-6 max-w-sm group">
        <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800">
           <img src={currentOffer.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
        </div>
        <div className="flex-1 pr-6">
           <div className="flex items-center justify-between mb-1">
              <span className="text-sky-500 font-black text-[7px] uppercase tracking-widest">{currentOffer.category}</span>
              <button onClick={() => setIsVisible(false)} className="text-slate-300 hover:text-slate-900 dark:hover:text-white">&times;</button>
           </div>
           <h4 className="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-wider line-clamp-1 mb-1">
             {currentOffer.resortName}
           </h4>
           <p className="text-[9px] font-black text-amber-500 uppercase tracking-widest mb-3">
             {currentOffer.discount} Privilege
           </p>
           <Link to={`/stays/${currentOffer.resortSlug}`} className="text-[8px] font-bold uppercase tracking-[0.3em] text-slate-400 hover:text-sky-500 transition-colors border-b border-slate-100 dark:border-white/5 pb-1">
             View Sanctuary &rarr;
           </Link>
        </div>
      </div>
    </div>
  );
};

export default OfferToasts;
