import React from 'react';
import { Link } from 'react-router-dom';
import { Accommodation } from '../types';

interface ResortCardProps {
  resort: Accommodation;
}

const ResortCard: React.FC<ResortCardProps> = ({ resort }) => {
  return (
    <Link to={`/stays/${resort.slug}`} className="group block overflow-hidden bg-white p-4 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-700">
      <div className="relative h-[400px] mb-8 overflow-hidden rounded-[2.5rem]">
        <img 
          src={resort.images[0]} 
          alt={resort.name} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
        />
        <div className="absolute top-6 right-6 bg-sky-500/90 backdrop-blur-sm px-5 py-2 rounded-full text-[8px] font-bold text-white uppercase tracking-[0.2em] shadow-lg">
          {resort.atoll}
        </div>
        <div className="absolute bottom-6 left-6 flex gap-1">
          {[...Array(resort.rating)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>
          ))}
        </div>
      </div>
      
      <div className="px-4 pb-4 space-y-4">
        <div className="flex justify-between items-baseline">
          <h3 className="text-xl font-serif font-bold text-slate-900 uppercase tracking-tight group-hover:text-sky-600 transition-colors">
            {resort.name}
          </h3>
          <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full">
            {resort.priceRange}
          </span>
        </div>
        
        <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] border-t border-slate-50 pt-5">
          <span className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-sky-400"></div>
            {resort.features[0]}
          </span>
          <span className="text-slate-200">|</span>
          <span>Explore Sanctuary</span>
        </div>
      </div>
    </Link>
  );
};

export default ResortCard;