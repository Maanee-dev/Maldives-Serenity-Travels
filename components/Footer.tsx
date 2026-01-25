
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-serif font-bold text-slate-900 tracking-[0.2em] uppercase">SERENITY</Link>
            <p className="mt-6 text-slate-400 text-[10px] leading-relaxed uppercase tracking-[0.3em] font-medium">
              Curated luxury for the discerning traveler. <br/>
              Reg No: SP02722025 <br/>
              License: MOT.01.RS.TA.25.PJ0482
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
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-900 mb-8 underline underline-offset-8 decoration-slate-200">Digital Presence</h4>
            <ul className="space-y-4">
              <li>
                <a href="https://wa.me/9607771234" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-500 hover:text-slate-950 transition-colors group">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-2.652 0-5.147 1.03-7.02 2.905-1.873 1.874-2.901 4.37-2.903 7.027-.001 2.03.543 4.154 1.61 5.9l-.311 1.137-.79 2.884 2.953-.776 1.061-.28z"/></svg>
                  <span className="text-[10px] uppercase font-bold tracking-widest">WhatsApp</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 text-slate-500 hover:text-slate-950 transition-colors group">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.607.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.365-.333 2.632-1.308 3.607-.975.976-2.242 1.246-3.607 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.607-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.365.332-2.633 1.308-3.608.975-.976 2.242-1.246 3.607-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.337 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.397-.2 6.78-2.618 6.98-6.98.058-1.28.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.337-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  <span className="text-[10px] uppercase font-bold tracking-widest">Instagram</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 text-slate-500 hover:text-slate-950 transition-colors group">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  <span className="text-[10px] uppercase font-bold tracking-widest">X / Twitter</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 text-slate-500 hover:text-slate-950 transition-colors group">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a6.34 6.34 0 0 1-2.02-1.61c-.05 3.1-.03 6.2-.03 9.3 0 1.67-.4 3.39-1.39 4.73-1.07 1.44-2.73 2.37-4.51 2.6-1.89.26-3.89-.13-5.46-1.22-1.62-1.12-2.72-2.92-2.92-4.88-.23-1.97.35-4.04 1.61-5.59 1.33-1.63 3.4-2.61 5.51-2.52 1.21.06 2.36.46 3.35 1.14V4.96c-1.14-.8-2.33-1.5-3.5-2.22l.08-2.72Z"/></svg>
                  <span className="text-[10px] uppercase font-bold tracking-widest">TikTok</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-900 mb-8 underline underline-offset-8 decoration-slate-200">Contact</h4>
            <div className="space-y-4 text-slate-500 text-[10px] uppercase font-bold tracking-widest leading-loose">
              <p>Faith, S.feydhoo, Addu City</p>
              <p>Maldives</p>
              <p>+960 7771234</p>
              <p>info@maldivesserenity.com</p>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-[8px] uppercase font-bold tracking-[0.4em]">© 2026 Serenity Travels. All Rights Reserved.</p>
          <div className="flex gap-8">
            <span className="text-slate-400 text-[8px] uppercase font-bold tracking-widest">Defined by Perspective.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
