import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RESORTS } from '../constants';

const ResortDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const resort = RESORTS.find(r => r.slug === slug);
  const roomSliderRef = useRef<HTMLDivElement>(null);
  const diningSliderRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<'rates' | 'experience' | 'celebration'>('rates');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (resort) {
      document.title = `${resort.name} - Serenity Maldives`;
    }
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
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
    <div className="bg-[#FCFAF7] min-h-screen pb-20">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .snap-slider {
          display: flex;
          gap: 2.5rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }
        .snap-item {
          scroll-snap-align: start;
          flex-shrink: 0;
        }
      `}</style>

      {/* Gallery Header */}
      <section className="grid grid-cols-1 md:grid-cols-4 h-[80vh] md:h-[85vh] gap-4 p-4 pt-32 reveal active">
        <div className="md:col-span-2 h-full overflow-hidden rounded-[3.5rem] shadow-xl">
          <img src={getGalleryImage(0)} alt={resort.name} className="w-full h-full object-cover grayscale-[0.1] hover:grayscale-0 transition-all duration-[2s]" />
        </div>
        <div className="hidden md:flex flex-col gap-4 h-full">
          <div className="h-1/2 rounded-[3.5rem] overflow-hidden shadow-xl">
             <img src={getGalleryImage(1)} alt={resort.name} className="w-full h-full object-cover" />
          </div>
          <div className="h-1/2 rounded-[3.5rem] overflow-hidden shadow-xl">
             <img src={getGalleryImage(2)} alt="Detail" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="hidden md:block h-full overflow-hidden rounded-[3.5rem] relative shadow-xl">
          <img src={getGalleryImage(3)} alt="Aerial" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/5"></div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24 lg:py-40 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 mb-48">
          <div className="flex-grow reveal">
            {/* Breadcrumbs - Fixed Spacing */}
            <nav className="flex items-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.5em] gap-6 mb-20 lg:mb-24">
              <Link to="/" className="hover:text-sky-500 transition-colors">Home</Link>
              <span className="opacity-20 text-[12px]">/</span>
              <Link to="/stays" className="hover:text-sky-500 transition-colors">Stays</Link>
              <span className="opacity-20 text-[12px]">/</span>
              <span className="text-slate-900">{resort.name}</span>
            </nav>

            <h1 className="text-6xl md:text-8xl lg:text-[8.5rem] font-serif font-bold text-slate-900 mb-16 tracking-tighter italic leading-[0.85] lg:leading-[0.8]">
              {resort.name}
            </h1>

            <div className="flex items-center gap-12 mb-24 pb-12 border-b border-slate-100">
              <div className="flex gap-2">
                {[...Array(resort.rating)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.6)]"></div>
                ))}
              </div>
              <span className="text-[10px] font-bold text-sky-600 uppercase tracking-[0.5em] bg-sky-50 px-4 py-2 rounded-full">
                {resort.atoll}
              </span>
            </div>

            <div className="prose prose-slate max-w-none">
              <p className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-[1.3] mb-24 italic border-l-2 border-amber-400 pl-12 lg:pl-16 py-4">
                "{resort.uvp}"
              </p>
              <div className="text-slate-500 leading-[2.4] text-xl mb-32 first-letter:text-9xl first-letter:font-serif first-letter:font-bold first-letter:mr-8 first-letter:float-left first-letter:text-slate-900 first-letter:leading-[0.8] first-letter:mt-2">
                {resort.description}
              </div>
            </div>
          </div>

          <aside className="lg:w-[420px] flex-shrink-0 reveal">
            <div className="sticky top-40">
              {/* Premium Concierge Card */}
              <div className="bg-slate-950 text-white p-12 lg:p-16 rounded-[4.5rem] shadow-2xl relative overflow-hidden mb-12 btn-luxury">
                <div className="relative z-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-amber-400 mb-10 block">Private Concierge</span>
                  <h3 className="text-4xl lg:text-5xl font-serif font-bold mb-12 italic leading-[1.1]">Secure <br />Your Stay</h3>
                  <a href="#consultation" className="block w-full bg-white text-slate-950 text-center py-7 rounded-full font-bold hover:bg-sky-500 hover:text-white transition-all uppercase tracking-[0.4em] text-[10px] shadow-xl">
                    Inquire For Rates
                  </a>
                </div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-400/10 rounded-full blur-[80px]"></div>
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-sky-500/10 rounded-full blur-[80px]"></div>
              </div>
              
              <div className="bg-white border border-slate-100 p-12 rounded-[4.5rem] shadow-sm">
                 <h3 className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.6em] mb-12 text-center">Exclusive Amenities</h3>
                 <div className="space-y-8">
                    {resort.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-6 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-100 group-hover:bg-sky-500 group-hover:scale-150 transition-all"></div>
                        <span className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">{feat}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Sanctuaries Section */}
      <section className="mb-64 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-24 reveal">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div>
              <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.5em] mb-6 block">The Sanctuaries</span>
              <h2 className="text-5xl md:text-8xl font-serif font-bold text-slate-900 italic tracking-tight">Villas & Residences</h2>
            </div>
            <div className="flex items-center gap-10">
               <span className="text-slate-300 text-[10px] font-bold uppercase tracking-[0.4em]">Swipe Discovery</span>
               <div className="w-24 h-px bg-gradient-to-r from-sky-400 to-amber-400"></div>
            </div>
          </div>
        </div>

        <div ref={roomSliderRef} className="snap-slider no-scrollbar px-6 lg:px-[calc((100vw-80rem)/2+3rem)] scroll-smooth pb-12">
          {resort.roomTypes?.map((room, idx) => (
            <div key={idx} className="snap-item w-[85vw] md:w-[550px] group bg-white rounded-[4.5rem] p-6 border border-slate-50 shadow-sm hover:shadow-2xl transition-all duration-700">
              <div className="h-[400px] md:h-[500px] rounded-[3.5rem] overflow-hidden mb-10 shadow-lg relative">
                <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                <div className="absolute top-8 left-8 flex flex-col gap-3">
                   {room.size && <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl border-l-4 border-amber-400 text-slate-900">{room.size}</div>}
                   {room.capacity && <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl border-l-4 border-sky-400 text-slate-900">{room.capacity}</div>}
                </div>
              </div>
              <div className="px-8 pb-8">
                <h3 className="text-4xl font-serif font-bold text-slate-900 mb-6 group-hover:italic group-hover:text-sky-600 transition-all">{room.name}</h3>
                <p className="text-slate-500 leading-relaxed mb-10 text-base line-clamp-3">{room.description}</p>
                <div className="flex flex-wrap gap-y-4 gap-x-10 border-t border-slate-50 pt-8">
                  {room.highlights.slice(0, 3).map((h, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-px bg-sky-400"></div>
                      <span className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em]">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className="snap-item w-1 md:w-48"></div>
        </div>
      </section>

      {/* Consult Specialist Section */}
      <section id="consultation" className="max-w-6xl mx-auto px-6 lg:px-12 py-32 bg-white rounded-[6rem] shadow-sm border border-slate-100 reveal">
        <div className="text-center mb-24">
          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.6em] mb-10 block">Bespoke Inquiry</span>
          <h2 className="text-6xl md:text-[5rem] font-serif font-bold text-slate-900 mb-10 italic leading-tight">Consult for {resort.name}</h2>
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.4em] max-w-xl mx-auto leading-loose opacity-70">
            Directly connect with our dedicated regional specialists to curate your private island itinerary.
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center py-20 animate-in fade-in zoom-in duration-700">
            <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-16 shadow-inner">
               <svg className="w-10 h-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
               </svg>
            </div>
            <h3 className="text-5xl font-serif font-bold mb-8 italic text-slate-900">Request Received</h3>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-loose mb-16">
              A private specialist for {resort.name} will reach out via email shortly.
            </p>
            <button onClick={() => setIsSubmitted(false)} className="text-[11px] font-bold uppercase tracking-[0.4em] text-slate-400 hover:text-sky-500 transition-colors">New Consultation</button>
          </div>
        ) : (
          <div className="flex flex-col gap-20">
            <div className="flex justify-center items-center gap-8 md:gap-20 border-b border-slate-50 pb-10 overflow-x-auto no-scrollbar">
              {[
                { id: 'rates', label: 'Availability' },
                { id: 'experience', label: 'Bespoke Experience' },
                { id: 'celebration', label: 'Private Event' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative text-[11px] font-bold uppercase tracking-[0.5em] transition-all whitespace-nowrap ${activeTab === tab.id ? 'text-slate-950' : 'text-slate-300 hover:text-slate-500'}`}
                >
                  {tab.label}
                  {activeTab === tab.id && <div className="absolute -bottom-11 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-amber-400 animate-in slide-in-from-left duration-500 rounded-full"></div>}
                </button>
              ))}
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-16 animate-in fade-in duration-1000 max-w-4xl mx-auto w-full">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em]">Full Name</label>
                    <input required type="text" placeholder="GUEST NAME" className="w-full bg-slate-50 border-b border-transparent focus:border-sky-400 transition-all p-7 rounded-[2rem] text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:bg-white focus:shadow-xl" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em]">Email Address</label>
                    <input required type="email" placeholder="EMAIL@DESTINATION.COM" className="w-full bg-slate-50 border-b border-transparent focus:border-amber-400 transition-all p-7 rounded-[2rem] text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:bg-white focus:shadow-xl" />
                  </div>
               </div>

               <div className="space-y-4">
                  <label className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em]">
                    {activeTab === 'rates' ? 'Sanctuary Requirements' : 
                     activeTab === 'experience' ? 'Activities of Interest' : 
                     'Celebration Details'}
                  </label>
                  <textarea 
                    rows={5} 
                    placeholder="Tell us about your dream stay..."
                    className="w-full bg-slate-50 border-b border-transparent focus:border-sky-200 transition-all p-10 rounded-[3.5rem] text-[12px] font-medium leading-loose focus:outline-none focus:bg-white focus:shadow-xl"
                  ></textarea>
               </div>

               <div className="pt-10">
                  <button type="submit" className="w-full btn-luxury py-8 rounded-full font-bold uppercase tracking-[0.6em] text-[11px] shadow-2xl flex items-center justify-center gap-8 group">
                    <span>Initiate Concierge Request</span>
                    <svg className="w-5 h-5 group-hover:translate-x-3 transition-transform text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
                    </svg>
                  </button>
                  <p className="text-center mt-12 text-[9px] font-bold text-slate-300 uppercase tracking-[0.4em]">
                    * Prioritized response for {resort.name} guests.
                  </p>
               </div>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};

export default ResortDetail;