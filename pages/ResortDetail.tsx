
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RESORTS } from '../constants';

const ResortDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const resort = RESORTS.find(r => r.slug === slug);

  useEffect(() => {
    if (resort) {
      document.title = `${resort.name} - Serenity Maldives`;
    }
  }, [resort]);

  if (!resort) return <div className="p-40 text-center font-serif text-2xl italic">Sanctuary not found.</div>;

  return (
    <div className="bg-[#FCFAF7] min-h-screen">
      {/* Immersive Gallery */}
      <section className="grid grid-cols-1 md:grid-cols-4 h-[85vh] gap-4 p-4 pt-28 reveal active">
        <div className="md:col-span-2 h-full overflow-hidden rounded-[4rem]">
          <img src={resort.images[0]} alt={resort.name} className="w-full h-full object-cover grayscale-[0.1] hover:grayscale-0 transition-all duration-[2s]" />
        </div>
        <div className="hidden md:flex flex-col gap-4 h-full">
          <div className="h-1/2 rounded-[4rem] overflow-hidden">
             <img src={resort.images[1] || resort.images[0]} alt={resort.name} className="w-full h-full object-cover" />
          </div>
          <div className="h-1/2 rounded-[4rem] overflow-hidden">
             <img src="https://images.unsplash.com/photo-1573843225233-9fca73af994d?auto=format&fit=crop&q=80&w=800" alt="Detail" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="hidden md:block h-full overflow-hidden rounded-[4rem] relative">
          <img src="https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=800" alt="Aerial" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/5"></div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-32 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-24">
          <div className="flex-grow reveal active">
            <nav className="flex items-center text-slate-400 text-[9px] font-bold uppercase tracking-[0.4em] gap-4 mb-12">
              <Link to="/" className="hover:text-slate-900">Home</Link>
              <span>/</span>
              <Link to="/stays" className="hover:text-slate-900">Stays</Link>
              <span>/</span>
              <span className="text-slate-900">{resort.name}</span>
            </nav>

            <h1 className="text-6xl md:text-9xl font-serif font-bold text-slate-900 mb-12 tracking-tight italic">
              {resort.name}
            </h1>

            <div className="flex items-center gap-12 mb-24 pb-12 border-b border-slate-100">
              <div className="flex gap-1.5">
                {[...Array(resort.rating)].map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-sky-500"></div>
                ))}
              </div>
              <span className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.4em]">{resort.atoll}</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-32">
              <div className="space-y-4">
                <span className="text-[8px] text-slate-400 uppercase font-bold tracking-[0.4em] block">Arrival</span>
                <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">{resort.transfers[0]}</span>
              </div>
              <div className="space-y-4">
                <span className="text-[8px] text-slate-400 uppercase font-bold tracking-[0.4em] block">Vibe</span>
                <span className="text-xs font-bold text-slate-900 uppercase tracking-widest italic">Pure Serenity</span>
              </div>
              <div className="space-y-4">
                <span className="text-[8px] text-slate-400 uppercase font-bold tracking-[0.4em] block">Dining</span>
                <span className="text-xs font-bold text-slate-900 uppercase tracking-widest leading-relaxed">{resort.mealPlans[0]}</span>
              </div>
              <div className="space-y-4">
                <span className="text-[8px] text-slate-400 uppercase font-bold tracking-[0.4em] block">Pricing</span>
                <span className="text-lg font-serif font-bold text-slate-900 tracking-tighter italic">{resort.priceRange}</span>
              </div>
            </div>

            <div className="prose prose-slate max-w-none">
              <p className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-[1.3] mb-24 italic border-l-[1px] border-slate-200 pl-16 py-4">
                "{resort.uvp}"
              </p>
              
              <div className="text-slate-500 leading-[2] text-lg mb-32 first-letter:text-8xl first-letter:font-serif first-letter:font-bold first-letter:mr-6 first-letter:float-left first-letter:text-slate-900">
                {resort.description}
              </div>
              
              <div className="bg-white border border-slate-100 rounded-[4rem] p-16 mb-20 shadow-sm">
                 <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em] mb-12">Signature Amenities</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                    {resort.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-6 group">
                        <div className="w-1.5 h-px bg-slate-900 group-hover:w-4 transition-all"></div>
                        <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">{feat}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>

          <aside className="lg:w-96 reveal active">
            <div className="sticky top-32">
              <div className="bg-slate-950 text-white p-16 rounded-[4rem] shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-sky-400 mb-6 block">Private Concierge</span>
                  <h3 className="text-4xl font-serif font-bold mb-8 italic leading-tight">Secure Your Stay</h3>
                  <p className="text-slate-400 mb-12 text-[10px] uppercase tracking-widest leading-loose font-medium">
                    We curate every detail of your journey—from the moment you land at Velana to your final sunset on the island.
                  </p>
                  
                  <Link to="/plan" className="block w-full bg-white text-slate-950 text-center py-6 rounded-full font-bold hover:bg-sky-400 transition-all uppercase tracking-[0.3em] text-[10px]">
                    Inquire For Rates
                  </Link>
                  <p className="text-center mt-8 text-[8px] text-slate-500 font-bold uppercase tracking-[0.3em]">Exclusivity Guaranteed</p>
                </div>
              </div>

              <div className="mt-8 bg-white border border-slate-100 p-10 rounded-[3rem] flex items-center gap-8 shadow-sm">
                 <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-xl grayscale shadow-inner">👨🏽‍💼</div>
                 <div>
                    <p className="text-slate-900 font-bold text-[10px] uppercase tracking-widest">Connect with Expert</p>
                    <p className="text-slate-400 text-[9px] uppercase tracking-widest mt-1">Chat available via WhatsApp</p>
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
