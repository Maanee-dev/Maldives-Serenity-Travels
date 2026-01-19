
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RESORTS } from '../constants';
import { TransferType, MealPlan } from '../types';

const ResortDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const resort = RESORTS.find(r => r.slug === slug);

  useEffect(() => {
    if (resort) {
      // SEO: Inject JSON-LD
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Hotel",
        "name": resort.name,
        "description": resort.description,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": resort.atoll,
          "addressCountry": "Maldives"
        },
        "starRating": {
          "@type": "Rating",
          "ratingValue": resort.rating
        },
        "image": resort.images
      });
      document.head.appendChild(script);
      return () => { document.head.removeChild(script); };
    }
  }, [resort]);

  if (!resort) return <div className="p-20 text-center">Resort not found. <Link to="/stays" className="text-sky-600 font-bold underline">Go back to Stays</Link></div>;

  return (
    <div className="bg-white min-h-screen">
      {/* Visual Header / Gallery */}
      <section className="grid grid-cols-1 md:grid-cols-4 h-[70vh] gap-3 p-3">
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
          {/* Main Content */}
          <div className="flex-grow">
            <div className="mb-12">
              <nav className="flex text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] gap-3 mb-6">
                <Link to="/" className="hover:text-sky-600 transition-colors">Home</Link>
                <span>/</span>
                <Link to="/stays" className="hover:text-sky-600 transition-colors">Stays</Link>
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

            {/* Quick Facts Grid */}
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
              <p className="text-slate-600 leading-relaxed text-xl mb-12">
                {resort.description}
              </p>
              
              <h3 className="text-sm font-bold mb-8 uppercase tracking-[0.4em] text-slate-400">Curated Amenities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {resort.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-4 text-slate-800 font-bold p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                    <span className="w-10 h-10 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center text-xl">✓</span> 
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Inquiry Column */}
          <aside className="lg:w-[400px]">
            <div className="sticky top-28 bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-50">
              <h3 className="text-3xl font-serif font-bold mb-8 italic">Stay Enquiry</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-[0.2em]">Full Name</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all" placeholder="Enter your name" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-[0.2em]">Email Address</label>
                  <input type="email" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all" placeholder="your@email.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-[0.2em]">Guests</label>
                    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:outline-none">
                      <option>1-2 Guests</option>
                      <option>3-5 Guests</option>
                      <option>Family (5+)</option>
                    </select>
                  </div>
                   <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-[0.2em]">Month</label>
                    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:outline-none">
                      <option>August 2024</option>
                      <option>September 2024</option>
                      <option>Later Date</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full bg-sky-600 text-white font-bold py-5 rounded-2xl hover:bg-sky-700 transition-all shadow-xl hover:shadow-sky-500/20 text-sm tracking-widest uppercase mt-4">
                  Get Personal Quote
                </button>
              </form>
              <div className="mt-10 pt-10 border-t border-slate-100 text-center">
                 <p className="text-xs text-slate-500 italic mb-6">Our agents respond to all enquiries within 24 business hours.</p>
                 <a href="https://wa.me/9607771234" className="flex items-center justify-center gap-3 bg-green-50 text-green-600 font-bold px-8 py-3 rounded-xl hover:bg-green-100 transition-colors shadow-sm">
                    <span className="text-xl">💬</span>
                    <span className="text-xs tracking-widest uppercase">Agent WhatsApp</span>
                 </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
      
      {/* Inquiry Sticky Mobile Button */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-40">
        <Link to="/plan" className="block w-full bg-sky-600 text-white text-center font-bold py-5 rounded-2xl shadow-2xl uppercase tracking-widest text-sm backdrop-blur-md bg-opacity-95">
           Plan My Trip
        </Link>
      </div>
    </div>
  );
};

export default ResortDetail;
