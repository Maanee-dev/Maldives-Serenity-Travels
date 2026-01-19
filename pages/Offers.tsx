
import React from 'react';
import { OFFERS } from '../constants';
import { Link } from 'react-router-dom';

const Offers: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
       <div className="bg-gradient-to-r from-sky-900 to-indigo-900 text-white py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="bg-sky-400 text-sky-900 text-xs font-bold px-4 py-1 rounded-full mb-4 inline-block tracking-widest uppercase">
              Exclusive Serenity Deals
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Unbeatable Maldives Offers</h1>
            <p className="text-sky-200 text-lg md:text-xl font-medium max-w-2xl mx-auto">
              Early bird discounts, honeymoon perks, and last-minute escapes. We negotiate the best rates directly with the islands.
            </p>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {OFFERS.map(offer => (
              <div key={offer.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex flex-col group hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-64">
                   <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                   <div className="absolute top-4 left-4 bg-sky-600 text-white font-bold px-4 py-1 rounded-full text-sm shadow-xl">
                      {offer.discount}
                   </div>
                   <div className="absolute bottom-4 right-4 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-md animate-pulse shadow-lg uppercase tracking-wider">
                      Limited Availability
                   </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                   <span className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-2">{offer.category}</span>
                   <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2 leading-tight group-hover:text-sky-600 transition-colors">
                      {offer.title}
                   </h3>
                   <p className="text-slate-500 font-medium mb-6">At {offer.resortName}</p>
                   
                   <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Expires</span>
                        <span className="text-slate-700 font-bold">{new Date(offer.expiryDate).toLocaleDateString()}</span>
                      </div>
                      <Link to="/plan" className="bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors uppercase tracking-widest">
                        Claim Offer
                      </Link>
                   </div>
                </div>
              </div>
            ))}
            
            {/* Lead Capture in Grid */}
            <div className="bg-sky-50 rounded-3xl p-8 border-2 border-dashed border-sky-200 flex flex-col justify-center items-center text-center">
              <span className="text-4xl mb-4">💎</span>
              <h3 className="text-2xl font-serif font-bold text-sky-900 mb-2">Want a Secret Deal?</h3>
              <p className="text-sky-700 mb-8 text-sm leading-relaxed">Join our private list to receive exclusive offers that resorts don't allow us to publish online.</p>
              <form className="w-full space-y-3">
                 <input type="email" placeholder="Your email address" className="w-full bg-white border border-sky-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
                 <button className="w-full bg-sky-600 text-white font-bold py-3 rounded-xl hover:bg-sky-700 transition-all shadow-lg">JOIN SERENITY CIRCLE</button>
              </form>
            </div>
          </div>
       </div>
    </div>
  );
};

export default Offers;
