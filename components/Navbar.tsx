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

  useEffect(() => setIsOpen(false), [location.pathname]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'glass py-3 border-b-2 border-sky-500' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-12">
          <div className="flex-1 flex justify-start">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-3 group focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="space-y-1.5 w-6">
                <span className={`block h-0.5 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2 bg-amber-500' : 'w-6 bg-slate-900'}`}></span>
                <span className={`block h-0.5 transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-4 bg-sky-500'}`}></span>
                <span className={`block h-0.5 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2 bg-sky-500' : 'w-6 bg-slate-900'}`}></span>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-[0.4em] hidden sm:inline transition-colors ${isOpen ? 'text-amber-500' : 'text-slate-900 group-hover:text-sky-500'}`}>
                {isOpen ? 'Close' : 'Menu'}
              </span>
            </button>
          </div>

          <Link to="/" className="flex flex-col items-center flex-1 group">
            <span className="text-xl lg:text-2xl font-serif font-bold tracking-[0.25em] text-slate-900 uppercase transition-all group-hover:tracking-[0.4em]">Serenity</span>
            <div className="w-6 h-1 bg-amber-500 mt-1"></div>
          </Link>
          
          <div className="flex-1 flex justify-end">
            <Link to="/plan" className="text-[10px] font-bold uppercase tracking-[0.4em] bg-sky-500 text-white px-6 py-2.5 rounded-full hover:bg-slate-900 transition-all">
              Book Now
            </Link>
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 bg-[#FCFAF7] transition-all duration-700 z-[-1] flex flex-col items-center justify-center ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="space-y-8 text-center relative z-10">
          {['Stays', 'Offers', 'Experiences', 'Stories'].map((item) => (
            <Link 
              key={item}
              to={`/${item.toLowerCase()}`}
              className="group block text-5xl md:text-8xl font-serif font-bold text-slate-900 hover:text-sky-500 transition-all"
            >
              {item}
            </Link>
          ))}
          <div className="pt-20 mt-16 border-t-2 border-amber-500 w-64 mx-auto">
             <Link to="/plan" className="text-[10px] font-bold uppercase tracking-[0.5em] text-sky-500 hover:text-amber-500 transition-colors">Start Planning Your Journey</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;