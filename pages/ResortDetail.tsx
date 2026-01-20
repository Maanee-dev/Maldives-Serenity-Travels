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
      {/* High-End Mosaic Header - Improved Responsiveness */}
      <section className="grid grid-cols-1 md:grid-cols-12 min-h-[90vh] md:h-[95vh] gap-3 p-3 pt-24 md:pt-32 reveal active">
        <div className="md:col-span-7 h-[50vh] md:h-full overflow-hidden relative rounded-[2.5rem] md:rounded-[4rem] group shadow-2xl">
          <img src={getGalleryImage(0)} alt={resort.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[6s] ease-out" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
          <div className="absolute bottom-8 left-8 md:bottom-20 md:left-20 right-8">
             <span className="bg-white/90 backdrop-blur px-4 py-1.5 md:px-6 md:py-2 rounded-full text-[9px] md:text-[10px] font-bold text-slate-900 uppercase tracking-[0.4em] shadow-sm mb-4 md:mb-6 inline-block">
               {resort.atoll}
             </span>
             <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-serif font-bold text-white tracking-tighter italic leading-none drop-shadow-2xl">
               {resort.name}
             </h1>
          </div>
        </div>
        <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 grid-rows-none md:grid-rows-2 gap-3 h-full">
          <div className="hidden sm:block overflow-hidden relative rounded-[2.5rem] md:rounded-[4rem] group shadow-xl h-[30vh] md:h-auto">
             <img src={getGalleryImage(1)} alt={resort.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[6s] ease-out" />
             <div className="absolute inset-0 bg-black/10"></div>
          </div>
          <div className="grid grid-cols-2 gap-3 h-[25vh] md:h-auto">
            <div className="overflow-hidden relative rounded-[2rem] md:rounded-[3rem] group shadow-lg">
               <img src={getGalleryImage(2)} alt="Detail" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[6s] ease-out" />
               <div className="absolute inset-0 bg-black/10"></div>
            </div>
            <div className="overflow-hidden relative rounded-[2rem] md:rounded-[3rem] group shadow-lg">
               <img src={getGalleryImage(3)} alt="Aerial" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[6s] ease-out" />
               <div className="absolute inset-0 bg-black/10"></div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-40 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Main Editorial Content */}
          <div className="lg:col-span-8 reveal">
            <blockquote className="text-2xl md:text-4xl font-serif font-bold text-slate-900 leading-snug mb-16 md:mb-24 italic border-l-4 border-sky-400 pl-8 md:pl-12 py-2">
              "{resort.uvp}"
            </blockquote>
            
            <div className="text-slate-600 leading-relaxed text-lg md:text-xl mb-24 font-light">
              {resort.description}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-16 mb-32 md:mb-40">
              {resort.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-6 group">
                   <div className="w-12 h-12 rounded-full border border-slate-200 flex-shrink-0 flex items-center justify-center group-hover:border-sky-500 group-hover:bg-sky-50 transition-all duration-500">
                     <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>
                   </div>
                   <div>
                     <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.3em] mb-2">{feature}</h4>
                     <p className="text-[9px] text-slate-400 font-medium uppercase tracking-[0.2em]">Curated Excellence</p>
                   </div>
                </div>
              ))}
            </div>

            {/* Room & Dining Switcher */}
            <div className="mb-20">
              <div className="flex flex-wrap gap-8 md:gap-16 border-b border-slate-100 mb-16">
                <button 
                  onClick={() => setActiveTab('rooms')}
                  className={`pb-6 text-[10px] font-bold uppercase tracking-[0.4em] transition-all relative ${activeTab === 'rooms' ? 'text-slate-900' : 'text-slate-300'}`}
                >
                  Accommodation
                  {activeTab === 'rooms' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-sky-500"></div>}
                </button>
                <button 
                  onClick={() => setActiveTab('dining')}
                  className={`pb-6 text-[10px] font-bold uppercase tracking-[0.4em] transition-all relative ${activeTab === 'dining' ? 'text-slate-900' : 'text-slate-300'}`}
                >
                  Dining
                  {activeTab === 'dining' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-sky-500"></div>}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                {(activeTab === 'rooms' ? resort.roomTypes : resort.diningVenues)?.map((item: any, idx: number) => (
                  <div key={idx} className="group cursor-pointer">
                    <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 shadow-md group-hover:shadow-xl transition-all duration-700">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105" />
                      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
                        <span className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-[9px] font-bold text-slate-900 uppercase tracking-widest shadow-sm">
                          {activeTab === 'rooms' ? item.size : item.vibe}
                        </span>
                      </div>
                    </div>
                    <h4 className="text-xl md:text-2xl font-serif font-bold text-slate-900 mb-2 group-hover:text-sky-700 transition-colors">{item.name}</h4>
                    <p className="text-sky-500 text-[9px] font-bold uppercase tracking-[0.2em] mb-3">
                      {activeTab === 'rooms' ? `Max Guests: ${item.capacity}` : item.cuisine}
                    </p>
                    <p className="text-slate-500 text-sm leading-relaxed opacity-90 line-clamp-3">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Luxury Sidebar - Improved Stickiness */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32 z-10 reveal">
            <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-50">
              <span className="text-[9px] font-bold text-sky-500 uppercase tracking-[0.5em] mb-8 block">Private Concierge</span>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-950 mb-8 italic">Consult An Expert</h3>
              
              <div className="space-y-8 mb-12">
                 <div className="flex items-center justify-between pb-4 border-b border-slate-50">
                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Tiers</span>
                    <span className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em]">{resort.priceRange}</span>
                 </div>
                 <div className="flex items-center justify-between pb-4 border-b border-slate-50">
                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Arrival</span>
                    <span className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em] text-right">{resort.transfers.join(' / ')}</span>
                 </div>
              </div>

              <Link to="/plan" className="block w-full bg-slate-950 text-white text-center py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-sky-600 transition-all duration-500 shadow-lg mb-4">
                Check Availability
              </Link>
              <a href="tel:+9607771234" className="block w-full border border-slate-200 text-slate-900 text-center py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-slate-50 transition-all duration-500">
                Call Agent
              </a>
              
              <p className="text-center mt-10 text-[8px] font-bold text-slate-300 uppercase tracking-[0.4em]">
                Best Rate Guarantee
              </p>
            </div>
            
            <div className="mt-8 p-10 bg-sky-50/50 rounded-[2.5rem] border border-sky-100/50">
               <h4 className="text-[9px] font-bold text-sky-900 uppercase tracking-[0.4em] mb-4">Island Note</h4>
               <p className="text-[11px] text-sky-800/80 font-medium leading-loose tracking-wide">
                 Ideal visibility for diving in {resort.atoll} is typically Jan–April.
               </p>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default ResortDetail;