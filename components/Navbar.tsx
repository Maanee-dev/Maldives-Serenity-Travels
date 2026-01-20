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
    <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'glass py-3 border-b border-slate-100' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-12">
          <div className="flex-1 flex justify-start">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-3 group focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="space-y-1.5 w-5">
                <span className={`block h-0.5 bg-slate-900 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2 !bg-amber-500' : 'w-5'}`}></span>
                <span className={`block h-0.5 bg-slate-900 transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-3'}`}></span>
                <span className={`block h-0.5 bg-slate-900 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2 !bg-sky-500' : 'w-5'}`}></span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-900 hidden sm:inline group-hover:text-sky-500 transition-colors">Menu</span>
            </button>
          </div>

          <Link to="/" className="flex flex-col items-center flex-1 group">
            <span className="text-xl lg:text-2xl font-serif font-bold tracking-[0.25em] text-slate-900 uppercase transition-all group-hover:tracking-[0.4em]">Serenity</span>
            <div className="w-8 h-0.5 bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 mt-1"></div>
          </Link>
          
          <div className="flex-1 flex justify-end">
            <Link to="/plan" className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-900 border-b border-slate-900 pb-0.5 hover:text-sky-600 hover:border-sky-600 transition-all">
              Book Now
            </Link>
          </div>
        </div>
      </div>

      {scrolled && <div className="horizon-line absolute bottom-0 left-0 right-0"></div>}

      <div className={`fixed inset-0 bg-[#FCFAF7] transition-all duration-700 z-[-1] flex flex-col items-center justify-center ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-sky-400/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-20 left-[-10%] w-[500px] h-[500px] bg-amber-400/5 blur-[120px] rounded-full"></div>
        
        <div className="space-y-8 text-center relative z-10">
          {['Stays', 'Offers', 'Experiences', 'Stories'].map((item) => (
            <Link 
              key={item}
              to={`/${item.toLowerCase()}`}
              className="group block text-5xl md:text-8xl font-serif font-bold text-slate-900 hover:italic transition-all"
            >
              <span className="group-hover:text-sky-500 transition-colors duration-500">{item}</span>
            </Link>
          ))}
          <div className="pt-20 mt-16 border-t border-slate-100 w-64 mx-auto">
             <Link to="/plan" className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400 hover:text-amber-500 transition-colors">Start Planning Your Journey</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;