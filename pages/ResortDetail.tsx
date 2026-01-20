import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RESORTS } from '../constants';

const ResortDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const resort = RESORTS.find(r => r.slug === slug);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (resort) {
      document.title = `${resort.name} | Serenity Maldives Portfolio`;
    }
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [resort]);

  if (!resort) return <div className="p-40 text-center font-serif text-2xl italic">Sanctuary not found.</div>;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const getGalleryImage = (index: number) => {
    if (resort.images && resort.images[index]) return resort.images[index];
    const fallbacks = [
      "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1573843225233-9fca73af994d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1200"
    ];
    return fallbacks[index % fallbacks.length];
  };

  return (
    <div className="bg-[#FCFAF7] min-h-screen">
      {/* High-End Mosaic Header */}
      <section className="grid grid-cols-1 md:grid-cols-4 h-[70vh] md:h-[90vh] gap-2 p-2 pt-24 md:pt-32 reveal active">
        <div className="md:col-span-2 overflow-hidden relative rounded-[2rem] md:rounded-[4rem] group">
          <img src={getGalleryImage(0)} alt={resort.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4s] ease-out" />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700"></div>
        </div>
        <div className="hidden md:flex flex-col gap-2 h-full">
          <div className="h-1/2 overflow-hidden relative rounded-[2rem] md:rounded-[4rem] group">
             <img src={getGalleryImage(1)} alt={resort.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4s] ease-out" />
             <div className="absolute inset-0 bg-black/10"></div>
          </div>
          <div className="h-1/2 overflow-hidden relative rounded-[2rem] md:rounded-[4rem] group">
             <img src={getGalleryImage(2)} alt="Detail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4s] ease-out" />
             <div className="absolute inset-0 bg-black/10"></div>
          </div>
        </div>
        <div className="hidden md:block overflow-hidden relative rounded-[2rem] md:rounded-[4rem] group">
          <img src={getGalleryImage(3)} alt="Aerial" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4s] ease-out" />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24 md:py-48 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">
          {/* Main Content Editorial Area */}
          <div className="flex-grow reveal">
            <nav className="flex items-center text-slate-300 text-[9px] font-bold uppercase tracking-[0.5em] gap-8 mb-16">
              <Link to="/stays" className="hover:text-sky-500 transition-colors">Portfolio</Link>
              <span className="text-amber-400">/</span>
              <span className="text-slate-900 truncate">{resort.name}</span>
            </nav>

            <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-serif font-bold text-slate-900 mb-16 tracking-tighter italic leading-[0.85]">
              {resort.name}
            </h1>

            <div className="flex flex-wrap items-center gap-12 mb-24 pb-16 border-b border-slate-100">
               <div className="flex gap-2">
                 {[...Array(resort.rating)].map((_, i) => (
                   <div key={i} className="w-2 h-2 rounded-full bg-amber-400"></div>
                 ))}
               </div>
               <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.6em] border-l border-slate-200 pl-12">
                 {resort.atoll}
               </span>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.6em] border-l border-slate-200 pl-12">
                 {resort.priceRange} Luxury
               </span>
            </div>

            <div className="prose prose-slate max-w-none">
              <p className="text-2xl md:text-5xl font-serif font-bold text-slate-900 leading-[1.2] mb-24 italic border-l-2 border-amber-400 pl-12 py-4">
                "{resort.uvp}"
              </p>
              <div className="text-slate-500 leading-[2.2] text-lg md:text-xl mb-32 font-medium opacity-90 max-w-3xl">
                {resort.description}