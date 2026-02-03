
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  }, [pathname]);

  const toggleMenu = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    document.body.style.overflow = nextState ? 'hidden' : 'auto';
  };

  const navLinks = [
    { name: 'Stays', path: '/stays' },
    { name: 'Offers', path: '/offers' },
    { name: 'Experiences', path: '/experiences' },
    { name: 'Stories', path: '/stories' },
  ];

  const isHomePage = pathname === '/';
  const isDarkState = (scrolled || isOpen || !isHomePage);
  
  const textColorClass = isDarkState ? 'text-slate-900' : 'text-white';
  const bgColorClass = isDarkState ? 'bg-slate-900' : 'bg-white';
  const fillClass = isDarkState ? 'fill-slate-900' : 'fill-white';

  return (
    <>
      <nav className={`fixed w-full z-[300] transition-all duration-1000 ${isDarkState ? 'glass-nav py-4 border-b border-slate-100/50 shadow-sm' : 'bg-transparent py-8 md:py-12'}`}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex justify-between items-center relative">
          <div className="flex-1 flex items-center">
            <button onClick={toggleMenu} className="group flex items-center gap-4 focus:outline-none relative z-[301]" aria-label="Toggle Menu">
              <div className="relative w-6 h-5 flex items-center justify-center">
                <span className={`absolute block h-[1px] transition-all duration-500 ${bgColorClass} ${isOpen ? 'w-6 rotate-45' : 'w-6 -translate-y-[5px]'}`}></span>
                <span className={`absolute block h-[1px] transition-all duration-500 ${bgColorClass} ${isOpen ? 'w-0 opacity-0' : 'w-4 translate-x-[-4px]'}`}></span>
                <span className={`absolute block h-[1px] transition-all duration-500 ${bgColorClass} ${isOpen ? 'w-6 -rotate-45' : 'w-6 translate-y-[5px]'}`}></span>
              </div>
            </button>
          </div>

          <Link href="/" to="/" className="flex flex-col items-center group relative z-10">
            <svg viewBox="0 0 600 600" className={`w-32 h-32 md:w-40 md:h-40 lg:w-56 lg:h-56 -my-10 md:-my-12 lg:-my-20 transition-all duration-1000 ${fillClass}`}>
              <g transform="translate(0.000000,600.000000) scale(0.100000,-0.100000)" stroke="none">
                <path d="M3116 3398 c-10 -14 -16 -44 -16 -81 0 -63 -18 -108 -67 -166 -27 -32 -33 -34 -100 -37 -159 -6 -255 -146 -123 -179 75 -18 277 140 338 266 38 77 59 183 41 205 -17 21 -56 17 -73 -8z"/>
                <path d="M2630 3340 c-28 -18 -41 -355 -16 -415 16 -37 44 -46 65 -21 7 8 13 88 17 214 5 200 5 200 -18 216 -26 19 -28 19 -48 6z"/>
                <path d="M3213 3243 c-21 -8 -16 -61 7 -73 38 -21 80 22 60 61 -10 18 -40 24 -67 12z"/>
              </g>
            </svg>
          </Link>

          <div className="flex-1 flex justify-end">
            <Link to="/plan" className={`group relative flex items-center justify-center transition-all duration-700 ${textColorClass}`}>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Plan Trip</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[250] bg-white transition-all duration-1000 ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="h-full w-full flex flex-col items-center justify-center space-y-8">
           {navLinks.map((link) => (
             <Link key={link.name} to={link.path} className="text-4xl md:text-6xl font-serif font-bold italic text-slate-900 hover:text-sky-500 transition-all">
               {link.name}.
             </Link>
           ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
