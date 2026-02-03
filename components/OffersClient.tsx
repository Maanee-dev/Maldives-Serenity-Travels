
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Offer } from '@/types';

interface OffersClientProps {
  initialOffers: Offer[];
}

const OffersClient: React.FC<OffersClientProps> = ({ initialOffers }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNights, setSelectedNights] = useState<number | 'All'>('All');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [currentPage, searchQuery, activeCategory]);

  const filteredOffers = useMemo(() => {
    return initialOffers.filter(offer => {
      const matchesSearch = offer.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            offer.resortName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesNights = selectedNights === 'All' || offer.nights === selectedNights;
      const matchesCategory = activeCategory === 'All' || offer.category === activeCategory;
      return matchesSearch && matchesNights && matchesCategory;
    });
  }, [initialOffers, searchQuery, selectedNights, activeCategory]);

  const totalPages = Math.ceil(filteredOffers.length / itemsPerPage);
  const paginatedOffers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOffers.slice(start, start + itemsPerPage);
  }, [filteredOffers, currentPage]);

  const handlePageChange = (p: number) => {
    setCurrentPage(p);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FCFAF7] min-h-screen pb-32">
       <section className="pt-56 pb-24 px-6 text-center reveal active">
          <div className="max-w-4xl mx-auto">
            <span className="text-[10px] font-black text-sky-500 uppercase tracking-[1em] mb-12 block">Exclusive Archives</span>
            <h1 className="text-6xl md:text-9xl font-serif font-bold text-slate-950 tracking-tighter leading-none mb-12">Bespoke <br /> <span className="italic text-slate-400 font-normal">Privileges.</span></h1>
            <div className="h-px w-24 bg-amber-400 mx-auto mt-12"></div>
          </div>
       </section>

       <section className="max-w-7xl mx-auto px-6 mb-32 sticky top-24 z-50 reveal active">
          <div className="bg-white/80 backdrop-blur-xl border border-slate-100 rounded-[3rem] p-6 shadow-2xl flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1 w-full">
              <input type="text" placeholder="SEARCH RESORT OR OFFER..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-50 border-none rounded-full px-8 py-5 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-sky-500 transition-all" />
            </div>
            <div className="flex gap-4 border-l border-slate-100 pl-8 hidden lg:flex">
              {['All', 'Honeymoon', 'Early Bird', 'Last Minute'].map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`text-[9px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'text-sky-500' : 'text-slate-400 hover:text-slate-900'}`}>{cat}</button>
              ))}
            </div>
          </div>
       </section>

       <section className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {paginatedOffers.map((offer) => (
              <div key={offer.id} className="group flex flex-col h-full reveal active">
                <div className="relative aspect-[3.5/4] rounded-[2.5rem] overflow-hidden mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-1000 bg-slate-100">
                   <img src={offer.image} alt={offer.title} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-105" />
                   <div className="absolute top-6 left-6">
                      <span className="bg-amber-400 text-slate-950 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">{offer.discount}</span>
                   </div>
                </div>
                <div className="px-2">
                   <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.3em] mb-4">{offer.resortName} • {offer.nights} Nights</p>
                   <h3 className="text-2xl font-serif font-bold text-slate-950 mb-8 leading-[1.2] group-hover:text-sky-500 transition-colors">{offer.title}</h3>
                   <div className="flex items-baseline gap-2 mb-8">
                      <span className="text-2xl font-black text-slate-950">US$ {offer.price.toLocaleString()}</span>
                      <span className="text-slate-400 text-[10px] font-bold">/ {offer.priceSubtext}</span>
                   </div>
                   <Link href={`/stays/${offer.resortSlug}`} className="inline-flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.5em] text-slate-900 group/btn">
                      <span className="border-b border-transparent group-hover/btn:border-slate-900 pb-1">Refine Discovery</span>
                      <svg className="w-4 h-4 transform group-hover/btn:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>
                   </Link>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-40 flex justify-center items-center gap-6 reveal active">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} onClick={() => handlePageChange(i + 1)} className={`w-12 h-12 rounded-full text-[10px] font-black transition-all ${currentPage === i + 1 ? 'bg-slate-950 text-white shadow-xl' : 'bg-white border border-slate-100 text-slate-400 hover:border-slate-300'}`}>{i + 1}</button>
              ))}
            </div>
          )}
       </section>
    </div>
  );
};

export default OffersClient;
