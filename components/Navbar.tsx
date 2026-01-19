import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setIsOpen(false), [location.pathname]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'glass py-3 border-b border-slate-100' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-12">
          {/* Menu Button - Left */}
          <div className="flex-1 flex justify-start">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-3 group focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="space-y-1.5 w-5">
                <span className={`block h-0.5 bg-slate-900 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : 'w-5'}`}></span>
                <span className={`block h-0.5 bg-slate-900 transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-3'}`}></span>
                <span className={`block h-0.5 bg-slate-900 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : 'w-5'}`}></span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-900 hidden sm:inline">Menu</span>
            </button>
          </div>

          {/* Logo - Center */}
          <Link to="/" className="flex flex-col items-center flex-1">
            <span className="text-xl lg:text-2xl font-serif font-bold tracking-[0.2em] text-slate-900 uppercase">Serenity</span>
          </Link>
          
          {/* Action - Right */}
          <div className="flex-1 flex justify-end">
            <Link to="/plan" className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-900 border-b border-slate-900 pb-0.5 hover:opacity-50 transition-all">
              Book Now
            </Link>
          </div>
        </div>
      </div>

      {/* Full Screen Menu Overlay */}
      <div className={`fixed inset-0 bg-[#FCFAF7] transition-all duration-700 z-[-1] flex flex-col items-center justify-center ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="space-y-8 text-center">
          {['Stays', 'Offers', 'Experiences', 'Stories'].map((item) => (
            <Link 
              key={item}
              to={`/${item.toLowerCase()}`}
              className="block text-4xl md:text-7xl font-serif font-bold text-slate-900 hover:italic hover:text-sky-800 transition-all"
            >
              {item}
            </Link>
          ))}
          <div className="pt-16 mt-16 border-t border-slate-200 w-64 mx-auto">
             <Link to="/plan" className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 transition-colors">Start Planning</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;