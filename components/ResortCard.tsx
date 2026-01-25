
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
      <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-[2rem] md:rounded-[3rem] mb-10 shadow-md border-2 border-slate-100 transition-all duration-1000 group-hover:shadow-2xl group-hover:border-sky-200 group-hover:-translate-y-2 bg-slate-100">
        <img 
          src={displayImage} 
          alt={resort.name} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700"></div>
        
        {/* Atoll Tag - Increased Contrast */}
        <div className="absolute top-8 left-8">
          <span className="bg-slate-950/95 backdrop-blur px-6 py-2.5 rounded-full text-[10px] font-black text-white uppercase tracking-[0.4em] shadow-2xl border border-white/20">
            {resort.atoll}
          </span>
        </div>
        
        {/* Rating Dots */}
        <div className="absolute bottom-10 left-10 flex gap-2">
          {[...Array(resort.rating || 5)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-white shadow-xl"></div>
          ))}
        </div>
      </div>
      
      <div className="px-4 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-4 mb-6">
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-950 group-hover:italic group-hover:text-sky-600 transition-all duration-500 leading-tight">
            {resort.name}
          </h3>
          <span className="text-[11px] font-black text-amber-600 uppercase tracking-widest px-4 py-1.5 rounded-full border-2 border-amber-200 w-fit mx-auto md:mx-0 bg-amber-50">
            {resort.priceRange || '$$$$'}
          </span>
        </div>
        
        <p className="text-slate-900 text-[11px] font-black uppercase tracking-[0.4em] mb-8 line-clamp-1 opacity-100">
          {(resort.features && resort.features.length > 0) ? resort.features.join(' • ') : 'Bespoke Sanctuary • Private Island'}
        </p>
        
        <div className="h-1 w-12 bg-slate-300 mx-auto md:mx-0 group-hover:w-full group-hover:bg-sky-500 transition-all duration-700"></div>
      </div>
    </Link>
  );
};

export default ResortCard;
