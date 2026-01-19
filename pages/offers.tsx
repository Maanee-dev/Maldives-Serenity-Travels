import React from 'react';
import { OFFERS } from '../constants';
import { Link } from 'react-router-dom';

export default function Offers() {
  return (
    <div className="bg-slate-50 min-h-screen pt-32">
       <div className="bg-sky-900 text-white py-20 px-6 text-center">
          <h1 className="text-5xl font-serif font-bold italic">Exclusive Curations</h1>
       </div>
       <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-12">
         {OFFERS.map(offer => (
           <div key={offer.id} className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-slate-100">
             <div className="h-64 relative">
               <img src={offer.image} className="w-full h-full object-cover" alt={offer.title} />
               <div className="absolute top-4 left-4 bg-sky-600 text-white px-4 py-1 rounded-full font-bold text-xs uppercase tracking-widest">{offer.discount}</div>
             </div>
             <div className="p-8">
               <h3 className="text-2xl font-serif font-bold mb-2 italic">{offer.title}</h3>
               <p className="text-slate-500 mb-8">{offer.resortName}</p>
               <Link to="/plan" className="block w-full bg-slate-900 text-white text-center py-4 rounded-xl font-bold text-xs uppercase tracking-widest">Claim Offer</Link>
             </div>
           </div>
         ))}
       </div>
    </div>
  );
}