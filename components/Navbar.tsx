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
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
  };

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-1000 ${scrolled ? 'glass-nav py-4 border-b border-slate-100' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Menu Trigger */}
          <div className="flex-1">
            <button 
              onClick={toggleMenu}
              className="group flex items-center gap-4 focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5 w-6">
                <span className={`block h-px bg-slate-900 transition-all duration-500 origin-left ${isOpen ? 'rotate-45 w-7' : 'w-6'}`}></span>
                <span className={`block h-px bg-slate-900 transition-all duration-500 ${isOpen ? 'opacity-0 scale-x-0' : 'w-4'}`}></span>
                <span className={`block h-px bg-slate-900 transition-all duration-500 origin-left ${isOpen ? '-rotate-45 w-7' : 'w-6'}`}></span>
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-[0.5em] text-slate-900 transition-all duration-500 ${isOpen ? 'opacity-0 -translate-x-4' : 'opacity-100'}`}>
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
            <Link to="/plan" className="hidden sm:block text-[9px] font-bold uppercase tracking-[0.4em] text-slate-900 group relative">
              <span className="relative z-10">Bespoke Inquiry</span>
              <div className="absolute bottom-[-8px] left-0 w-full h-px bg-slate-900 scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-500"></div>
            </Link>
          </div>
        </div>
      </div>

      {/* Premium Full-Screen Overlay */}
      <div className={`fixed inset-0 bg-[#FCFAF7] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-[-1] flex items-center overflow-hidden ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        {/* Background Decorative Text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
           <h2 className="text-[30vw] font-serif font-bold italic">Maldives</h2>
        </div>

        <div className="max-w-7xl mx-auto w-full px-12 grid grid-cols-1 lg:grid-cols-12 gap-24 relative z-10">
          <div className="lg:col-span-8">
            <div className="space-y-4 md:space-y-8">
              {['Stays', 'Offers', 'Experiences', 'Stories'].map((item, idx) => (
                <Link 
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="group block overflow-hidden"
                >
                  <span className={`block text-5xl md:text-[8rem] font-serif font-bold text-slate-900 transition-all duration-700 delay-[${idx * 100}ms] translate-y-full group-hover:italic group-hover:text-sky-500 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                    {item}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          
          <div className={`lg:col-span-4 flex flex-col justify-end pb-12 transition-all duration-1000 delay-500 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="space-y-12">
               <div>
                  <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.5em] mb-6">Connect</h4>
                  <div className="flex gap-8 text-[11px] font-bold text-slate-900 uppercase tracking-widest">
                    <a href="#" className="hover:text-sky-500 transition-colors">Instagram</a>
                    <a href="#" className="hover:text-sky-500 transition-colors">WhatsApp</a>
                  </div>
               </div>
               <div>
                  <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.5em] mb-6">Office</h4>
                  <p className="text-[11px] font-bold text-slate-900 uppercase tracking-widest leading-loose">
                    Velana Building, 5th Floor<br/>Male, Republic of Maldives
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;