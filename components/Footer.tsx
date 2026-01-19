import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-serif font-bold text-slate-900 tracking-[0.2em] uppercase">SERENITY</Link>
            <p className="mt-6 text-slate-400 text-xs leading-relaxed uppercase tracking-widest font-medium">
              Curated luxury for the discerning traveler.
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-900 mb-8 underline underline-offset-8 decoration-slate-200">Company</h4>
            <ul className="space-y-3 text-slate-500 text-[10px] uppercase font-bold tracking-widest">
              <li><Link to="/" className="hover:text-slate-900 transition-colors">Home</Link></li>
              <li><Link to="/stories" className="hover:text-slate-900 transition-colors">About Us</Link></li>
              <li><Link to="/experiences" className="hover:text-slate-900 transition-colors">Tours</Link></li>
              <li><Link to="/plan" className="hover:text-slate-900 transition-colors">Contacts</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-900 mb-8 underline underline-offset-8 decoration-slate-200">Legal</h4>
            <ul className="space-y-3 text-slate-500 text-[10px] uppercase font-bold tracking-widest">
              <li><a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Cookies Policy</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-900 mb-8 underline underline-offset-8 decoration-slate-200">Contact</h4>
            <div className="space-y-4 text-slate-500 text-[10px] uppercase font-bold tracking-widest leading-loose">
              <p>Male, Maldives</p>
              <p>+960 7771234</p>
              <p>info@maldivesserenity.com</p>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-[8px] uppercase font-bold tracking-[0.4em]">© 2024 Serenity Travels. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-slate-900 text-xs font-bold uppercase tracking-widest hover:opacity-50">Instagram</a>
            <a href="#" className="text-slate-900 text-xs font-bold uppercase tracking-widest hover:opacity-50">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;