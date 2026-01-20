import React from 'react';
import { Link } from 'react-router-dom';
import { Accommodation } from '../types';

interface ResortCardProps {
  resort: Accommodation;
}

const ResortCard: React.FC<ResortCardProps> = ({ resort }) => {
  return (
    <Link to={`/stays/${resort.slug}`} className="group block bg-white p-5 rounded-[3rem] shadow-sm hover:shadow-xl transition-all border-b-4 border-transparent hover:border-sky-500">
      <div className="relative h-[400px] mb-8 overflow-hidden rounded-[2rem]">
        <img 
          src={resort.images[0]} 
          alt={resort.name} 
          loading="lazy"
          className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
        />
        {/* Solid Atoll Blue Location Badge */}
        <div className="absolute top-6 right-6 bg-sky-500 px-5 py-2 rounded-full text-[9px] font-bold text-white uppercase tracking-[0.2em] shadow-lg">
          {resort.atoll}
        </div>
        {/* Solid Sun Gold Rating Dots */}
        <div className="absolute bottom-6 left-6 flex gap-1.5">
          {[...Array(resort.rating)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-amber-500"></div>
          ))}
        </div>
      </div>
      
      <div className="px-4 pb-4 space-y-6">
        <div className="flex justify-between items-baseline gap-4">
          <h3 className="text-2xl font-serif font-bold text-slate-900 uppercase tracking-tight group-hover:text-sky-500 transition-colors">
            {resort.name}
          </h3>
          <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-4 py-1.5 rounded-full border border-amber-100 flex-shrink-0">
            {resort.priceRange}
          </span>
        </div>
        
        <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] border-t-2 border-slate-50 pt-6">
          <span className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-sky-500"></div>
            {resort.features[0]}
          </span>
          <span className="text-amber-500 font-black">→</span>
        </div>
      </div>
    </Link>
  );
};

export default ResortCard;