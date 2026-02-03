import React from 'react';
import { Link } from 'react-router-dom';
import { Accommodation } from '../types';

interface ResortCardProps {
  resort: Accommodation;
  hasOffer?: boolean;
}

const ResortCard: React.FC<ResortCardProps> = ({ resort, hasOffer }) => {
  const displayImage = resort.images && resort.images.length > 0 
    ? resort.images[0] 
    : 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200';

  return (
    <Link to={`/stays/${resort.slug}`} className="group block mb-12">
      <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-[2.5rem] mb-10 transition-all duration-1000 bg-slate-100 group-hover:shadow-2xl group-hover:-translate-y-1">
        <img 
          src={displayImage} 
          alt={resort.name} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-105"
        />
        
        {/* Floating Metadata */}
        <div className="absolute top-8 left-8 flex flex-col gap-3">
          <span className="bg-white/95 backdrop-blur-md px-5 py-2 rounded-full text-[10px] font-black text-slate-950 uppercase tracking-[0.4em] shadow-sm border-[1px] border-slate-50 w-fit">
            {resort.atoll}
          </span>
          {hasOffer && (
            <span className="bg-amber-400 text-white px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.3em] shadow-lg animate-pulse w-fit">
              Bespoke Offer
            </span>
          )}
        </div>
        
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700"></div>
      </div>
      
      <div className="px-2 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-4 mb-4">
          <h3 className="text-2xl font-serif font-bold text-slate-950 group-hover:italic group-hover:text-sky-600 transition-all duration-500 leading-tight">
            {resort.name}
          </h3>
          <span className="text-[11px] font-black text-amber-600 uppercase tracking-widest px-3 py-1 bg-amber-50/50 rounded-full">
            {resort.priceRange || '$$$$'}
          </span>
        </div>
        
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mb-6 line-clamp-1">
          {(resort.features && resort.features.length > 0) ? resort.features.join(' • ') : 'Bespoke Sanctuary • Private Island'}
        </p>
        
        <div className="h-px w-12 bg-slate-200 group-hover:w-full group-hover:bg-sky-500 transition-all duration-700"></div>
      </div>
    </Link>
  );
};

export default ResortCard;