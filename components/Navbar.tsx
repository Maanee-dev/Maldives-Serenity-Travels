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

  useEffect(() => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  }, [location.pathname]);

  const toggleMenu = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (typeof window !== 'undefined') {
      document.body.style.overflow = nextState ? 'hidden' : 'auto';
    }
  };

  const navLinks = [
    { name: 'Stays', path: '/stays' },
    { name: 'Offers', path: '/offers' },
    { name: 'Experiences', path: '/experiences' },
    { name: 'Stories', path: '/stories' },
  ];

  return (
    <>
      {/* Header - Always on top */}
      <nav className={`fixed w-full z-[300] transition-all duration-700 ${scrolled || isOpen ? 'glass-nav py-4 border-b border-slate-100' : 'bg-transparent py-8'}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex justify-between items-center relative">
          
          {/* Menu Trigger */}
          <div className="flex-1">
            <button 
              onClick={toggleMenu}
              className="group flex items-center gap-6 focus:outline-none"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative w-6 h-5 flex items-center justify-center">
                {/* Top Line */}
                <span className={`absolute block h-[1.5px] bg-slate-900 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${isOpen ? 'w-6 rotate-45 translate-y-0' : 'w-6 -translate-y-[6px]'}`}></span>
                {/* Middle Line */}
                <span className={`absolute block h-[1.5px] bg-slate-900 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${isOpen ? 'w-0 opacity-0' : 'w-4 translate-x-[-4px]'}`}></span>
                {/* Bottom Line */}
                <span className={`absolute block h-[1.5px] bg-slate-900 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${isOpen ? 'w-6 -rotate-45 translate-y-0' : 'w-6 translate-y-[6px]'}`}></span>
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-[0.5em] text-slate-900 transition-all duration-700 delay-100 ${isOpen ? 'opacity-0 -translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}>
                Discover
              </span>
            </button>
          </div>

          {/* Center Brand */}
          <Link to="/" className="flex flex-col items-center">
            <span className="text-xl md:text-2xl font-serif font-bold tracking-[0.3em] text-slate-900 uppercase">Serenity</span>
          </Link>
          
          {/* Action Link */}
          <div className="flex-1 flex justify-end">
            <Link to="/plan" className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-900 group relative">
              <span className="relative z-10">Bespoke Inquiry</span>
              <div className="absolute bottom-[-8px] left-0 w-full h-px bg-slate-900 scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-500"></div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Full-Screen Overlay */}
      <div 
        className={`fixed inset-0 bg-[#FCFAF7] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-[250] flex flex-col ${isOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'}`}
      >
        {/* Background Decorative Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
           <h2 className="text-[25vw] font-serif font-bold italic whitespace-nowrap">Maldives</h2>
        </div>

        {/* Scrollable Content Area */}
        <div className="relative z-[260] flex-grow overflow-y-auto w-full pt-32 md:pt-48 pb-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col min-h-[60vh]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
              {/* Main Links */}
              <div className="lg:col-span-7">
                <div className="flex flex-col gap-6 md:gap-8">
                  {navLinks.map((link, idx) => (
                    <Link 
                      key={link.name}
                      to={link.path}
                      className="group block overflow-hidden w-fit"
                    >
                      <span className={`block text-5xl md:text-7xl lg:text-[7.5rem] font-serif font-bold text-slate-900 transition-all duration-1000 group-hover:italic group-hover:text-sky-500 group-hover:translate-x-6 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: `${isOpen ? 200 + (idx * 60) : 0}ms` }}>
                        {link.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Side Content */}
              <div className={`lg:col-span-5 lg:pt-12 transition-all duration-1000 delay-500 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-16">
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.5em] mb-8 border-b border-slate-100 pb-2">The Collection</h4>
                    <div className="flex flex-col gap-5 text-[11px] font-bold text-slate-900 uppercase tracking-widest">
                      <Link to="/stays" className="hover:text-sky-500 transition-colors w-fit">Resorts & Villas</Link>
                      <Link to="/offers" className="hover:text-sky-500 transition-colors w-fit">Limited Offers</Link>
                      <Link to="/experiences" className="hover:text-sky-500 transition-colors w-fit">Island Journeys</Link>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.5em] mb-8 border-b border-slate-100 pb-2">Studio</h4>
                    <p className="text-[11px] font-bold text-slate-900 uppercase tracking-widest leading-loose">
                      Velana Building, 5F<br/>Male, Maldives<br/>
                      <span className="text-slate-300 mt-2 block">Available 24/7</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Persistent Bottom Bar in Overlay */}
        <div className={`relative z-[260] w-full max-w-7xl mx-auto px-6 py-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 transition-all duration-1000 delay-700 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.4em]">© 2024 Serenity Boutique Travels</p>
          <div className="flex gap-10">
            <a href="#" className="text-[9px] font-bold text-slate-900 uppercase tracking-[0.5em] hover:text-sky-500 transition-colors">Instagram</a>
            <a href="#" className="text-[9px] font-bold text-slate-900 uppercase tracking-[0.5em] hover:text-sky-500 transition-colors">WhatsApp</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;