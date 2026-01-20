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
        .snap-slider {
          display: flex;
          gap: 3rem;
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
      <section className="grid grid-cols-1 md:grid-cols-4 h-[80vh] md:h-[90vh] gap-4 p-4 pt-32 reveal active">
        <div className="md:col-span-2 h-full overflow-hidden rounded-[4rem] shadow-2xl">
          <img src={getGalleryImage(0)} alt={resort.name} className="w-full h-full object-cover grayscale-[0.1] hover:grayscale-0 transition-all duration-[2.5s]" />
        </div>
        <div className="hidden md:flex flex-col gap-4 h-full">
          <div className="h-1/2 rounded-[4rem] overflow-hidden shadow-2xl">
             <img src={getGalleryImage(1)} alt={resort.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
          </div>
          <div className="h-1/2 rounded-[4rem] overflow-hidden shadow-2xl">
             <img src={getGalleryImage(2)} alt="Detail" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
          </div>
        </div>
        <div className="hidden md:block h-full overflow-hidden rounded-[4rem] relative shadow-2xl">
          <img src={getGalleryImage(3)} alt="Aerial" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/5 hover:bg-black/0 transition-all"></div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24 lg:py-48 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 mb-48">
          <div className="flex-grow reveal">
            {/* Breadcrumbs - Fixed Spacing to avoid overlap */}
            <nav className="flex items-center text-slate-400 text-[11px] font-bold uppercase tracking-[0.6em] gap-8 mb-24 lg:mb-32">
              <Link to="/" className="hover:text-sky-500 transition-colors">Home</Link>
              <span className="opacity-20 text-[14px]">/</span>
              <Link to="/stays" className="hover:text-sky-500 transition-colors">Stays</Link>
              <span className="opacity-20 text-[14px]">/</span>
              <span className="text-slate-900">{resort.name}</span>
            </nav>

            <h1 className="text-6xl md:text-8xl lg:text-[9.5rem] font-serif font-bold text-slate-900 mb-20 tracking-tighter italic leading-[0.8] lg:leading-[0.75]">
              {resort.name}
            </h1>

            <div className="flex items-center gap-14 mb-28 pb-14 border-b border-slate-100">
              <div className="flex gap-2.5">
                {[...Array(resort.rating)].map((_, i) => (
                  <div key={i} className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.6)]"></div>
                ))}
              </div>
              <span className="text-[11px] font-bold text-sky-600 uppercase tracking-[0.6em] bg-sky-50 px-6 py-3 rounded-full border border-sky-100">
                {resort.atoll}
              </span>
            </div>

            <div className="prose prose-slate max-w-none">
              <p className="text-4xl md:text-6xl font-serif font-bold text-slate-900 leading-[1.2] mb-32 italic border-l-4 border-amber-400 pl-16 lg:pl-24 py-6">
                "{resort.uvp}"
              </p>
              <div className="text-slate-500 leading-[2.6] text-xl mb-32 first-letter:text-[11rem] first-letter:font-serif first-letter:font-bold first-letter:mr-10 first-letter:float-left first-letter:text-slate-900 first-letter:leading-[0.75] first-letter:mt-4">
                {resort.description}
              </div>
            </div>
          </div>

          <aside className="lg:w-[450px] flex-shrink-0 reveal">
            <div className="sticky top-40">
              {/* Luxury Concierge Card with brand accents */}
              <div className="bg-slate-950 text-white p-14 lg:p-20 rounded-[5rem] shadow-2xl relative overflow-hidden mb-12 btn-luxury">
                <div className="relative z-10">
                  <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-amber-400 mb-12 block">Private Specialist</span>
                  <h3 className="text-5xl lg:text-6xl font-serif font-bold mb-14 italic leading-[1.05]">Secure <br />Your Stay</h3>
                  <a href="#consultation" className="block w-full bg-white text-slate-950 text-center py-8 rounded-full font-bold hover:bg-sky-500 hover:text-white transition-all uppercase tracking-[0.5em] text-[11px] shadow-2xl">
                    Inquire For Rates
                  </a>
                </div>
                <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-amber-400/10 rounded-full blur-[100px]"></div>
                <div className="absolute -top-32 -left-32 w-80 h-80 bg-sky-500/10 rounded-full blur-[100px]"></div>
              </div>
              
              <div className="bg-white border border-slate-100 p-14 rounded-[5rem] shadow-sm">
                 <h3 className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.7em] mb-14 text-center">Island Amenities</h3>
                 <div className="space-y-10">
                    {resort.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-8 group">
                        <div className="w-2 h-2 rounded-full bg-slate-100 group-hover:bg-sky-500 group-hover:scale-150 transition-all duration-500 shadow-sm"></div>
                        <span className="text-[12px] font-bold text-slate-900 uppercase tracking-[0.25em]">{feat}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Sanctuaries Horizontal Explorer */}
      <section className="mb-64 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-28 reveal">
          <div className="flex flex-col md:flex-row justify-between items-end gap-14">
            <div>
              <span className="text-[11px] font-bold text-sky-500 uppercase tracking-[0.6em] mb-6 block">The Sanctuaries</span>
              <h2 className="text-5xl md:text-8xl font-serif font-bold text-slate-900 italic tracking-tighter">Villas & Residences</h2>
            </div>
            <div className="flex items-center gap-12">
               <span className="text-slate-300 text-[11px] font-bold uppercase tracking-[0.5em]">Swipe Exploration</span>
               <div className="w-32 h-px bg-gradient-to-r from-sky-400 via-amber-400 to-transparent"></div>
            </div>
          </div>
        </div>

        <div ref={roomSliderRef} className="snap-slider no-scrollbar px-6 lg:px-[calc((100vw-80rem)/2+3rem)] scroll-smooth pb-16">
          {resort.roomTypes?.map((room, idx) => (
            <div key={idx} className="snap-item w-[85vw] md:w-[600px] group bg-white rounded-[5rem] p-8 border border-slate-50 shadow-sm hover:shadow-2xl transition-all duration-1000">
              <div className="h-[450px] md:h-[550px] rounded-[4rem] overflow-hidden mb-12 shadow-xl relative">
                <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
                <div className="absolute top-10 left-10 flex flex-col gap-4">
                   {room.size && <div className="bg-white/95 backdrop-blur-sm px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] shadow-2xl border-l-4 border-amber-400 text-slate-900">{room.size}</div>}
                   {room.capacity && <div className="bg-white/95 backdrop-blur-sm px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] shadow-2xl border-l-4 border-sky-400 text-slate-900">{room.capacity}</div>}
                </div>
              </div>
              <div className="px-10 pb-10">
                <h3 className="text-4xl font-serif font-bold text-slate-900 mb-8 group-hover:italic group-hover:text-sky-600 transition-all duration-700">{room.name}</h3>
                <p className="text-slate-500 leading-loose mb-12 text-lg line-clamp-3">{room.description}</p>
                <div className="flex flex-wrap gap-y-6 gap-x-12 border-t border-slate-50 pt-10">
                  {room.highlights.slice(0, 3).map((h, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-2 h-px bg-amber-400"></div>
                      <span className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.3em]">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className="snap-item w-1 md:w-64"></div>
        </div>
      </section>

      {/* Consult Specialist Form */}
      <section id="consultation" className="max-w-6xl mx-auto px-6 lg:px-12 py-32 bg-white rounded-[7rem] shadow-sm border border-slate-100 reveal relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-100/20 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-100/20 blur-[100px] rounded-full"></div>
        
        <div className="text-center mb-28 relative z-10">
          <span className="text-[11px] font-bold text-amber-500 uppercase tracking-[0.7em] mb-12 block">Personal Concierge</span>
          <h2 className="text-6xl md:text-[6rem] font-serif font-bold text-slate-900 mb-12 italic leading-tight tracking-tighter">Consult for {resort.name}</h2>
          <p className="text-slate-400 text-[12px] font-bold uppercase tracking-[0.5em] max-w-2xl mx-auto leading-loose opacity-70">
            Connect with our dedicated destination specialists to curate your bespoke Maldivian escape.
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center py-20 animate-in fade-in zoom-in duration-1000 relative z-10">
            <div className="w-28 h-28 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-20 shadow-inner">
               <svg className="w-12 h-12 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
               </svg>
            </div>
            <h3 className="text-6xl font-serif font-bold mb-10 italic text-slate-900">Request Sent</h3>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest leading-loose mb-20">
              Your specialist for {resort.name} will reach out via priority email within 8 hours.
            </p>
            <button onClick={() => setIsSubmitted(false)} className="text-[12px] font-bold uppercase tracking-[0.5em] text-slate-400 hover:text-sky-500 transition-colors">Start New Inquiry</button>
          </div>
        ) : (
          <div className="flex flex-col gap-24 relative z-10">
            <div className="flex justify-center items-center gap-12 md:gap-24 border-b border-slate-50 pb-12 overflow-x-auto no-scrollbar">
              {[
                { id: 'rates', label: 'Availability' },
                { id: 'experience', label: 'Experiences' },
                { id: 'celebration', label: 'Events' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative text-[12px] font-bold uppercase tracking-[0.6em] transition-all whitespace-nowrap ${activeTab === tab.id ? 'text-slate-950' : 'text-slate-300 hover:text-slate-500'}`}
                >
                  {tab.label}
                  {activeTab === tab.id && <div className="absolute -bottom-13 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-400 to-amber-400 animate-in slide-in-from-left duration-700 rounded-full"></div>}
                </button>
              ))}
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-20 animate-in fade-in duration-1000 max-w-4xl mx-auto w-full">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                  <div className="space-y-6">
                    <label className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.5em]">Full Name</label>
                    <input required type="text" placeholder="GUEST NAME" className="w-full bg-slate-50 border-b-2 border-transparent focus:border-sky-400 transition-all p-8 rounded-[2.5rem] text-[12px] font-bold uppercase tracking-widest focus:outline-none focus:bg-white focus:shadow-2xl" />
                  </div>
                  <div className="space-y-6">
                    <label className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.5em]">Email Address</label>
                    <input required type="email" placeholder="EMAIL@DESTINATION.COM" className="w-full bg-slate-50 border-b-2 border-transparent focus:border-amber-400 transition-all p-8 rounded-[2.5rem] text-[12px] font-bold uppercase tracking-widest focus:outline-none focus:bg-white focus:shadow-2xl" />
                  </div>
               </div>

               <div className="space-y-6">
                  <label className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.5em]">
                    Tell us about your dream stay...
                  </label>
                  <textarea 
                    rows={6} 
                    placeholder="Preferred villa type, dining requests, or special occasions..."
                    className="w-full bg-slate-50 border-b-2 border-transparent focus:border-sky-200 transition-all p-12 rounded-[4rem] text-[14px] font-medium leading-loose focus:outline-none focus:bg-white focus:shadow-2xl"
                  ></textarea>
               </div>

               <div className="pt-12">
                  <button type="submit" className="w-full btn-luxury py-10 rounded-full font-bold uppercase tracking-[0.7em] text-[12px] shadow-2xl flex items-center justify-center gap-10 group">
                    <span>Initiate Concierge Request</span>
                    <svg className="w-6 h-6 group-hover:translate-x-4 transition-transform text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
                    </svg>
                  </button>
                  <p className="text-center mt-16 text-[10px] font-bold text-slate-300 uppercase tracking-[0.5em]">
                    * Prioritized consultation for {resort.name} guests.
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