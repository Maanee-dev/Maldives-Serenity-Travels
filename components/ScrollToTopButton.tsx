'use client';

import React, { useState, useEffect } from 'react';

/**
 * ScrollToTopButton Component: Appears after scrolling down to allow quick navigation back to the top.
 */
const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button if page is scrolled more than 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-32 right-8 z-[100] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button
        onClick={scrollToTop}
        className="bg-white/90 backdrop-blur-md text-slate-900 p-4 rounded-full shadow-2xl hover:bg-slate-950 hover:text-white transition-all duration-500 border border-slate-100 group active:scale-90"
        aria-label="Scroll to top"
      >
        <svg
          className="w-5 h-5 transition-transform group-hover:-translate-y-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default ScrollToTopButton;