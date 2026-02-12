import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { OFFERS } from '../constants';
import { supabase, mapOffer } from '../lib/supabase';
import { Offer } from '../types';

const OfferToasts: React.FC = () => {
  const [currentOffer, setCurrentOffer] = useState<Offer | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [offerList, setOfferList] = useState<Offer[]>(OFFERS);

  // Frequency Control: Only show once per session
  const triggerOffer = useCallback(() => {
    const hasSeen = sessionStorage.getItem('serenity_offer_shown');
    if (hasSeen || isVisible) return;

    // Pick a random offer from the list
    const randomOffer = offerList[Math.floor(Math.random() * offerList.length)];
    setCurrentOffer(randomOffer);
    setIsVisible(true);
    sessionStorage.setItem('serenity_offer_shown', 'true');
  }, [offerList, isVisible]);

  useEffect(() => {
    const fetchFreshOffers = async () => {
      const { data } = await supabase.from('offers').select('*').limit(5);
      if (data && data.length > 0) {
        setOfferList(data.map(mapOffer));
      }
    };
    fetchFreshOffers();

    // Setup Interaction Triggers
    const inactivityTimer = setTimeout(triggerOffer, 30000);

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 50) {
        triggerOffer();
        window.removeEventListener('scroll', handleScroll);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        triggerOffer();
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [triggerOffer]);

  if (!currentOffer || !isVisible) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/40 dark:bg-black/60 backdrop-blur-md transition-opacity duration-700"
        onClick={() => setIsVisible(false)}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-sm md:max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-white/10 transform transition-all duration-700 animate-in zoom-in-95 fade-in">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-6 right-6 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Top: Large Square Visual */}
        <div className="aspect-square relative overflow-hidden group">
          <img 
            src={currentOffer.image} 
            alt={currentOffer.resortName} 
            className="w-full h-full object-cover transition-transform duration-[10s] scale-105 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          
          <div className="absolute bottom-8 left-8 right-8 text-left">
            <span className="inline-block bg-amber-500 text-white text-[9px] font-black uppercase tracking-[0.4em] px-4 py-1.5 rounded-full mb-4 shadow-lg animate-pulse">
              Bespoke Privilege
            </span>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-white italic leading-tight drop-shadow-lg">
              {currentOffer.resortName}
            </h3>
          </div>
        </div>

        {/* Bottom: Details */}
        <div className="p-8 md:p-10 text-center">
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter">
                ${currentOffer.price?.toLocaleString()}
              </span>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                / {currentOffer.nights} Nights
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] leading-relaxed max-w-[250px]">
              {currentOffer.title}
            </p>
          </div>

          <Link 
            to={`/stays/${currentOffer.resortSlug}`}
            onClick={() => setIsVisible(false)}
            className="block w-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.6em] hover:bg-sky-500 dark:hover:bg-sky-400 transition-all shadow-xl"
          >
            Secure Discovery
          </Link>
          
          <button 
            onClick={() => setIsVisible(false)}
            className="mt-6 text-[8px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-[0.5em] hover:text-slate-900 dark:hover:text-slate-400 transition-colors"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferToasts;