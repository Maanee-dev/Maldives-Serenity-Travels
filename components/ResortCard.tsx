import React from 'react';
import { Link } from 'react-router-dom';
import { Accommodation } from '../types';

interface ResortCardProps {
  resort: Accommodation;
}

const ResortCard: React.FC<ResortCardProps> = ({ resort }) => {
  return (
    <Link to={`/stays/${resort.slug}`} className="group block overflow-hidden bg-white p-5 rounded-[4rem] shadow-sm hover:shadow-2xl transition-all duration-1000">
      <div className="relative h-[450px] mb-10 overflow-hidden rounded-[3rem]">
        <img 
          src={resort.images[0]} 
          alt={resort.name} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-110"
        />
        {/* Atoll Blue Location Badge */}
        <div className="absolute top-8 right-8 bg-sky-500/95 backdrop-blur-md px-6 py-2.5 rounded-full text-[9px] font-bold text-white uppercase tracking-[0.3em] shadow-2xl border border-sky-400/20">
          {resort.atoll}
        </div>
        {/* Sun Gold Rating Dots */}
        <div className="absolute bottom-8 left-8 flex gap-2">
          {[...Array(resort.rating)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.8)] border border-amber-300/30"></div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
      </div>
      
      <div className="px-6 pb-6 space-y-6">
        <div className="flex justify-between items-baseline gap-4">
          <h3 className="text-2xl font-serif font-bold text-slate-900 uppercase tracking-tight group-hover:text-sky-600 transition-colors duration-500">
            {resort.name}
          </h3>
          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest bg-amber-50 px-4 py-1.5 rounded-full border border-amber-100 flex-shrink-0">
            {resort.priceRange}
          </span>
        </div>
        
        <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] border-t border-slate-50 pt-8">
          <span className="flex items-center gap-3 group-hover:text-sky-500 transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-sky-400 group-hover:scale-125 transition-transform"></div>
            {resort.features[0]}
          </span>
          <span className="text-slate-100">|</span>
          <span className="group-hover:text-slate-900 transition-colors italic">Explore Sanctuary</span>
        </div>
      </div>
    </Link>
  );
};

export default ResortCard;