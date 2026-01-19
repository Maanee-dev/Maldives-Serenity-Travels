import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // CSS for Nav Links
  const navLinkClass = (path: string) => `text-xs font-bold transition-colors uppercase tracking-widest ${location.pathname.startsWith(path) ? 'text-sky-600' : 'text-slate-700 hover:text-sky-600'}`;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-2 shadow-sm' : 'bg-white/90 py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex flex-col group">
              <span className="text-2xl font-serif font-bold text-sky-700 tracking-tight transition-colors group-hover:text-sky-600">SERENITY</span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium -mt-1 text-slate-500">Maldives Travels</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {/* Using <a> tags with trailing slashes to trigger physical directory index.html */}
            <a href="/stays/" className={navLinkClass('/stays')}>Stays</a>
            <a href="/offers/" className={navLinkClass('/offers')}>Offers</a>
            <a href="/experiences/" className={navLinkClass('/experiences')}>Experiences</a>
            <a href="/stories/" className={navLinkClass('/stories')}>Stories</a>
            <a href="/plan/" className="bg-sky-600 text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-sky-700 transition-all shadow-md hover:shadow-lg uppercase tracking-wider">
              Plan My Trip
            </a>
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-2 pb-6 space-y-4 bg-white border-t border-slate-100 shadow-xl">
          <a href="/stays/" className="block text-sm font-semibold text-slate-700 hover:text-sky-600 py-2 border-b border-slate-50">Stays</a>
          <a href="/offers/" className="block text-sm font-semibold text-slate-700 hover:text-sky-600 py-2 border-b border-slate-50">Offers</a>
          <a href="/experiences/" className="block text-sm font-semibold text-slate-700 hover:text-sky-600 py-2 border-b border-slate-50">Experiences</a>
          <a href="/stories/" className="block text-sm font-semibold text-slate-700 hover:text-sky-600 py-2 border-b border-slate-50">Stories</a>
          <a href="/plan/" className="block w-full bg-sky-600 text-white px-6 py-3 rounded-xl text-center font-bold">
            PLAN MY TRIP
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;