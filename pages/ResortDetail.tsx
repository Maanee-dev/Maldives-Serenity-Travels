import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RESORTS } from '../constants';

const ResortDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const resort = RESORTS.find(r => r.slug === slug);
  const roomSliderRef = useRef<HTMLDivElement>(null);

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
        <div className="md:col-span-2 h-full overflow-hidden rounded-[3rem] shadow-xl border-l-8 border-sky-500">
          <img src={getGalleryImage(0)} alt={resort.name} className="w-full h-full object-cover transition-all duration-[2s]" />
        </div>
        <div className="hidden md:flex flex-col gap-4 h-full">
          <div className="h-1/2 rounded-[3rem] overflow-hidden shadow-xl border-t-8 border-amber-500">
             <img src={getGalleryImage(1)} alt={resort.name} className="w-full h-full object-cover" />
          </div>
          <div className="h-1/2 rounded-[3rem] overflow-hidden shadow-xl border-b-8 border-sky-500">
             <img src={getGalleryImage(2)} alt="Detail" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="hidden md:block h-full overflow-hidden rounded-[3rem] shadow-xl border-r-8 border-amber-500">
          <img src={getGalleryImage(3)} alt="Aerial" className="w-full h-full object-cover" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24 lg:py-40 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 mb-48">
          <div className="flex-grow reveal">
            {/* Breadcrumbs - Fixed Spacing */}
            <nav className="flex items-center text-slate-400 text-[11px] font-bold uppercase tracking-[0.6em] gap-8 mb-24 lg:mb-32">
              <Link to="/" className="hover:text-sky-500 transition-colors">Home</Link>
              <span className="text-amber-500">/</span>
              <Link to="/stays" className="hover:text-sky-500 transition-colors">Stays</Link>
              <span className="text-amber-500">/</span>
              <span className="text-slate-900">{resort.name}</span>
            </nav>

            <h1 className="text-6xl md:text-8xl lg:text-[8.5rem] font-serif font-bold text-slate-900 mb-20 tracking-tighter italic leading-[0.85] lg:leading-[0.8]">
              {resort.name}
            </h1>

            <div className="flex items-center gap-14 mb-28 pb-14 border-b-2 border-slate-100">
              <div className="flex gap-2.5">
                {[...Array(resort.rating)].map((_, i) => (
                  <div key={i} className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                ))}
              </div>
              <span className="text-[11px] font-bold text-sky-500 uppercase tracking-[0.6em] bg-sky-50 px-6 py-3 rounded-full border-2 border-sky-500">
                {resort.atoll}
              </span>
            </div>

            <div className="prose prose-slate max-w-none">
              <p className="text-4xl md:text-6xl font-serif font-bold text-slate-900 leading-[1.2] mb-32 italic border-l-8 border-amber-500 pl-16 lg:pl-24 py-6">
                "{resort.uvp}"
              </p>
              <div className="text-slate-600 leading-[2.6] text-xl mb-32 first-letter:text-[10rem] first-letter:font-serif first-letter:font-bold first-letter:mr-10 first-letter:float-left first-letter:text-sky-500 first-letter:leading-[0.75] first-letter:mt-4">
                {resort.description}
              </div>
            </div>
          </div>

          <aside className="lg:w-[420px] flex-shrink-0 reveal">
            <div className="sticky top-40">
              {/* Solid Luxury Concierge Card */}
              <div className="bg-slate-900 text-white p-14 lg:p-20 rounded-[4rem] shadow-2xl relative overflow-hidden mb-12 border-b-8 border-amber-500">
                <div className="relative z-10">
                  <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-amber-500 mb-12 block">Private Specialist</span>
                  <h3 className="text-5xl lg:text-6xl font-serif font-bold mb-14 italic leading-[1.05]">Secure <br />Your Stay</h3>
                  <a href="#consultation" className="block w-full bg-sky-500 text-white text-center py-8 rounded-full font-bold hover:bg-white hover:text-slate-950 transition-all uppercase tracking-[0.5em] text-[11px]">
                    Inquire For Rates
                  </a>
                </div>
              </div>
              
              <div className="bg-white border-2 border-slate-100 p-14 rounded-[4rem] shadow-sm border-t-8 border-sky-500">
                 <h3 className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.7em] mb-14 text-center">Exclusive Features</h3>
                 <div className="space-y-10">
                    {resort.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-8 group">
                        <div className="w-2.5 h-2.5 rounded-full bg-sky-500 group-hover:bg-amber-500 transition-colors duration-500"></div>
                        <span className="text-[12px] font-bold text-slate-900 uppercase tracking-[0.25em]">{feat}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Consult Specialist Section */}
      <section id="consultation" className="max-w-6xl mx-auto px-6 lg:px-12 py-32 bg-white rounded-[5rem] shadow-sm border-2 border-slate-100 reveal border-t-8 border-sky-500">
        <div className="text-center mb-24">
          <span className="text-[11px] font-bold text-amber-500 uppercase tracking-[0.7em] mb-10 block">Bespoke Inquiry</span>
          <h2 className="text-6xl md:text-[5rem] font-serif font-bold text-slate-900 mb-10 italic leading-tight">Consult for {resort.name}</h2>
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.5em] max-w-xl mx-auto leading-loose">
            Connect with our dedicated specialists to curate your private island itinerary.
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center py-20 animate-in fade-in zoom-in duration-700">
            <div className="w-28 h-28 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-16 shadow-lg">
               <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
               </svg>
            </div>
            <h3 className="text-5xl font-serif font-bold mb-8 italic text-slate-900">Request Received</h3>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-loose mb-16">
              A private specialist will be in touch shortly.
            </p>
            <button onClick={() => setIsSubmitted(false)} className="text-[12px] font-bold uppercase tracking-[0.5em] text-sky-500 hover:text-amber-500 transition-colors">Start New Consultation</button>
          </div>
        ) : (
          <div className="flex flex-col gap-24">
            <div className="flex justify-center items-center gap-12 md:gap-24 border-b-2 border-slate-50 pb-12 overflow-x-auto no-scrollbar">
              {[
                { id: 'rates', label: 'Availability' },
                { id: 'experience', label: 'Experiences' },
                { id: 'celebration', label: 'Events' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative text-[12px] font-bold uppercase tracking-[0.6em] transition-all whitespace-nowrap ${activeTab === tab.id ? 'text-sky-500' : 'text-slate-300 hover:text-slate-600'}`}
                >
                  {tab.label}
                  {activeTab === tab.id && <div className="absolute -bottom-13 left-0 right-0 h-2 bg-amber-500 animate-in slide-in-from-left duration-500 rounded-full"></div>}
                </button>
              ))}
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-16 animate-in fade-in duration-1000 max-w-4xl mx-auto w-full">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Full Name</label>
                    <input required type="text" placeholder="GUEST NAME" className="w-full bg-slate-50 border-b-4 border-transparent focus:border-sky-500 transition-all p-8 rounded-[1.5rem] text-[12px] font-bold uppercase tracking-widest focus:outline-none focus:bg-white" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Email Address</label>
                    <input required type="email" placeholder="EMAIL@DESTINATION.COM" className="w-full bg-slate-50 border-b-4 border-transparent focus:border-amber-500 transition-all p-8 rounded-[1.5rem] text-[12px] font-bold uppercase tracking-widest focus:outline-none focus:bg-white" />
                  </div>
               </div>

               <div className="pt-10">
                  <button type="submit" className="w-full btn-atoll py-10 rounded-full font-bold uppercase tracking-[0.6em] text-[12px] shadow-2xl flex items-center justify-center gap-10 group">
                    <span>Initiate Concierge Request</span>
                    <span className="text-amber-500 group-hover:translate-x-3 transition-transform">→</span>
                  </button>
                  <p className="text-center mt-12 text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em]">
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