
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PrivacyPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('serenity_consent');
    if (!consent) {
      // Delay the appearance for a premium feel
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('serenity_consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] w-[calc(100%-2rem)] max-w-2xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-100 dark:border-white/5 rounded-[2.5rem] p-6 md:p-8 shadow-2xl flex flex-col md:flex-row items-center gap-6 md:gap-12 transition-colors">
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></div>
            <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em]">Digital Perspective</span>
          </div>
          <p className="text-[11px] md:text-[12px] font-serif font-medium text-slate-900 dark:text-white italic leading-relaxed">
            We use cookies to refine your journey through the archipelago. By continuing to explore, you embrace our curated digital sanctuary.
          </p>
        </div>

        <div className="flex items-center gap-6 flex-shrink-0">
          <Link 
            to="/privacy" 
            className="text-[9px] font-black text-slate-400 dark:text-slate-600 hover:text-slate-950 dark:hover:text-white uppercase tracking-[0.3em] transition-colors border-b border-transparent hover:border-slate-200 dark:hover:border-slate-800 pb-1"
          >
            Our Policy
          </Link>
          <button 
            onClick={handleAccept}
            className="bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black px-10 py-4 rounded-full text-[10px] uppercase tracking-[0.6em] hover:bg-sky-500 dark:hover:bg-sky-400 transition-all duration-500 shadow-xl"
          >
            I Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPopup;
