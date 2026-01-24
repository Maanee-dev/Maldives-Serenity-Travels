
import React from 'react';
import { Link } from 'react-router-dom';
import { Accommodation } from '../types';

interface ResortCardProps {
  resort: Accommodation;
}

const ResortCard: React.FC<ResortCardProps> = ({ resort }) => {
  // Fallback image if the array is empty or null
  const displayImage = resort.images && resort.images.length > 0 
    ? resort.images[0] 
    : 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200';

  return (
    <Link to={`/stays/${resort.slug}`} className="group block mb-12">
      <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-[2rem] md:rounded-[3rem] mb-10 shadow-sm transition-all duration-1000 group-hover:shadow-2xl group-hover:-translate-y-2 bg-slate-100">
        <img 
          src={displayImage} 
          alt={resort.name} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700"></div>
        
        {/* Atoll Tag */}
        <div className="absolute top-8 left-8">
          <span className="bg-white/90 backdrop-blur px-5 py-2 rounded-full text-[8px] font-bold text-slate-900 uppercase tracking-[0.3em] shadow-sm">
            {resort.atoll}
          </span>
        </div>
        
        {/* Rating Dots */}
        <div className="absolute bottom-10 left-10 flex gap-2">
          {[...Array(resort.rating || 5)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white shadow-lg"></div>
          ))}
        </div>
      </div>
      
      <div className="px-4 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-4 mb-6">
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 group-hover:italic transition-all duration-500 leading-tight">
            {resort.name}
          </h3>
          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest px-3 py-1 rounded-full border border-amber-100 w-fit mx-auto md:mx-0">
            {resort.priceRange || '$$$$'}
          </span>
        </div>
        
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-8 line-clamp-1 opacity-80">
          {(resort.features && resort.features.length > 0) ? resort.features.join(' • ') : 'Bespoke Sanctuary • Private Island'}
        </p>
        
        <div className="h-px w-12 bg-slate-200 mx-auto md:mx-0 group-hover:w-full group-hover:bg-sky-500 transition-all duration-700"></div>
      </div>
    </Link>
  );
};

export default ResortCard;
