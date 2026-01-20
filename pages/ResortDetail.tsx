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
      document.title = `${resort.name} | Maldivian Specialist - Serenity Travels`;
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
          gap: 2rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }
        .snap-item {
          scroll-snap-align: start;
          flex-shrink: 0;
        }
        .hero-mosaic img {
          transition: transform 3s ease;
        }
        .hero-mosaic div:hover img {
          transform: scale(1.05);
        }
      `}</style>

      {/* Sharp Gallery Header - Borders/Rounds Removed */}
      <section className="hero-mosaic grid grid-cols-1 md:grid-cols-4 h-[75vh] md:h-[90vh] gap-1 p-1 pt-24 md:pt-32 reveal active">
        <div className="md:col-span-2 h-full overflow-hidden relative">
          <img src={getGalleryImage(0)} alt={resort.name} className="w-full h-full object-cover" />
        </div>
        <div className="hidden md:flex flex-col gap-1 h-full">
          <div className="h-1/2 overflow-hidden relative">
             <img src={getGalleryImage(1)} alt={resort.name} className="w-full h-full object-cover" />
          </div>
          <div className="h-1/2 overflow-hidden relative">
             <img src={getGalleryImage(2)} alt="Detail" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="hidden md:block h-full overflow-hidden relative">
          <img src={getGalleryImage(3)} alt="Aerial" className="w-full h-full object-cover" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-32 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-32 mb-24 md:mb-48">
          <div className="flex-grow reveal">
            <nav className="flex items-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em] gap-4 md:gap-8 mb-12 md:mb-24">
              <Link to="/" className="hover:text-sky-500 transition-colors">Portfolio</Link>
              <span className="text-amber-500">/</span>
              <Link to="/stays" className="hover:text-sky-500 transition-colors">Collection</Link>
              <span className="text-amber-500">/</span>
              <span className="text-slate-900 truncate">{resort.name}</span>
            </nav>

            <h1 className="text-4xl md:text-7xl lg:text-[8.5rem] font-serif font-bold text-slate-900 mb-12 tracking-tighter italic leading-[0.9]">
              {resort.name}
            </h1>

            <div className="flex items-center gap-8 md:gap-14 mb-16 md:mb-28 pb-10 md:pb-14 border-b border-slate-100">
              <div className="flex gap-2">
                {[...Array(resort.rating)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-amber-500"></div>
                ))}
              </div>
              <span className="text-[9px] md:text-[11px] font-bold text-sky-500 uppercase tracking-[0.4em] bg-sky-50 px-4 md:px-6 py-2 md:py-3 rounded-full">
                {resort.atoll}
              </span>
            </div>

            <div className="prose prose-slate max-w-none">
              <p className="text-2xl md:text-5xl font-serif font-bold text-slate-900 leading-[1.3] mb-16 md:mb-32 italic border-l border-amber-500/20 pl-8 md:pl-24 py-4 md:py-6">
                "{resort.uvp}"
              </p>
              <div className="text-slate-600 leading-[2] md:leading-[2.6] text-lg md:text-xl mb-24 md:mb-32 font-medium opacity-90">
                {resort.description}
              </div>
            </div>
          </div>

          <aside className="lg:w-[400px] flex-shrink-0 reveal">
            <div className="sticky top-40">
              <div className="bg-slate-950 text-white p-10 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden mb-12">
                <div className="relative z-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-amber-500 mb-8 block">Concierge Priority</span>
                  <h3 className="text-4xl md:text-5xl font-serif font-bold mb-10 italic leading-[1.1]">Expert Consultation</h3>
                  <a href="#consultation" className="block w-full bg-sky-500 text-white text-center py-6 rounded-full font-bold hover:bg-white hover:text-slate-950 transition-all uppercase tracking-[0.4em] text-[10px]">
                    Inquire availability
                  </a>
                </div>
              </div>
              
              <div className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-sm hidden md:block">
                 <h3 className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.6em] mb-10 text-center">Island Highlights</h3>
                 <div className="space-y-8">
                    {resort.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-6 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>
                        <span className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">{feat}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Rooms & Dining Sections remain consistent */}
      <section className="mb-32 md:mb-64 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 md:mb-24 reveal">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <span className="text-[9px] font-bold text-sky-500 uppercase tracking-[0.4em] mb-4 block">Selected Sanctuaries</span>
              <h2 className="text-4xl md:text-7xl font-serif font-bold text-slate-900 italic tracking-tight">Private Villas</h2>
            </div>
          </div>
        </div>

        <div ref={roomSliderRef} className="snap-slider no-scrollbar px-6 lg:px-[calc((100vw-80rem)/2+3rem)] scroll-smooth pb-12">
          {resort.roomTypes?.map((room, idx) => (
            <div key={idx} className="snap-item w-[80vw] md:w-[500px] group bg-white rounded-[3.5rem] p-4 md:p-6 shadow-sm hover:shadow-2xl transition-all duration-700">
              <div className="h-[300px] md:h-[450px] rounded-[3rem] overflow-hidden mb-8 shadow-md relative">
                <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
              </div>
              <div className="px-4 pb-4">
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-4 group-hover:italic transition-all">{room.name}</h3>
                <p className="text-slate-500 leading-relaxed mb-8 text-sm md:text-base line-clamp-3">{room.description}</p>
                <div className="flex flex-wrap gap-4 border-t border-slate-50 pt-6">
                  {room.highlights.slice(0, 2).map((h, i) => (
                    <span key={i} className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{h}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Consultation Section */}
      <section id="consultation" className="max-w-6xl mx-auto px-6 lg:px-12 py-24 md:py-32 bg-white rounded-[4rem] shadow-sm border border-slate-100 reveal">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.6em] mb-8 block">Bespoke Concierge</span>
          <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-serif font-bold text-slate-900 mb-8 italic leading-tight">Consult with an Expert</h2>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em] max-w-xl mx-auto leading-loose px-4">
            Connect with our Maldivian destination specialists to refine your sanctuary selection.
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center py-16 animate-in fade-in zoom-in duration-700">
            <div className="w-20 h-20 md:w-28 md:h-28 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-12 shadow-lg">
               <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
               </svg>
            </div>
            <h3 className="text-3xl md:text-5xl font-serif font-bold mb-6 italic text-slate-900">Request Sent</h3>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              A private specialist will be in touch within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-12 animate-in fade-in duration-1000 max-w-3xl mx-auto w-full">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                  <input required type="text" placeholder="YOUR NAME" className="w-full bg-slate-50 p-6 md:p-8 rounded-[1.5rem] text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:bg-white border border-transparent focus:border-slate-100" />
                </div>
                <div className="space-y-4">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                  <input required type="email" placeholder="EMAIL@DESTINATION.COM" className="w-full bg-slate-50 p-6 md:p-8 rounded-[1.5rem] text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:bg-white border border-transparent focus:border-slate-100" />
                </div>
             </div>
             <div className="pt-8">
                <button type="submit" className="w-full bg-slate-950 text-white py-8 rounded-full font-bold uppercase tracking-[0.5em] text-[11px] shadow-2xl hover:bg-sky-500 transition-all">
                  Initiate Consultation
                </button>
             </div>
          </form>
        )}
      </section>
    </div>
  );
};

export default ResortDetail;