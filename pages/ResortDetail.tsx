
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

  return (
    <div className="bg-[#FCFAF7] min-h-screen pb-40">
      {/* Immersive Gallery Header */}
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
        {/* Navigation & Introduction */}
        <div className="flex flex-col lg:flex-row gap-24 mb-48">
          <div className="flex-grow reveal">
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

            <div className="prose prose-slate max-w-none">
              <p className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-[1.3] mb-24 italic border-l-[1px] border-slate-200 pl-16 py-4">
                "{resort.uvp}"
              </p>
              <div className="text-slate-500 leading-[2] text-lg mb-32 first-letter:text-8xl first-letter:font-serif first-letter:font-bold first-letter:mr-6 first-letter:float-left first-letter:text-slate-900">
                {resort.description}
              </div>
            </div>
          </div>

          <aside className="lg:w-96 reveal">
            <div className="sticky top-32">
              <div className="bg-slate-950 text-white p-16 rounded-[4rem] shadow-2xl relative overflow-hidden mb-12">
                <div className="relative z-10">
                  <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-sky-400 mb-6 block">Private Concierge</span>
                  <h3 className="text-4xl font-serif font-bold mb-8 italic leading-tight">Secure Your Stay</h3>
                  <Link to="/plan" className="block w-full bg-white text-slate-950 text-center py-6 rounded-full font-bold hover:bg-sky-400 transition-all uppercase tracking-[0.3em] text-[10px]">
                    Inquire For Rates
                  </Link>
                </div>
              </div>
              
              <div className="bg-white border border-slate-100 p-12 rounded-[4rem] shadow-sm">
                 <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em] mb-8">Amenities</h3>
                 <div className="space-y-4">
                    {resort.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                        <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">{feat}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </aside>
        </div>

        {/* The Sanctuaries - Room Collection */}
        <section className="mb-64">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 reveal">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-4 block">The Sanctuaries</span>
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 italic">Villas & Residences</h2>
            </div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest max-w-xs text-right leading-loose">
              Spaces designed for absolute weightlessness and total immersion in the turquoise blue.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            {resort.roomTypes?.map((room, idx) => (
              <div key={idx} className="reveal group">
                <div className="h-[500px] lg:h-[600px] rounded-[4rem] overflow-hidden mb-12 shadow-xl relative">
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                  <div className="absolute top-8 left-8 flex gap-2">
                     <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-[8px] font-bold uppercase tracking-[0.2em]">{room.size}</div>
                     <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-[8px] font-bold uppercase tracking-[0.2em]">{room.capacity}</div>
                  </div>
                </div>
                <h3 className="text-3xl font-serif font-bold text-slate-900 mb-6 group-hover:italic transition-all">{room.name}</h3>
                <p className="text-slate-500 leading-loose mb-8 text-sm">{room.description}</p>
                <div className="flex flex-wrap gap-4">
                  {room.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-4 h-px bg-slate-200"></div>
                      <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gastronomy - Dining Venues Grid */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 reveal">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-4 block">Gastronomy</span>
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 italic">Culinary Journeys</h2>
            </div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest max-w-xs text-right leading-loose">
              A symphony of global flavors curated by world-class chefs in immersive settings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {resort.diningVenues?.map((venue, idx) => (
              <div key={idx} className="bg-white border border-slate-100 rounded-[3rem] p-12 reveal shadow-sm hover:shadow-2xl transition-all duration-700">
                <div className="h-64 rounded-[2.5rem] overflow-hidden mb-10 shadow-inner">
                   <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center justify-between mb-6">
                   <span className="text-[8px] font-bold text-sky-500 uppercase tracking-[0.3em]">{venue.vibe}</span>
                   <span className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.3em]">{venue.cuisine}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-6">{venue.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-8">{venue.description}</p>
                <div className="space-y-3">
                   {venue.highlights.map((h, i) => (
                     <div key={i} className="flex items-center gap-3">
                        <div className="w-1 h-1 rounded-full bg-slate-900"></div>
                        <span className="text-[9px] font-bold text-slate-900 uppercase tracking-widest">{h}</span>
                     </div>
                   ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResortDetail;
