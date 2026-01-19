
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RESORTS } from '../constants';
import { TransferType, MealPlan } from '../types';

/* Complete the truncated ResortDetail component and ensure it has a default export */
const ResortDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const resort = RESORTS.find(r => r.slug === slug);

  useEffect(() => {
    if (resort) {
      // 1. Update Document Metadata for SEO
      document.title = `${resort.name} - ${resort.atoll} Maldives | Serenity Travels`;
      
      // Update or create meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        (metaDesc as HTMLMetaElement).name = "description";
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', resort.uvp || resort.shortDescription);

      // 2. Inject JSON-LD Structured Data
      const scriptId = 'resort-jsonld';
      let script = document.getElementById(scriptId) as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = scriptId;
        document.head.appendChild(script);
      }
      
      script.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Hotel",
        "name": resort.name,
        "description": resort.description,
        "url": window.location.href,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": resort.atoll,
          "addressCountry": "Maldives"
        },
        "starRating": {
          "@type": "Rating",
          "ratingValue": resort.rating
        },
        "image": resort.images,
        "priceRange": resort.priceRange
      });

      return () => { 
        const oldScript = document.getElementById(scriptId);
        if (oldScript) document.head.removeChild(oldScript);
      };
    }
  }, [resort]);

  if (!resort) return (
    <div className="p-20 text-center">
      <h1 className="text-2xl font-bold mb-4">Resort not found.</h1>
      <Link to="/resorts" className="text-sky-600 font-bold underline">Go back to Stays</Link>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Visual Header / Gallery */}
      <section className="grid grid-cols-1 md:grid-cols-4 h-[70vh] gap-3 p-3 pt-24">
        <div className="md:col-span-2 h-full overflow-hidden rounded-[2.5rem]">
          <img src={resort.images[0]} alt={resort.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
        </div>
        <div className="hidden md:flex flex-col gap-3 h-full">
          <div className="h-1/2 rounded-[2.5rem] overflow-hidden">
             <img src={resort.images[1] || resort.images[0]} alt={resort.name} className="w-full h-full object-cover" />
          </div>
          <div className="h-1/2 rounded-[2.5rem] overflow-hidden">
             <img src="https://images.unsplash.com/photo-1573843225233-9fca73af994d?auto=format&fit=crop&q=80&w=800" alt="Detail View" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="hidden md:block h-full overflow-hidden rounded-[2.5rem] relative">
          <img src="https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=800" alt="Aerial View" className="w-full h-full object-cover" />
          <button className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-xl font-bold px-8 py-3 rounded-2xl shadow-2xl text-[10px] uppercase tracking-[0.2em] hover:bg-sky-600 hover:text-white transition-all">
            View All Gallery
          </button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="flex-grow">
            <div className="mb-12">
              <nav className="flex text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] gap-3 mb-6">
                <Link to="/" className="hover:text-sky-600 transition-colors">Home</Link>
                <span>/</span>
                <Link to="/resorts" className="hover:text-sky-600 transition-colors">Resorts</Link>
                <span>/</span>
                <span className="text-slate-900">{resort.name}</span>
              </nav>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-6 leading-tight italic">{resort.name}</h1>
              <div className="flex items-center gap-6">
                 <div className="flex gap-1.5">
                    {[...Array(resort.rating)].map((_, i) => <span key={i} className="text-yellow-400 text-xl">★</span>)}
                 </div>
                 <span className="h-6 w-px bg-slate-200"></span>
                 <span className="text-sky-600 font-bold uppercase text-xs tracking-[0.2em]">{resort.type} – {resort.atoll}</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-[3rem] p-12 mb-16 border border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-12">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em] block">Arrival</span>
                <span className="font-bold text-slate-800 text-lg">{resort.transfers.map(t => t.replace('_', ' ')).join(', ')}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em] block">Vibe</span>
                <span className="font-bold text-slate-800 text-lg">Private Serenity</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em] block">Cuisine</span>
                <span className="font-bold text-slate-800 text-sm leading-tight">{resort.mealPlans.map(m => m.replace('_', ' ')).join(', ')}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em] block">Pricing</span>
                <span className="font-bold text-sky-600 text-xl tracking-widest">{resort.priceRange}</span>
              </div>
            </div>

            <div className="prose prose-slate max-w-none">
              <h2 className="text-3xl font-serif font-bold mb-8 italic text-slate-900 underline underline-offset-[12px] decoration-sky-200">The Serenity Review</h2>
              <p className="text-2xl font-medium text-slate-700 leading-relaxed mb-12 border-l-4 border-sky-500 pl-10 italic shadow-sm bg-sky-50/30 p-8 rounded-r-3xl">
                "{resort.uvp}"
              </p>
              <div className="text-slate-600 leading-relaxed text-xl mb-12">
                {resort.description}
              </div>
              
              <h3 className="text-sm font-bold mb-8 uppercase tracking-[0.4em] text-slate-400">Curated Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
                {resort.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-sky-500">✦</span>
                    <span className="text-sm font-semibold text-slate-700">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:w-96">
            <div className="sticky top-32 bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl">
              <h3 className="text-2xl font-serif font-bold mb-4 italic">Experience {resort.name}</h3>
              <p className="text-slate-400 mb-8 text-sm leading-relaxed">Let us handle your booking to ensure you get the exclusive "Serenity Perks" including complimentary transfers or dining credits.</p>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Starting from</span>
                  <span className="text-xl font-bold tracking-widest">{resort.priceRange}</span>
                </div>
              </div>
              
              <Link to="/plan" className="block w-full bg-sky-600 text-white text-center py-5 rounded-2xl font-bold hover:bg-sky-700 transition-all shadow-xl uppercase tracking-widest text-sm">
                Plan My Trip
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ResortDetail;
