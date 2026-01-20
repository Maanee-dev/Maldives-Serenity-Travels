
import React from 'react';
import { OFFERS } from '../constants';
import { Link } from 'react-router-dom';

const Offers: React.FC = () => {
  return (
    <div className="bg-[#FCFAF7] min-h-screen">
       <div className="pt-48 pb-32 px-6 text-center">
          <div className="max-w-4xl mx-auto reveal active">
            <span className="text-[10px] font-bold text-slate-400 mb-6 block tracking-[0.5em] uppercase">
              Limited Engagements
            </span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 text-slate-900 tracking-tight italic">The Collection</h1>
            <p className="text-slate-500 text-sm md:text-base font-medium max-w-xl mx-auto uppercase tracking-widest leading-loose opacity-70">
              Exclusive negotiated rates and bespoke honeymoon packages curated for the discerning traveler.
            </p>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {OFFERS.map(offer => (
              <div key={offer.id} className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-slate-100 flex flex-col group hover:shadow-xl transition-all duration-700 reveal active">
                <div className="relative h-72 overflow-hidden">
                   <img src={offer.image} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                   <div className="absolute top-6 left-6 bg-slate-900 text-white font-bold px-5 py-2 rounded-full text-[9px] uppercase tracking-[0.2em]">
                      {offer.discount}
                   </div>
                </div>
                <div className="p-10 flex-grow flex flex-col">
                   <span className="text-slate-300 font-bold text-[8px] uppercase tracking-[0.4em] mb-4">{offer.category}</span>
                   <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 leading-tight group-hover:italic transition-all">
                      {offer.title}
                   </h3>
                   <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-10">At {offer.resortName}</p>
                   
                   <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[8px] text-slate-300 font-bold uppercase tracking-widest">Valid Until</span>
                        <span className="text-slate-600 font-bold text-[10px] uppercase tracking-widest mt-1">{new Date(offer.expiryDate).toLocaleDateString()}</span>
                      </div>
                      <Link to="/plan" className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-900 border-b border-slate-900 pb-1 hover:opacity-50 transition-all">
                        Claim Now
                      </Link>
                   </div>
                </div>
              </div>
            ))}
            
            {/* Membership Invite */}
            <div className="bg-slate-950 text-white rounded-[3rem] p-12 flex flex-col justify-center items-center text-center reveal active">
              <span className="text-[9px] font-bold text-sky-400 uppercase tracking-[0.5em] mb-6">Serenity Circle</span>
              <h3 className="text-3xl font-serif font-bold mb-6 italic">Private Invitations</h3>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-[0.2em] leading-relaxed mb-12">Join our list to receive unlisted secret deals and seasonal luxury escapes.</p>
              <form className="w-full space-y-4">
                 <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-[10px] tracking-widest focus:outline-none focus:bg-white/10 transition-all text-white" />
                 <button className="w-full bg-white text-slate-950 font-bold py-4 rounded-full text-[10px] uppercase tracking-[0.4em] hover:bg-sky-400 transition-all">Subscribe</button>
              </form>
            </div>
          </div>
       </div>
    </div>
  );
};

export default Offers;
