import React from 'react';
import { Link } from 'react-router-dom';
import { Accommodation } from '../types';

interface ResortCardProps {
  resort: Accommodation;
}

const ResortCard: React.FC<ResortCardProps> = ({ resort }) => {
  return (
    <Link to={`/stays/${resort.slug}`} className="group block overflow-hidden">
      <div className="relative h-[450px] mb-6 overflow-hidden">
        <img 
          src={resort.images[0]} 
          alt={resort.name} 
          loading="lazy"
          className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-[1.5s] ease-out group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-sm text-[8px] font-bold text-slate-900 uppercase tracking-widest">
          {resort.atoll}
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-baseline">
          <h3 className="text-xl font-serif font-bold text-slate-900 uppercase tracking-tight">
            {resort.name}
          </h3>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {resort.priceRange} / Night
          </span>
        </div>
        
        <div className="flex justify-between items-center text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] border-t border-slate-100 pt-3">
          <span>{resort.features[0]}</span>
          <span className="text-slate-300">•</span>
          <span>Up to {Math.floor(Math.random() * 4) + 2} Guests</span>
        </div>
      </div>
    </Link>
  );
};

export default ResortCard;