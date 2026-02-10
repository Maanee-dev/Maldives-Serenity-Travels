import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer Component: Provides branding, site navigation, social presence, and contact information.
 * Implementation ensures a standard default export to satisfy module resolution.
 */
const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-serif font-bold text-slate-900 tracking-[0.2em] uppercase">
              SERENITY
            </Link>
            <p className="mt-6 text-slate-500 text-[10px] leading-relaxed uppercase tracking-[0.3em] font-medium">
              Curated luxury for the discerning traveler. <br/>
              Reg No: SP02722025 <br/>
              License: MOT.01.RS.TA.25.PJ0482
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-900 mb-8 underline underline-offset-8 decoration-slate-200">Company</h4>
            <ul className="space-y-3 text-slate-600 text-[10px] uppercase font-bold tracking-widest">
              <li><Link to="/" className="hover:text-slate-900 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-slate-900 transition-colors">About Us</Link></li>
              <li><Link to="/experiences" className="hover:text-slate-900 transition-colors">Experiences</Link></li>
              <li><Link to="/contact" className="hover:text-slate-900 transition-colors">Contacts</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-900 mb-8 underline underline-offset-8 decoration-slate-200">Legal</h4>
            <ul className="space-y-3 text-slate-600 text-[10px] uppercase font-bold tracking-widest">
              <li><Link to="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/stays" className="hover:text-slate-900 transition-colors">Resort Portfolio</Link></li>
              <li><Link to="/offers" className="hover:text-slate-900 transition-colors">Exclusive Offers</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-900 mb-8 underline underline-offset-8 decoration-slate-200">Connect</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="https://wa.me/9607259060" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 text-slate-600 hover:text-slate-950 transition-colors group"
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
                  className="flex items-center gap-3 text-slate-600 hover:text-slate-950 transition-colors group"
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

        <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-[9px] font-bold uppercase tracking-[0.4em]">
            © 2026 Maldives Serenity Travels. All Rights Reserved.
          </p>
          <div className="flex items-center gap-8">
            <span className="text-slate-300 text-[8px] font-bold uppercase tracking-widest">Designed by Perspective</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;