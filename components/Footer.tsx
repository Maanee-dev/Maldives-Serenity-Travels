import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link to="/" className="flex flex-col">
              <span className="text-2xl font-serif font-bold text-sky-400 tracking-tight">SERENITY</span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium -mt-1 text-slate-400">Maldives Travels</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your gateway to paradise. We curate the finest Maldivian experiences, from ultra-luxury private island resorts to authentic local guest houses.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><Link to="/stays" className="hover:text-sky-400 transition-colors">Maldives Stays</Link></li>
              <li><Link to="/offers" className="hover:text-sky-400 transition-colors">Special Offers</Link></li>
              <li><Link to="/stories" className="hover:text-sky-400 transition-colors">Travel Guides</Link></li>
              <li><Link to="/plan" className="hover:text-sky-400 transition-colors">Plan My Trip</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white uppercase tracking-wider">Experiences</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><Link to="/experiences" className="hover:text-sky-400 transition-colors">Whale Shark Diving</Link></li>
              <li><Link to="/experiences" className="hover:text-sky-400 transition-colors">Surfing in Maldives</Link></li>
              <li><Link to="/experiences" className="hover:text-sky-400 transition-colors">Sandbank Picnics</Link></li>
              <li><Link to="/experiences" className="hover:text-sky-400 transition-colors">Honeymoon Packages</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white uppercase tracking-wider">Contact Us</h4>
            <div className="space-y-4 text-slate-400 text-sm">
              <p className="flex items-center gap-2">
                <span className="text-sky-400">📍</span> Male, Republic of Maldives
              </p>
              <p className="flex items-center gap-2">
                <span className="text-sky-400">📞</span> +960 777-1234
              </p>
              <p className="flex items-center gap-2 text-sky-400 font-bold">
                <span>💬</span> WhatsApp Inquiry
              </p>
              <Link to="/plan" className="inline-block mt-4 text-sky-400 hover:text-sky-300 font-bold border-b-2 border-sky-400 pb-1">
                Request a Custom Quote
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs">
          <p>© 2024 Maldives Serenity Travels. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;