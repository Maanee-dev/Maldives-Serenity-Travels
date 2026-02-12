import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  // Common styling for payment images to ensure perfect fit and luxury aesthetic
  const paymentImgClass = "h-5 md:h-6 w-auto object-contain grayscale brightness-0 opacity-40 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 dark:invert dark:brightness-[10] dark:group-hover:invert-0 dark:group-hover:brightness-100 transition-all duration-700";

  return (
    <footer className="bg-white dark:bg-slate-950 pt-24 pb-12 border-t border-slate-100 dark:border-white/5 transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-[0.2em] uppercase">
              SERENITY
            </Link>
            <p className="mt-6 text-slate-500 dark:text-slate-400 text-[10px] leading-relaxed uppercase tracking-[0.3em] font-medium transition-colors">
              Curated luxury for the discerning traveler. <br/>
              Reg No: SP02722025 <br/>
              License: MOT.01.RS.TA.25.PJ0482
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-900 dark:text-white mb-8 underline underline-offset-8 decoration-slate-200 dark:decoration-white/10 transition-colors">Company</h4>
            <ul className="space-y-3 text-slate-600 dark:text-slate-500 text-[10px] uppercase font-bold tracking-widest transition-colors">
              <li><Link to="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-slate-900 dark:hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/experiences" className="hover:text-slate-900 dark:hover:text-white transition-colors">Experiences</Link></li>
              <li><Link to="/contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">Contacts</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-900 dark:text-white mb-8 underline underline-offset-8 decoration-slate-200 dark:decoration-white/10 transition-colors">Legal</h4>
            <ul className="space-y-3 text-slate-600 dark:text-slate-500 text-[10px] uppercase font-bold tracking-widest transition-colors">
              <li><Link to="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/stays" className="hover:text-slate-900 dark:hover:text-white transition-colors">Resort Portfolio</Link></li>
              <li><Link to="/offers" className="hover:text-slate-900 dark:hover:text-white transition-colors">Exclusive Offers</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-900 dark:text-white mb-8 underline underline-offset-8 decoration-slate-200 dark:decoration-white/10 transition-colors">Connect</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="https://wa.me/9607259060" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 text-slate-600 dark:text-slate-500 hover:text-slate-950 dark:hover:text-white transition-colors group"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-2.652 0-5.147 1.03-7.02 2.905-1.873 1.874-2.901 4.37-2.903 7.027-.001 2.03.543 4.154 1.61 5.9l-.311 1.137-.79 2.884 2.953-.776 1.061-.28z"/>
                  </svg>
                  <span className="text-[10px] font-bold uppercase tracking-widest">WhatsApp Inquiry</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="flex items-center gap-3 text-slate-600 dark:text-slate-500 hover:text-slate-950 dark:hover:text-white transition-colors group"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Instagram Feed</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-50 dark:border-white/5 flex flex-col lg:flex-row justify-between items-center gap-10">
          {/* Copyright Section */}
          <p className="text-slate-400 dark:text-slate-600 text-[9px] font-bold uppercase tracking-[0.4em] order-3 lg:order-1 transition-colors">
            © 2026 Maldives Serenity Travels. All Rights Reserved.
          </p>

          {/* Payment Methods Section: Standardized for perfect image fits */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 order-1 lg:order-2 group">
            {/* 
                INSTRUCTIONS FOR USER:
                Replace the URLs below with your own brand assets.
                The CSS handles all sizing, centering, and theme colors.
            */}
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" 
              alt="Visa" 
              className={paymentImgClass}
            />
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" 
              alt="Mastercard" 
              className={paymentImgClass}
            />
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" 
              alt="American Express" 
              className={paymentImgClass}
            />
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" 
              alt="PayPal" 
              className={paymentImgClass}
            />
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" 
              alt="Apple Pay" 
              className={paymentImgClass}
            />
          </div>

          <p className="text-slate-300 dark:text-slate-800 text-[9px] font-black uppercase tracking-[0.4em] order-2 lg:order-3 transition-colors">
            Addu City • Malé • Archive 2026
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;