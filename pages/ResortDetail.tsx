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
    <div className="bg-[#FCFAF7] min-h-screen">
      {/* High-End Mosaic Header */}
      <section className="grid grid-cols-1 md:grid-cols-12 h-[80vh] md:h-[95vh] gap-3 p-3 pt-24 md:pt-32 reveal active">
        <div className="md:col-span-7 overflow-hidden relative rounded-[2rem] md:rounded-[4rem] group shadow-2xl">
          <img src={getGalleryImage(0)} alt={resort.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[6s] ease-out" />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700"></div>
          <div className="absolute bottom-12 left-12 md:bottom-20 md:left-20">
             <span className="bg-white/90 backdrop-blur px-6 py-2 rounded-full text-[10px] font-bold text-slate-900 uppercase tracking-[0.4em] shadow-sm mb-6 inline-block">
               {resort.atoll}
             </span>
             <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-serif font-bold text-white tracking-tighter italic leading-[0.85] drop-shadow-2xl">
               {resort.name}
             </h1>
          </div>
        </div>
        <div className="md:col-span-5 grid grid-rows-2 gap-3 h-full">
          <div className="overflow-hidden relative rounded-[2rem] md:rounded-[4rem] group shadow-xl">
             <img src={getGalleryImage(1)} alt={resort.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[6s] ease-out" />
             <div className="absolute inset-0 bg-black/10"></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
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

      <div className="max-w-7xl mx-auto px-6 py-32 md:py-56 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-40 items-start">
          
          {/* Main Editorial Content */}
          <div className="lg:col-span-8 reveal">
            <p className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-[1.3] mb-24 italic border-l-2 border-sky-500 pl-12 py-4">
              "{resort.uvp}"
            </p>
            
            <div className="text-slate-500 leading-[2.2] text-xl md:text-2xl mb-32 font-medium opacity-90">
              {resort.description}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-40">
              {resort.features.map((feature, idx) => (
                <div key={idx} className="flex gap-8 group">
                   <div className="w-14 h-14 rounded-full border border-slate-200 flex-shrink-0 flex items-center justify-center group-hover:border-sky-500 group-hover:bg-sky-50 transition-all duration-700">
                     <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>
                   </div>
                   <div>
                     <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.3em] mb-3">{feature}</h4>
                     <p className="text-[11px] text-slate-400 font-medium uppercase tracking-[0.2em]">Maldivian Standard of Excellence</p>
                   </div>
                </div>
              ))}
            </div>

            {/* Room & Dining Switcher */}
            <div className="mb-20">
              <div className="flex gap-16 border-b border-slate-100 mb-20">
                <button 
                  onClick={() => setActiveTab('rooms')}
                  className={`pb-8 text-[11px] font-bold uppercase tracking-[0.5em] transition-all relative ${activeTab === 'rooms' ? 'text-slate-900' : 'text-slate-300'}`}
                >
                  Accommodation
                  {activeTab === 'rooms' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-950"></div>}
                </button>
                <button 
                  onClick={() => setActiveTab('dining')}
                  className={`pb-8 text-[11px] font-bold uppercase tracking-[0.5em] transition-all relative ${activeTab === 'dining' ? 'text-slate-900' : 'text-slate-300'}`}
                >
                  Culinary
                  {activeTab === 'dining' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-950"></div>}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {activeTab === 'rooms' && resort.roomTypes?.map((room, idx) => (
                  <div key={idx} className="group cursor-pointer">
                    <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                      <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
                      <div className="absolute bottom-6 right-6">
                        <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-[9px] font-bold text-slate-900 uppercase tracking-widest">{room.size}</span>
                      </div>
                    </div>
                    <h4 className="text-2xl font-serif font-bold text-slate-900 mb-4 group-hover:italic transition-all">{room.name}</h4>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Up to {room.capacity}</p>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 opacity-80">{room.description}</p>
                  </div>
                ))}

                {activeTab === 'dining' && resort.diningVenues?.map((venue, idx) => (
                  <div key={idx} className="group cursor-pointer">
                    <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                      <img src={venue.image} alt={venue.name} className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
                      <div className="absolute bottom-6 right-6">
                        <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-[9px] font-bold text-slate-900 uppercase tracking-widest">{venue.vibe}</span>
                      </div>
                    </div>
                    <h4 className="text-2xl font-serif font-bold text-slate-900 mb-4 group-hover:italic transition-all">{venue.name}</h4>
                    <p className="text-sky-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">{venue.cuisine}</p>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 opacity-80">{venue.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Luxury Sidebar - Concierge */}
          <aside className="lg:col-span-4 sticky top-40 reveal transition-all duration-1000 delay-300">
            <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-50">
              <span className="text-[9px] font-bold text-sky-500 uppercase tracking-[0.5em] mb-10 block">Private Concierge</span>
              <h3 className="text-4xl font-serif font-bold text-slate-950 mb-8 italic">Consult An Expert</h3>
              <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.4em] leading-relaxed mb-12 border-l border-slate-100 pl-8">
                Bespoke itineraries, private transfers, and unlisted sanctuary access.
              </p>
              
              <div className="space-y-10 mb-16">
                 <div className="flex items-center justify-between pb-6 border-b border-slate-50">
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Pricing</span>
                    <span className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.2em]">{resort.priceRange} Luxury</span>
                 </div>
                 <div className="flex items-center justify-between pb-6 border-b border-slate-50">
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Transfers</span>
                    <span className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.2em]">{resort.transfers.join(' / ')}</span>
                 </div>
              </div>

              <Link to="/plan" className="block w-full bg-slate-950 text-white text-center py-6 rounded-full text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-sky-500 transition-all duration-700 shadow-xl mb-6">
                Check Availability
              </Link>
              <a href="tel:+9607771234" className="block w-full border border-slate-100 text-slate-900 text-center py-6 rounded-full text-[10px] font-bold uppercase tracking-[0.5em] hover:border-slate-950 transition-all duration-700">
                Call Concierge
              </a>
              
              <p className="text-center mt-12 text-[8px] font-bold text-slate-300 uppercase tracking-[0.4em]">
                Exclusive Serenity Rates Guaranteed
              </p>
            </div>
            
            {/* Additional Info Cards */}
            <div className="mt-10 p-12 bg-sky-50 rounded-[3rem] border border-sky-100">
               <h4 className="text-[10px] font-bold text-sky-900 uppercase tracking-[0.5em] mb-6">Insider Tip</h4>
               <p className="text-[11px] text-sky-800 font-medium leading-loose uppercase tracking-[0.1em]">
                 The best visibility for diving around {resort.atoll} is typically between January and April. Ask our concierge for private dive boat arrangements.
               </p>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default ResortDetail;