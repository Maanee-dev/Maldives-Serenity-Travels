
import React, { useEffect } from 'react';
import { OFFERS } from '../constants';
import { Link } from 'react-router-dom';

const Offers: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#FCFAF7] min-h-screen">
       <div className="pt-64 pb-48 px-6 text-center reveal">
          <div className="max-w-4xl mx-auto">
            <span className="text-[10px] font-bold text-sky-500 mb-12 block tracking-[0.8em] uppercase">
              Limited Engagements
            </span>
            <h1 className="text-6xl md:text-9xl font-serif font-bold mb-16 text-slate-900 tracking-tighter italic leading-none">The Privé Collection</h1>
            <div className="h-px w-24 bg-amber-400 mx-auto mb-16"></div>
            <p className="text-slate-500 text-[11px] font-bold max-w-xl mx-auto uppercase tracking-[0.5em] leading-[2.5] opacity-90">
              Negotiated rates and bespoke honeymoon packages <br className="hidden md:block"/> crafted for the global aesthetic.
            </p>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-64">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20">
            {OFFERS.map((offer, idx) => (
              <div key={offer.id} className="reveal" style={{ transitionDelay: `${idx * 150}ms` }}>
                <div className="bg-white rounded-[4rem] overflow-hidden shadow-sm border border-slate-50 flex flex-col group hover:shadow-2xl transition-all duration-1000">
                  <div className="relative aspect-[1/1] overflow-hidden">
                     <img src={offer.image} alt={offer.title} className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
                     <div className="absolute inset-0 bg-slate-950/5"></div>
                     <div className="absolute top-10 left-10">
                        <span className="bg-slate-950 text-white font-bold px-6 py-2.5 rounded-full text-[9px] uppercase tracking-[0.3em] shadow-xl">
                           {offer.discount}
                        </span>
                     </div>
                  </div>
                  <div className="p-16 flex-grow flex flex-col">
                     <span className="text-slate-500 font-bold text-[8px] uppercase tracking-[0.5em] mb-6">{offer.category}</span>
                     <h3 className="text-3xl font-serif font-bold text-slate-900 mb-6 leading-tight group-hover:italic transition-all duration-500">
                        {offer.title}
                     </h3>
                     <p className="text-slate-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-12">At {offer.resortName}</p>
                     
                     <div className="mt-auto pt-10 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                          <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Valid Until</span>
                          <span className="text-slate-700 font-bold text-[10px] uppercase tracking-widest">{new Date(offer.expiryDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                        </div>
                        <Link to="/plan" className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-900 border-b border-slate-950 pb-2 hover:text-sky-500 hover:border-sky-500 transition-all duration-500">
                          Inquire
                        </Link>
                     </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* VIP Access Membership Block */}
            <div className="reveal" style={{ transitionDelay: '450ms' }}>
              <div className="bg-slate-950 text-white rounded-[4rem] p-16 h-full flex flex-col justify-center items-center text-center shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-[10s]">
                   <h2 className="text-[20vw] font-serif italic whitespace-nowrap -rotate-12 translate-y-1/2">Exclusive</h2>
                </div>
                <div className="relative z-10">
                  <span className="text-[9px] font-bold text-sky-400 uppercase tracking-[0.8em] mb-10 block">Serenity Circle</span>
                  <h3 className="text-4xl font-serif font-bold mb-8 italic">Insider Access</h3>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] leading-loose mb-16 max-w-xs mx-auto">Receive unlisted boutique escapes and private atoll news.</p>
                  <form className="w-full space-y-6">
                     <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-white/5 border border-white/10 rounded-full px-10 py-5 text-[10px] uppercase tracking-widest focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all text-white placeholder:text-slate-600" />
                     <button className="w-full bg-white text-slate-950 font-bold py-5 rounded-full text-[10px] uppercase tracking-[0.5em] hover:bg-sky-400 hover:text-white transition-all duration-700 shadow-xl">Join Collective</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
       </div>
    </div>
  );
};

export default Offers;
