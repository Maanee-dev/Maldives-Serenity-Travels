
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RESORTS } from '../constants';

const ResortDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const resort = RESORTS.find(r => r.slug === slug);

  useEffect(() => {
    if (resort) {
      document.title = `${resort.name} - ${resort.atoll} Luxury Maldives | Serenity Travels`;
      
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        (metaDesc as HTMLMetaElement).name = "description";
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', `${resort.uvp} Experience the best of ${resort.atoll} with Serenity Travels. Best rate guarantee.`);

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
        "priceRange": resort.priceRange,
        "amenityFeature": resort.features.map(f => ({
          "@type": "LocationFeatureSpecification",
          "name": f,
          "value": true
        }))
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
      {/* Fixed link from /resorts to /stays */}
      <Link to="/stays" className="text-sky-600 font-bold underline">Go back to Stays</Link>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Dynamic Gallery */}
      <section className="grid grid-cols-1 md:grid-cols-4 h-[75vh] gap-3 p-3 pt-24">
        <div className="md:col-span-2 h-full overflow-hidden rounded-[3rem]">
          <img src={resort.images[0]} alt={resort.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-[3s]" />
        </div>
        <div className="hidden md:flex flex-col gap-3 h-full">
          <div className="h-1/2 rounded-[3rem] overflow-hidden">
             <img src={resort.images[1] || resort.images[0]} alt={resort.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-[2s]" />
          </div>
          <div className="h-1/2 rounded-[3rem] overflow-hidden">
             <img src="https://images.unsplash.com/photo-1573843225233-9fca73af994d?auto=format&fit=crop&q=80&w=800" alt="Interior Detail" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="hidden md:block h-full overflow-hidden rounded-[3rem] relative group">
          <img src="https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=800" alt="Aerial" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[5s]" />
          <div className="absolute inset-0 bg-black/10"></div>
          <button className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-xl font-bold px-10 py-4 rounded-2xl shadow-2xl text-[10px] uppercase tracking-[0.3em] hover:bg-sky-600 hover:text-white transition-all">
            Full 4K Gallery
          </button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-24">
          <div className="flex-grow">
            <div className="mb-16">
              <nav className="flex items-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em] gap-4 mb-8">
                <Link to="/" className="hover:text-sky-600 transition-colors">Home</Link>
                <span className="opacity-30">/</span>
                {/* Fixed link from /resorts to /stays */}
                <Link to="/stays" className="hover:text-sky-600 transition-colors">Stays</Link>
                <span className="opacity-30">/</span>
                <span className="text-slate-900">{resort.name}</span>
              </nav>
              <h1 className="text-6xl md:text-8xl font-serif font-bold text-slate-900 mb-8 leading-tight italic">{resort.name}</h1>
              <div className="flex flex-wrap items-center gap-8">
                 <div className="flex gap-2">
                    {[...Array(resort.rating)].map((_, i) => <span key={i} className="text-sky-500 text-2xl">✦</span>)}
                 </div>
                 <span className="h-8 w-px bg-slate-100 hidden md:block"></span>
                 <span className="text-sky-600 font-bold uppercase text-xs tracking-[0.3em] bg-sky-50 px-4 py-2 rounded-full border border-sky-100">{resort.atoll}</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-[4rem] p-16 mb-20 border border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-12">
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.3em] block">Arrival Mode</span>
                <span className="font-bold text-slate-800 text-lg leading-tight block">{resort.transfers.map(t => t.replace('_', ' ')).join(' & ')}</span>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.3em] block">Island Vibe</span>
                <span className="font-bold text-slate-800 text-lg block italic">Pure Seclusion</span>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.3em] block">Dining Options</span>
                <span className="font-bold text-slate-800 text-sm leading-relaxed block">{resort.mealPlans.map(m => m.replace('_', ' ')).join(', ')}</span>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.3em] block">Indicative PRICING</span>
                <span className="font-bold text-sky-600 text-3xl tracking-widest block">{resort.priceRange}</span>
              </div>
            </div>

            <div className="prose prose-slate max-w-none">
              <div className="flex items-center gap-4 mb-10">
                 <span className="h-px bg-sky-200 flex-grow"></span>
                 <h2 className="text-sm font-bold uppercase tracking-[0.5em] text-sky-400 whitespace-nowrap">Editorial Review</h2>
                 <span className="h-px bg-sky-200 flex-grow"></span>
              </div>
              
              <p className="text-3xl md:text-4xl font-serif font-bold text-slate-800 leading-[1.3] mb-16 italic border-l-[12px] border-sky-500 pl-12 py-4">
                "{resort.uvp}"
              </p>
              
              <div className="text-slate-600 leading-[1.8] text-xl mb-20 first-letter:text-7xl first-letter:font-serif first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-sky-600">
                {resort.description}
              </div>
              
              <div className="bg-white border-2 border-slate-100 rounded-[3rem] p-12 mb-20">
                 <h3 className="text-2xl font-serif font-bold mb-10 italic">Signature Amenities</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    {resort.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-4 group">
                        <span className="w-2 h-2 rounded-full bg-sky-500 group-hover:scale-150 transition-transform"></span>
                        <span className="text-lg font-semibold text-slate-700">{feat}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>

          <aside className="lg:w-[400px]">
            <div className="sticky top-32">
              <div className="bg-slate-950 text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-serif font-bold mb-6 italic">Secure Your Sanctuary</h3>
                  <p className="text-slate-400 mb-10 text-sm leading-relaxed font-medium">
                    We manage every aspect of your {resort.name} experience—including VIP airport assistance and exclusive "Serenity Perks."
                  </p>
                  
                  <div className="space-y-8 mb-12">
                    <div className="flex justify-between items-end pb-4 border-b border-slate-800">
                      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Pricing Class</span>
                      <span className="text-3xl font-bold tracking-widest text-sky-400">{resort.priceRange}</span>
                    </div>
                  </div>
                  
                  <Link to="/plan" className="block w-full bg-sky-600 text-white text-center py-6 rounded-2xl font-bold hover:bg-sky-500 transition-all shadow-xl uppercase tracking-[0.2em] text-xs">
                    Inquire For Rates
                  </Link>
                  <p className="text-center mt-6 text-[10px] text-slate-500 font-bold uppercase tracking-widest">Best Rate Guarantee on all Bookings</p>
                </div>
              </div>

              <div className="mt-8 bg-sky-50 border border-sky-100 p-8 rounded-[2.5rem] flex items-center gap-6">
                 <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-3xl shadow-sm">👨🏽‍💼</div>
                 <div>
                    <p className="text-slate-900 font-bold text-sm">Need Help?</p>
                    <p className="text-slate-500 text-xs font-medium">Ahmed, our {resort.atoll} expert, is online.</p>
                 </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ResortDetail;
