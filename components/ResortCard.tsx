import React from 'react';
import { Link } from 'react-router-dom';
import { Accommodation } from '../types';

interface ResortCardProps {
  resort: Accommodation;
}

const ResortCard: React.FC<ResortCardProps> = ({ resort }) => {
  return (
    <Link to={`/stays/${resort.slug}`} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-slate-100">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={resort.images[0]} 
          alt={resort.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold text-sky-700 shadow-xl uppercase tracking-widest">
          {resort.atoll}
        </div>
        <div className="absolute bottom-4 left-4 flex gap-1 bg-black/20 backdrop-blur px-2 py-1 rounded-lg">
          {[...Array(resort.rating)].map((_, i) => (
            <span key={i} className="text-yellow-400 text-[10px]">★</span>
          ))}
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-2xl font-serif font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-tight">
            {resort.name}
          </h3>
          <span className="text-slate-400 font-bold text-xs tracking-widest">{resort.priceRange}</span>
        </div>
        
        <p className="text-slate-500 text-sm line-clamp-2 mb-6 italic leading-relaxed">
          "{resort.uvp}"
        </p>
        
        <div className="mt-auto pt-6 border-t border-slate-50">
          <div className="flex flex-wrap gap-2">
            {resort.features.slice(0, 2).map((feat, idx) => (
              <span key={idx} className="bg-slate-50 text-slate-500 px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest border border-slate-100">
                {feat}
              </span>
            ))}
            {resort.features.length > 2 && (
              <span className="text-slate-400 text-[9px] font-bold self-center ml-1">+{resort.features.length - 2} more</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResortCard;