import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RESORTS } from '../constants';

const ResortDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const resort = RESORTS.find(r => r.slug === slug);
  const [activeTab, setActiveTab] = useState<'rooms' | 'dining'>('rooms');

  useEffect(() => {
    if (resort) {
      document.title = `${resort.name} | Serenity Maldives`;
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
    <div className="bg-[#FCFAF7] min-h-screen overflow-x-hidden">
      
      {/* Cinematic Mosaic Header */}
      <section className="p-4 md:p-6 pt-24 md:pt-32 reveal active">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 min-h-[85vh]">
          {/* Main Hero Mosaic */}
          <div className="md:col-span-8 relative overflow-hidden rounded-[3rem] md:rounded-[5rem] group shadow-2xl h-[50vh] md:h-auto">
             <img src={getGalleryImage(0)} alt={resort.name} className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
             <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20">
                <span className="inline-block bg-sky-500/90 text-white px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.5em] mb-6 shadow-xl">
                  {resort.atoll}
                </span>
                <h1 className="text-5xl md:text-9xl font-serif font-bold text-white tracking-tighter italic leading-none drop-shadow-2xl">
                  {resort.name}
                </h1>
             </div>
          </div>
          
          {/* Right Columns */}
          <div className="md:col-span-4 flex flex-col gap-4 md:gap-6">
            <div className="flex-1 overflow-hidden relative rounded-[3rem] md:rounded-[4rem] group shadow-xl">
               <img src={getGalleryImage(1)} alt="Lifestyle" className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-110" />
               <div className="absolute inset-0 bg-black/10"></div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4 md:gap-6">
               <div className="overflow-hidden relative rounded-[2.5rem] md:rounded-[3.5rem] group shadow-lg">
                  <img src={getGalleryImage(2)} alt="Detail" className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-110" />
               </div>
               <div className="overflow-hidden relative rounded-[2.5rem] md:rounded-[3.5rem] group shadow-lg">
                  <img src={getGalleryImage(3)} alt="Aerial" className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-110" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Specs Bar */}
      <section className="bg-white border-y border-slate-100 reveal">
         <div className="max-w-7xl mx-auto px-6 py-10 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24">
            <div className="text-center md:text-left">
               <span className="block text-[8px] font-bold text-slate-300 uppercase tracking-[0.5em] mb-3">Region</span>
               <p className="text-slate-900 font-bold uppercase tracking-widest text-xs">{resort.atoll}</p>
            </div>
            <div className="text-center md:text-left">
               <span className="block text-[8px] font-bold text-slate-300 uppercase tracking-[0.5em] mb-3">Tier</span>
               <p className="text-slate-900 font-bold uppercase tracking-widest text-xs">{resort.priceRange}</p>
            </div>
            <div className="text-center md:text-left">
               <span className="block text-[8px] font-bold text-slate-300 uppercase tracking-[0.5em] mb-3">Rating</span>
               <div className="flex justify-center md:justify-start gap-1">
                 {[...Array(resort.rating)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>)}
               </div>
            </div>
            <div className="text-center md:text-left">
               <span className="block text-[8px] font-bold text-slate-300 uppercase tracking-[0.5em] mb-3">Arrival</span>
               <p className="text-slate-900 font-bold uppercase tracking-widest text-xs">{resort.transfers.join(' / ')}</p>
            </div>
         </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24 md:py-48 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-32 items-start">
          
          {/* Main Editorial Body */}
          <div className="lg:col-span-8">
            <div className="reveal">
              <blockquote className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-[1.15] mb-20 md:mb-32 italic tracking-tight">
                "{resort.uvp}"
              </blockquote>
              
              <div className="prose prose-xl prose-slate max-w-none mb-32">
                <p className="text-slate-500 font-medium leading-[2] md:leading-[2.2] text-lg md:text-2xl opacity-90">
                  {resort.description}
                </p>
              </div>

              {/* Iconized Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-20 mb-40">
                {resort.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-8 group">
                     <div className="w-16 h-16 rounded-[1.5rem] border border-slate-100 flex-shrink-0 flex items-center justify-center group-hover:bg-slate-950 group-hover:border-slate-950 transition-all duration-700 shadow-sm">
                       <svg className="w-6 h-6 text-slate-300 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                       </svg>
                     </div>
                     <div>
                       <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.4em] mb-3">{feature}</h4>
                       <p className="text-[8px] text-slate-400 font-bold uppercase tracking-[0.3em] opacity-60">Elite Standard</p>
                     </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Tab Switcher */}
            <div className="reveal">
              <div className="flex gap-12 border-b border-slate-100 mb-20">
                <button 
                  onClick={() => setActiveTab('rooms')}
                  className={`pb-8 text-[11px] font-bold uppercase tracking-[0.6em] transition-all relative ${activeTab === 'rooms' ? 'text-slate-950' : 'text-slate-300 hover:text-slate-500'}`}
                >
                  Sanctuaries
                  {activeTab === 'rooms' && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-sky-500"></div>}
                </button>
                <button 
                  onClick={() => setActiveTab('dining')}
                  className={`pb-8 text-[11px] font-bold uppercase tracking-[0.6em] transition-all relative ${activeTab === 'dining' ? 'text-slate-950' : 'text-slate-300 hover:text-slate-500'}`}
                >
                  Gastronomy
                  {activeTab === 'dining' && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-sky-500"></div>}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                {(activeTab === 'rooms' ? resort.roomTypes : resort.diningVenues)?.map((item: any, idx: number) => (
                  <div key={idx} className="group">
                    <div className="relative aspect-[4/5] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden mb-8 shadow-md group-hover:shadow-2xl transition-all duration-1000">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
                        <span className="bg-white/95 backdrop-blur-xl px-6 py-2.5 rounded-full text-[9px] font-bold text-slate-950 uppercase tracking-[0.3em] shadow-2xl">
                          {activeTab === 'rooms' ? item.size : item.vibe}
                        </span>
                      </div>
                    </div>
                    <div className="px-4">
                       <h4 className="text-2xl md:text-3xl font-serif font-bold text-slate-950 mb-3 group-hover:italic transition-all duration-500">{item.name}</h4>
                       <p className="text-sky-500 text-[9px] font-bold uppercase tracking-[0.3em] mb-6">
                         {activeTab === 'rooms' ? `Capacity: ${item.capacity}` : item.cuisine}
                       </p>
                       <p className="text-slate-500 text-sm leading-loose opacity-80 line-clamp-3 mb-6">{item.description}</p>
                       <div className="h-px w-8 bg-slate-200 group-hover:w-full group-hover:bg-sky-500 transition-all duration-1000"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Luxury Floating Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-36 z-10 reveal">
            <div className="bg-slate-950 text-white rounded-[3.5rem] p-10 md:p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-sky-500 translate-y-full group-hover:translate-y-[98%] transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                <span className="text-[9px] font-bold text-sky-400 uppercase tracking-[0.8em] mb-12 block">Private Inquiries</span>
                <h3 className="text-4xl font-serif font-bold mb-10 italic">Consult Our Specialists.</h3>
                
                <div className="space-y-10 mb-16">
                   <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Atoll Focus</span>
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">{resort.atoll}</span>
                   </div>
                   <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Meal Plans</span>
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest text-right">Available</span>
                   </div>
                </div>

                <Link to="/plan" className="block w-full bg-white text-slate-950 text-center py-6 rounded-full text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-sky-400 hover:text-white transition-all duration-700 shadow-xl mb-6">
                  Design Itinerary
                </Link>
                <a href="tel:+9607771234" className="block w-full border border-white/20 text-white text-center py-6 rounded-full text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-white hover:text-slate-950 transition-all duration-700">
                  Direct Line
                </a>
                
                <p className="text-center mt-12 text-[7px] font-bold text-white/20 uppercase tracking-[0.6em]">
                  Est. MMXII — Serenity Travels
                </p>
              </div>
            </div>
            
            <div className="mt-10 p-12 bg-white rounded-[3.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
               <div className="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center mb-8">
                  <svg className="w-6 h-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
               </div>
               <h4 className="text-[10px] font-bold text-slate-950 uppercase tracking-[0.4em] mb-4">Regional Insights</h4>
               <p className="text-[11px] text-slate-400 font-medium leading-loose tracking-wide italic">
                 "Expect manta ray sightings in {resort.atoll} from late August. We recommend seaplane transfers for the ultimate visual narrative."
               </p>
            </div>
          </aside>

        </div>
      </div>
      
      {/* Immersive Navigation Footer */}
      <section className="bg-white py-32 border-t border-slate-100">
         <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-12 reveal">
            <Link to="/stays" className="group flex items-center gap-8">
               <div className="w-16 h-16 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-950 group-hover:border-slate-950 transition-all duration-700">
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
               </div>
               <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-slate-950 group-hover:text-sky-500 transition-colors">The Portfolio</span>
            </Link>
            <div className="h-px flex-grow bg-slate-50 hidden md:block"></div>
            <Link to="/" className="text-3xl font-serif font-bold italic text-slate-300 hover:text-slate-950 transition-colors">Perspective.</Link>
         </div>
      </section>
    </div>
  );
};

export default ResortDetail;
